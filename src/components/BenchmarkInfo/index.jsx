import React from 'react'
import styles from './styles.module.css'

import Link from '@docusaurus/Link'

function BenchmarkInfo({ name, test: testFile, repository, req, progressValue }) {
  return (
    <div className={`${styles.box} shadow--md`}>
      <div className={styles.level}>
        <div>
          <Link to={testFile}>
            <h2>{name}</h2>
          </Link>
        </div>
        <div>
          <Link className="header-github-link" to={repository} />
        </div>
      </div>
      <p>{Math.round(req) + ' req/sec'}</p>
      <progress className={`${styles.progress} ${specialColor(name)}`} value={progressValue} max="1">
        {progressValue * 100 + '%'}
      </progress>
    </div>
  )
}

function specialColor(name) {
  return name === 'Fastify' ? styles.progressFastify : styles.progressOthers
}

export default BenchmarkInfo
