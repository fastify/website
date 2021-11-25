const crypto = require('crypto')
const { resolve, join } = require('path')
const fs = require('fs')
const { promisify } = require('util')
const finished = promisify(require('stream').finished)
const axios = require('axios')
const unzip = require('unzip-stream')
const parseLinkHeader = require('parse-link-header')
const compareVersions = require('compare-versions')
const { fileExists } = require('./utils')

const repository = process.argv[2] || 'fastify/fastify'
const dest = resolve(process.argv[3] || 'releases')
const minRelease = process.argv[4] || 'v1.13.0'

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

async function getAllReleases (repository, requestConfig) {
  let releases = []
  let nextUrl = `https://api.github.com/repos/${repository}/releases`
  while (nextUrl) {
    const { data, headers } = await axios.get(nextUrl, requestConfig)
    const links = parseLinkHeader(headers.link)
    nextUrl = links.next ? links.next.url : null
    releases = releases.concat(data)
  }

  return releases
}

function downloadReleases (releases, requestConfig) {
  const releasesDownload = Object.values(releases).map(async (release) => {
    const destPath = join(dest, release.dest)
    if (!release.ignoreCache) {
      const hasCache = await fileExists(destPath)
      if (hasCache) {
        console.log(`Skipped ${release.name} (already in cache)`)
        return release
      }
    }
    const { data } = await axios.get(release.url, { ...requestConfig, responseType: 'stream' })
    const stream = data.pipe(unzip.Extract({ path: destPath }))
    await finished(stream)
    console.log(`Downloaded ${release.name}`)
    return release
  })
  return Promise.all(releasesDownload)
}

async function main () {
  console.log(`Downloading releases into ${dest}`)

  const requestConfig = {
    responseType: 'json',
    headers: { 'User-Agent': 'fastify-website-builder-v2' }
  }

  if (process.env.GH_NAME && process.env.GH_TOKEN) {
    console.log(`GitHub API requests authenticated as "${process.env.GH_NAME}"`)
    requestConfig.auth = {
      username: process.env.GH_NAME,
      password: process.env.GH_TOKEN
    }
  }

  const releases = await getAllReleases(repository, requestConfig)
  console.log(`Found ${releases.length} releases`)
  const selectedReleases = releases
    // removes draft releases and pre-releases
    .filter((release) => !release.draft && !release.prerelease)
    // removes releases with invalid names (e.g. 0.2.0 did not have a release name)
    .filter((release) => compareVersions.validate(release.name))
    // sorts releases by name descendant
    .sort((a, b) => compareVersions(a.name, b.name) * -1)
    // creates version map and label per every release
    .map((release) => {
      const [major, minor, patch] = release.name.split('-', 1)[0].substr(1).split('.').map(Number)
      const annotation = release.name.split('-').slice(1).join('-') // catches annotations like `-alpha.1` or `-pre-release.2`
      return {
        name: release.name,
        url: release.zipball_url,
        dest: md5(release.zipball_url),
        label: `v${major}.${minor}.x`,
        docsPath: `v${major}.${minor}.x`,
        fullVersion: release.name,
        version: { major, minor, patch, annotation }
      }
    })
    // removes release prior to a given release
    .filter(({ name, version }) => {
      const skip = compareVersions.compare(name, minRelease, '<')
      if (skip) {
        console.log(`Ignoring "${name}" as it's older than minimum version "${minRelease}"`)
      }
      return !skip
    })
    // Keeps only the latest patch per release and creates a map
    .reduce((acc, curr) => {
      if (!acc[curr.label] || acc[curr.label].version.patch < curr.version.patch) {
        acc[curr.label] = curr
      }

      return acc
    }, {})

  // selected the "latest" release at the last release without annotations
  const latestRelease = Object.values(selectedReleases)
    .sort((a, b) => compareVersions(a.name, b.name) * -1)
    .find((r) => r.version.annotation === '')

  // Create an alias of the latest release as `latest`
  selectedReleases.latest = { ...latestRelease, name: 'latest', docsPath: 'latest' }

  // Add current master
  const masterUrl = `https://github.com/${repository}/archive/refs/heads/main.zip`
  selectedReleases.master = {
    label: 'master',
    name: 'master',
    docsPath: 'master',
    fullVersion: 'master',
    url: masterUrl,
    dest: md5(masterUrl),
    ignoreCache: true
  }

  // downloads the releases
  const manifest = await downloadReleases(selectedReleases, requestConfig)
  // sort the releases by version and makes sure latest and then master are the first 2 entries
  manifest.sort(({ name: a }, { name: b }) => {
    switch (true) {
      case a === 'latest' && b === 'master': return -1 // latest always goes first
      case b === 'latest' && a === 'master': return 1
      case a === 'latest' || a === 'master': return -1 // master is the second
      case b === 'latest' || b === 'master': return 1
      default:
        return compareVersions(a, b) * -1 // otherwise compare by versions descendant
    }
  })
  // saves a manifest with all the current releases in the dest folder
  const manifestFile = join(dest, 'releases.json')
  await fs.promises.writeFile(manifestFile, JSON.stringify(manifest, null, 2))
  console.log(`Manifest file created: ${manifestFile}`)

  console.log(`Completed: downloaded ${Object.keys(selectedReleases).length} releases`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})