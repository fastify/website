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
      </main>
    </Layout>
  )
}
