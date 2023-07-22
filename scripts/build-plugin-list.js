'use strict'

const { promises: fs } = require('fs')
const path = require('path')

const log = require('pino')({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

const LATEST_ECOSYSTEM_FILE = path.join(__dirname, '../versioned_docs/version-latest/Guides/Ecosystem.md')
const OUTPUT_FILE = path.join(__dirname, '../static/generated/plugins.json')

generateEcosystemJson({
  ecosystemFile: LATEST_ECOSYSTEM_FILE,
  outputFile: OUTPUT_FILE,
})

async function generateEcosystemJson({ ecosystemFile, outputFile }) {
  log.info('Generating ecosystem data file from source %s', ecosystemFile)
  const plugins = await extractEcosystemFromFile(ecosystemFile)
  log.debug('Read the ecosystem file')

  await fs.writeFile(outputFile, JSON.stringify(plugins, null, 2))
  log.info('Wrote the ecosystem plugin file to %s', outputFile)
}

async function extractEcosystemFromFile(file) {
  const content = await fs.readFile(file, 'utf8')

  const [, pluginText] = content.split('#### [Core](#core)\n')

  const [
    corePluginsContent, //
    communityPluginsContent, //
  ] = pluginText.split('#### [Community](#community)')

  return {
    corePlugins: extractPlugins(corePluginsContent),
    communityPlugins: extractPlugins(communityPluginsContent),
  }
}

function extractPlugins(pluginContent) {
  const lines = pluginContent.split('\n').filter(Boolean) // remove empty lines

  // if a line doesn't start with "-" merge it back with the previous item
  const mergedLines = lines.reduce((acc, curr) => {
    if (curr[0] === '-') {
      acc.push(curr)
    } else {
      acc[acc.length - 1] += ' ' + curr
    }
    return acc
  }, [])

  const re = /\[`([-a-zA-Z\d./@]+)`\]\(([^)]+)\)(\s*(.+))?/
  const plugins = mergedLines.map((line) => {
    const match = re.exec(line)
    if (!match) {
      throw new Error(
        `Invalid entry found in Plugins list (docs/Ecosystem.md): "${line}". This line did not match the expected pattern (${re})`,
      )
    }

    const name = match[1]
    const url = match[2]
    const description = match[3] ? match[3].trim().replace(/ {2,}/g, ' ') : ''
    return {
      name,
      url,
      description: description.charAt(0).toUpperCase() + description.slice(1),
    }
  })
  return plugins
}
