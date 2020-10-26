import React from "react";

export default function TableHead(props) {
    return (
        <thead className="thead-dark">
            <tr>
                <th scope="col"><h2>{props.day}</h2></th>
                <th><p></p></th>
            </tr>
        </thead>
    )
}