import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'

import HomepageHeader from '@site/src/components/HomePageHeader/index.jsx'
import Organisations from '@site/src/components/Organisations'
import Team from '@site/src/components/Team'

import plugins from '@site/static/generated/plugins.json'
import styles from '@site/src/css/index.module.css'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={siteConfig.tagline} description={siteConfig.tagline}>
      <HomepageHeader />

      <main>
        <section className="section">
          <div className="container">
            <h1>
              <Translate>Why</Translate>
            </h1>
            <p>
              <Translate>
                An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and
                happy users. How can you efficiently handle the resources of your server, knowing that you are serving
                the highest number of requests possible, without sacrificing security validations and handy development?
              </Translate>
            </p>
            <p>
              <Translate>
                Enter Fastify. Fastify is a web framework highly focused on providing the best developer experience with
                the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as
                we know, it is one of the fastest web frameworks in town.
              </Translate>
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h1>
              <Translate>Who is using Fastify?</Translate>
            </h1>
            <p>
              <Translate>
                Fastify is proudly powering a large ecosystem of organisations and products out there.
              </Translate>
            </p>
            <p>
              <Translate>Discover </Translate>
              <Link to="/organisations">
                <Translate>more organisations using Fastify.</Translate>
              </Link>
              <Translate> Do you want your organisation to </Translate>
              <Link to="/organisations#how-to-be-featured-here">
                <Translate>be featured here?</Translate>
              </Link>
            </p>
            <Organisations maxItems={12} />
          </div>
        </section>

        <section className="section alternate">
          <div className="container">
            <h1>
              <Translate>Core features</Translate>
            </h1>
            <p>
              <Translate>These are the main features and principles on which fastify has been built:</Translate>
            </p>
            <ul>
              <li>
                <strong>
                  {' '}
                  <Translate>Highly performant: </Translate>
                </strong>{' '}
                <Translate>
                  as far as we know, Fastify is one of the fastest web frameworks in town, depending on the code
                  complexity we can serve up to 30 thousand requests per second.
                </Translate>
              </li>
              <li>
                <strong>
                  {' '}
                  <Translate>Extensible: </Translate>
                </strong>{' '}
                <Translate>Fastify is fully extensible via its hooks, plugins and decorators.</Translate>
              </li>
              <li>
                <strong>
                  {' '}
                  <Translate>Schema based: </Translate>
                </strong>{' '}
                <Translate>even if it is not mandatory we recommend to use</Translate>
                <Link to="http://json-schema.org/">
                  <Translate>JSON Schema</Translate>
                </Link>{' '}
                <Translate>
                  to validate your routes and serialize your outputs, internally Fastify compiles the schema in a highly
                  performant function.
                </Translate>
              </li>
              <li>
                <strong>
                  {' '}
                  <Translate>Logging: </Translate>
                </strong>{' '}
                <Translate>
                  logs are extremely important but are costly; we chose the best logger to almost remove this cost,
                </Translate>{' '}
                <Link to="https://github.com/pinojs/pino">
                  <Translate>Pino !</Translate>
                </Link>
              </li>
              <li>
                <strong>
                  {' '}
                  <Translate>Developer friendly: </Translate>
                </strong>{' '}
                <Translate>
                  the framework is built to be very expressive and to help developers in their daily use, without
                  sacrificing performance and security.
                </Translate>
              </li>
              <li>
                <strong>
                  {' '}
                  <Translate>TypeScript ready: </Translate>
                </strong>{' '}
                <Translate>we work hard to maintain a </Translate>
                <Link to="https://www.typescriptlang.org/">
                  {' '}
                  <Translate>TypeScript</Translate>
                </Link>{' '}
                <Translate>type declaration file so we can support the growing TypeScript community.</Translate>
              </li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h1>
              <Translate>Quick start</Translate>
            </h1>
            <p>
              <Translate>TODO</Translate>
            </p>
          </div>
        </section>

        <section className="section alternate">
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <h1>
                  <Translate>A fast web framework</Translate>
                </h1>
                <p>
                  <Translate>
                    Leveraging our experience with Node.js performance, Fastify has been built from the ground up to be
                  </Translate>{' '}
                  <strong>
                    {' '}
                    <Translate>as fast as possible </Translate>
                  </strong>
                  <Translate>. Have a look at our </Translate>
                  <Link to="/benchmarks">
                    <Translate>benchmarks section</Translate>
                  </Link>{' '}
                  <Translate>to compare fastify performance to other common web frameworks.</Translate>
                </p>
                <p>
                  <Link to="/benchmarks" className="button button--lg button--primary">
                    <Translate>Check out our benchmarks</Translate>
                  </Link>
                </p>
              </div>
              <div className="col col--6">
                <h1>
                  <Translate>Ecosystem</Translate>
                </h1>
                <p>
                  <Translate>
                    Fastify has an ever-growing ecosystem of plugins. Probably there is already a plugin for your
                    favourite database or template language. Have a look at the
                  </Translate>{' '}
                  <Link to="/ecosystem">
                    {' '}
                    <Translate>Ecosystem page </Translate>
                  </Link>{' '}
                  <Translate>
                    to navigate through the currently available plugins. Can&#39;t you find the plugin you are looking
                    for? No problem,
                  </Translate>{' '}
                  <Link to="/docs/latest/Reference/Plugins">
                    {' '}
                    <Translate>it&#39;s very easy to write one !</Translate>
                  </Link>
                </p>
                <p>
                  <Link to="/ecosystem" className="button button--lg button--primary">
                    <Translate> Explore </Translate>
                    {plugins.corePlugins.length + plugins.communityPlugins.length} <Translate>plugins</Translate>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h1>
              <Translate>Meet The Team</Translate>
            </h1>
            <p>
              <i>
                {' '}
                <Translate>In alphabetical order </Translate>
              </i>
            </p>
            <Team />
          </div>
        </section>

        <section className="section alternate">
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <h1>
                  <Translate>Acknowledgments</Translate>
                </h1>
                <p>
                  <Translate>This project is kindly</Translate>{' '}
                  <strong>
                    {' '}
                    <Translate>sponsored by :</Translate>
                  </strong>
                </p>
                <ul>
                  <li>
                    <Link to="https://nearform.com/">
                      {' '}
                      <Translate>NearForm </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://platformatic.dev/">
                      {' '}
                      <Translate>Platformatic</Translate>
                    </Link>
                  </li>
                </ul>
                <p>
                  <Translate>Past Sponsors:</Translate>
                </p>
                <ul>
                  <li>
                    <Link to="http://www.letzdoitapp.com/">
                      <Translate>LetzDoIt</Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://opensource.microsoft.com/">
                      <Translate>Microsoft</Translate>
                    </Link>
                  </li>
                </ul>
                <p>
                  <Translate>Also thanks to:</Translate>
                </p>
                <ul>
                  <li>
                    <Link to="https://github.com/fastify/fastify/graphs/contributors">
                      <Translate>The </Translate>
                      <strong>
                        {' '}
                        <Translate>amazing </Translate>
                      </strong>{' '}
                      <Translate>Fastify community</Translate>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col col--6">
                <h1>
                  <Translate>Hosted by</Translate>
                </h1>
                <p>
                  <Translate>We are an </Translate>{' '}
                  <strong>
                    {' '}
                    <Translate>At Large project </Translate>
                  </strong>{' '}
                  <Translate> at the </Translate>{' '}
                  <Link to="https://openjsf.org/">
                    <Translate>OpenJS Foundation </Translate>
                  </Link>
                </p>
                <p>
                  <Link to="https://openjsf.org/">
                    <img src={useBaseUrl(`/img/logos/openjsf.svg`)} alt="OpenJS Logo" className={styles.openJsLogo} />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <br />
      </main>
    </Layout>
  )
}
