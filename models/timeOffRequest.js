const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeOffRequest = new Schema({
    name: {
        type: String,
        // required: "Make Sure a Name is input"
    },
    created: { type: Date, required: true, default: Date.now() },
    day: String,
    type: String,
    shift: String,
    // users is an array that will hold the posted user in [0] and the person who claimed the shift in [1]
    users:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model('TimeOffRequest', TimeOffRequest);