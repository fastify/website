'use strict'

const fs = require('node:fs/promises')
const path = require('node:path')
const glob = require('node:glob')

const log = require('pino')({
  level: process.env.LOG_LEVEL || 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

const VERSIONS_FILE = path.join(__dirname, '../versions.json')
const DOCS_DIR = path.join(__dirname, '../versioned_docs/version-latest')
const OUTPUT_FILE = path.join(__dirname, '../static/generated/llms-full.txt')

/**
 * Strips YAML frontmatter from markdown content
 */
function stripFrontmatter(content) {
  const frontmatterRegex = /^---\n[\s\S]*?\n---\n*/
  return content.replace(frontmatterRegex, '')
}

/**
 * Extracts a readable title from a file path
 */
function extractTitle(filePath) {
  const basename = path.basename(filePath, '.md')

  // Special cases
  if (basename === 'index') return 'Introduction'

  // Convert kebab-case to Title Case
  // Getting-Started -> Getting Started
  // Migration-Guide-V4 -> Migration Guide V4
  return basename
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Sorts files with Getting-Started first, then alphabetically
 */
function sortFiles(files) {
  // Filter out Index.md files (table of contents)
  const filtered = files.filter((f) => !f.endsWith('/Index.md'))

  return filtered.sort((a, b) => {
    const aName = path.basename(a)
    const bName = path.basename(b)

    // Getting-Started.md always first
    if (aName === 'Getting-Started.md') return -1
    if (bName === 'Getting-Started.md') return 1

    // Everything else alphabetical
    return aName.localeCompare(bName)
  })
}

/**
 * Generates the metadata header for llms-full.txt
 */
function generateMetadata(latestVersion) {
  const timestamp = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  return `# Fastify

> Fast and low overhead web framework, for Node.js

## Metadata

- Latest Version: ${latestVersion}
- Repository: https://github.com/fastify/fastify
- Website: https://fastify.io
- Documentation: https://fastify.dev/docs/latest/
- NPM: https://www.npmjs.com/package/fastify
- Last Updated: ${timestamp}

## Overview

Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we know, it is one of the fastest web frameworks in town.

This document contains the complete Fastify documentation, including all guides and API reference documentation. It is designed to be consumed by Large Language Models (LLMs) to provide comprehensive knowledge about Fastify.

---

`
}

/**
 * Main function to generate llms-full.txt
 */
async function generateLLMsTxt() {
  log.info('Starting llms-full.txt generation')

  // PHASE 1: VALIDATE INPUTS

  // Check if versions.json exists
  let versions = ['latest']
  try {
    const versionsContent = await fs.readFile(VERSIONS_FILE, 'utf8')
    versions = JSON.parse(versionsContent)
    if (!versions || versions.length === 0) {
      log.warn('versions.json is empty, using default')
      versions = ['latest']
    }
  } catch (err) {
    log.warn('Could not read versions.json: %s. Using default "latest"', err.message)
  }

  const latestVersion = versions[0]
  log.debug('Latest version: %s', latestVersion)

  // Check if docs directory exists
  try {
    await fs.access(DOCS_DIR)
  } catch (err) {
    log.error('Directory not found: %s', DOCS_DIR)
    log.error('Run process-releases.js first to generate versioned documentation')
    process.exit(1)
  }

  // PHASE 2: DISCOVER MARKDOWN FILES

  log.debug('Discovering markdown files in %s', DOCS_DIR)

  const rootIndexPath = path.join(DOCS_DIR, 'index.md')
  const guidesPattern = path.join(DOCS_DIR, 'Guides/**/*.md')
  const referencePattern = path.join(DOCS_DIR, 'Reference/**/*.md')

  const guidesFiles = glob.sync(guidesPattern)
  const referenceFiles = glob.sync(referencePattern)

  log.info('Found %d guide files', guidesFiles.length)
  log.info('Found %d reference files', referenceFiles.length)

  // PHASE 3: SORT FILES

  const sortedGuides = sortFiles(guidesFiles)
  const sortedReference = sortFiles(referenceFiles)

  log.debug('Sorted guides: %d files', sortedGuides.length)
  log.debug('Sorted reference: %d files', sortedReference.length)

  // PHASE 4: GENERATE CONTENT

  let output = ''

  // Add metadata header
  output += generateMetadata(latestVersion)

  // Add root introduction if exists
  try {
    await fs.access(rootIndexPath)
    const content = await fs.readFile(rootIndexPath, 'utf8')
    const cleaned = stripFrontmatter(content)

    output += '## Introduction\n\n'
    output += cleaned
    output += '\n\n---\n\n'

    log.debug('Added introduction from index.md')
  } catch (err) {
    log.warn('Could not read index.md: %s', err.message)
  }

  // Add Guides section
  output += '## Getting Started\n\n'

  for (const file of sortedGuides) {
    try {
      const content = await fs.readFile(file, 'utf8')
      const cleaned = stripFrontmatter(content)

      output += cleaned
      output += '\n\n---\n\n'

      log.debug('Added guide: %s', extractTitle(file))
    } catch (err) {
      log.warn('Failed to read %s: %s', file, err.message)
    }
  }

  // Add Reference section
  output += '## Reference Documentation\n\n'

  for (const file of sortedReference) {
    try {
      const content = await fs.readFile(file, 'utf8')
      const cleaned = stripFrontmatter(content)

      output += cleaned
      output += '\n\n---\n\n'

      log.debug('Added reference: %s', extractTitle(file))
    } catch (err) {
      log.warn('Failed to read %s: %s', file, err.message)
    }
  }

  // Add footer with additional resources
  output += '## Additional Resources\n\n'
  output += 'For the latest documentation, examples, and ecosystem plugins, visit:\n\n'
  output += '- [Fastify GitHub Repository](https://github.com/fastify/fastify)\n'
  output += '- [Fastify NPM Package](https://www.npmjs.com/package/fastify)\n'
  output += '- [Fastify Discord Community](https://discord.gg/fastify)\n'
  output += '- [Fastify Website](https://fastify.io)\n'
  output += '- [Fastify Ecosystem](https://fastify.io/ecosystem)\n'

  // PHASE 5: WRITE OUTPUT

  await fs.writeFile(OUTPUT_FILE, output, 'utf8')

  // PHASE 6: LOG STATS

  const stats = await fs.stat(OUTPUT_FILE)
  const sizeKB = (stats.size / 1024).toFixed(2)

  log.info('Successfully generated llms-full.txt')
  log.info('File size: %s KB', sizeKB)
  log.info('Location: %s', OUTPUT_FILE)
}

// Execute
generateLLMsTxt().catch((err) => {
  log.error(err, 'Failed to generate llms-full.txt')
  process.exit(1)
})
