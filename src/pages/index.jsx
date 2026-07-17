import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'

import HomepageHeader from '@site/src/components/HomePageHeader/index.jsx'
import Organizations from '@site/src/components/Organizations'
import Team from '@site/src/components/Team'
import QuickStart from '@site/src/components/QuickStart'
import Heading from '@theme/Heading'
import CoreFeatures from '@site/src/components/CoreFeatures'

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
            <Heading as={'h1'}>Who is using Fastify?</Heading>
            <p>
              Fastify is proudly powering a large ecosystem of organizations and products out there with over{' '}
              <Link to={'https://npm-stat.com/charts.html?package=fastify'}>10 million downloads per month</Link>.{' '}
              <Link to="/organizations">Checkout our affiliate companies.</Link>
            </p>
          </div>

          <div className="container">
            <div className="alternate-sponsors h-full">
              <Heading as={'h3'}>Sponsors</Heading>
              <p>
                Would you like to sponsor Fastify financially? Support us on{' '}
                <Link to="https://github.com/sponsors/fastify">GitHub</Link> or{' '}
                <Link to="https://opencollective.com/fastify">Open Collective</Link>.
              </p>
              <Organizations displayType={'sponsor'} />
            </div>
          </div>
        </section>

        <section className="section alternate pattern-section">
          <div className="container">
            <Heading as={'h1'}>Core features</Heading>
            <p>These are the main features and principles on which Fastify has been built:</p>
            <CoreFeatures />
          </div>
        </section>

        <section className="section" id="quickstart">
          <div className="container">
            <QuickStart />
          </div>
        </section>

        <section className="section alternate pattern-section">
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <Heading as={'h1'}>A fast web framework</Heading>
                <p>
                  Leveraging our experience with Node.js performance, Fastify has been built from the ground up to be{' '}
                  <strong>as fast as possible</strong>. Have a look at our{' '}
                  <Link to="/benchmarks">benchmarks section</Link> to compare Fastify performance to other common web
                  frameworks.
                </p>
                <p>
                  <Link to="/benchmarks" className="button button--lg button--primary">
                    Check out our benchmarks
                  </Link>
                </p>
              </div>
              <div className="col col--6">
                <Heading as={'h1'}>Ecosystem</Heading>
                <p>
                  Fastify has an ever-growing ecosystem of plugins. There is probably already a plugin for your favorite
                  database or template language. Have a look at the <Link to="/ecosystem">Ecosystem page</Link> to
                  navigate through the currently available plugins. Can&#39;t you find the plugin you are looking for?
                  No problem, <Link to="/docs/latest/Reference/Plugins">it&#39;s very easy to write one</Link>!
                </p>
                <p>
                  <Link to="/ecosystem" className="button button--lg button--primary">
                    Explore {plugins.corePlugins.length + plugins.communityPlugins.length} plugins
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Heading as={'h1'}>Meet The Team</Heading>
            <p>
              <i>In alphabetical order</i>
            </p>
            <Team />
          </div>
        </section>

        <section className="section alternate pattern-section">
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <Heading as={'h1'}>Acknowledgments</Heading>
                <p>
                  This project is kindly <strong>sponsored by</strong>:
                </p>
                <ul>
                  <li>
                    <Link to="https://nearform.com/">Nearform</Link>
                  </li>
                  <li>
                    <Link to="https://platformatic.dev/">Platformatic</Link>
                  </li>
                </ul>
                <p>Past Sponsors:</p>
                <ul>
                  <li>
                    <Link to="http://www.letzdoitapp.com/">LetzDoIt</Link>
                  </li>
                  <li>
                    <Link to="https://opensource.microsoft.com/">Microsoft</Link>
                  </li>
                </ul>
                <p>Also thanks to:</p>
                <ul>
                  <li>
                    <Link to="https://github.com/fastify/fastify/graphs/contributors">
                      The <strong>amazing</strong> Fastify community
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col col--6">
                <Heading as={'Heading'}>Hosted by</Heading>
                <p>
                  We are an <strong>At Large project</strong> at the{' '}
                  <Link to="https://openjsf.org/">OpenJS Foundation</Link>
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
