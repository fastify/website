'use strict'

const assert = require('assert')
const path = require('path')
const { join } = path
const fsOld = require('fs')
const fs = require('fs').promises

const glob = require('glob')
const dirTree = require('directory-tree')
const semver = require('semver')
const replace = require('replace')
const prependFile = require('prepend-file')

const sidebarsTemplate = require('../sidebars-template.json')
const log = require('pino')({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

processReleases({
  webSiteRoot: path.resolve(__dirname, '..'),
  releasesFolder: join(__dirname, './releases'),
})

async function processReleases(opts) {
  const { webSiteRoot, releasesFolder } = opts

  const versionedFolder = join(webSiteRoot, 'versioned_docs')
  const sidebarFolder = join(webSiteRoot, 'versioned_sidebars')

  const docsVersions = []

  await fs.rm(join(sidebarFolder, './*'), { force: true })
  log.info('Cleaned up versioned_sidebars folder')

  for (const docTree of getDocFolders(releasesFolder)) {
    log.info(`Processing ${docTree.releseTag}`)

    const requiresRootFolder = docTree.semver.major <= 2

    const versionName = `v${docTree.semver.major}.${docTree.semver.minor}.x`
    const docSource = join(docTree.path, '/')
    const docDestination = join(versionedFolder, `version-${versionName}`, requiresRootFolder ? 'Documentation' : '')

    //
    // ### Preparation
    await copyDocumentation(docSource, docDestination)

    //
    // ### Configuration
    const sidebarPath = join(sidebarFolder, `version-${versionName}-sidebars.json`)
    await writeJsonFile(sidebarPath, sidebarsTemplate)
    log.debug(`Created sidebar %s`, sidebarPath)

    await generateCategoriesFiles(docDestination)
    log.debug(`Generated categories`)

    //
    // ### Customization
    await addMetadataToFile(join(docDestination, 'index.md'), {
      title: 'Introduction',
      [`displayed_sidebar`]: 'docsSidebar',
    })

    // todo convert links to relative

    docsVersions.push({ tag: docTree.releseTag, versionName })
  }

  if (docsVersions.length === 0) {
    throw new Error('Something went wrong: No versions found')
  }

  const orderedVersions = docsVersions
    .sort((a, b) => semver.compare(a.tag, b.tag))
    .reverse()
    .map((v) => v.versionName)

  //
  // ### Latest version
  // to support the legacy URL /docs/latest/* we need to copy the latest version and rename it to `latest`
  const latestVersion = orderedVersions[0]
  const latestVersionName = 'latest'
  await copyDocumentation(
    join(versionedFolder, `version-${latestVersion}/`),
    join(versionedFolder, `version-${latestVersionName}`),
  )
  await fs.copyFile(
    join(sidebarFolder, `version-${latestVersion}-sidebars.json`),
    join(sidebarFolder, `version-${latestVersionName}-sidebars.json`),
  )

  await writeJsonFile(join(webSiteRoot, 'versions.json'), [latestVersionName, ...orderedVersions])
  log.info(`Wrote %d versions to versions.json`, orderedVersions.length)

  // The releases.tag file is generated during the release download process
  const versionsShipped = (await fs.readFile(join(__dirname, `releases.tag`), 'utf8')).split('\n')
  await writeJsonFile(join(webSiteRoot, 'versions-shipped.json'), versionsShipped)
  log.info(`Wrote %d versions to versions-shipped.json`, versionsShipped.length)

  await fixHtmlTags(versionedFolder)
  await fixBrokenLinks(versionedFolder)
  await fixCodeBlocks(versionedFolder)

  log.info('Done')
}

async function copyDocumentation(docSource, docDestination) {
  await fs.rm(docDestination, { recursive: true, force: true }).catch(() => {})
  await fs.mkdir(docDestination, { recursive: true })
  await copyDir(`${docSource}.`, docDestination)
}

function* getDocFolders(lookupFolder) {
  const releasesTree = dirTree(lookupFolder, {
    attributes: ['type', 'extension'],
  })
  for (const fileTree of releasesTree.children) {
    if (fileTree.type === 'directory') {
      try {
        assert(fileTree.children.length, 1, 'expected only one docs folder')
        assert(fileTree.children[0].name, 'docs', 'expected only one docs folder')
        yield {
          semver: semver.parse(fileTree.name),
          releseTag: fileTree.name,
          path: fileTree.children[0].path,
          files: fileTree.children[0].children,
        }
      } catch (err) {
        log.info(`Error processing release [${fileTree.name}] because ${err.message} `)
        console.error(err)
      }
    }
  }
}

async function copyDir(from, to) {
  log.debug(`Coping %s`, from)
  await fs.cp(from, to, { recursive: true, force: true })
  log.debug(`Copied to %s`, to)
}

// Adds for each `index` file a `_category_.json` file to customize the sidebar
async function generateCategoriesFiles(docsDir) {
  const files = glob.sync(`${docsDir}/**/index.md`, { nodir: true, nocase: true })
  await Promise.all(
    files.map((readme) => {
      const pathParsed = path.parse(readme)
      const category = {
        label: path.basename(pathParsed.dir),
      }

      return writeJsonFile(join(pathParsed.dir, '_category_.json'), category)
    }),
  )
}

async function addMetadataToFile(file, metadataJson) {
  if (!fsOld.existsSync(file)) {
    return
  }

  await prependFile(
    file,
    `---
${Object.entries(metadataJson)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}
---
`,
  )
}

async function fixCodeBlocks(dir) {
  const silent = true

  // Add a new line before and after code blocks
  replace({
    regex: /(?<!^\W)(```)/gm,
    replacement: `\n$1`,
    paths: [dir],
    recursive: true,
    silent,
  })

  // Add a new line before titles #
  replace({
    regex: /(?<=\n)(#+)/g,
    replacement: `\n$1`,
    paths: [dir],
    recursive: true,
    silent,
  })
}

async function fixHtmlTags(dir) {
  const silent = true

  // Fixes (Expected corresponding JSX closing tag for <br>) <br> --to--> <br />
  replace({
    regex: /<br>/g,
    replacement: '<br />',
    paths: [dir],
    recursive: true,
    silent,
  })

  // Remove the <h1> title from the docs
  replace({
    regex: /<h1 align="center">.*<\/h1>/g,
    replacement: '',
    paths: [dir],
    recursive: true,
    silent,
  })
}

async function fixBrokenLinks(dir) {
  const silent = true

  // typo in the docs
  replace({
    regex: /Referece/g,
    replacement: 'Reference',
    paths: [
      join(dir, 'version-v4.0.x/Guides/'), //
      join(dir, 'version-v4.1.x/Guides/'),
    ],
    recursive: true,
    silent,
  })

  // typo filename in the docs
  replace({
    regex: /Reference\/index/g,
    replacement: 'Reference/Index',
    paths: [
      join(dir, 'version-v4.0.x/'), //
      join(dir, 'version-v4.1.x/'),
    ],
    recursive: true,
    silent,
  })

  // dobule parenthesis in the docs
  // ((../Guides/Getting-Started.md#your-first-plugin))
  replace({
    regex: /\((\(\.\.\/Guides\/Getting-Started\.md.*\))\)/g,
    replacement: '$1',
    paths: [
      join(dir, 'version-v4.0.x/Reference/'), //
      join(dir, 'version-v4.1.x/Reference/'),
    ],
    recursive: true,
    silent,
  })
}

function writeJsonFile(to, json) {
  return fs.writeFile(to, JSON.stringify(json, null, 2))
}
