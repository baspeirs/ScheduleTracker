import React, {useState, useEffect} from "react";
import API from "../../utils/API";


export default function TimeOffCard(props) {
    const [coveredName, setCoveredName] = useState({
        coveredName: ""
    })

    useEffect(() => {
        if(props.users[1]) {
            API.getUser(props.users[1])
                .then(result => {
                    setCoveredName({ coveredName: result.data[0].name})
                })
                .catch(err => console.log(err))
        } else return
    }, [])

    const claimShift = () => {
        console.log(props.authState.user.name)
        API.claimTimeOff(props.id, { user: props.authState.user._id })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }

    const deleteRequest = () => {
        if(props.authState.user._id === props.users[0] || props.authState.user.manager === true) {
            API.deleteTimeRequest(props.id)
                .then(result => {
                    window.location.reload()
                })
                .catch(err => console.log(err))
        } else alert("You Dont have Access to delete this request.")
    }

    if (!props.users[1]) {
        return (
            <div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-11">{props.name}</h5>
                                <button className="col-1 btn btn-danger" onClick={deleteRequest}>X</button>
                            </div>
                            <div className="row">
                                <p className="col-lg-6">{props.type}</p>
                                <p className="card-text col-lg-6">{props.shift} {props.day}</p>
                            </div>
                            <a href="#" className="btn btn-primary" onClick={claimShift}>Claim Shift</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (props.users[1]) {
        return (
            <div>
                <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5 className="card-title col-11">{props.name}</h5>
                                <button className="col-1 btn btn-danger" onClick={deleteRequest}>X</button>
                            </div>
                            <div className="row">
                                <p className="col-lg-6">{props.type}</p>
                                <p className="card-text col-lg-6">{props.shift} {props.day}</p>
                            </div>
                            <p className="btn btn-success">Shift claimed by: {coveredName.coveredName}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}