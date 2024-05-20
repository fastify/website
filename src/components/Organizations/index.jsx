import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

import organizationsData from '@site/static/generated/organizations.json'
import styles from './styles.module.css'

export default function Organizations({ maxItems }) {
  return (
    <ul className={styles.organizationsList}>
      {shuffle(organizationsData, { maxItems: maxItems }).map((organization, index) => (
        <li key={index}>
          <OrganizationItem organization={organization} />
        </li>
      ))}
    </ul>
  )
}

function OrganizationItem({ organization }) {
  return (
    <a href={organization.link} target="_blank" rel="noreferrer">
      <img src={useBaseUrl(`/img/organizations/${organization.image}`)} alt={`${organization.name} is using Fastify`} />
    </a>
  )
}

function shuffle(data, { maxItems }) {
  const shuffled = data.sort(() => 0.5 - Math.random())
  if (maxItems) {
    return shuffled.slice(0, maxItems)
  }

  return shuffled
}
