import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Schedule from './pages/Schedule';
import TimeOff from "./pages/TimeOff";
import ManagerOperations from "./pages/MagnagerOperations";
import ChangeSchedule from "./pages/ChangeSchedule";
import API from "./utils/API";
import EmployeeDirectory from "./pages/EmployeeDirectory";

function App() {
  let [authState, setAuthState] = useState({
    authorized: false,
    display: false,
    user: {}
  });

  useEffect(() => {
    isAuthorized();
  }, [])


  const isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        setAuthState({
          authorized: res.data.message ? false : true,
          display: true,
          user: res.data.message ? {} : res.data,
        })
      })
      .catch(err => {
        console.log(err);
        setAuthState({ 
          authorized: false,
          display: true 
        });
      });
  };

  const logout = e => {
    e.preventDefault();
    API.logout()
      .then(res => {
        console.log(res.data.message)
        isAuthorized()
      })
      .catch(err => console.log(err));
  }
  return (
    <React.Fragment>
      {authState.display ? 
        (<Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                {authState.authorized ? <Redirect to="/home" /> : <Login isAuthorized={isAuthorized} />} 
              </Route>
              <Route exact path="/home" >
                {authState.authorized ? (
                  <Schedule  logout={logout} authState={authState} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route exact path="/timeoff" >
                {authState.authorized ? (
                  <TimeOff  logout={logout} authState={authState} />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>
              <Route exact path="/manageroperations" >
                {authState.user.manager ? (
                  <ManagerOperations  logout={logout} authState={authState} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/changeschedule" >
                {authState.user.manager ? (
                  <ChangeSchedule  logout={logout} authState={authState} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
              <Route exact path="/employeedirectory" >
                {authState.user.manager ? (
                  <EmployeeDirectory  logout={logout} authState={authState} />
                ) : (
                  <Redirect to="/home" />
                )}
              </Route>
            </Switch>
          </div>
        </Router>) 
        : ""
    }
    </React.Fragment>
  );
}

export default App;
