import React from "react";
import NavBar from "../../components/NavBar";
import RequestTimeModal from "../../components/RequestTimeModal";
import TimeOffRequest from "../../components/TimeOffRequest";

export default function TimeOff(props) {
    return (
        <div>
            <NavBar authState={props.authState} logout={props.logout} />
            <div className="container">
                <h2>Time Off Requests</h2>
                <RequestTimeModal authState={props.authState} />
                <TimeOffRequest authState={props.authState} />
            </div>
        </div>
    )
}