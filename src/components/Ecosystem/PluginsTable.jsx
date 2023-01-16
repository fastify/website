import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from '@docusaurus/Link'

const PluginsTable = (props) => {
  const [nameFilter, setNameFilter] = useState()
  const [descriptionFilter, setDescriptionFilter] = useState()

  const filtered = props.plugins.filter((plugin) => {
    const nameCondition = nameFilter == undefined || plugin.name.includes(nameFilter)
    const descriptionCondition = descriptionFilter == undefined || plugin.description.includes(descriptionFilter)

    return nameCondition && descriptionCondition
  })

  const emptyRow = []
  if (filtered.length == 0) {
    emptyRow.push({
      name: 'No match',
      description: 'No match',
    })
  }

  return (
    <div className="grid-container">
      <div className="grid-item-header">
        <b>Name</b>
        <br />
        <input type="text" onKeyUp={(event) => setNameFilter(event.target.value)} />
      </div>
      <div className="grid-item-header">
        <b>Description</b>
        <br />
        <input type="text" onKeyUp={(event) => setDescriptionFilter(event.target.value)} size="40" />
      </div>
      {filtered.map((plugin, index) => [
        <div key={`plugin-name-${index}`} className={`grid-item grid-item-${index % 2}`}>
          <Link to={plugin.url}>{plugin.name}</Link>
        </div>,
        <div key={`plugin-description-${index}`} className={`grid-item grid-item-${index % 2}`}>
          <ReactMarkdown skipHtml={true}>{plugin.description}</ReactMarkdown>
        </div>,
      ])}
      {emptyRow.map((row) => [
        <div key="no-result-name" className="grid-item grid-item-0">
          {row.name}
        </div>,
        <div key="no-result-description" className="grid-item grid-item-0">
          {row.description}
        </div>,
      ])}
    </div>
  )
}

export default PluginsTable
