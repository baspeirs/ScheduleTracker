import React, { useState, useEffect } from "react";
import API from "../../utils/API";

export default function RequestTimeModal(props) {
    // TOR = Time Off Request
    const [TORState, setTORState] = useState({
        name: "",
        day: "Monday", // default 
        type: "In-Shop", // default
        shift: "",
        users: [props.authState.user._id]
      });

      useEffect(() => {
        setTORState({
            ...TORState,
            name: props.authState.user.name
        });
      }, [])

      const handleInputChange = event => {
        const { name, value } = event.target;
        setTORState({
            ...TORState,
            [name]: value.trim()
        });
    };

    const handleDropDown = e => {
        const { name, value } = e.target;
        setTORState({
            ...TORState,
            [name]: value
        })
    }

    const handleSubmit = () => {
        API.postTimeOff(TORState)
        .then(response => {
            console.log(response);
            window.location.reload();
        })
    }

    return (
        <div>
            <button type="button" className="modalBtn btn btn-dark" title="Create Post" data-toggle="modal" data-target="#requestModal" style={{margin: "15px"}}>
                Request Time Off
            </button>
            <div className="modal" id="requestModal" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Time Off Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Select Day</label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={handleDropDown} name="day" placeholder="Select Day">
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                        <option>Sunday</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Type</label>
                                    <select class="form-control" id="exampleFormControlSelect1" onChange={handleDropDown} name="type">
                                        <option>In-Shop</option>
                                        <option>Driver</option>
                                        <option>Manager</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Shift</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" name="shift" value={TORState.shift} onChange={handleInputChange}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}