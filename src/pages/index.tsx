import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <h1 className="hero__title">{siteConfig.title}</h1>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/docs/intro">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Head>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Head>
      <main>
        <div
          className="hero"
          style={{ backgroundImage: "/img/bg-pattern-dark.png" }}
        >
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                <img
                  className="logo"
                  src="/img/fastify-logo-white.png"
                  alt="Fastify"
                />
              </h1>
              <h2 className="subtitle">
                Fast and low overhead web framework, for Node.js
              </h2>
              <div className="github-buttons">
                <a
                  className="github-button"
                  href="https://github.com/fastify/fastify"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star fastify/fastify on GitHub"
                >
                  Star
                </a>
                <a
                  className="github-button"
                  href="https://github.com/fastify/fastify/fork"
                  data-icon="octicon-repo-forked"
                  data-size="large"
                  aria-label="Fork fastify/fastify on GitHub"
                >
                  Fork
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Why</h1>
                <p>
                  An efficient server implies a lower cost of the
                  infrastructure, a better responsiveness under load and happy
                  users. How can you efficiently handle the resources of your
                  server, knowing that you are serving the highest number of
                  requests possible, without sacrificing security validations
                  and handy development?
                </p>
                <p>
                  Enter Fastify. Fastify is a web framework highly focused on
                  providing the best developer experience with the least
                  overhead and a powerful plugin architecture. It is inspired by
                  Hapi and Express and as far as we know, it is one of the
                  fastest web frameworks in town.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Who is using Fastify?</h1>
                <p>
                  Fastify is proudly powering a large ecosystem of organisations
                  and products out there.
                </p>
                <p>
                  Discover{" "}
                  <a href="/organisations">more organisations using Fastify</a>.
                  Do you want your organisation to{" "}
                  <a href="/organisations#how-to-be-featured">
                    be featured here
                  </a>
                  ?
                </p>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-12">
                <ul className="organisations-list">
                  {/* {% set shuffledOrganisations = data.organisations | shuffle %}
          {% for organizationIndex in range(0, 12) %}
            {% set organization = shuffledOrganisations[organizationIndex] %}
            {% if organization %}
            <li>
              <a href="{{ organization.link }}" target="_blank" rel="noopener" rel="nofollow">
                <img src="/{{ hashes['images/organisations/' + organization.image] }}" alt="{{ organization.name }} is using Fastify"/>
              </a>
            </li>
            {% endif %}
          {% endfor %} */}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section alternate">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Core features</h1>

                <p>
                  These are the main features and principles on which fastify
                  has been built:
                </p>

                <ul>
                  <li>
                    <strong>Highly performant:</strong> as far as we know,
                    Fastify is one of the fastest web frameworks in town,
                    depending on the code complexity we can serve up to 30
                    thousand requests per second.
                  </li>
                  <li>
                    <strong>Extensible:</strong> Fastify is fully extensible via
                    its hooks, plugins and decorators.
                  </li>
                  <li>
                    <strong>Schema based:</strong> even if it is not mandatory
                    we recommend to use{" "}
                    <a
                      href="http://json-schema.org/"
                      target="_blank"
                      rel="noopener"
                    >
                      JSON Schema
                    </a>{" "}
                    to validate your routes and serialize your outputs,
                    internally Fastify compiles the schema in a highly
                    performant function.
                  </li>
                  <li>
                    <strong>Logging:</strong> logs are extremely important but
                    are costly; we chose the best logger to almost remove this
                    cost,{" "}
                    <a
                      href="https://github.com/pinojs/pino"
                      target="_blank"
                      rel="noopener"
                    >
                      Pino
                    </a>
                    !
                  </li>
                  <li>
                    <strong>Developer friendly:</strong> the framework is built
                    to be very expressive and to help developers in their daily
                    use, without sacrificing performance and security.
                  </li>
                  <li>
                    <strong>TypeScript ready:</strong> we work hard to maintain
                    a{" "}
                    <a
                      href="https://www.typescriptlang.org/"
                      aria-label="Link to TypeScript website"
                    >
                      TypeScript
                    </a>{" "}
                    type declaration file so we can support the growing
                    TypeScript community.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="columns">
              <div className="column is-6">
                <h1 className="title">A fast web framework</h1>
                <p>
                  Leveraging our experience with Node.js performance, Fastify
                  has been built from the ground up to be{" "}
                  <strong>as fast as possible</strong>. Have a look at our{" "}
                  <a href="/benchmarks">benchmarks section</a> to compare
                  fastify performance to other common web frameworks.
                </p>
                <div className="block">
                  <p>
                    <a
                      className="button is-primary is-large is-flex-mobile"
                      href="/benchmarks"
                    >
                      Check out our benchmarks
                    </a>
                  </p>
                </div>
              </div>
              <div className="column is-6">
                <h1 className="title">Ecosystem</h1>
                <p>
                  Fastify has an ever-growing ecosystem of plugins. Probably
                  there is already a plugin for your favourite database or
                  template language. Have a look at the{" "}
                  <a href="/ecosystem">Ecosystem page</a> to navigate through
                  the currently available plugins. Can't you find the plugin you
                  are looking for? No problem,{" "}
                  <a href="/docs/master/Plugins">it's very easy to write one</a>
                  !
                </p>
                <div className="block">
                  {/* <!-- TAG: "Changed the statement to count plugins" --> */}
                  {/* <a className="button is-primary is-large is-flex-mobile" href="/ecosystem">Explore {{ data.ecosystem.plugins.corePlugins | length + data.ecosystem.plugins.communityPlugins | length }} plugins</a> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-6">
                <h1 className="title">Acknowledgments</h1>
                <p>
                  This project is kindly <strong>sponsored by</strong>:
                </p>
                <ul>
                  {/* {% for link in data.acknowledgements.sponsors %}
            <li>
              <a href="{{ link.url }}" target="_blank" rel="noopener">{{ link.name }}</a>
            </li>
          {% endfor %} */}
                </ul>
                <p>Past Sponsors:</p>
                <ul>
                  {/* {% for link in data.acknowledgements.past_sponsors %}
            <li>
              <a href="{{ link.url }}" target="_blank" rel="noopener">{{ link.name }}</a>{% if link.reason %} ({{ link.reason }}){% endif %}
            </li>
          {% endfor %} */}
                </ul>
                <p>Also thanks to:</p>
                <ul>
                  {/* {% for link in data.acknowledgements.others %}
            <li>
              <a href="{{ link.url }}" target="_blank" rel="noopener">{{ link.name }}</a>{% if link.reason %} ({{ link.reason }}){% endif %}
            </li>
          {% endfor %} */}
                </ul>
              </div>
              <div className="column is-6">
                <h1 className="title">Hosted by</h1>
                <p>
                  We are an At Large project at the{" "}
                  <a href="https://openjsf.org/" target="_blank" rel="noopener">
                    OpenJS Foundation
                  </a>
                  .
                </p>
                <p>
                  <a href="https://openjsf.org/" target="_blank" rel="noopener">
                    <img
                      id="openjs-logo"
                      src="/{{ hashes['images/openjsf-knockout.svg'] }}"
                      alt="OpenJS Logo"
                    />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
