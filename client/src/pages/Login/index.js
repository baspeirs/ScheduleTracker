import React, { useState } from "react";
import API from "../../utils/API";
import "./style.css";
import Logo from "../../images/Logo.png";

export default function Login(props) {
    const [userState, setUserState] = useState({
        username: "",
        password: "",
        error: "",
        display: false,
        redirect: "/",
        loggedIn: true
    })

    const login = e => {
        e.preventDefault();
        API.login({
            username: userState.username,
            password: userState.password
        })
            .then(res => {
                if (res.data.message) {
                    setUserState({
                        error: res.data.message
                    });
                } else {
                    console.log("login successful")
                    props.isAuthorized();
                    setUserState({ ...userState, loggedIn: true })
                }
            })
            .catch(err => {
                console.log(err);
                setUserState({ error: "A server error has occured." });
            });

        setUserState({ password: "" });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserState({
            ...userState,
            [name]: value
        });
    };

    // ===== functions for seeding database after deployment ===== 
    // const userSeed = () => {
    //     API.seedDefaultUser()
    // };

    // const scheduleSeed = () => {
    //     API.seedDefaultSchedule()
    // };

    return (
        <div className="container">
            <div className="row" id="login-header">
                <img alt="logo" src={Logo} id="logo" className="col-lg-2"/>
                <div className="col-lg-8" id="login-header-col">
                    <h1 id="MySchedule">MySchedule</h1>
                    <h2 id="store-number">Store #1457</h2>
                </div>
            </div>
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" name="username" value={userState.username} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name="password" value={userState.password} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn btn-dark" onClick={login}>Submit</button>
            </form>
            {/* Buttons to call seed functions */}
            {/* <div>
                <button onClick={userSeed}>Seed the default user</button>
                <button onClick={scheduleSeed}>Seed the default schedule</button>
            </div> */}

            <div id="login-info-div">
                <h3>Use this login info to log in as a manager (This app was designed for demonstration only)</h3>
                <p>Username: user1</p>
                <p>Password: password1</p>
            </div>
        </div>
    )
}