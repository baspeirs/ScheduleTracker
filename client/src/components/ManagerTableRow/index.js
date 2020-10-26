import React from "react";

export default function ManagerTableRow(props) {
  return (
    <tbody>
      <tr>
        <th scope="row">{props.manager.shift}</th>
        <td>{props.manager.name}</td>
      </tr>
    </tbody>
  )
}