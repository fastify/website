import React from 'react';

const plugins = require('./plugins.json')

export function PluginsTable({ group }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    plugins[group].map(plugin =>
                        <tr>
                            <td><a href={plugin.url}>{plugin.name}</a></td>
                            <td>{plugin.description}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}

export function PluginsCount() {
    return (
        `There are ${plugins.corePlugins.length} core plugins and ${plugins.communityPlugins.length} community plugins`
    );
}

