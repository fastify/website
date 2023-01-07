import React from 'react'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'

const BenchmarkInfo = (props) => {
  return (
    <div className="box shadow--md">
      <div className="level">
        <div className="level-left">
          <Link to={props.test}>
            <h2>{props.name}</h2>
          </Link>
        </div>
        <div className="level-right">
          <Link to={props.repository}>
            <span className="github-link">&nbsp;</span>
          </Link>
        </div>
      </div>
      <p>
        {Math.round(props.req)}
        <Translate> req/sec</Translate>
      </p>
      <progress key="component" className="progress is-primary" value={props.progressValue} max="1">
        {props.progressValue * 100}
        <Translate>%</Translate>
      </progress>
    </div>
  )
}

export default BenchmarkInfo
