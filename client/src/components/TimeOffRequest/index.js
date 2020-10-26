import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import TimeOffCard from "../../components/TimeOffCard";

export default function TimeOffRequest(props) {
    const [request, setRequests] = useState({
        requests: []
    })

    useEffect(() => {
        API.getTimeOff()
            .then(result => {
                setRequests({ requests: result.data })
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <div>
            {request.requests.map(request => (
                <TimeOffCard 
                    id={request._id}
                    name={request.name}
                    shift={request.shift}
                    day={request.day}
                    type={request.type}
                    users={request.users}
                    authState={props.authState}
                />
            ))}
        </div>
    )
} 