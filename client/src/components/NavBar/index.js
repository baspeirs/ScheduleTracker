import React from "react";
import Logo from "../../images/Logo.png";
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><img alt="logo" src={Logo} style={{width: "50px"}}/> ScheduleTracker</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <Link to="/home"><li className="nav-item"><a className="nav-link" href="#">Home</a></li></Link>
                    <Link to ="timeoff"><li className="nav-item"><a className="nav-link" href="#">Time Off</a></li></Link>
                    <Link to="manageroperations"><li className="nav-item"><a className="nav-link" href="#">Manager Ops</a></li></Link>
                    <li className="nav-item"><a className="nav-link" href="#" onClick={props.logout}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    )
}