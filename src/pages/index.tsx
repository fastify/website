import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageHeader from "@site/src/components/ui/HomepageHeader/index";
import { organizations } from "../utils/data/organisations";
import { team } from "../utils/data/team";
import styles from "./index.module.css";
import CodeBlock from "@theme/CodeBlock";
import CustomHighLight from "../components/CustomHighLight";
import QuickStartGuide from "@site/src/components/MDXComponents/QuickStartGuide/QuickStartGuide.mdx";
import QuickStartGuideWithAsyncAwait from "@site/src/components/MDXComponents/QuickStartGuide/QuickStartGuideWithAsyncAwait.mdx";
import ReqResHooks from "@site/src/components/MDXComponents/ReqResHooks.mdx";
import TypeScriptSupport from "@site/src/components/MDXComponents/TypeScriptSupport.mdx";
import Button from "@site/src/components/Button/index.js";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [isToggled, setIsToggled] = useState(false);
  const svgicons = {
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -4 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
        className="icon__icon twitter"
      >
        <path
          fill="currentColor"
          d="M20 1.907a8.292 8.292 0 0 1-2.356.637A4.07 4.07 0 0 0 19.448.31a8.349 8.349 0 0 1-2.607.98A4.12 4.12 0 0 0 13.846.015c-2.266 0-4.103 1.81-4.103 4.04 0 .316.036.625.106.92A11.708 11.708 0 0 1 1.393.754a3.964 3.964 0 0 0-.554 2.03c0 1.403.724 2.64 1.824 3.363A4.151 4.151 0 0 1 .805 5.64v.05c0 1.958 1.415 3.591 3.29 3.963a4.216 4.216 0 0 1-1.08.141c-.265 0-.522-.025-.773-.075a4.098 4.098 0 0 0 3.832 2.807 8.312 8.312 0 0 1-5.095 1.727c-.332 0-.658-.02-.979-.056a11.727 11.727 0 0 0 6.289 1.818c7.547 0 11.673-6.157 11.673-11.496l-.014-.523A8.126 8.126 0 0 0 20 1.907z"
        ></path>
      </svg>
    ),
    npm: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
        className="icon__icon npm"
      >
        <path
          fill="currentColor"
          d="m11.993645 4.3033562h-7.7839999v15.7031878h7.7831879v-11.7431878h3.96v11.7431878h3.96v-15.7031878zm-9.9319999-2.148h19.9999999v19.9999998h-19.9999999z"
        ></path>
      </svg>
    ),
    github: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -2 24 24"
        width="24"
        height="24"
        preserveAspectRatio="xMinYMin"
        className="icon__icon github"
      >
        <path
          fill="currentColor"
          d="M18.88 1.099C18.147.366 17.265 0 16.233 0H3.746C2.714 0 1.832.366 1.099 1.099.366 1.832 0 2.714 0 3.746v12.487c0 1.032.366 1.914 1.099 2.647.733.733 1.615 1.099 2.647 1.099H6.66c.19 0 .333-.007.429-.02a.504.504 0 0 0 .286-.169c.095-.1.143-.245.143-.435l-.007-.885c-.004-.564-.006-1.01-.006-1.34l-.3.052c-.19.035-.43.05-.721.046a5.555 5.555 0 0 1-.904-.091 2.026 2.026 0 0 1-.872-.39 1.651 1.651 0 0 1-.572-.8l-.13-.3a3.25 3.25 0 0 0-.41-.663c-.186-.243-.375-.407-.566-.494l-.09-.065a.956.956 0 0 1-.17-.156.723.723 0 0 1-.117-.182c-.026-.061-.004-.111.065-.15.07-.04.195-.059.378-.059l.26.04c.173.034.388.138.643.311a2.1 2.1 0 0 1 .631.677c.2.355.44.626.722.813.282.186.566.28.852.28.286 0 .533-.022.742-.065a2.59 2.59 0 0 0 .585-.196c.078-.58.29-1.028.637-1.34a8.907 8.907 0 0 1-1.333-.234 5.314 5.314 0 0 1-1.223-.507 3.5 3.5 0 0 1-1.047-.872c-.277-.347-.505-.802-.683-1.365-.177-.564-.266-1.215-.266-1.952 0-1.049.342-1.942 1.027-2.68-.32-.788-.29-1.673.091-2.652.252-.079.625-.02 1.119.175.494.195.856.362 1.086.5.23.14.414.257.553.352a9.233 9.233 0 0 1 2.497-.338c.859 0 1.691.113 2.498.338l.494-.312a6.997 6.997 0 0 1 1.197-.572c.46-.174.81-.221 1.054-.143.39.98.424 1.864.103 2.653.685.737 1.028 1.63 1.028 2.68 0 .737-.089 1.39-.267 1.957-.177.568-.407 1.023-.689 1.366-.282.343-.633.63-1.053.865-.42.234-.828.403-1.223.507a8.9 8.9 0 0 1-1.333.235c.45.39.676 1.005.676 1.846v3.11c0 .147.021.266.065.357a.36.36 0 0 0 .208.189c.096.034.18.056.254.064.074.01.18.013.318.013h2.914c1.032 0 1.914-.366 2.647-1.099.732-.732 1.099-1.615 1.099-2.647V3.746c0-1.032-.367-1.914-1.1-2.647z"
        ></path>
      </svg>
    ),
  };

  // Shuffle organisations
  const shuffled = organizations.sort(() => 0.5 - Math.random());
  let displayedOrganizations = shuffled.slice(0, 12);

  const ToggleSwitch = () => {
    const onToggle = () => setIsToggled(!isToggled);
    return (
      <label className={styles.toggleSwitch}>
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className={styles.switch} />
      </label>
    );
  };

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
                  {displayedOrganizations.map((organization) => (
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
                <div className="flex justify-end">
                  <span>async/await</span> <ToggleSwitch />
                </div>
                {isToggled ? (
                  <QuickStartGuideWithAsyncAwait />
                ) : (
                  <QuickStartGuide />
                )}
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
                <p>
                  Visit the{" "}
                  <a
                    href="https://www.fastify.io/docs/latest"
                    aria-label="Documentation"
                  >
                    Documentation
                  </a>{" "}
                  to learn more about all the features that Fastify has to
                  offer.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="flex p-20">
              <div>
                <h1 className="title">A fast web framework</h1>
                <p>
                  Leveraging our experience with Node.js performance, Fastify
                  has been built from the ground up to be
                  <strong>&nbsp;as fast as possible</strong>. Have a look at our
                  <a href="/benchmarks">&nbsp;benchmarks section</a> to compare
                  fastify performance to other common web frameworks.
                </p>
                <Button label={"Check out our benchmarks"} />
              </div>
              <div className="spacer"></div>
              <div>
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
                <Button label={"Explore 253 plugins"} />
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
                {team.map((section) => (
                  <>
                    <div className="content">
                      <h2>{section.name}</h2>
                    </div>
                    <div className={styles.teamGrid}>
                      {section.people
                        .sort((a, b) => (a.sortname > b.sortname ? 1 : -1))
                        .map((member) => (
                          <div>
                            <div className="flex">
                              <figure className={styles.teamImg}>
                                <img
                                  src={member.picture}
                                  alt={`${member.name}'s profile picture`}
                                />
                              </figure>

                              <div className="media-content">
                                <p className="title is-5">{member.name}</p>
                                <p className="subtitle is-6 contributor-links">
                                  {member.links.github && (
                                    <a
                                      href={member.links.github}
                                      target="_blank"
                                      rel="noopener"
                                      title={`Check out ${member.name}'s Github profile`}
                                    >
                                      {svgicons.github}
                                    </a>
                                  )}
                                  {member.links.npm && (
                                    <a
                                      href={member.links.npm}
                                      target="_blank"
                                      rel="noopener"
                                      title={`Check out ${member.name}'s NPM profile`}
                                    >
                                      {svgicons.npm}
                                    </a>
                                  )}
                                  {member.links.twitter && (
                                    <a
                                      href={member.links.twitter}
                                      target="_blank"
                                      rel="noopener"
                                      title={`Check out ${member.name}'s Twitter profile`}
                                    >
                                      {svgicons.twitter}
                                    </a>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="section alternate">
          <div className="container content">
            <div className="flex p-20 justify-between">
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
                <a href="https://openjsf.org/" target="_blank" rel="noopener">
                  <img
                    id="openjs-logo"
                    src="/img/logos/openjsf.svg"
                    alt="OpenJS Logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
