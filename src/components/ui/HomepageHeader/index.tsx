import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import GitHubButton from "react-github-btn";

const HomepageHeader = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    // <header className={clsx("hero hero--primary", styles.heroBanner)}>
    <header className={styles.hero} data-theme="light">
      <div className="container">
        <h1>
          <img
            alt={siteConfig.title}
            className={styles.heroLogo}
            src={`img/logos/fastify-white.png`}
          />
        </h1>

        <h2 className={styles.heroProjectTagline}>{siteConfig.tagline}</h2>
        <div className={styles.githubButtons}>
          <GitHubButton
            href="https://github.com/fastify/fastify"
            data-icon="octicon-star"
            aria-label="Star fastify on GitHub"
            data-size="large"
            data-show-count="true"
          >
            Star
          </GitHubButton>
          <GitHubButton
            href="https://github.com/fastify/fastify/fork"
            data-icon="octicon-repo-forked"
            aria-label="Fork fastify on GitHub"
            data-size="large"
          >
            Fork
          </GitHubButton>
        </div>
      </div>
      <div
      // className="hero"
      ></div>
    </header>
  );
};

export default HomepageHeader;
