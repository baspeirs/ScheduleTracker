const passport = require("passport");
const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("./models");
const timeOffController = require("./controllers/timeOffController");
var isAuthenticated = require("./config/middleware/isAuthendticated");
const schedule = require("./models/schedule");

// register user route
router.post("/api/register", (req, res) => {
    console.log("registering user.");

    db.User.register(
        new db.User({
            username: req.body.username,
            email: req.body.email,
            created: req.body.created,
            name: req.body.name,
            phoneNumber: req.body.number,
            manager: req.body.manager
        }),
        req.body.password,
        function(err, user) {
            if (err) {
                return res.json(err)
            }
            passport.authenticate("local", { session: false })
            (req, res, function(data) {
                res.json(req.user);
            })
        }
    )
});

// user login route (use a post request for log in)
router.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) next(err);
        if (!user) res.json(info);
        req.logIn(user, err => {
            if (err) next(err);
            return res.json(user)
        });
    })(req, res, next);
});

// user log out route (get request for logout function)
router.get("/api/logout", (req, res) => {
    req.logout();
    res.json({ message: "logged out" });
})

router.get("/api/authorized", isAuthenticated, function (req, res) {
    res.json(req.user);
});

// get user route
router.get("/api/user/:id", (req, res) => {
    db.User.find({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
})

// get all employees route
router.get("/api/getemployees", (req, res) => {
    db.User.find({})
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// delete employee route
router.delete("/api/deleteemployee/:id", (req, res) => {
    db.User.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

// ===== Time off Requests =====
router.post("/api/timeoffpost", (req, res) => {
    db.TimeOffRequest.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})

router.get("/api/timeoffrequests", (req, res) => {
    db.TimeOffRequest.find({})
        .then(request => {
            res.json(request)
        })
        .catch(err => console.log(err))
})

router.put("/api/timeoffclaim/:id", (req, res) => {
    db.TimeOffRequest.findOneAndUpdate({ _id: req.params.id }, { $push: { users: req.body.user } }, { new: true })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err))
})

router.delete("/api/deleteTimeReqeust/:id", (req, res) => {
    db.TimeOffRequest.deleteOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

// ===== Schedule Routes =====

router.post("/api/addschedule", (req, res) => {
    db.Schedule.create(req.body)
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.get("/api/getschedule", (req, res) => {
    db.Schedule.find({})
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.put("/api/updateshift/:id", (req, res) => {
    db.Schedule.findById(req.params.id, (err, schedule) => {
        for (let i = 0; i < schedule.days.length; i++) {
            // find and match the day
            if (schedule.days[i].day === req.body.day) {
                for (let j = 0; j < schedule.days[i].employees.length; j++) {
                    // find and match the id of the employee on that day
                    // odd, had to == instead of ===
                    if (schedule.days[i].employees[j]._id == req.body.id) {
                        console.log("hello I work!")
                        schedule.days[i].employees[j].name = req.body.name
                        schedule.days[i].employees[j].shift = req.body.shift
                        schedule.save((err) => {
                            if (err) throw err
                            else console.log("updated")
                        })
                    }
                }
            }
        }
    })
});

// ===== Seed Routes =====
// these seed routes are for heroku deployment and can be deleted after app is functional

router.post("/api/seeddefaultschedule", (req, res) => {
    const defaultSchedule = require("./seeds/schedule.js")
    db.Schedule.create(defaultSchedule)
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

router.post("/api/seeddefaultuser", (req, res) => {
    const defaultUser = require("./seeds/defaultManager");

    db.User.register(
        new db.User({
            username: defaultUser.username,
            email: defaultUser.email,
            created: defaultUser.created,
            name: defaultUser.name,
            phoneNumber: defaultUser.number,
            manager: defaultUser.manager
        }),
        defaultUser.password,
        (err, user) => {
            if (err) {
                console.log(err);
                return res.json(err)
            }
            passport.authenticate("local", { session: false }),
                (req, res, (data) => {
                    console.log(data);
                    return res.json(user);
                })
        }
    )
});

module.exports = router;