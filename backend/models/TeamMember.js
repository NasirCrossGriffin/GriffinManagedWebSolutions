const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const teamMemberSchema = new Schema(
    {
        firstName: {type: String, required: true, unique: false},
        lastName: {type: String, required: true, unique: false},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true, unique: false},
        level: {type: Number, required: true, unique: false},
        profilePic: {type: String, unique: false},
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
            default: 'ACTIVE'
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        lastLogin: {
            type: Date,
            default: null
        },
        admin: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('TeamMember', teamMemberSchema);