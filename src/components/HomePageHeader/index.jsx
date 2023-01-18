import React from 'react'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import GitHubButton from 'react-github-btn'

import css from './index.module.css'
import clsx from 'clsx'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx('hero hero--primary', css.hero)}>
      <img alt={siteConfig.title} src={`img/logos/fastify-white.png`} />

      <h2>{siteConfig.tagline}</h2>

      <div>
        <GitHubButton
          href="https://github.com/fastify/fastify"
          data-icon="octicon-star"
          aria-label="Star fastify on GitHub"
          data-size="large"
          data-show-count="true">
          Star
        </GitHubButton>
        &nbsp; &nbsp;
        <GitHubButton
          href="https://github.com/fastify/fastify/fork"
          data-icon="octicon-repo-forked"
          aria-label="Fork fastify on GitHub"
          data-size="large">
          Fork
        </GitHubButton>
      </div>
    </header>
  )
}

export default HomepageHeader
