import React from 'react'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import GitHubButton from 'react-github-btn'

import css from './styles.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={css.hero}>
      <div className="container">
        <img alt={siteConfig.title} src={`img/logos/fastify-white.svg`} />

        <h2>{siteConfig.tagline}</h2>

        <div>
          <GitHubButton
            href="https://github.com/fastify/fastify"
            data-icon="octicon-star"
            aria-label="Star Fastify on GitHub"
            data-size="large"
            data-show-count="true">
            Star
          </GitHubButton>
          &nbsp; &nbsp;
          <GitHubButton
            href="https://github.com/fastify/fastify/fork"
            data-icon="octicon-repo-forked"
            aria-label="Fork Fastify on GitHub"
            data-size="large">
            Fork
          </GitHubButton>
        </div>
      </div>
    </header>
  )
}

export default HomepageHeader
