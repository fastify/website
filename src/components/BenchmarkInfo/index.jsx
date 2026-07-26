import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current || inView) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [inView, threshold])

  return [ref, inView]
}

// Runs a single 0 -> 1 ease-out animation, shared by both the counter and
// the progress bar so they move in perfect lockstep instead of drifting
// apart as two independent rAF loops.
function useEasedProgress(active, duration = 1200) {
  const [eased, setEased] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!active) {
      return
    }

    // Respect users who asked the OS/browser for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEased(1)
      return
    }

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      setEased(1 - (1 - progress) ** 3) // ease-out cubic

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameRef.current)
  }, [active, duration])

  return eased
}

function BenchmarkInfo({ name, test: testFile, repository, req, progressValue, rank }) {
  const [boxRef, inView] = useInView()
  const eased = useEasedProgress(inView)
  const animatedReq = req * eased
  const animatedProgress = progressValue * eased
  const isFastify = name === 'Fastify'

  return (
    <div ref={boxRef} className={`${styles.box} ${isFastify ? styles.boxFastify : ''}`}>
      {rank && <span className={styles.rank}>#{rank}</span>}
      <div className={styles.level}>
        <div>
          <Link to={testFile}>
            <Heading as={'h2'} className={styles.heading}>
              {name}
            </Heading>
          </Link>
        </div>
        <div>
          <Link className="header-github-link" to={repository} aria-label={`${name} repository on GitHub`} />
        </div>
      </div>
      <p className={styles.reqLine}>
        <span className={styles.reqNumber}>{Math.round(animatedReq)}</span>
        <span className={styles.reqUnit}>req/sec</span>
      </p>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={Math.round(animatedProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name}: ${Math.round(animatedProgress * 100)}% relative to the fastest framework`}>
        <div
          className={`${styles.progressFill} ${isFastify ? styles.progressFillFastify : styles.progressFillOthers}`}
          style={{ width: `${animatedProgress * 100}%` }}
        />
      </div>
    </div>
  )
}

export default BenchmarkInfo
