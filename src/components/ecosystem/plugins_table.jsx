import React from 'react';

export class PluginsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: undefined,
            descriptionFilter: undefined
        }
    }

    render() {
        let filtered = this.props.plugins.filter(plugin => {
            const nameCondition = this.state.nameFilter == undefined || plugin.name.includes(this.state.nameFilter)
            const descriptionCondition = this.state.descriptionFilter == undefined || plugin.description.includes(this.state.descriptionFilter)

            return nameCondition && descriptionCondition
        })

        if (filtered.length == 0) {
            filtered = [{
                "name": "No Plugin matches filter",
                "url": "",
                "description": "No plugin matches filter"
            }]
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
                    filtered.map((plugin, index) => [<div class={`grid-item-${index % 2}`}>{plugin.name}</div>, <div class={`grid-item-${index % 2}`}>{plugin.description}</div>])
                }
            </div>
        );
    }

}