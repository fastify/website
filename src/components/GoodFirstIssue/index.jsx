import React, { useState, useEffect } from 'react'
import Link from '@docusaurus/Link'
import css from './styles.module.css'

export default GoodFirstIssue

function GoodFirstIssue({ url }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [issues, setIssues] = useState([])
  const [projects, setProjects] = useState({})
  const [filteredIssues, setFilteredIssues] = useState([])

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
      <div className="alert alert--secondary" role="alert">
        Loading...
      </div>
    )

  if (error)
    return (
      <div className="alert alert--danger" role="alert">
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

    setProjects(projects)
    setFilteredIssues(filteredIssues)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col--4 margin--none">
          <nav className="col-demo item shadow--lw">
            <p className={css.panelHeading}>Projects</p>
            {Object.values(projects)
              .sort(byCount)
              .map((project) => ProjectFilter({ ...project, toggle: toggleProject.bind(this, project.name) }))}
          </nav>
        </div>
        <div className="col col--8">
          <div className="col-demo">
            <Issues issues={filteredIssues} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectFilter({ name, count, selected, toggle }) {
  const onChange = (e) => {
    toggle(e.currentTarget.checked)
  }

  return (
    <div className={`avatar margin-bottom--sm ${css.projectItem}`} key={name} onClick={onChange}>
      <input type="checkbox" checked={Boolean(selected)} onChange={onChange} />
      <div className="avatar__intro">
        <div className="avatar__name">{name}</div>
        <small className="avatar__subtitle">{count} issues</small>
      </div>
    </div>
  )
}

function Issue(props) {
  return (
    <div className="card-demo margin-bottom--sm" key={props.url}>
      <div className="card">
        <div className="card__header">
          <div className="avatar">
            <div className="avatar__intro">
              <div className="avatar__name">
                <Link to={props.url}>{props.title}</Link>
              </div>
              <small className="avatar__subtitle">
                Project <Link to={props.project.url}>{props.project.name}</Link>
              </small>
            </div>
          </div>
        </div>
        <div className="card__footer">
          {props.labels.map((label) => {
            return (
              <span key={label} className="badge badge--secondary margin-right--xs">
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Issues({ issues }) {
  if (issues.length === 0) {
    return (
      <div>
        <strong>No issue available 😱</strong>
      </div>
    )
  }
  return issues.map((issue) => Issue(issue))
}

function byCount(a, b) {
  return b.count - a.count
}
