import React from "react";

export default function InShopTableRow(props) {
  return (
    <tbody>
      <tr>
        <th scope="row">{props.inshop.shift}</th>
        <td>{props.inshop.name}</td>
      </tr>
    </tbody>
  )
}