'use strict'

const { join } = require('node:path')
const replace = require('replace')

function processDocusaurusV3Upgrade(dir) {
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

  // In case of errors, just check what is wrong with this playground:
  // https://mdxjs.com/playground/
  const edits = [
    {
      inFile: 'TypeScript.md',
      from: 'fastify.preSerializationHookHandler<PreSerializationPayload',
      to: 'fastify.preSerializationHookHandler< PreSerializationPayload',
    },

    {
      inFile: 'TypeScript.md',
      from: 'fastify.onSendHookHandler<OnSendPayload',
      to: 'fastify.onSendHookHandler< OnSendPayload',
    },

    {
      inFile: 'TypeScript.md',
      from: '& { path: string; prefix',
      to: '& \\{ path: string; prefix',
    },

    {
      inFile: 'Server.md',
      from: '</a> option is set.',
      to: '</a> \noption is set.',
    },
  ]

  for (const edit of edits) {
    replace({
      paths: [dir],
      regex: edit.from,
      replacement: edit.to,
      includes: edit.inFile,
      recursive: true,
      silent: false,
    })
  }
}

module.exports = processDocusaurusV3Upgrade
