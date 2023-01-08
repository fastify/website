'use strict'

const assert = require('assert')
const path = require('path')
const { join } = path
const fs = require('fs').promises

const glob = require('glob')
const dirTree = require('directory-tree')
const semver = require('semver')
const execa = require('execa')
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

    const versionName = `v${docTree.semver.major}.${docTree.semver.minor}.x`
    const docSource = join(docTree.path, '/')
    const docDestination = join(versionedFolder, `version-${versionName}`)

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
      displayed_sidebar: 'docsSidebar',
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

  // ### Finalization
  await fixHtmlTags(join(webSiteRoot, 'versioned_docs'))

  log.info('Done')
}

async function copyDocumentation(docSource, docDestination) {
  await fs.rmdir(docDestination, { recursive: true, force: true }).catch(() => {})
  await execa('mkdir', ['-p', docDestination])
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
  await execa('cp', ['-r', from, to])
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

async function fixHtmlTags(dir) {
  for (const pattern of [
    // Fixes (Expected corresponding JSX closing tag for <br>) <br> --to--> <br />
    's/<br>/<br \\/>/g',

    // Remove the <h1> title from the docs
    's/<h1 align="center">.*<\\/h1>//g',
  ]) {
    await execa('find', [dir, '-type', 'f', '-exec', 'sed', '-i', '', pattern, '{}', ';'])
  }
}

function writeJsonFile(to, json) {
  return fs.writeFile(to, JSON.stringify(json, null, 2))
}
