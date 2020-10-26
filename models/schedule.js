const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schedule = new Schema({
    week: Number,
    days: [
        {
            day: String,
            employees: [
                {
                    name: "",
                    type: "",
                    shift: ""
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Schedule', Schedule);