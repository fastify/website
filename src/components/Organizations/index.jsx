import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Link from '@docusaurus/Link'

import organizationsData from '@site/static/generated/organizations.json'
import styles from './styles.module.css'

export default function Organizations({ maxItems, displayType }) {
  const orgs = filterOrganizationsByType(displayType)

  return (
    <ul className={styles.organizationsList}>
      {shuffle(orgs, { maxItems }).map((organization, index) => (
        <li key={index}>
          <OrganizationItem organization={organization} />
        </li>
      ))}
    </ul>
  )
}

function filterOrganizationsByType(type) {
  switch (type) {
    case 'sponsor':
      return organizationsData.filter((org) => org.sponsor)
    case 'collaborator':
      return organizationsData.filter((org) => !org.sponsor)

    default:
      return organizationsData
  }
}

function OrganizationItem({ organization }) {
  return (
    <Link href={organization.link} target="_blank" rel="noreferrer" className={getOrganizationStyle(organization)}>
      <img src={useBaseUrl(`/img/organizations/${organization.image}`)} alt={`${organization.name} is using Fastify`} />
    </Link>
  )
}

function getOrganizationStyle(organization) {
  if (organization.sponsor) {
    return styles[`sponsoring_${organization.tier}`]
  }

  return styles.using
}

function shuffle(data, { maxItems }) {
  const shuffled = data.sort(() => 0.5 - Math.random())
  if (maxItems) {
    return shuffled.slice(0, maxItems)
  }

  return shuffled
}
