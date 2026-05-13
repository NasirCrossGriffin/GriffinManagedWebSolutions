const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const contactSchema = new Schema(
    {
        company: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: false},
        phonenumber: {type: String, required: true, minLength: 7},
		message: {type: String, required: true}
    }
)

module.exports = mongoose.model('Contact', contactSchema);