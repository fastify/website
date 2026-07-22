import React, { useEffect, useRef, useState } from 'react'
import Heading from '@theme/Heading'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Link from '@docusaurus/Link'
import versions from '@site/versions.json'
import css from './styles.module.css'

const latestVersion = versions[1]

function useLiveStat(url, selectValue) {
  const [value, setValue] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) {
          setValue(selectValue(data))
        }
      })
      .catch(() => {
        // silent: the stat stays on the placeholder
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return value
}

function useVersionCountUp(versionText, duration = 1200) {
  const [display, setDisplay] = useState('')
  const frameRef = useRef(null)

  useEffect(() => {
    if (!versionText) {
      setDisplay('')
      return
    }

    const parts = versionText.match(/\d+|\D+/g) || []
    const targets = parts.map((part) => (/^\d+$/.test(part) ? parseInt(part, 10) : null))

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3 // ease-out cubic

      const current = parts.map((part, i) => (targets[i] !== null ? Math.round(targets[i] * eased) : part))

      setDisplay(current.join(''))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameRef.current)
  }, [versionText, duration])

  return display
}

function useCountUp(target, duration = 1200) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (target === null) {
      return
    }

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3 // ease-out cubic
      setDisplay(Math.round(target * eased))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration])

  return target === null ? null : display
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  const stars = useLiveStat('https://api.github.com/repos/fastify/fastify', (data) => data.stargazers_count)
  const downloads = useLiveStat('https://api.npmjs.org/downloads/point/last-month/fastify', (data) => data.downloads)
  const latestPublishedVersion = useLiveStat('https://registry.npmjs.org/fastify/latest', (data) => data.version)

  const animatedStars = useCountUp(stars)
  const animatedDownloads = useCountUp(downloads)

  const versionText = latestPublishedVersion ? `v${latestPublishedVersion}` : latestVersion
  const animatedVersion = useVersionCountUp(versionText)

  return (
    <header className={css.hero}>
      <div className={`container ${css.heroGrid}`}>
        <div className={css.heroMain}>
          <img alt={siteConfig.title} src={'img/logos/fastify-white.svg'} className={css.logo} />

          <Heading as={'h2'} className={css.tagline}>
            {siteConfig.tagline}
          </Heading>

          <p className={css.lede}>
            Highly focused on providing the best developer experience with the least overhead and a powerful plugin
            architecture.
          </p>

          <div className={css.ctaRow}>
            <Link className={css.primaryCta} to="#quickstart">
              Get started
            </Link>
            <Link className={css.secondaryCta} to="https://github.com/fastify/fastify">
              GitHub
            </Link>
          </div>

          <div className={css.statsRow}>
            <div className={css.stat}>
              <span className={css.statLabel}>GitHub stars</span>
              <span className={css.statValue}>
                {animatedStars !== null ? animatedStars.toLocaleString('en-US') : '—'}
              </span>
            </div>
            <div className={css.stat}>
              <span className={css.statLabel}>Latest release</span>
              <span className={css.statValue}>{animatedVersion}</span>
            </div>
            <div className={css.stat}>
              <span className={css.statLabel}>Monthly downloads</span>
              <span className={css.statValue}>
                {animatedDownloads !== null ? animatedDownloads.toLocaleString('en-US') : '—'}
              </span>
            </div>
          </div>
        </div>

        <div className={css.whyCol}>
          <Heading as={'h3'} className={css.whyHeading}>
            Why Fastify
          </Heading>
          <p className={css.whyText}>
            An efficient server implies a lower cost of the infrastructure, better responsiveness under load, and happy
            users. How can you efficiently handle the resources of your server, knowing that you are serving the highest
            number of requests possible, without sacrificing security validations and handy development?
          </p>
          <p className={css.whyText}>
            Enter Fastify. Fastify is a web framework highly focused on providing the best developer experience with the
            least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we know,
            it is one of the fastest web frameworks in town.
          </p>
        </div>
      </div>
    </header>
  )
}

export default HomepageHeader
