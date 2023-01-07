'use strict'
const { request } = require('undici')
const { writeFile } = require('node:fs/promises')
const path = require('path')
const arrayDefaultFrameworks = require('./frameworks.json')
const frameworkTags = arrayDefaultFrameworks.map((framework) => framework.tag)

const URL_BENCHMARK = 'https://raw.githubusercontent.com/fastify/benchmarks/master/benchmark-results.json'
const GITHUB_BASE_URL = 'https://api.github.com/repos/fastify/benchmarks'
let bearerToken = ''

const checkData = (data) => {
  return data.filter((item) => frameworkTags.includes(item.name)).every((currentValue) => !isNaN(currentValue.requests))
}

const getDataAsJSON = async (url) => {
  const { body } = await request(url, {
    headers: {
      'User-Agent': 'fastify-docusaurus-script',
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${bearerToken}`,
    },
  })
  return body.json()
}

const getCommits = async () => {
  const commits = await getDataAsJSON(`${GITHUB_BASE_URL}/commits?path=benchmark-results.json&per_page=10`)
  return commits.map((commit) => commit.sha)
}

const getTree = async (commit_sha) => {
  const commit = await getDataAsJSON(`${GITHUB_BASE_URL}/git/commits/${commit_sha}`)
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

const buildJSON = (data) => {
  const json = {
    reference: 0,
    frameworks: [],
  }
  for (const framework of arrayDefaultFrameworks) {
    const item = data.find((item) => item.name == framework.tag)
    json.frameworks.push({
      name: framework.name,
      requests: item.requests,
      test: framework.test,
      repository: framework.repository,
    })
  }

  return json
}

const downloadData = async () => {
  const data = await getDataAsJSON(URL_BENCHMARK)
  const isDataOk = await checkData(data)
  if (isDataOk) {
    return buildJSON(data)
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
      return buildJSON(pdata)
    }
  }

  throw new Error('Unable to find a valid benchmark result')
}

const execute = async () => {
  bearerToken = process.argv[2]
  const reference = parseInt(process.argv[3])

  const data = await downloadData()
  if (data) {
    console.log('File is ok, saving to filesystem')

    data.reference = reference
    await writeFile(path.join(__dirname, '../src/pages/benchmarks.json'), JSON.stringify(data))
  } else {
    console.log('Cannot find suitable data')
    process.exit(1)
  }
}

/**
 * Run as follows (from scripts forlder)
 * node download-benchmarks.js <BEARER_TOKEN> <REFRENCE_VALUE>
 * where <BEARER_TOKEN> is a valid Git API Key and <REFRENCE_VALUE> is the reference for the bar visualization
 */
execute()
