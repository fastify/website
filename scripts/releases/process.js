#!/usr/bin/env node

const { join, dirname, basename } = require('path')
const { promises: fs } = require('fs')
const { dump } = require('js-yaml')
const clone = require('clone')
const { copyDir, fileExists, getFiles } = require('./utils')

const sourceFolder = process.argv[2]
const destFolder = process.argv[3]

if (!sourceFolder || !destFolder) {
  throw new Error(`Missing parameters sourceFolder and destFolder.
  
  Expected command:
    ${process.argv[0]} ${process.argv[1]} <sourceFolder> <destFolder>
`)
}

async function main () {
  const releasesFile = join(sourceFolder, 'releases.json')
  const releaseFileContent = await fs.readFile(releasesFile, 'utf-8')
  const releases = JSON.parse(releaseFileContent)
  const masterRelease = releases.find(r => r.name === 'master')
  await createDocSources(releases)
  await createEcosystemDataFile(masterRelease.dest)
  console.log('All releases processed successfully')
}

async function createDocSources (releases) {
  const latestRelease = releases.find(r => r.name === 'latest')
  const tocByRelease = await Promise.all(releases.map(getTOCForRelease))
  const indexedToc = releases.reduce((acc, curr, i) => {
    acc[curr.docsPath] = tocByRelease[i].reduce((tocSections, currItem) => {
      if (tocSections[currItem.section]) tocSections[currItem.section].push(currItem)
      else tocSections[currItem.section] = [currItem]
      return tocSections
    }, {})
    return acc
  }, {})
  const versions = releases.map(r => r.docsPath)
  await Promise.all(releases.map(copyNestedFoldersForRelease))
  await createDocsDataFile(join(destFolder, 'data', 'docs.yml'), { versions, toc: indexedToc, releases })
  await processDocFiles(indexedToc, latestRelease)
  await createIndexFiles(releases)
}

async function extractTOCFromReleaseStructure (root, release) {
  const sections = {}
  let flatSections = []
  // split nested sections from top level docs
  for await (const file of getFiles(join(root, 'docs'))) {
    if (!(file.nestedPath === '.')) {
      if (sections[file.nestedPath]) sections[file.nestedPath].push(file)
      else sections[file.nestedPath] = [file]
    } else flatSections.push(file)
  }
  // add section only if index.md exists
  Object.keys(sections).forEach((section) => {
    if (sections[section].filter(item => item.fileName.toLowerCase() === 'index.md').length > 0) {
      flatSections = flatSections.concat(sections[section])
    }
  })
  const toc = flatSections.map((section) => {
    const filePath = section.nestedPath === '.' ? '' : section.nestedPath
    const fileName = section.fileName

    const name = fileName.split('.').slice(0, -1).join('.') // get name without extension
    const sourceFile = join(root, 'docs', filePath === 'reference' ? '' : filePath, fileName)
    const destinationFile = join(destFolder, 'content', 'docs', release.docsPath, filePath, fileName)
    const slug = basename(sourceFile, '.md')
    const link = `/docs/${release.docsPath}${filePath !== '' ? '/' + filePath : ''}/${slug}`

    const toc = {
      fileName,
      name,
      sourceFile,
      destinationFile,
      slug,
      link,
      section: filePath,
      fullVersion: release.fullVersion,
      docsPath: release.docsPath,
      label: release.label
    }

    Object.keys(toc).forEach(key => {
      if (key !== 'sourceFile') {
        toc[key] = toc[key].replace('Index', 'index')
      }
    })

    return toc
  })

  return toc
}

async function getTOCForRelease (release) {
  const folder = join(sourceFolder, release.dest)
  const files = await fs.readdir(folder)
  const subFolder = files.find(file => file.match(/^fastify-/))
  const root = join(folder, subFolder)

  return extractTOCFromReleaseStructure(root, release)
}

function createDocsDataFile (destination, docsInfo) {
  const toDump = clone(docsInfo)
  // remove sourceFile and destinationFile keys from toc
  Object.keys(toDump.toc).forEach((version) => {
    Object.keys(toDump.toc[version]).forEach((section, i) => {
      toDump.toc[version][section].forEach((item, i) => {
        delete toDump.toc[version][section][i].sourceFile
        delete toDump.toc[version][section][i].destinationFile
      })
    })
  })

  return fs.writeFile(destination, dump(toDump), 'utf8')
}

async function processDocFiles (docs, latestRelease) {
  // merge all docs into a single array adding the version as a key in every object
  const docsArray = Object.keys(docs).reduce((acc, version) => {
    const curr = docs[version]
    Object.keys(curr).forEach(section => {
      acc = acc.concat(curr[section].map((item) => {
        item.version = version
        return item
      }))
    })
    return acc
  }, [])

  for (const item of docsArray) {
    const dir = dirname(item.destinationFile)
    const hasDir = await fileExists(dir)
    if (!hasDir) {
      await fs.mkdir(dir, {
        recursive: true
      })
    }

    const buffer = await fs.readFile(item.sourceFile, 'utf8')

    let content = buffer.toString()

    // removes doc header from github
    content = content.replace(/<h1 align="center">Fastify<\/h1>\n/, '')

    // remap links
    content = remapLinks(content, item)

    // adds frontmatter
    content =
`---
title: ${item.name}
layout: docs_page.html
path: ${item.link}
version: ${item.version}
fullVersion: ${item.fullVersion}
label: ${item.label}
docsPath: ${item.docsPath}
section: ${item.section}
${item.version === 'latest' ? `canonical: "${item.link.replace(/latest/, latestRelease.label)}"` : ''}
${item.version === 'master' ? `github_url: https://github.com/fastify/fastify/blob/master/docs/${item.fileName}` : ''}
---
${content}`

    await fs.writeFile(item.destinationFile, content, 'utf8')
    console.log(`Created doc page ${item.destinationFile}`)
  }
}

function remapLinks (content, item) {
  /*
    Links remapping rules:
    /https:\/\/github.com\/fastify\/fastify\/blob\/master\/docs/ -> /docs/[VERSION]
    [XXXX](Plugins.md) -> [XXXX](/docs/[VERSION]/Plugins)
    [XXXX](Ecosystem.md) -> [XXXX](/ecosystem)
    [XXXX](/docs/VVVV/Ecosystem.md) -> [XXXX](/ecosystem)
    [XXXX](/docs/VVVV/YYYY.md) -> [XXXX](/docs/VVVV/YYYY)
    [XXXX]('./YYYY' "ZZZZ") -> [XXXX]('/docs/[VERSION]/YYYY' "ZZZZ")
    [XXXX](./YYYY "ZZZZ") -> [XXXX]('/docs/[VERSION]/YYYY' "ZZZZ")
    href="https://github.com/fastify/fastify/blob/master/docs/YYYY.md -> href="/docs/[VERSION]/YYYY
    [XXXX](./resources/YYYY.ZZZZ) -> [XXXX](/docs/[VERSION]/resources/YYYY.ZZZZ)
  */
  const ecosystemLinkRx = /\(\/docs\/[\w\d.-]+\/Ecosystem\.md\)/gi
  const docInternalLinkRx = /\(\/docs\/[\w\d.-]+\/[\w\d-]+(.md)/gi
  const ecosystemLink = /\(Ecosystem\.md\)/gi
  const pluginsLink = /\(Plugins.md\)/gi
  const relativeLinks = /\((.\/)?(([a-zA-Z0-9\-_]+).md(#[a-z0-9\-_]+)?)\)/gi
  const relativeLinksWithLabel = /\('?(\.\/)([\w\d.-]+)(.md)'?\s+"([\w\d.-]+)"\)/gi
  const hrefAbsoluteLinks = /href="https:\/\/github\.com\/fastify\/fastify\/blob\/master\/docs\/([\w\d.-]+)\.md/gi
  const absoluteLinks = /https:\/\/github.com\/fastify\/fastify\/blob\/master\/docs/gi
  const docResourcesLink = /\(.\/?resources\/([a-zA-Z0-9\-_]+\..+)\)/gi
  return content
    .replace(hrefAbsoluteLinks, (match, p1) => `href="/docs/${item.version}${item.section !== '' ? '/' + item.section : ''}/${p1}`)
    .replace(absoluteLinks, `/docs/${item.version}`)
    .replace(ecosystemLinkRx, (match) => '(/ecosystem)')
    .replace(ecosystemLink, (match) => '(/ecosystem)')
    .replace(pluginsLink, (match) => `(/docs/${item.version}${item.section !== '' ? '/' + item.section : ''}/Plugins)`)
    .replace(relativeLinks, (match, ...parts) => `(/docs/${item.version}${item.section !== '' ? '/' + item.section : ''}/${parts[2]}${parts[3] || ''})`)
    .replace(relativeLinksWithLabel, (match, ...parts) => `(/docs/${item.version}${item.section !== '' ? '/' + item.section : ''}/${parts[1]} "${parts[3]}")`)
    .replace(docInternalLinkRx, (match, p1) => match.replace(p1, ''))
    .replace(docResourcesLink, (match, p1) => `(/docs/${item.version}/resources/${p1})`)
}

async function createVersionIndexFile (release) {
  const content = `---
title: Documentation - ${release.name}
layout: docs_version_index.html
path: /docs/${release.docsPath}
version: ${release.name}
fullVersion: ${release.fullVersion}
label: ${release.label}
docsPath: ${release.docsPath}
${release.name === 'latest' ? `canonical: "/docs/${release.label}"` : ''}
github_url: "https://github.com/fastify/website/blob/master/src/website/layouts/docs_version_index.html"
---`

  const dest = join(destFolder, 'content', 'docs', release.docsPath, 'index.md')
  await fs.writeFile(dest, content, 'utf8')
  console.log(`Created doc index page ${dest}`)
}

async function createIndexFiles (releases) {
  // create docs index

  const docsIndexContent = `---
title: Documentation
layout: docs_index.html
path: /docs
github_url: "https://github.com/fastify/website/blob/master/src/website/layouts/docs_index.html"
---`

  const dest = join(destFolder, 'content', 'docs', 'index.md')
  await fs.writeFile(dest, docsIndexContent, 'utf8')
  console.log(`Created docs index at ${dest}`)

  for (const release of releases) {
    await createVersionIndexFile(release)
  }
}

const extractPlugins = (pluginContent) => {
  const lines = pluginContent
    .split('\n')
    .filter(Boolean) // remove empty lines

  // if a line doesn't start with "-" merge it back with the previous item
  const mergedLines = lines.reduce((acc, curr) => {
    if (curr[0] === '-') {
      acc.push(curr)
    } else {
      acc[acc.length - 1] += ' ' + curr
    }
    return acc
  }, [])
  const re = /\[`([-a-zA-Z0-9./@]+)`]\(([^)]+)\)(\s*(.+))?/
  const plugins = mergedLines.map((line) => {
    const match = re.exec(line)
    if (!match) {
      throw new Error(`Invalid entry found in Plugins list (docs/Ecosystem.md): "${line}". This line did not match the expected pattern (${re})`)
    }

    const name = match[1]
    const url = match[2]
    const description = match[3] ? match[3].trim() : ''

    return { name, url, description }
  })
  return plugins
}

async function extractEcosystemFromFile (file) {
  const data = await fs.readFile(file, 'utf8')

  const content = data.toString()
  const corePluginsContent = content
    .split('#### [Core](#core)\n')[1]
    .split('#### [Community](#community)')[0]

  const communityPluginsContent = content
    .split('#### [Core](#core)\n')[1]
    .split('#### [Community](#community)')[1]

  const plugins = {
    corePlugins: extractPlugins(corePluginsContent),
    communityPlugins: extractPlugins(communityPluginsContent)
  }

  return ({ plugins })
}

async function createEcosystemDataFile (masterReleaseDownloadPath) {
  const versionFolder = join(sourceFolder, masterReleaseDownloadPath)
  const destination = join(destFolder, 'data', 'ecosystem.yml')
  const files = await fs.readdir(versionFolder)
  const subfolder = files.find(file => file.match(/^fastify-/))
  const ecosystemFile = join(versionFolder, subfolder, 'docs', 'Ecosystem.md')

  const ecosystem = await extractEcosystemFromFile(ecosystemFile)
  await fs.writeFile(destination, dump(ecosystem), 'utf8')
  console.log(`Ecosystem file written: ${destination}`)
}

async function copyNestedFoldersForRelease (release) {
  const folder = join(sourceFolder, release.dest)
  const files = await fs.readdir(folder)
  const fastifySrcFolder = files.find(file => file.match(/^fastify-/))
  const docsSrc = join(folder, fastifySrcFolder, 'docs')
  const srcContent = await fs.readdir(docsSrc, { withFileTypes: true })
  return srcContent
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .forEach(folder => {
      const src = join(docsSrc, folder)
      const dest = join(destFolder, 'content', 'docs', release.docsPath, folder)
      copyDir(src, dest)
    })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})