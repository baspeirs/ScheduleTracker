import React, { useState } from "react";
import API from "../../utils/API";
import { Link } from 'react-router-dom';
import "./style.css";


export default function ManagerOperations(props) {
    const [employeeState, setEmployeeState] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        manager: false
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEmployeeState({
            ...employeeState,
            [name]: value
        });
    };

    const handleCheck = e => {
        const name = e.target.name;
        if (e.target.checked) {
            setEmployeeState({
                ...employeeState,
                [name]: true
            })
        } else {
            setEmployeeState({
                ...employeeState,
                [name]: false
            })
        }
    };

    const handleSubmit = () => {
        API.saveUser({
            username: employeeState.username,
            name: employeeState.name,
            email: employeeState.email,
            password: employeeState.password,
            manager: employeeState.manager
        })
            .then(result => {
                console.log(result)
                alert("Employee successfully added!");
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <nav class="nav flex-column">
                        <Link to="/employeedirectory"><a className="nav-link" href="#"><button className="btn btn-dark ops-nav-btn">Employee Directory</button></a></Link>
                        <Link to="/changeschedule"><a className="nav-link" href="#"><button className="btn btn-dark ops-nav-btn">Change Schedule</button></a></Link>
                        <a className="nav-link" href="#" title="Create Post" data-toggle="modal" data-target="#requestModal"><button className="btn btn-dark ops-nav-btn">Add Employee</button></a>
                    </nav>
                </div>
                <div className="modal" id="requestModal" tabindex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Employee Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="form-group mx-sm-3 mb-2">
                                        <label for="inputPassword2" class="sr-only">Username</label>
                                        <input type="text" class="form-control" id="inputPassword2" placeholder="Username" name="username" value={employeeState.username} onChange={handleInputChange} />
                                    </div>
                                    <div class="form-group mx-sm-3 mb-2">
                                        <label for="inputPassword2" class="sr-only">First and Last Name</label>
                                        <input type="text" class="form-control" id="inputPassword2" placeholder="First and Last Name" name="name" value={employeeState.name} onChange={handleInputChange} />
                                    </div>
                                    <div class="form-group mx-sm-3 mb-2">
                                        <label for="inputPassword2" class="sr-only">Email Address</label>
                                        <input type="text" class="form-control" id="inputPassword2" placeholder="Email Address" name="email" value={employeeState.email} onChange={handleInputChange} />
                                    </div>
                                    <div class="form-group mx-sm-3 mb-2">
                                        <label for="inputPassword2" class="sr-only">Password</label>
                                        <input type="password" class="form-control" id="inputPassword2" placeholder="Password" name="password" value={employeeState.password} onChange={handleInputChange} />
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" name="manager" onChange={handleCheck} />
                                        <label class="form-check-label" for="defaultCheck1">Check if Employee is a schedule editor</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit} >Add Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}