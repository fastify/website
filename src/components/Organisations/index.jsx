import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Link from '@docusaurus/Link'

import organizationsData from '@site/static/generated/organisations.json'
import styles from './styles.module.css'

export default function Organisations({ maxItems, onlySponsors }) {
  const orgs =
    onlySponsors === 'true' //
      ? organizationsData.filter((org) => org.sponsor)
      : onlySponsors === 'false' //
        ? organizationsData.filter((org) => !org.sponsor)
        : organizationsData

  return (
    <ul className={styles.organisationsList}>
      {shuffle(orgs, { maxItems }).map((organization, index) => (
        <li key={index}>
          <OrganizationItem organization={organization} />
        </li>
      ))}
    </ul>
  )
}

function OrganizationItem({ organization }) {
  return (
    <Link href={organization.link} target="_blank" rel="noreferrer" className={getOrganizationStyle(organization)}>
      <img src={useBaseUrl(`/img/organisations/${organization.image}`)} alt={`${organization.name} is using Fastify`} />
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
