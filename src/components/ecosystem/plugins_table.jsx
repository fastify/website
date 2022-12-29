import React from 'react';
import ReactMarkdown from 'react-markdown'
import Link from '@docusaurus/Link';

export class PluginsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: undefined,
            descriptionFilter: undefined
        }
    }

    render() {
        const filtered = this.props.plugins.filter(plugin => {
            const nameCondition = this.state.nameFilter == undefined || plugin.name.includes(this.state.nameFilter)
            const descriptionCondition = this.state.descriptionFilter == undefined || plugin.description.includes(this.state.descriptionFilter)

            return nameCondition && descriptionCondition
        })

        const empty_row = []
        if (filtered.length == 0) {
            empty_row.push({
                "name": "No match",
                "description": "No match"
            })
        }

        return (
            <div class="grid-container">
                <div class="grid-item-header"><b>Name</b><br />
                    <input type="text" onKeyUp={(event) => this.setState({ nameFilter: event.target.value })} />
                </div>
                <div class="grid-item-header"><b>Description</b><br />
                    <input type="text" onKeyUp={(event) => this.setState({ descriptionFilter: event.target.value })} size="40" />
                </div>
                {
                    filtered.map((plugin, index) => [<div class={`grid-item-${index % 2}`}><Link to={plugin.url}>{plugin.name}</Link></div>, <div class={`grid-item-${index % 2}`}><ReactMarkdown>{plugin.description}</ReactMarkdown></div>])
                }
                {
                    empty_row.map((row) => [<div class={'grid-item-0'}>{row.name}</div>, <div class={'grid-item-0'}>{row.description}</div>])
                }
            </div>
        );
    }

}