import React from 'react'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'

const BenchmarkInfo = (props) => {
  return (
    <div className="box">
      <div className="level">
        <div className="level-left">
          <h2>{props.name}</h2>
        </div>
        <div className="level-right">
          <Link to="https://github.com/fastify/fastify">
            <span className="github-link">&nbsp;</span>
          </Link>
        </div>
      </div>
      <p>
        {Math.round(props.req)}
        <Translate> req/sec (</Translate>
        <Link to={`https://github.com/fastify/benchmarks/blob/master/benchmarks/${props.name}.cjs`}>
          <Translate>Check the code</Translate>
        </Link>
        <Translate>)</Translate>
      </p>
      <progress key="component" className="progress is-primary" value={props.progress_value} max="1">
        {props.progress_value}
        <Translate>%</Translate>
      </progress>
    </div>
  )
}

export default BenchmarkInfo
