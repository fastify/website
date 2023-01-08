'use strict'

const assert = require('assert')
const path = require('path')
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
  releasesFolder: path.join(__dirname, './releases'),
})

async function processReleases(opts) {
  const { webSiteRoot, releasesFolder } = opts

  const versions = []

  await fs.rm(path.join(webSiteRoot, './versioned_sidebars/*'), { force: true })
  log.info('Cleaned up versioned_sidebars folder')

  for (const docTree of getDocFolders(releasesFolder)) {
    log.info(`Processing ${docTree.releseTag}`)

    // todo convert links to relative

    const docSource = path.join(docTree.path, '/')
    const docDestination = path.join(webSiteRoot, 'versioned_docs', `version-${docTree.releseTag}`)

    await fs.rmdir(docDestination, { recursive: true, force: true }).catch(() => {})

    await execa('mkdir', ['-p', docDestination])

    log.debug(`Coping %s`, docSource)
    await execa('cp', ['-r', path.join(docTree.path, '/') + '.', docDestination])
    log.debug(`Copied %s to %s`, docTree.releseTag, docDestination)

    const sidebarPath = path.join(webSiteRoot, 'versioned_sidebars', `version-${docTree.releseTag}-sidebars.json`)
    log.debug(`Coping %s`, sidebarPath)
    await writeJsonFile(sidebarPath, sidebarsTemplate)

    await generateCategoriesFiles(docDestination)
    log.debug(`Generated categories`)

    await addMetadataToFile(path.join(docDestination, 'index.md'), { displayed_sidebar: 'docsSidebar' })

    versions.push(docTree.releseTag)
  }

  if (versions.length === 0) {
    throw new Error('Something went wrong: No versions found')
  }

  versions.sort((a, b) => semver.compare(a, b)).reverse()
  await writeJsonFile(path.join(webSiteRoot, 'versions.json'), versions)
  log.info(`Wrote %d versions to versions.json`, versions.length)

  // Fixes (Expected corresponding JSX closing tag for <br>) <br> --to--> <br />
  await execa('find', [
    path.join(webSiteRoot, 'versioned_docs'),
    '-type',
    'f',
    '-exec',
    'sed',
    '-i',
    '',
    's/<br>/<br \\/>/g',
    '{}',
    ';',
  ])

  // Remove the <h1> title from the docs
  await execa('find', [
    path.join(webSiteRoot, 'versioned_docs'),
    '-type',
    'f',
    '-exec',
    'sed',
    '-i',
    '',
    's/<h1 align="center">.*<\\/h1>//g',
    '{}',
    ';',
  ])

  log.info('Done')
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

// Adds for each `index` file a `_category_.json` file to customize the sidebar
async function generateCategoriesFiles(docsDir) {
  const files = glob.sync(`${docsDir}/**/index.md`, { nodir: true, nocase: true })
  await Promise.all(
    files.map((readme) => {
      const pathParsed = path.parse(readme)
      const category = {
        label: path.basename(pathParsed.dir),
      }

      return writeJsonFile(path.join(pathParsed.dir, '_category_.json'), category)
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

function writeJsonFile(to, json) {
  return fs.writeFile(to, JSON.stringify(json, null, 2))
}
