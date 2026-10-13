const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: [
                'CALL',
                'ZOOM',
                'GOOGLE_MEETS',
                'VISIT'
            ]
        },

        firstName: {
            type: String,
            required: false
        },

        lastName: {
            type: String,
            required: false
        },

        company: {
            type: String,
            required: true
        },

        contact: {
            type: String,
            required: true
        },

        setter: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true
        },

        closer: {
            type: Schema.Types.ObjectId,
            ref: 'TeamMember',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Meeting', meetingSchema);