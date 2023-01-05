import React from 'react'
import organizations from '../../utils/data/organisations.json'
import Shuffle from '../Shuffle'
import styles from './index.module.css'


const Organisations = () => {
  return (
    <ul className={styles.organisationsList}>
      {Shuffle(organizations).map((organization, index) => (
        <li key={index}>
          <a href={organization.link} target="_blank" rel="noreferrer">
            <img src={`/img/organisations/${organization.image}`} alt={`${organization.name} is using Fastify`} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Organisations
