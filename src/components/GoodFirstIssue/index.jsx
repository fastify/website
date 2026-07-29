import React, { useState, useEffect } from 'react'
import Link from '@docusaurus/Link'
import css from './styles.module.css'

export default GoodFirstIssue

function GoodFirstIssue({ url }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [issues, setIssues] = useState([])
  const [projects, setProjects] = useState({})
  const [checkAllProjects, setCheckAllProjects] = useState(true)
  const [filteredIssues, setFilteredIssues] = useState([])

  useEffect(() => {
    setFilteredIssues(checkAllProjects ? issues : [])

    setProjects((prev) => {
      const filteredProjects = {}
      for (const name in prev) {
        filteredProjects[name] = { ...prev[name], selected: checkAllProjects }
      }

      return filteredProjects
    })
  }, [checkAllProjects, issues])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const resp = await fetch(url)
        const data = await resp.json()
        const issues = data.results
        const projects = data.results.reduce((acc, curr) => {
          acc[curr.project.name] = {
            count: typeof acc[curr.project.name] === 'undefined' ? 1 : acc[curr.project.name].count + 1,
            selected: true,
            name: curr.project.name,
          }
          return acc
        }, {})
        const filteredIssues = issues.filter((issue) => {
          return projects[issue.project.name].selected
        })

        setIssues(issues)
        setProjects(projects)
        setFilteredIssues(filteredIssues)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }

    fetchData() //
      .catch(setError)
  }, [url])

  if (loading)
    return (
      <div className={css.statusPanel} role="status">
        Loading good first issues…
      </div>
    )

  if (error)
    return (
      <div className={`${css.statusPanel} ${css.statusPanelError}`} role="alert">
        Error: {error.message}
      </div>
    )

  const toggleProject = (name, selected) => {
    if (projects[name]) {
      projects[name].selected = typeof selected === 'undefined' ? !projects[name].selected : selected
    }

    const filteredIssues = issues.filter((issue) => {
      return projects[issue.project.name].selected
    })

    setProjects({ ...projects })
    setFilteredIssues(filteredIssues)
  }

  return (
    <div className={css.layout}>
      <nav className={css.sidebar}>
        <p className={css.sidebarHeading}>Projects</p>

        <label className={css.projectItem}>
          <input type="checkbox" checked={checkAllProjects} onChange={() => setCheckAllProjects(!checkAllProjects)} />
          <span className={css.projectItemName}>All the projects</span>
          <span className={css.projectItemCount}>{issues.length}</span>
        </label>

        <hr className={css.sidebarDivider} />

        <div className={css.projectList}>
          {Object.values(projects)
            .sort(byCount)
            .map((project) => (
              <ProjectFilter key={project.name} {...project} toggle={toggleProject.bind(this, project.name)} />
            ))}
        </div>
      </nav>

      <div className={css.issuesColumn}>
        <p className={css.issuesCount}>
          <strong>{filteredIssues.length}</strong> of {issues.length} open issues
        </p>
        <Issues issues={filteredIssues} />
      </div>
    </div>
  )
}

function ProjectFilter({ name, count, selected, toggle }) {
  const onChange = (e) => {
    toggle(e.currentTarget.checked)
  }

  return (
    <label className={css.projectItem}>
      <input type="checkbox" checked={Boolean(selected)} onChange={onChange} />
      <span className={css.projectItemName}>{name}</span>
      <span className={css.projectItemCount}>{count}</span>
    </label>
  )
}

function labelVariant(label) {
  const value = label.toLowerCase()
  if (value.includes('bug')) {
    return 'bug'
  }

  if (value.includes('good first issue')) {
    return 'goodFirstIssue'
  }

  if (value.includes('help wanted')) {
    return 'helpWanted'
  }

  if (value.includes('question')) {
    return 'question'
  }

  return 'default'
}

function Issue(props) {
  return (
    <div className={css.issueCard} key={props.url}>
      <Link to={props.url} className={css.issueTitle}>
        {props.title}
      </Link>
      <p className={css.issueProject}>
        Project <Link to={props.project.url}>{props.project.name}</Link>
      </p>
      {props.labels.length > 0 ? (
        <div className={css.issueLabels}>
          {props.labels.map((label) => (
            <span key={label} className={`${css.label} ${css[`label--${labelVariant(label)}`]}`}>
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function Issues({ issues }) {
  if (issues.length === 0) {
    return (
      <div className={css.emptyState}>
        <p className={css.emptyStateTitle}>No issues match this filter 😱</p>
        <p className={css.emptyStateSubtitle}>Try selecting a different project on the left.</p>
      </div>
    )
  }
  return <div className={css.issuesList}>{issues.map((issue) => Issue(issue))}</div>
}

function byCount(a, b) {
  return b.count - a.count
}
