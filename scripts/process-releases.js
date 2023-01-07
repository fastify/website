'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs').promises

const dirTree = require('directory-tree')
const semver = require('semver')
const execa = require('execa')

processReleases({
  webSiteRoot: path.resolve(__dirname, '..'),
  releasesFolder: path.join(__dirname, './releases'),
})

async function processReleases(opts) {
  const { webSiteRoot, releasesFolder } = opts

  const versions = []

  await execa('rm', ['-f', path.join(webSiteRoot, 'versioned_sidebars/version*')])
  console.log('Cleaned up versioned_sidebars folder')

  await execa('rm', ['-rf', path.join(webSiteRoot, 'versioned_docs', `version*`)])
  console.log('Cleaned up versioned_docs folder')

  for (const docTree of getDocFolders(releasesFolder)) {
    console.log(`Processing ${docTree.releseTag}`)

    // todo convert links to relative

    const docSource = path.join(docTree.path, '/')
    const docDestination = path.join(webSiteRoot, 'versioned_docs', `version-${docTree.releseTag}`)

    await execa('mkdir', ['-p', docDestination])

    console.log(`Coping ${docSource}`)
    await execa('cp', ['-r', path.join(docTree.path, '/') + '.', docDestination])
    console.log(`Copied ${docTree.releseTag} to ${docDestination}`)

    await execa('cp', [
      path.join(webSiteRoot, 'sidebars.js'),
      path.join(webSiteRoot, 'versioned_sidebars', `version-${docTree.releseTag}-sidebars.js`),
    ])

    versions.push(docTree.releseTag)
  }

  if (versions.length === 0) {
    throw new Error('Something went wrong: No versions found')
  }

  versions.sort((a, b) => semver.compare(a, b)).reverse()
  await fs.writeFile(path.join(webSiteRoot, 'versions.json'), JSON.stringify(versions, null, 2))
  console.log(`Wrote ${versions.length} versions to versions.json`)

  // Fixes (Expected corresponding JSX closing tag for <br>) <br> -> <br />
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

  console.log('Done')
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
        console.log(`Error processing release [${fileTree.name}] because ${err.message} `)
        console.error(err)
      }
    }
  }
}
