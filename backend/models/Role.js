const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const roleSchema = new Schema(
    {
        title: {type: String, required: true, unique: false},
        description: {type: String, required: true, unique: false},
        department:  {
            type: String, 
            enum: [
                'SALES',
                'FINANCE',
                'MARKETING',
                'ENGINEERING',
                'OPERATIONS',
                'EXECUTIVE'
            ]
        },
        teamMember: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true
        }
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Role', roleSchema);