import React from "react";

export default function DriverTableRow(props) {
  return (
    <tbody>
      <tr>
        <th scope="row">{props.driver.shift}</th>
        <td>{props.driver.name}</td>
      </tr>
    </tbody>
  )
}