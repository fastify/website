'use strict'
const { request } = require('undici')
const { writeFile } = require('node:fs/promises')

const URL_BENCHMARK = 'https://raw.githubusercontent.com/fastify/benchmarks/master/benchmark-results.json'
let bearer_token = ''

const checkData = (data) => {
  const isDataOk = data.reduce((accumulator, currentValue) => accumulator && !isNaN(currentValue.requests), true)
  return isDataOk
}

const getDataAsJSON = async (url) => {
  const { body } = await request(url, {
    headers: {
      'User-Agent': 'fastify-docusaurus-script',
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${bearer_token}`,
    },
  })
  return await body.json()
}

const getCommits = async () => {
  const commits = await getDataAsJSON(
    'https://api.github.com/repos/fastify/benchmarks/commits?path=benchmark-results.json&per_page=15',
  )
  return commits.map((commit) => commit.sha)
}

const getTree = async (commit_sha) => {
  const commit = await getDataAsJSON(`https://api.github.com/repos/fastify/benchmarks/git/commits/${commit_sha}`)
  return commit.tree.url
}

const getUrlFromTree = async (tree_url) => {
  const tree = await getDataAsJSON(tree_url)
  return tree.tree.find((item) => item.path == 'benchmark-results.json').url
}

const getBlob = async (blob_url) => {
  const blob = await getDataAsJSON(blob_url)
  const decoded_content = Buffer.from(blob.content, 'base64')
  return JSON.parse(decoded_content)
}

const downloadData = async () => {
  const data = await getDataAsJSON(URL_BENCHMARK)
  const isDataOk = await checkData(data)
  if (isDataOk) {
    return data
  }
    console.log('Fetched file contains N/As. Searching for previous revision')
    const commits = await getCommits()

    for (let commit in commits) {
      const commit_sha = commits[commit]
      console.log(`Checking commit ${commit_sha}`)

      const tree_url = await getTree(commit_sha)
      const benchmarl_url = await getUrlFromTree(tree_url)

      const pdata = await getBlob(benchmarl_url)
      const isPDataOk = await checkData(pdata)
      if (isPDataOk) {
        return pdata
      }
    }

    throw new Error('Unable to find a valid benchmark result')
  }

  return data
}

const execute = async () => {
  bearerToken = process.argv[2]

  const data = await downloadData()
  if (data) {
    console.log('File is ok, saving to filesystem')
    await writeFile('../src/pages/benchmarks.json', JSON.stringify(data))
  } else {
    console.log('Cannot find suitable data')
    process.exit(1)
  }
}

/**
 * Run as follows (from scripts forlder)
 * node download-benchmarks.js <BEARER_TOKEN>
 * where <BEARER_TOKEN> is a valid Git API Key
 */
execute()
