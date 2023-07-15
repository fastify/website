import React from 'react'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import CodeBlock from '@theme/CodeBlock'
import Link from '@docusaurus/Link'

export default function QuickStart() {
  const esm = `// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}`

  const cjs = `// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Declare a route
fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})`

  const exampleRequestResponseEsm = `import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a \`name\` parameter
    querystring: {
      type: 'object',
      properties: {
          name: { type: 'string'}
      },
      required: ['name'],
    },
    // the response needs to be an object with an \`hello\` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    return { hello: 'world' }
  }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}`

  const exampleRequestResponseCjs = `const fastify = require('fastify')({ logger: true })

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a \`name\` parameter
    querystring: {
      type: 'object',
      properties: {
          name: { type: 'string'}
      },
      required: ['name'],
    },
    // the response needs to be an object with an \`hello\` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: (request, reply, done) => {
    // E.g. check authentication
    done()
  },
  handler: (request, reply) => {
    reply.send({ hello: 'world' })
  }
})

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})`

  const typescript = `import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}

server.get('/ping', opts, async (request, reply) => {
  return { pong: 'it worked!' }
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()`

  return (
    <>
      <h1>Quick start</h1>
      <p>Get Fastify with NPM:</p>

      <CodeBlock language="bash">npm install fastify</CodeBlock>
      <p>
        Then create <code>server.js</code> and add the following content:
      </p>
      <Tabs>
        <TabItem value="esm" label="ESM">
          <CodeBlock language="js">{esm}</CodeBlock>
        </TabItem>
        <TabItem value="cjs" label="CJS">
          <CodeBlock language="js">{cjs}</CodeBlock>
        </TabItem>
      </Tabs>

      <p>Finally, launch the server with:</p>
      <CodeBlock language="bash">node server</CodeBlock>

      <p>and test it with:</p>
      <CodeBlock language="bash">curl http://localhost:3000</CodeBlock>

      <h2>Using CLI</h2>
      <p>
        Get the{' '}
        <Link to="https://github.com/fastify/fastify-cli">
          <code>fastify-cli</code>
        </Link>{' '}
        to create a new scaffolding project:
      </p>

      <CodeBlock language="bash">
        npm install --global fastify-cli
        <br />
        fastify generate myproject
      </CodeBlock>

      <h2>Request/Response validation and hooks</h2>
      <p>
        Fastify can do much more than this. For example, you can easily provide input and output validation using JSON
        Schema and perform specific operations before the handler is executed:
      </p>
      <Tabs>
        <TabItem value="esm" label="ESM">
          <CodeBlock language="js">{exampleRequestResponseEsm}</CodeBlock>
        </TabItem>
        <TabItem value="cjs" label="CJS">
          <CodeBlock language="js">{exampleRequestResponseCjs}</CodeBlock>
        </TabItem>
      </Tabs>

      <h2>TypeScript Support</h2>
      <p>
        Fastify is shipped with a typings file, but you may need to install <code>@types/node</code>, depending on the
        Node.js version you are using.
        <br />
        The following example creates a http server.
        <br />
        We pass the relevant typings for our http version used. By passing types we get correctly typed access to the
        underlying http objects in routes.
        <br />
        If using http2 we would pass{' '}
        <code>&lt;http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse&gt;</code>.
        <br />
        For https pass <code>http2.Http2SecureServer</code> or <code>http.SecureServer</code> instead of Server.
        <br />
        This ensures within the server handler we also get <code>http.ServerResponse</code> with correct typings on{' '}
        <code>reply.res</code>.
      </p>
      <Tabs>
        <TabItem value="esm" label="TypeScript">
          <CodeBlock language="js">{typescript}</CodeBlock>
        </TabItem>
      </Tabs>
      <p>
        Visit the <Link to="/docs/latest">Documentation</Link> to learn more about all the features that Fastify has to
        offer.
      </p>
    </>
  )
}
