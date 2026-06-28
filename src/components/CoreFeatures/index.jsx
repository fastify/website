import React from 'react'
import Link from '@docusaurus/Link'
import css from './styles.module.css'

const features = [
  {
    title: 'Highly performant',
    tag: '30k req/s',
    accentColor: '#25c2a0',
    description:
      'As far as we know, Fastify is one of the fastest web frameworks in town, depending on the code complexity we can serve up to 30 thousand requests per second.',
  },
  {
    title: 'Extensible',
    tag: 'plugin system',
    accentColor: '#25c2a0',
    description: 'Fastify is fully extensible via its hooks, plugins, and decorators.',
  },
  {
    title: 'Schema-based',
    tag: 'JSON Schema',
    accentColor: '#25c2a0',
    description: (
      <>
        Even if it is not mandatory we recommend using <Link to="http://json-schema.org/">JSON Schema</Link> to validate
        your routes and serialize your outputs. Internally Fastify compiles the schema in a highly performant function.
      </>
    ),
  },
  {
    title: 'Logging',
    tag: 'pino logger',
    accentColor: '#25c2a0',
    description: (
      <>
        Logs are extremely important but are costly; we chose the best logger to almost remove this cost,{' '}
        <Link to="https://github.com/pinojs/pino">Pino</Link>!
      </>
    ),
  },
  {
    title: 'Developer friendly',
    tag: 'dx-first',
    accentColor: '#25c2a0',
    description:
      'The framework is built to be very expressive and help developers in their daily use, without sacrificing performance and security.',
  },
  {
    title: 'TypeScript ready',
    tag: 'types included',
    accentColor: '#25c2a0',
    description: (
      <>
        We work hard to maintain a <Link to="https://www.typescriptlang.org/">TypeScript</Link> type declaration file so
        we can support the growing TypeScript community.
      </>
    ),
  },
]

export default function CoreFeatures() {
  return (
    <div className={css.grid}>
      {features.map((f) => (
        <div key={f.title} className={css.card}>
          <div className={css.accent} style={{ background: f.accentColor }} />
          <div className={css.title}>{f.title}</div>
          <div className={css.desc}>{f.description}</div>
          <span className={css.tag}>{f.tag}</span>
        </div>
      ))}
    </div>
  )
}
