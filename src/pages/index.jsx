import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'

import HomepageHeader from '@site/src/components/HomePageHeader/index.jsx'
import Organisations from '../components/Organisations'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={siteConfig.tagline} description={siteConfig.tagline}>
      <HomepageHeader />

      <main>
        <section className="section">
          <div className="container">
            <h1>Why</h1>
            <p>
              An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and
              happy users. How can you efficiently handle the resources of your server, knowing that you are serving the
              highest number of requests possible, without sacrificing security validations and handy development?
            </p>
            <p>
              Enter Fastify. Fastify is a web framework highly focused on providing the best developer experience with
              the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we
              know, it is one of the fastest web frameworks in town.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h1>Who is using Fastify?</h1>
            <p>Fastify is proudly powering a large ecosystem of organisations and products out there.</p>
            <p>
              Discover <Link to="/organisations">more organisations using Fastify</Link>. Do you want your organisation
              to <Link to="/organisations#how-to-be-featured-here">be featured here</Link>?
            </p>
            <Organisations maxItems={12} />
          </div>
        </section>
        <section className="section">
          <div className="container content">
            <h1 className="title">Core features</h1>
            <p>These are the main features and principles on which fastify has been built:</p>
            <ul>
              <li>
                <strong>Highly performant:</strong> as far as we know, Fastify is one of the fastest web frameworks in
                town, depending on the code complexity we can serve up to 30 thousand requests per second.
              </li>
              <li>
                <strong>Extensible:</strong> Fastify is fully extensible via its hooks, plugins and decorators.
              </li>
              <li>
                <strong>Schema based:</strong> even if it is not mandatory we recommend to use{' '}
                <Link to="http://json-schema.org/">JSON Schema</Link> to validate your routes and serialize your
                outputs, internally Fastify compiles the schema in a highly performant function.
              </li>
              <li>
                <strong>Logging:</strong> logs are extremely important but are costly; we chose the best logger to
                almost remove this cost, <Link to="https://github.com/pinojs/pino">Pino</Link>!
              </li>
              <li>
                <strong>Developer friendly:</strong> the framework is built to be very expressive and to help developers
                in their daily use, without sacrificing performance and security.
              </li>
              <li>
                <strong>TypeScript ready:</strong> we work hard to maintain a{' '}
                <Link to="https://www.typescriptlang.org/">TypeScript</Link> type declaration file so we can support the
                growing TypeScript community.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  )
}
