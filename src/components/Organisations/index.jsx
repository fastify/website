import React from 'react'

import organizationsData from '@site/static/generated/organisations.json'
import styles from './styles.module.css'

const Organisations = ({ maxItems }) => {
  return (
    <ul className={styles.organisationsList}>
      {shuffle(organizationsData, { maxItems: maxItems }).map((organization, index) => (
        <li key={index}>
          <a href={organization.link} target="_blank" rel="noreferrer">
            <img src={`/img/organisations/${organization.image}`} alt={`${organization.name} is using Fastify`} />
          </a>
        </li>
      ))}
    </ul>
  )
}

function shuffle(data, { maxItems }) {
  const shuffled = data.sort(() => 0.5 - Math.random())
  if (maxItems) {
    return shuffled.slice(0, maxItems)
  }

  return shuffled
}

export default Organisations
