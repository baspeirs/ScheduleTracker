import React from "react";
import API from "../../utils/API";

export default function EmployeeCard(props) {

    const deleteEmployee = () => {
        API.deleteEmployee(props.id)
            .then(result => {
                alert("employee deleted")
                window.location.reload()
            })
    }

    if (props.manager) {
        return (
            <div>
                <div className="card" style={{ marginTop: "15px" }}>
                    <div className="card-body">
                        <div className="row">
                            <h3 className="card-title col-lg-10">{props.name}</h3>
                            <button className="btn btn-danger col-lg-2" onClick={deleteEmployee}>X</button>
                        </div>
                        <p className="card-text">Username: {props.username}</p>
                        <p className="card-text">Email: {props.email}</p>
                        <p className="card-text">This employee is a manager</p>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="card" style={{ marginTop: "15px" }}>
                <div className="card-body">
                    <div className="row">
                        <h3 className="card-title col-lg-10">{props.name}</h3>
                        <button className="btn btn-danger col-lg-2" onClick={deleteEmployee}>X</button>
                    </div>
                    <p className="card-text">Username: {props.username}</p>
                    <p className="card-text">Email: {props.email}</p>
                </div>
            </div>
        </div>
    )
}