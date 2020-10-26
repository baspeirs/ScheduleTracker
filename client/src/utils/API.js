import axios from "axios";

export default {
  saveUser: function (userData) {
    return axios.post("/api/register", userData);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  // TOR = Time Off Request
  postTimeOff: (TOR) =>{
    return axios.post("/api/timeoffpost", TOR);
  },
  getTimeOff: () => {
    return axios.get("/api/timeoffrequests");
  },
  claimTimeOff: (id, user) => {
    return axios.put("/api/timeoffclaim/" + id, user);
  },
  getUser: (id) => {
    return axios.get("/api/user/" + id);
  },
  deleteTimeRequest: (id) => {
    return axios.delete("/api/deleteTimeReqeust/" + id);
  },
  getSchedule: () => {
    return axios.get("/api/getschedule")
  },
  updateShift: (id, shiftObj) => {
    return axios.put("/api/updateshift/" + id, shiftObj);
  },
  getEmployees: () => {
    return axios.get("/api/getemployees");
  },
  deleteEmployee: id => {
    return axios.delete("/api/deleteemployee/" + id);
  },
  seedDefaultUser: () => {
    return axios.post("/api/seeddefaultuser")
  },
  seedDefaultSchedule: () => {
    return axios.post("/api/seeddefaultschedule")
  }
}