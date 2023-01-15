'use strict'

const path = require('node:path')
const { writeFile } = require('node:fs/promises')

const { request } = require('undici')

const arrayDefaultFrameworks = require('./frameworks.json')
const frameworkTags = arrayDefaultFrameworks.map(({ tag }) => tag)

const log = require('pino')({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

const URL_BENCHMARK = 'https://raw.githubusercontent.com/fastify/benchmarks/master/benchmark-results.json'
const GITHUB_BASE_URL = 'https://api.github.com/repos/fastify/benchmarks'

const OUTPUT_FILE = path.join(__dirname, '../static/generated/benchmarks.json')

execute({
  downloadUrl: URL_BENCHMARK,
  outputFile: OUTPUT_FILE,
})

async function execute({ downloadUrl, outputFile }) {
  const data = await downloadBenchmarks(downloadUrl)
  if (data) {
    log.debug('File is ok, saving to filesystem')

    await writeFile(outputFile, JSON.stringify(data, null, 2))
    log.info('Wrote the benchmarks file to %s', outputFile)
  } else {
    log.error('Cannot find suitable data - Please check the URL %s', URL_BENCHMARK)
    process.exit(1)
  }
}

async function downloadBenchmarks(githubUrl) {
  const data = await getDataAsJSON(githubUrl)
  if (isValidBenchmark(data)) {
    return buildBenchmarksJSON(data)
  }

  log.warn('Fetched file contains `N/A` data. Searching for previous revision')

  const commits = await getCommits()
  for (let commit in commits) {
    const commitSha = commits[commit]
    log.debug(`Checking commit %s`, commitSha)

    const tree_url = await getTree(commitSha)
    const benchmarl_url = await getUrlFromTree(tree_url)

    const data = await getBlob(benchmarl_url)
    if (isValidBenchmark(data)) {
      return buildBenchmarksJSON(data)
    }
  }

  throw new Error('Unable to find a valid benchmark result')
}

const getCommits = async () => {
  const commits = await getDataAsJSON(`${GITHUB_BASE_URL}/commits?path=benchmark-results.json&per_page=10`)
  return commits.map((commit) => commit.sha)
}

const getTree = async (commitSha) => {
  const commit = await getDataAsJSON(`${GITHUB_BASE_URL}/git/commits/${commitSha}`)
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

function buildBenchmarksJSON(data) {
  const maxSpeed = data
    .filter(({ requests }) => !isNaN(requests))
    .map(({ requests }) => parseInt(requests))
    .reduce((max, req) => (req > max ? req : max), 0)

  const json = {
    reference: maxSpeed,
    frameworks: arrayDefaultFrameworks.map((framework) => {
      const item = data.find(({ name }) => name == framework.tag)
      return {
        ...framework,
        requests: item.requests,
      }
    }),
  }

  return json
}

function isValidBenchmark(data) {
  return data
    .filter((item) => frameworkTags.includes(item.name)) //
    .every((item) => !isNaN(item.requests))
}

async function getDataAsJSON(url) {
  const { body } = await request(url, {
    headers: {
      'User-Agent': 'fastify-docusaurus-script',
      Accept: 'application/vnd.github+json',
    },
  })
  return body.json()
}
