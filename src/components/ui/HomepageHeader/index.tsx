import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

const HomepageHeader = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    // <header className={clsx("hero hero--primary", styles.heroBanner)}>
    <header className={styles.hero} data-theme="light">
      <div className="container">
        <img
          alt={siteConfig.title}
          className={styles.heroLogo}
          src={`img/logos/fastify-white.png`}
        />
        <p className={styles.heroProjectTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
      
    </header>
  );
};

export default HomepageHeader;
