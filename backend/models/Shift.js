const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const shiftSchema = new Schema(
    {
        teamMember: { 
            type: Schema.Types.ObjectId, 
            ref: 'TeamMember', 
            required: true 
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true,
            validate: {
                validator: function(value) {
                    return value > this.startTime;
                },
                message: 'Shift endTime must be after startTime.'
            }
        }
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Shift', shiftSchema);