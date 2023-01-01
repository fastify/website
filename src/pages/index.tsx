import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageHeader from "@site/src/components/ui/HomepageHeader/index";
import { organizations } from "../utils/constants/organisations";
import styles from "./index.module.css";
import CodeBlock from "@theme/CodeBlock";
import CustomHighLight from "../components/ui/CustomHighLight";
import QuickStartGuide from "@site/src/components/MDXComponents/QuickStartGuide.mdx";
import ReqResHooks from "@site/src/components/MDXComponents/ReqResHooks.mdx";
import TypeScriptSupport from "@site/src/components/MDXComponents/TypeScriptSupport.mdx";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
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
                <ul className={styles.organisationsList}>
                  {organizations.map((organization) => (
                    <li>
                      <a
                        href={organization.link}
                        target="_blank"
                        rel="noopener nofollow"
                      >
                        <img
                          src={`/img/organisations/${organization.image}`}
                          alt={`${organization.name} is using Fastify`}
                        />
                      </a>
                    </li>
                  ))}
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
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Quick start</h1>
                <p>Get fastify with NPM:</p>
                <CodeBlock className="language-bash">
                  {"npm install fastify"}
                </CodeBlock>
                <p>
                  Then create <CustomHighLight text={"server.js"} /> and add the
                  following content:
                </p>

                <QuickStartGuide />
                <p>Finally, launch the server with:</p>
                <CodeBlock className="language-bash">{"node server"}</CodeBlock>
                <p>and you can test it with:</p>
                <CodeBlock className="language-bash">
                  {"curl http://localhost:3000"}
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Using CLI</h1>
                <p>Get fastify-cli with NPM:</p>
                <CodeBlock className="language-bash">
                  {"npm install --global fastify-cli"}
                </CodeBlock>
                <p>Then scaffold a new project with:</p>
                Of course, Fastify can do much more than this.
                <CodeBlock className="language-bash">
                  {"fastify generate myproject"}
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">Request/Response validation and hooks</h1>
                <p>Of course, Fastify can do much more than this.</p>
                <p>
                  For example, you can easily provide input and output
                  validation using JSON Schema and perform specific operations
                  before the handler is executed:
                </p>

                <ReqResHooks />
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="columns is-centered">
              <div className="column is-12">
                <h1 className="title">TypeScript Support</h1>
                <p>
                  Fastify is shipped with a typings file, but you may need to
                  install <CustomHighLight text={"@types/node"} />, depending on
                  the Node.js version you are using.
                </p>
                <p>The following example creates a http server.</p>
                <p>We pass the relevant typings for our http version used.</p>
                <p>
                  By passing types we get correctly typed access to the
                  underlying http objects in routes.
                </p>
                <p>
                  If using http2 we'd pass{" "}
                  <CustomHighLight
                    text={
                      "<http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>"
                    }
                  />
                  .
                </p>
                <p>
                  For https pass{" "}
                  <CustomHighLight text={"http2.Http2SecureServer"} />
                  or <CustomHighLight text={"http.SecureServer"} /> instead of
                  Server.
                </p>
                <p>
                  This ensures within the server handler we also get{" "}
                  <CustomHighLight text={"http.ServerResponse"} /> with correct
                  typings on <CustomHighLight text={"reply.res"} />.
                </p>
                <TypeScriptSupport />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
