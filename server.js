const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Passport setup
require("dotenv").config();
const session = require("express-session");
const passport = require("./config/passport");
app.use(session({ secret: process.env.SECRET_SESSION, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// serve up static files on heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

// connect to Mongo database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/scheduletracker", {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
  });

// start the server
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});