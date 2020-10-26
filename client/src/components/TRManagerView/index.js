import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";

export default function TRManagerView(props) {
  const [employeeState, setEmployeeState] = useState({
    id: "",
    name: "",
    type: "",
    shift: "",
    day: ""
  });

  useEffect(() => {
    setEmployeeState({
      id: props.id,
      name: props.name,
      type: props.type,
      shift: props.shift,
      day: props.day
    });
  }, [])

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployeeState({
      ...employeeState,
      [name]: value.trim()
    });
  };

  const handleShiftUpdate = () => {
    API.updateShift(props.scheduleId, employeeState)
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="row">
      <tbody className="col-9">
        <tr className="row ops-tbl-row">
          <th className="col-2">{props.type}</th>
          <td className="col-5"><input type="text" class="form-control" value={employeeState.name} name="name" onChange={handleInputChange} /></td>
          <td className="col-5"><input type="text" class="form-control" value={employeeState.shift} name="shift" onChange={handleInputChange} /></td>
        </tr>
      </tbody>
      <button className="btn btn-dark col-3 ops-tbl-btn" onClick={handleShiftUpdate}>Update</button>
    </div>

  )
}