import React, {useState, useEffect} from "react";
import Table from "../../components/Table";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";

export default function Schedule(props) {
    const [schedule, setSchedule] = useState({
        days: []
    })

    useEffect(() => {
        let dayHolder = []
        API.getSchedule()
            .then(result => {
                console.log(result)
                result.data[0].days.forEach(element => {
                    let dayObj = {
                        day: element.day,
                        employees: element.employees
                    };
                    dayHolder.push(dayObj);
                    setSchedule({
                        days: dayHolder
                    })
                })
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <NavBar logout={props.logout} authState={props.authState}/>
            <div className="container">
                <div className="row">
    <h1 className="col-lg-6">Welcome {props.authState.user.name}!</h1>
                </div>
                <div className="row">
                    {schedule.days.map(day => (
                        <Table 
                        day={day.day}
                        employees={day.employees} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}