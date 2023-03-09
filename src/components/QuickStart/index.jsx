import React from 'react'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import CodeBlock from '@theme/CodeBlock'

export default function QuickStart({ esm, cjs }) {
  return (
    <>
      <h1>Quick start</h1>
      <p>Get fastify with NPM:</p>

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

      <p>and you can test it with:</p>
      <CodeBlock language="bash">curl http://localhost:3000</CodeBlock>
    </>
  )
}
