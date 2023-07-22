import React from 'react'

import teamData from '@site/static/generated/team.json'
import styles from './styles.module.css'

const svgicons = {
  twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -4 24 24"
      width="24"
      height="24"
      preserveAspectRatio="xMinYMin"
      className="icon__icon twitter">
      <path
        fill="currentColor"
        d="M20 1.907a8.292 8.292 0 0 1-2.356.637A4.07 4.07 0 0 0 19.448.31a8.349 8.349 0 0 1-2.607.98A4.12 4.12 0 0 0 13.846.015c-2.266 0-4.103 1.81-4.103 4.04 0 .316.036.625.106.92A11.708 11.708 0 0 1 1.393.754a3.964 3.964 0 0 0-.554 2.03c0 1.403.724 2.64 1.824 3.363A4.151 4.151 0 0 1 .805 5.64v.05c0 1.958 1.415 3.591 3.29 3.963a4.216 4.216 0 0 1-1.08.141c-.265 0-.522-.025-.773-.075a4.098 4.098 0 0 0 3.832 2.807 8.312 8.312 0 0 1-5.095 1.727c-.332 0-.658-.02-.979-.056a11.727 11.727 0 0 0 6.289 1.818c7.547 0 11.673-6.157 11.673-11.496l-.014-.523A8.126 8.126 0 0 0 20 1.907z"></path>
    </svg>
  ),
  npm: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      preserveAspectRatio="xMinYMin"
      className="icon__icon npm">
      <path
        fill="currentColor"
        d="m11.993645 4.3033562h-7.7839999v15.7031878h7.7831879v-11.7431878h3.96v11.7431878h3.96v-15.7031878zm-9.9319999-2.148h19.9999999v19.9999998h-19.9999999z"></path>
    </svg>
  ),
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 24 24"
      width="24"
      height="24"
      preserveAspectRatio="xMinYMin"
      className="icon__icon github">
      <path
        fill="currentColor"
        d="M18.88 1.099C18.147.366 17.265 0 16.233 0H3.746C2.714 0 1.832.366 1.099 1.099.366 1.832 0 2.714 0 3.746v12.487c0 1.032.366 1.914 1.099 2.647.733.733 1.615 1.099 2.647 1.099H6.66c.19 0 .333-.007.429-.02a.504.504 0 0 0 .286-.169c.095-.1.143-.245.143-.435l-.007-.885c-.004-.564-.006-1.01-.006-1.34l-.3.052c-.19.035-.43.05-.721.046a5.555 5.555 0 0 1-.904-.091 2.026 2.026 0 0 1-.872-.39 1.651 1.651 0 0 1-.572-.8l-.13-.3a3.25 3.25 0 0 0-.41-.663c-.186-.243-.375-.407-.566-.494l-.09-.065a.956.956 0 0 1-.17-.156.723.723 0 0 1-.117-.182c-.026-.061-.004-.111.065-.15.07-.04.195-.059.378-.059l.26.04c.173.034.388.138.643.311a2.1 2.1 0 0 1 .631.677c.2.355.44.626.722.813.282.186.566.28.852.28.286 0 .533-.022.742-.065a2.59 2.59 0 0 0 .585-.196c.078-.58.29-1.028.637-1.34a8.907 8.907 0 0 1-1.333-.234 5.314 5.314 0 0 1-1.223-.507 3.5 3.5 0 0 1-1.047-.872c-.277-.347-.505-.802-.683-1.365-.177-.564-.266-1.215-.266-1.952 0-1.049.342-1.942 1.027-2.68-.32-.788-.29-1.673.091-2.652.252-.079.625-.02 1.119.175.494.195.856.362 1.086.5.23.14.414.257.553.352a9.233 9.233 0 0 1 2.497-.338c.859 0 1.691.113 2.498.338l.494-.312a6.997 6.997 0 0 1 1.197-.572c.46-.174.81-.221 1.054-.143.39.98.424 1.864.103 2.653.685.737 1.028 1.63 1.028 2.68 0 .737-.089 1.39-.267 1.957-.177.568-.407 1.023-.689 1.366-.282.343-.633.63-1.053.865-.42.234-.828.403-1.223.507a8.9 8.9 0 0 1-1.333.235c.45.39.676 1.005.676 1.846v3.11c0 .147.021.266.065.357a.36.36 0 0 0 .208.189c.096.034.18.056.254.064.074.01.18.013.318.013h2.914c1.032 0 1.914-.366 2.647-1.099.732-.732 1.099-1.615 1.099-2.647V3.746c0-1.032-.367-1.914-1.1-2.647z"></path>
    </svg>
  ),
}

export default function Team() {
  const groups = teamData.map(buildGroup)
  return <>{groups}</>
}

function buildGroup(section, index) {
  return (
    <div key={index}>
      <div className="content">
        <h2>{section.name}</h2>
      </div>
      <div className="row">{section.people.map((member, index) => TeamMember({ member, index }))}</div>
    </div>
  )
}

function TeamMember({ member, index }) {
  return (
    <div className="col col--4" key={index}>
      <div className={styles.teamMember}>
        <figure className={styles.teamImg}>
          <img
            src={`https://avatars.githubusercontent.com/u/${member.githubId}?v=4&s=192`}
            alt={`${member.name}'s profile picture`}
            width="96"
            height="96"
            loading="lazy"
          />
        </figure>
        <div className={styles.center}>
          <div>
            <p>{member.name}</p>
            <p>
              {member.links.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkGithub}
                  title={`Check out ${member.name}'s Github profile`}>
                  {svgicons.github}
                </a>
              )}
              {member.links.npm && (
                <a
                  href={member.links.npm}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkNpm}
                  title={`Check out ${member.name}'s NPM profile`}>
                  {svgicons.npm}
                </a>
              )}
              {member.links.twitter && (
                <a
                  href={member.links.twitter}
                  target="_blank"
                  className={styles.linkTwitter}
                  rel="noreferrer"
                  title={`Check out ${member.name}'s Twitter profile`}>
                  {svgicons.twitter}
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
