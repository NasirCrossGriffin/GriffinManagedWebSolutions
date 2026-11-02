const mongoose = require("mongoose");

const { Schema } = mongoose;

const NoteSchema = new Schema(
    {
        lead: {
            type: Schema.Types.ObjectId,
            ref: "Lead",
            required: true,
            index: true
        },

        note: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Note", NoteSchema);