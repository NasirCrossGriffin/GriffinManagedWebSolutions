const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const punchSchema = new Schema(
    {
        teamMember: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true
        }, 
        type: {
            type: String,
            enum: [
                "CLOCK_IN",
                "CLOCK_OUT"
            ],
            required: true
        }
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Punch', punchSchema);