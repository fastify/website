import React from 'react'

import shuffle from '../Shuffle'

import organizationsData from '@site/static/generated/organisations.json'
import styles from './styles.module.css'

const Organisations = ({ maxItems }) => {
  return (
    <ul className={styles.organisationsList}>
      {shuffle(organizationsData, { maxItems: maxItems }).map((organization, index) => (
        <li key={index}>
          <a href={organization.link} target="_blank" rel="noreferrer">
            <img
              className={styles.organisationsLogo}
              src={`/img/organisations/${organization.image}`}
              alt={`${organization.name} is using Fastify`}
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Organisations
