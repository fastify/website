'use strict'

const fs = require('fs')
const path = require('path')

module.exports = {
  checkGeneratedData,
  getVersionLabels,
  getVersionsIncluded,
  manageRedirects,
}

/**
 * Throws an error if any of the generated files is missing.
 */
function checkGeneratedData() {
  const generatedFiles = [
    'static/generated/acknowledgements.json',
    'static/generated/benchmarks.json',
    'static/generated/organizations.json',
    'static/generated/plugins.json',
    'static/generated/team.json',
  ]

  generatedFiles.forEach((file) => {
    const filePath = path.resolve(__dirname, file)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing generated file: ${file}. Run the "npm run build:website" once.`)
    }
  })
}

/**
 * Removes all the minor versions from the versions array, leaving only the major ones.
 */
function getVersionsIncluded({ fastBuild, versions }) {
  if (fastBuild && versions.length > 1) {
    const groupBy = versions.reduce(
      (group, v) => {
        const major = v.split('.')[0]
        if (!group[major]) {
          group[major] = v
          group.out.push(v)
        }
        return group
      },
      { out: [] },
    )

    return groupBy?.out
  }

  return undefined
}

/**
 * Rename the latest numeric version to `latest` to let Docusaurus handles routing.
 */
function getVersionLabels(versionsJson) {
  if (versionsJson.length < 2) {
    return {}
  }

  return {
    [versionsJson[0]]: {
      path: 'latest',
      label: `latest (${versionsJson[1]})`,
    },
    [versionsJson[1]]: {
      banner: 'none',
    },
  }
}

function manageRedirects({ existingPath, major, versions, versionsShipped, ignore = [] }) {
  if (ignore.includes(existingPath)) {
    //  Do not create redirects for this path
    return undefined
  }

  const versionName = versions.find((v) => v.startsWith(`v${major}`))
  const minorName = versionName.split('.').splice(0, 2).join('.').replace('v', '')

  const oldLinks = versionsShipped
    .filter((v) => v.startsWith(major) && !v.startsWith(minorName))
    .map((v) => `v${v.replace(/\.\d$/, '.x')}`)

  const redirects = oldLinks.map((redirect) => {
    const oldPath = `/docs/${redirect}`
    return existingPath
      .replace(`/docs/${versionName}`, oldPath) // Replace the version with the old path
      .replace(/Guides\/(?!Contributing)/g, '') // Remove Guides/ from the path (it has been added in v4)
      .replace(/Reference\//g, '') // Remove Reference/ from the path (it has been added in v4)
  })

  // Remove duplicates
  return Array.from(new Set(redirects))
}
