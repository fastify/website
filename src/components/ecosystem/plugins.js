import React from 'react';

const plugins = require('./plugins.json')


class PluginsTableRow extends React.Component {
    constructor(props) {
        super(props)
        this.plugin = props.plugin
    }

    render() {
        const nameCondition = this.props.nameFilter == undefined || this.plugin.name.includes(this.props.nameFilter)
        const descriptionCondition = this.props.descriptionFilter == undefined || this.plugin.description.includes(this.props.descriptionFilter)

        if (nameCondition && descriptionCondition) {
            return (<tr>
                <td><a href={this.plugin.url}>{this.plugin.name}</a></td>
                <td>{this.plugin.description}</td>
            </tr>)
        }
        else return null

    }
}

export class PluginsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameFilter: undefined,
            descriptionFilter: undefined
        }

        this.filterName = this.filterName.bind(this);
        this.filterDescription = this.filterDescription.bind(this);
    }

    filterName(event) {
        this.setState({ nameFilter: event.target.value })
    }

    filterDescription(event) {
        this.setState({ descriptionFilter: event.target.value })
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name<br />
                            <input type="text" onKeyUp={this.filterName} />
                        </th>
                        <th>Description<br />
                            <input type="text" onKeyUp={this.filterDescription} size="40" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        plugins[this.props.group].map(plugin =>
                            <PluginsTableRow plugin={plugin} nameFilter={this.state.nameFilter} descriptionFilter={this.state.descriptionFilter} />
                        )
                    }
                </tbody>
            </table>
        );
    }

}

export function PluginsCount() {
    return (
        `There are ${plugins.corePlugins.length} core plugins and ${plugins.communityPlugins.length} community plugins`
    );
}

