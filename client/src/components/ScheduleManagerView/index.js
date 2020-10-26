import React, { useState, useEffect } from "react";
import TRManagerView from "../../components/TRManagerView/";

export default function ScheduleManagerView(props) {
    const [employeeState, setEmployeeState] = useState({
        managers: [],
        drivers: [],
        inshops: []
    })

    useEffect(() => {
        // arrays to store employees by type
        let managerArr = [];
        let driverArr = [];
        let inshopArr = [];
        // loop to push employees to proper array
        props.employees.forEach(employee => {
            if (employee.type === "Manager") { managerArr.push(employee) }
            else if (employee.type === "Driver") driverArr.push(employee)
            else if (employee.type === "In-Shop") inshopArr.push(employee)
            else console.log("employee issue, fix things");
            // set state with the employee arrays
            setEmployeeState({
                managers: managerArr,
                drivers: driverArr,
                inshops: inshopArr
            });
        });
    }, [])

    return (
        <div>
            <h3 style={{marginTop: "15px", fontWeight: "bold"}}>{props.day}</h3>
            <table class="table table">
                {employeeState.managers.map(employee => (
                    <TRManagerView
                        day={props.day}
                        scheduleId={props.scheduleId}
                        id={employee._id}
                        type={employee.type}
                        name={employee.name}
                        shift={employee.shift}
                    />
                ))}
                {employeeState.inshops.map(employee => (
                    <TRManagerView
                        day={props.day}
                        scheduleId={props.scheduleId}
                        id={employee._id}
                        type={employee.type}
                        name={employee.name}
                        shift={employee.shift}
                    />
                ))}
                {employeeState.drivers.map(employee => (
                    <TRManagerView
                        day={props.day}
                        scheduleId={props.scheduleId}
                        id={employee._id}
                        type={employee.type}
                        name={employee.name}
                        shift={employee.shift}
                    />
                ))}
            </table>
        </div>
    )
}