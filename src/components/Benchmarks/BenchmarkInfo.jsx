import React from 'react'

import Link from '@docusaurus/Link'

function BenchmarkInfo({ name, test: testFile, repository, req, progressValue }) {
  return (
    <div className="box shadow--md">
      <div className="level">
        <div className="level-left">
          <Link to={testFile}>
            <h2>{name}</h2>
          </Link>
        </div>
        <div className="level-right">
          <Link className="header-github-link" to={repository} />
        </div>
      </div>
      <p>{Math.round(req) + ' req/sec'}</p>
      <progress key="component" className="progress is-primary" value={progressValue} max="1">
        {progressValue * 100 + '%'}
      </progress>
    </div>
  )
}

export default BenchmarkInfo
