const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: {
        type: String,
        required: "Employees need a username for sign in"
    },
    email: {
        type: String,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    created: { type: Date, required: true, default: Date.now() },
    name: {
        type: String,
        required: "Plsease give the employee a name"
    },
    phoneNumber: Number,
    manager: Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);