const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const leadSchema = new Schema(
    {
        type: {type: String, enum: [
            "CALL",
            "EMAIL",
            "INSTAGRAM",
            "LINKEDIN",
            "FACEBOOK",
            "VISIT"
        ]},
        firstName: {type: String, required: false, unique: false},
        lastName: {type: String, required: false, unique: false},
        company: {type: String, required: true, unique: false},
        contact: {type: String, required: true, unique: false},
        teamMember: {type: String, required: true, unique: false},
        result: {type: String, required: true, enum: [
            "NO ANSWER",
            "INTERESTED",
            "UNINTERESTED",
            "UNSURE",
            "BUSY",
            "GATEKEEPER",
            "MEETING_BOOKED",
        ]},
        followUp: {type: Boolean, required: true, unique: false},
        inboundOrOutbound: {type: Boolean, required: true, unique: false}
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Lead', leadSchema);