import React, { useState, useEffect } from "react";
import DriverTableRow from "../DriverTableRow";
import TableHead from "../TableHead";
import ManagerTableRow from "../ManagerTableRow";
import InShopTableRow from "../InShopTableRow";

export default function Table(props) {
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
        <div className="col-lg-3">
            <table className="table table-striped">
                <TableHead day={props.day} style={{ width: "100%" }} />

                {/* creates a table row for the manager section */}
                <thead><tr><th>Manager</th></tr></thead>
                {employeeState.managers.map(manager => (
                    <ManagerTableRow manager={manager} />
                ))}

                {/* creates a table row for the in shop section */}
                <thead><tr><th>In-Shop</th></tr></thead>
                {employeeState.inshops.map(inshop => (
                    <InShopTableRow inshop={inshop} />
                ))}

                {/* creates a table row for the driver section */}
                <thead><tr><th>Driver</th></tr></thead>
                {employeeState.drivers.map(driver => (
                    <DriverTableRow driver={driver} />
                ))}
            </table>
        </div>
    )
}