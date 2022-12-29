import React from 'react';
import PluginsTableRow from './plugins_table_row'

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
            <table>
                <thead>
                    <tr>
                        <th>Name<br />
                            <input type="text" onKeyUp={(event) => this.setState({ nameFilter: event.target.value })} />
                        </th>
                        <th>Description<br />
                            <input type="text" onKeyUp={(event) => this.setState({ descriptionFilter: event.target.value })} size="40" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtered.map(plugin => <PluginsTableRow key={plugin.name} url={plugin.url} name={plugin.name} description={plugin.description} />)
                    }
                </tbody>
            </table>
        );
    }

}