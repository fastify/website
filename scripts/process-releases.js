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

  for (const docTree of getDocFolders(releasesFolder)) {
    console.log(`Processing ${docTree.releseTag}`)

    // todo convert links to relative

    const docDestination = path.join(webSiteRoot, 'versioned_docs', `version-${docTree.releseTag}`)

    await execa('rm', ['-rf', docDestination])
    console.log('Cleaned up versioned_docs folder')

    await execa('mkdir', ['-p', docDestination])

    console.log(path.join(docTree.path, '/'))
    await execa('cp', ['-r', path.join(docTree.path, '/') + '.', docDestination])
    console.log(`Copied ${docTree.releseTag} to ${docDestination}`)

    await execa('cp', [
      path.join(webSiteRoot, 'sidebars.js'),
      path.join(webSiteRoot, 'versioned_sidebars', `version-${docTree.releseTag}-sidebars.js`),
    ])

    versions.push(docTree.releseTag)
  }
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
      assert(fileTree.children.length, 1, 'expected only one docs folder')
      assert(fileTree.children[0].name, 'docs', 'expected only one docs folder')
      yield {
        semver: semver.parse(fileTree.name),
        releseTag: fileTree.name,
        path: fileTree.children[0].path,
        files: fileTree.children[0].children,
      }
    }
  }
}
