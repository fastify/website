import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import HomepageHeader from '@site/src/components/HomePageHeader/index.jsx'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section className="section">
          <div className="container content">
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
      </main>
    </Layout>
  )
}
