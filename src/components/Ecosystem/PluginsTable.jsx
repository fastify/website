import React, { useId, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from '@docusaurus/Link'

const SearchIcon = () => (
  <svg className="plugins-field__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const ClearIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

const PluginField = ({ id, label, value, onChange, placeholder }) => (
  <label className="plugins-field" htmlFor={id}>
    <span className="plugins-field__label">{label}</span>
    <span className="plugins-field__control">
      <SearchIcon />
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
      {value ? (
        <button
          type="button"
          className="plugins-field__clear"
          aria-label={`Clear ${label.toLowerCase()} filter`}
          onClick={() => onChange('')}>
          <ClearIcon />
        </button>
      ) : null}
    </span>
  </label>
)

const PluginsTable = ({ plugins, variant = 'community' }) => {
  const idPrefix = useId()
  const [nameFilter, setNameFilter] = useState('')
  const [descriptionFilter, setDescriptionFilter] = useState('')

  const filtered = useMemo(
    () =>
      plugins.filter((plugin) => {
        const nameCondition = !nameFilter || plugin.name.toLowerCase().includes(nameFilter.toLowerCase())
        const descriptionCondition =
          !descriptionFilter || plugin.description.toLowerCase().includes(descriptionFilter.toLowerCase())

        return nameCondition && descriptionCondition
      }),
    [plugins, nameFilter, descriptionFilter],
  )

  const hasFilters = Boolean(nameFilter || descriptionFilter)
  const badgeLabel = variant === 'official' ? 'Official' : 'Community'

  return (
    <div className="plugins-table">
      <div className="plugins-toolbar">
        <PluginField
          id={`${idPrefix}-name`}
          label="Name"
          value={nameFilter}
          onChange={setNameFilter}
          placeholder="Search by plugin name…"
        />
        <PluginField
          id={`${idPrefix}-description`}
          label="Description"
          value={descriptionFilter}
          onChange={setDescriptionFilter}
          placeholder="Search by keyword…"
        />
        <div className="plugins-toolbar__meta">
          <span className="plugins-count">
            <strong>{filtered.length}</strong> of {plugins.length} plugins
          </span>
          {hasFilters ? (
            <button
              type="button"
              className="plugins-reset"
              onClick={() => {
                setNameFilter('')
                setDescriptionFilter('')
              }}>
              Reset filters
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="plugins-list">
          {filtered.map((plugin) => (
            <li key={plugin.name} className="plugins-card">
              <div className="plugins-card__header">
                <Link to={plugin.url} className="plugins-card__name">
                  {plugin.name}
                </Link>
                <span className={`plugins-badge plugins-badge--${variant}`}>{badgeLabel}</span>
              </div>
              <div className="plugins-card__description">
                <ReactMarkdown skipHtml={true}>{plugin.description}</ReactMarkdown>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="plugins-empty">
          <p className="plugins-empty__title">No plugins match your search</p>
          <p className="plugins-empty__subtitle">Try a different name or keyword, or reset the filters above.</p>
        </div>
      )}
    </div>
  )
}

export default PluginsTable
