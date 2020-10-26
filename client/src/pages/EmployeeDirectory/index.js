import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import NavBar from "../../components/NavBar";
import EmployeeCard from "../../components/EmployeeCard";
import ManagerOpsNav from "../../components/ManagerOpsNav";
import ManagerOperations from "../../components/ManagerOpsNav";

export default function EmployeeDirectory(props) {
    const [employeesState, setEmployeesState] = useState({
        employees: []
    })

    useEffect(() => {
        let tempEmpArr = []
        API.getEmployees()
            .then(result => {
                result.data.forEach(employee => {
                    tempEmpArr.push(employee)
                });
                setEmployeesState({
                    employees: tempEmpArr
                })
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <NavBar logout={props.logout} authState={props.authState} />
            <div className="container">
                <div className="row">
                    <ManagerOpsNav className="col-md-3" />
                    <div className="col-md-9">
                        <h2>Employee Directory</h2>
                        {employeesState.employees.map(employee => (
                            <EmployeeCard
                                email={employee.email}
                                name={employee.name}
                                username={employee.username}
                                id={employee._id}
                                manager={employee.manager}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}