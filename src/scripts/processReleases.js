#!/usr/bin/env node

const { join, dirname, basename } = require('path')
const { promises: fs } = require('fs')
const { dump } = require('js-yaml')
const clone = require('clone')
const { copyDir, fileExists } = require('./utils')

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
    acc[curr.docsPath] = tocByRelease[i]
    return acc
  }, {})
  const versions = releases.map(r => r.docsPath)
  await Promise.all(releases.map(copyResourcesFolderForRelease))
  await createDocsDataFile(join(destFolder, 'data', 'docs.yml'), { versions, toc: indexedToc, releases })
  await processDocFiles(indexedToc, latestRelease)
  await createIndexFiles(releases)
}

async function extractTOCFromFile (file, release, docsBase, prefix = []) {
  const fileContent = await fs.readFile(file, 'utf8')

  // if this is the main documentation file: searches for the beginning of the ToC
  //   in the file (between '## Documentation' and '\n\n')
  // if not considers every line a candidate for matching documentation entries
  console.log(file)
  const lines = prefix.length === 0
    ? fileContent.split('## Documentation')[1].split('\n\n')[0].split('\n').filter(Boolean)
    : fileContent.split('\n').filter(Boolean)

  // Check if a given line is a ToC entry
  // This regex will match as in the following example:
  //
  // `* <a href="./docs/Something/Something2/Index.md"><code><b>Something2</b></code></a>`
  //
  // Full match     155-216   ./docs/Something/Something2/Index.md"><code><b>Something2</b>
  // Group 1.       n/a       .
  // Group 2.       n/a       Something/Something2/Index.md
  // Group 3.       n/a       Something/Something2/
  // Group 4.       n/a       Something2/
  // Group 5.       n/a       Index.md
  // Group 6.       n/a       Something2
  const re = /(master|\.)?\/docs\/((([a-zA-Z-0-9_-]+\/)*)([a-zA-Z-0-9_-]+\.md))"><code><b>(.+)<\/b>/
  const subsections = new Set()

  const toc = lines.map((line) => {
    const match = re.exec(line)
    if (!match) {
      return false
    }
    const fileName = match[2]
    const name = match[6]
    const sourceFile = join(docsBase, 'docs', fileName)
    const destinationFile = join(destFolder, 'content', 'docs', release.docsPath, fileName)
    const slug = `${match[3] ? match[3] : ''}${basename(sourceFile, '.md')}`
    const link = `/docs/${release.docsPath}/${slug}`

    if (match[3] && match[3] !== (prefix.join('/') + '/')) {
      subsections.add(basename(match[4]))
    }

    return {
      fileName,
      name,
      sourceFile,
      destinationFile,
      slug,
      link,
      prefix,
      fullVersion: release.fullVersion,
      docsPath: release.docsPath,
      label: release.label
    }
  }).filter(Boolean)

  // if any link to /<subsection>/<file>.md was found
  // assume there is a new subtree that needs to be discovered and processed
  // assume the tree ToC is stored in Index.md inside the current prefix + subsection
  for (const subsection of subsections) {
    const innerIndex = join(dirname(file), 'docs', subsection, 'Index.md')
    const innerPrefix = [...prefix, subsection]
    const innerToc = await extractTOCFromFile(innerIndex, release, docsBase, innerPrefix)
    for (const entry of innerToc) {
      toc.push(entry)
    }
  }

  return toc
}

async function getTOCForRelease (release) {
  const folder = join(sourceFolder, release.dest)
  const files = await fs.readdir(folder)
  const subfolder = files.find(file => file.match(/^fastify-/))
  const docsBase = join(folder, subfolder)
  const indexFile = join(docsBase, 'README.md')

  return extractTOCFromFile(indexFile, release, docsBase)
}

function createDocsDataFile (destination, docsInfo) {
  const toDump = clone(docsInfo)
  // remove sourceFile and destinationFile keys from toc
  Object.keys(toDump.toc).forEach((version) => {
    toDump.toc[version].forEach((entry, i) => {
      delete toDump.toc[version][i].sourceFile
      delete toDump.toc[version][i].destinationFile
    })
  })

  return fs.writeFile(destination, dump(toDump), 'utf8')
}

async function processDocFiles (docs, latestRelease) {
  // merge all docs into a single array adding the version as a key in every object
  const docsArray = Object.keys(docs).reduce((acc, version) => {
    const curr = docs[version]
    return acc.concat(curr.map((item) => {
      item.version = version
      return item
    }))
  }, [])

  for (const item of docsArray) {
    const dir = dirname(item.destinationFile)
    const hasDir = await fileExists(dir)
    if (!hasDir) {
      await fs.mkdir(dir)
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
prefixParts: ${JSON.stringify(item.prefix)}
prefixPath: ${item.prefix.join('/')}/
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
    [XXX](/CONTRIBUTING.md) -> https://github.com/fastify/fastify/blob/master/CONTRIBUTING.md
    /https:\/\/github.com\/fastify\/fastify\/blob\/master\/docs/ -> /docs/[VERSION]
    [XXXX](Plugins.md) -> [XXXX](/docs/[VERSION]/Plugins)
    [XXXX](/docs/VVVV/Ecosystem.md) -> [XXXX](/ecosystem)
    [XXXX](/docs/VVVV/YYYY.md) -> [XXXX](/docs/VVVV/YYYY)
    [XXXX]('./YYYY' "ZZZZ") -> [XXXX]('/docs/[VERSION]/YYYY' "ZZZZ")
    [XXXX](./YYYY "ZZZZ") -> [XXXX]('/docs/[VERSION]/YYYY' "ZZZZ")
    href="https://github.com/fastify/fastify/blob/master/docs/YYYY.md -> href="/docs/[VERSION]/YYYY
    [XXXX](./resources/YYYY.ZZZZ) -> [XXXX](/docs/[VERSION]/resources/YYYY.ZZZZ)
  */
  const contributingLinkRx = /\/CONTRIBUTING\.md/gi
  const ecosystemLinkRx = /\(\/docs\/[\w\d.-]+\/Ecosystem\.md\)/gi
  const docInternalLinkRx = /\(\/docs\/[\w\d.-]+\/[\w\d-]+(\.md)/gi
  const pluginsLink = /\(Plugins\.md\)/gi
  const relativeLinks = /\((.\/)?(([a-zA-Z0-9\-_]+).md(#[a-z0-9\-_]+)?)\)/gi
  const relativeLinksWithLabel = /\('?(\.\/)([\w\d.-]+)(.md)'?\s+"([\w\d.-]+)"\)/gi
  const hrefAbsoluteLinks = /href="https:\/\/github\.com\/fastify\/fastify\/blob\/master\/docs\/([\w\d.-]+)\.md/gi
  const absoluteLinks = /https:\/\/github.com\/fastify\/fastify\/blob\/master\/docs/gi
  const docResourcesLink = /\(.\/?resources\/([a-zA-Z0-9\-_]+\..+)\)/gi
  return content
    .replace(contributingLinkRx, () => 'https://github.com/fastify/fastify/blob/master/CONTRIBUTING.md')
    .replace(hrefAbsoluteLinks, (match, p1) => `href="/docs/${item.version}/${p1}`)
    .replace(absoluteLinks, `/docs/${item.version}`)
    .replace(ecosystemLinkRx, (match) => '(/ecosystem)')
    .replace(pluginsLink, (match) => `(/docs/${item.version}/Plugins)`)
    .replace(relativeLinks, (match, ...parts) => `(/docs/${item.version}/${parts[2]}${parts[3] || ''})`)
    .replace(relativeLinksWithLabel, (match, ...parts) => `(/docs/${item.version}/${parts[1]} "${parts[3]}")`)
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
  const re = /\[`([-a-zA-Z0-9./@]+)`\]\(([^)]+)\)(\s*(.+))?/
  const plugins = mergedLines.map((line) => {
    const match = re.exec(line)
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

async function copyResourcesFolderForRelease (release) {
  const folder = join(sourceFolder, release.dest)
  const files = await fs.readdir(folder)
  const subfolder = files.find(file => file.match(/^fastify-/))
  const src = join(folder, subfolder, 'docs', 'resources')
  const dest = join(destFolder, 'content', 'docs', release.docsPath, 'resources')

  return copyDir(src, dest)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
