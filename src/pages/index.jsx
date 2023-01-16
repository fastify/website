import React, { useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageHeader from '@site/src/components/HomepageHeader/index'

import styles from './index.module.css'

import CodeBlock from '@theme/CodeBlock'
import CustomHighLight from '../components/CustomHighLight'
import QuickStartGuide from '@site/src/components/MDXComponents/QuickStartGuide/QuickStartGuide.mdx'
import QuickStartGuideWithAsyncAwait from '@site/src/components/MDXComponents/QuickStartGuide/QuickStartGuideWithAsyncAwait.mdx'
import ReqResHooks from '@site/src/components/MDXComponents/ReqResHooks/ReqResHooks.mdx'
import ReqResHooksWithAsyncAwait from '@site/src/components/MDXComponents/ReqResHooks/ReqResHooksWithAsyncAwait.mdx'
import TypeScriptSupport from '@site/src/components/MDXComponents/TypeScriptSupport/TypeScriptSupport.mdx'
import TypeScriptSupportWithAsyncAwait from '@site/src/components/MDXComponents/TypeScriptSupport/TypeScriptSupportWithAsyncAwait.mdx'
import Team from '../components/Team'
import Organisations from '../components/Organisations'
import plugins from '@site/static/generated/plugins.json'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  const [isToggled, setIsToggled] = useState(false)

  const ToggleSwitch = () => {
    const onToggle = () => setIsToggled(!isToggled)
    return (
      <label className={styles.toggleSwitch}>
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className={styles.switch} />
      </label>
    )
  }

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Why</h1>
                <p>
                  An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and
                  happy users. How can you efficiently handle the resources of your server, knowing that you are serving
                  the highest number of requests possible, without sacrificing security validations and handy
                  development?
                </p>
                <p>
                  Enter Fastify. Fastify is a web framework highly focused on providing the best developer experience
                  with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as
                  far as we know, it is one of the fastest web frameworks in town.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <h1>Who is using Fastify?</h1>
            <p>Fastify is proudly powering a large ecosystem of organisations and products out there.</p>
            <p>
              Discover <a href="/organisations">more organisations using Fastify</a>. Do you want your organisation to{' '}
              <a href="/organisations#how-to-be-featured">be featured here</a>?
            </p>
            <Organisations />
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Core features</h1>

                <p>These are the main features and principles on which fastify has been built:</p>

                <ul>
                  <li>
                    <strong>Highly performant:</strong> as far as we know, Fastify is one of the fastest web frameworks
                    in town, depending on the code complexity we can serve up to 30 thousand requests per second.
                  </li>
                  <li>
                    <strong>Extensible:</strong> Fastify is fully extensible via its hooks, plugins and decorators.
                  </li>
                  <li>
                    <strong>Schema based:</strong> even if it is not mandatory we recommend to use
                    <a href="http://json-schema.org/" target="_blank" rel="noreferrer">
                      JSON Schema
                    </a>
                    to validate your routes and serialize your outputs, internally Fastify compiles the schema in a
                    highly performant function.
                  </li>
                  <li>
                    <strong>Logging:</strong> logs are extremely important but are costly; we chose the best logger to
                    almost remove this cost,
                    <a href="https://github.com/pinojs/pino" target="_blank" rel="noreferrer">
                      Pino
                    </a>
                    !
                  </li>
                  <li>
                    <strong>Developer friendly:</strong> the framework is built to be very expressive and to help
                    developers in their daily use, without sacrificing performance and security.
                  </li>
                  <li>
                    <strong>TypeScript ready:</strong> we work hard to maintain a
                    <a href="https://www.typescriptlang.org/" aria-label="Link to TypeScript website">
                      TypeScript
                    </a>
                    type declaration file so we can support the growing TypeScript community.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Quick start</h1>
                <p>Get fastify with NPM:</p>
                <CodeBlock className="language-bash">{'npm install fastify'}</CodeBlock>
                <p>
                  Then create <CustomHighLight text={'server.js'} /> and add the following content:
                </p>
                <div className="flex justify-end">
                  <span>async/await</span> <ToggleSwitch />
                </div>
                {isToggled ? <QuickStartGuideWithAsyncAwait /> : <QuickStartGuide />}
                <p>Finally, launch the server with:</p>
                <CodeBlock className="language-bash">{'node server'}</CodeBlock>
                <p>and you can test it with:</p>
                <CodeBlock className="language-bash">{'curl http://localhost:3000'}</CodeBlock>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Using CLI</h1>
                <p>Get fastify-cli with NPM:</p>
                <CodeBlock className="language-bash">{'npm install --global fastify-cli'}</CodeBlock>
                <p>Then scaffold a new project with:</p>
                Of course, Fastify can do much more than this.
                <CodeBlock className="language-bash">{'fastify generate myproject'}</CodeBlock>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Request/Response validation and hooks</h1>
                <p>Of course, Fastify can do much more than this.</p>
                <p>
                  For example, you can easily provide input and output validation using JSON Schema and perform specific
                  operations before the handler is executed:
                </p>
                <div className="flex justify-end">
                  <span>async/await</span> <ToggleSwitch />
                </div>
                {isToggled ? <ReqResHooksWithAsyncAwait /> : <ReqResHooks />}
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">TypeScript Support</h1>
                <p>
                  Fastify is shipped with a typings file, but you may need to install
                  <CustomHighLight text={'@types/node'} />, depending on the Node.js version you are using.
                </p>
                <p>The following example creates a http server.</p>
                <p>We pass the relevant typings for our http version used.</p>
                <p>By passing types we get correctly typed access to the underlying http objects in routes.</p>
                <p>
                  If using http2 we&#39;d pass
                  <CustomHighLight text={'<http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>'} />.
                </p>
                <p>
                  For https pass <CustomHighLight text={'http2.Http2SecureServer'} />
                  or <CustomHighLight text={'http.SecureServer'} /> instead of Server.
                </p>
                <p>
                  This ensures within the server handler we also get <CustomHighLight text={'http.ServerResponse'} />
                  with correct typings on <CustomHighLight text={'reply.res'} />.
                </p>
                <div className="flex justify-end">
                  <span>async/await</span> <ToggleSwitch />
                </div>
                {isToggled ? <TypeScriptSupportWithAsyncAwait /> : <TypeScriptSupport />}

                <p>
                  Visit the
                  <a href="https://www.fastify.io/docs/latest" aria-label="Documentation">
                    Documentation
                  </a>
                  to learn more about all the features that Fastify has to offer.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className={styles.responsiveContainer}>
              <div>
                <h1 className="title">A fast web framework</h1>
                <p>
                  Leveraging our experience with Node.js performance, Fastify has been built from the ground up to be
                  <strong>&nbsp;as fast as possible</strong>. Have a look at our
                  <a href="/benchmarks">&nbsp;benchmarks section</a> to compare fastify performance to other common web
                  frameworks.
                </p>
                <a href="/benchmarks" class="button button--lg button--primary">
                  Check out our benchmarks
                </a>
              </div>
              <div className="spacer"></div>
              <div>
                <h1 className="title">Ecosystem</h1>
                <p>
                  Fastify has an ever-growing ecosystem of plugins. Probably there is already a plugin for your
                  favourite database or template language. Have a look at the <a href="/ecosystem">Ecosystem page</a> to
                  navigate through the currently available plugins. Can&#39;t you find the plugin you are looking for?
                  No problem, <a href="/docs/master/Plugins">it&#39;s very easy to write one</a>!
                </p>
                <a href="/ecosystem" className="button button--lg button--primary">
                  Explore {plugins.corePlugins.length + plugins.communityPlugins.length} plugins
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="section team">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">The team</h1>
                <p>In alphabetical order</p>
                <Team />
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <div className={styles.responsiveContainer}>
              <div>
                <h1 className="title">Acknowledgments</h1>
                <p>
                  This project is kindly
                  <strong>&nbsp;sponsored by</strong>:
                </p>
                <ul>
                  <li>
                    <a>NearForm</a>
                  </li>
                  <li>
                    <a>Platformatic</a>
                  </li>
                </ul>
                <p>Past Sponsors:</p>
                <ul>
                  <li>
                    <a>LetzDoIt</a>
                  </li>
                  <li>
                    <a>Microsoft</a>
                  </li>
                </ul>
                <p>Also thanks to:</p>
                <ul>
                  <li>
                    <a>The amazing Fastify community</a>
                  </li>
                </ul>
              </div>
              <div className="spacer"></div>
              <div>
                <h1 className="title">Hosted by</h1>
                <p>
                  We are an At Large project at the
                  <a href="https://openjsf.org/">&nbsp;OpenJS Foundation</a>
                </p>
                <a href="https://openjsf.org/" target="_blank" rel="noreferrer">
                  <img id="openjs-logo" src="/img/logos/openjsf.svg" alt="OpenJS Logo" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
