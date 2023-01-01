import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import Link from '@docusaurus/Link';

const PluginsTable = (props) => {
    const [name_filter, setNameFilter] = useState();
    const [description_filter, setDescriptionFilter] = useState();

    const filtered = props.plugins.filter(plugin => {
        const nameCondition = name_filter == undefined || plugin.name.includes(name_filter)
        const descriptionCondition = description_filter == undefined || plugin.description.includes(description_filter)

        return nameCondition && descriptionCondition
    })

    const emptyRow = []
    if (filtered.length == 0) {
        emptyRow.push({
            "name": "No match",
            "description": "No match"
        })
    }

    return (
        <div class="grid-container">
            <div class="grid-item-header"><b>Name</b><br />
                <input type="text" onKeyUp={(event) => setNameFilter(event.target.value)} />
            </div>
            <div class="grid-item-header"><b>Description</b><br />
                <input type="text" onKeyUp={(event) => setDescriptionFilter(event.target.value)} size="40" />
            </div>
            {
                filtered.map((plugin, index) => [<div class={`grid-item-${index % 2}`}><Link to={plugin.url}>{plugin.name}</Link></div>, <div class={`grid-item-${index % 2}`}><ReactMarkdown>{plugin.description}</ReactMarkdown></div>])
            }
            {
                emptyRow.map((row) => [<div class={'grid-item-0'}>{row.name}</div>, <div class={'grid-item-0'}>{row.description}</div>])
            }
        </div>
    );
}

export default PluginsTable