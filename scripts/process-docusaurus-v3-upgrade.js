const replace = require('replace')
const fs = require('fs').promises
const path = require('path')
const { join } = path

async function editLine(file, lineNumber, oldContent, newContent) {
  const data = await fs.readFile(file, 'utf8')
  const lines = data.split(/\r?\n/) // Split by line endings (including CRLF)

  if (lineNumber < 1 || lineNumber > lines.length) {
    throw new Error(`Invalid line number: ${lineNumber}`)
  }

  let currentLineContent = lines[lineNumber - 1]

  const newLineContent = currentLineContent.replace(oldContent, newContent)
  if (currentLineContent === newLineContent)
    throw new Error(`Could not find string "${oldContent}" in ${file} at line number ${lineNumber}`)

  lines[lineNumber - 1] = newLineContent // Modify the target line
  const newData = lines.join('\n')

  await fs.writeFile(file, newData, 'utf8')
}

// eslint-disable-next-line camelcase
async function process_v4_27_and_above(versionNames) {
  for (const versionName of versionNames) {
    // adding required spacing between characters

    const TypescriptMdFile = join(versionName, 'Reference/TypeScript.md')
    await editLine(
      TypescriptMdFile,
      '1482',
      'fastify.preSerializationHookHandler<PreSerializationPayload,',
      'fastify.preSerializationHookHandler< PreSerializationPayload,',
    )

    // adding space for correct formatting
    await editLine(
      TypescriptMdFile,
      '1492',
      'fastify.onSendHookHandler<OnSendPayload,',
      'fastify.onSendHookHandler< OnSendPayload',
    )

    // fix `Could not parse expression with acorn` error
    await editLine(TypescriptMdFile, '1531', '{ path: string; prefix: string })', '\\{ path: string; prefix: string })')
  }
}

async function processGroupOne(versionNames) {
  for (const versionName of versionNames) {
    // adding required spacing between characters

    const TypescriptMdFile = join(versionName, 'Reference/TypeScript.md')
    await editLine(
      TypescriptMdFile,
      '1481',
      'fastify.preSerializationHookHandler<PreSerializationPayload,',
      'fastify.preSerializationHookHandler< PreSerializationPayload,',
    )

    // adding space for correct formatting
    await editLine(
      TypescriptMdFile,
      '1491',
      'fastify.onSendHookHandler<OnSendPayload,',
      'fastify.onSendHookHandler< OnSendPayload',
    )

    // fix `Could not parse expression with acorn` error
    await editLine(TypescriptMdFile, '1530', '{ path: string; prefix: string })', '\\{ path: string; prefix: string })')
  }
}

async function processGroupTwo(versionNames) {
  for (const versionName of versionNames) {
    // adding required spacing between characters

    const TypescriptMdFile = join(versionName, 'Reference/TypeScript.md')
    await editLine(
      TypescriptMdFile,
      '1467',
      'fastify.preSerializationHookHandler<PreSerializationPayload,',
      'fastify.preSerializationHookHandler< PreSerializationPayload,',
    )

    // adding space for correct formatting
    await editLine(
      TypescriptMdFile,
      '1477',
      'fastify.onSendHookHandler<OnSendPayload,',
      'fastify.onSendHookHandler< OnSendPayload',
    )

    // fix `Could not parse expression with acorn` error
    await editLine(TypescriptMdFile, '1516', '{ path: string; prefix: string })', '\\{ path: string; prefix: string })')
  }
}

async function processGroupThree(versionNames) {
  for (const versionName of versionNames) {
    // adding required spacing between characters

    const TypescriptMdFile = join(versionName, 'Reference/TypeScript.md')
    await editLine(
      TypescriptMdFile,
      '1452',
      'fastify.preSerializationHookHandler<PreSerializationPayload,',
      'fastify.preSerializationHookHandler< PreSerializationPayload,',
    )

    // adding space for correct formatting
    await editLine(
      TypescriptMdFile,
      '1462',
      'fastify.onSendHookHandler<OnSendPayload,',
      'fastify.onSendHookHandler< OnSendPayload',
    )

    // fix `Could not parse expression with acorn` error
    await editLine(TypescriptMdFile, '1501', '{ path: string; prefix: string })', '\\{ path: string; prefix: string })')
  }
}

async function processGroupFour(versionNames) {
  for (const versionName of versionNames) {
    // adding required spacing between characters

    const TypescriptMdFile = join(versionName, 'Reference/TypeScript.md')
    await editLine(
      TypescriptMdFile,
      '1459',
      'fastify.preSerializationHookHandler<PreSerializationPayload,',
      'fastify.preSerializationHookHandler< PreSerializationPayload,',
    )

    // adding space for correct formatting
    await editLine(
      TypescriptMdFile,
      '1469',
      'fastify.onSendHookHandler<OnSendPayload,',
      'fastify.onSendHookHandler< OnSendPayload',
    )

    // fix `Could not parse expression with acorn` error
    await editLine(TypescriptMdFile, '1508', '{ path: string; prefix: string })', '\\{ path: string; prefix: string })')
  }
}

async function processGroupFive(versionNames) {
  for (const versionName of versionNames) {
    // adding required spacing between characters

    const TypescriptMdFile = join(versionName, 'Reference/TypeScript.md')
    await editLine(
      TypescriptMdFile,
      '1422',
      'fastify.preSerializationHookHandler<PreSerializationPayload,',
      'fastify.preSerializationHookHandler< PreSerializationPayload,',
    )

    // adding space for correct formatting
    await editLine(
      TypescriptMdFile,
      '1432',
      'fastify.onSendHookHandler<OnSendPayload,',
      'fastify.onSendHookHandler< OnSendPayload',
    )

    // fix `Could not parse expression with acorn` error
    await editLine(TypescriptMdFile, '1471', '{ path: string; prefix: string })', '\\{ path: string; prefix: string })')
  }
}

async function processGroupSix(dir) {
  // process version-v3.29.x/Documentation/Server.md
  await editLine(
    join(dir, 'version-v3.29.x/Reference/TypeScript.md'),
    '1412',
    'fastify.preSerializationHookHandler<PreSerializationPayload',
    'fastify.preSerializationHookHandler< PreSerializationPayload',
  )

  await editLine(
    join(dir, 'version-v3.29.x/Reference/TypeScript.md'),
    '1422',
    'fastify.onSendHookHandler<OnSendPayload,',
    'fastify.onSendHookHandler< OnSendPayload ,',
  )

  await editLine(
    join(dir, 'version-v3.29.x/Reference/TypeScript.md'),
    '1461',
    '{ path: string; prefix: string })',
    '\\{ path: string; prefix: string })',
  )

  // process version-v2.15.x/Documentation/Server.md
  await editLine(
    join(dir, 'version-v2.15.x/Documentation/Server.md'),
    '33',
    '</a> option is set.',
    '</a> \noption is set.',
  )

  // process version-v1.14.x/Documentation/Server.md
  await editLine(
    join(dir, 'version-v1.14.x/Documentation/Server.md'),
    '33',
    '</a> option is set.',
    '</a> \noption is set.',
  )
}

async function processDocusaurusV3Upgrade() {
  const webSiteRoot = path.resolve(__dirname, '..')
  const dir = join(webSiteRoot, 'versioned_docs')

  // global updates
  // adding spacing between <[ characters
  replace({
    regex: /<\[/g,
    replacement: '< [',
    paths: [dir],
    includes: join(dir, `*`),
    recursive: true,
    silent: false,
  })

  await process_v4_27_and_above([
    join(dir, 'version-v4.27.x'),
    join(dir, 'version-v4.28.x'),
    join(dir, 'version-latest'),
  ])

  let groupOnePaths = ['version-v4.26.x', 'version-v4.25.x', 'version-v4.24.x']
  groupOnePaths = groupOnePaths.map((path) => join(dir, path))
  await processGroupOne(groupOnePaths)

  let groupTwoPaths = ['version-v4.23.x', 'version-v4.22.x', 'version-v4.21.x', 'version-v4.20.x', 'version-v4.19.x']
  groupTwoPaths = groupTwoPaths.map((path) => join(dir, path))
  await processGroupTwo(groupTwoPaths)

  let groupThreePaths = [
    'version-v4.18.x',
    'version-v4.17.x',
    'version-v4.16.x',
    'version-v4.15.x',
    'version-v4.14.x',
    'version-v4.13.x',
    'version-v4.12.x',
    'version-v4.11.x',
    'version-v4.10.x',
    'version-v4.9.x',
    'version-v4.8.x',
    'version-v4.7.x',
    'version-v4.6.x',
  ]
  groupThreePaths = groupThreePaths.map((path) => join(dir, path))
  await processGroupThree(groupThreePaths)

  let groupFourPaths = ['version-v4.5.x', 'version-v4.4.x', 'version-v4.3.x', 'version-v4.2.x']
  groupFourPaths = groupFourPaths.map((path) => join(dir, path))
  await processGroupFour(groupFourPaths)

  let groupFivePaths = ['version-v4.1.x', 'version-v4.0.x']
  groupFivePaths = groupFivePaths.map((path) => join(dir, path))
  await processGroupFive(groupFivePaths)

  await processGroupSix(dir)

  console.log('Finished processing v3 updates')
}

processDocusaurusV3Upgrade()
