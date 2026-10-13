const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const pointSchema = new Schema(
    {
        teamMember: {type: String, required: true, unique: false},
        description: {type: String, required: true, unique: false},
        value: {type: String, required: true, unique: false}
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('Point', pointSchema);