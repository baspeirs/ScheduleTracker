import React, { useState } from "react";
import ManagerOpsNav from "../../components/ManagerOpsNav";
import NavBar from "../../components/NavBar";

export default function ManagerOperations(props) {

    return (
        <div>
            <NavBar logout={props.logout} authState={props.authState} />
            <div className="container">
                <div className="row">
                    <ManagerOpsNav />
                </div>
            </div>
        </div>
    )
}