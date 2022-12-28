import React from 'react';

export default function PluginsTableRow(props) {
    return (<tr>
        <td><a href={props.url}>{props.name}</a></td>
        <td>{props.description}</td>
    </tr>)
}