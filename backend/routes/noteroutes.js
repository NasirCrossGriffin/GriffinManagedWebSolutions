const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Note = require("../models/Note");
const Lead = require("../models/Lead");


// ADMIN KEY MIDDLEWARE
router.use((req, res, next) => {

    const adminKey = req.body?.admin_key || req.query?.admin_key;

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {

        return res.status(401).json({
            message: "Unauthorized."
        });

    }

    next();

});


// GET ALL NOTES BY LEAD ID
// GET /api/notes/lead/:leadId
router.get("/lead/:leadId", async (req, res) => {

    try {

        const { leadId } = req.params;

        if (!mongoose.isValidObjectId(leadId)) {

            return res.status(400).json({
                message: "Invalid lead ID."
            });

        }

        const notes = await Note.find({
            lead: leadId
        }).sort({ createdAt: -1 });

        return res.status(200).json(notes);

    } catch (error) {

        return res.status(500).json({
            message: "Failed to retrieve lead notes.",
            error: error.message
        });

    }

});


// CREATE NOTE
// POST /api/notes
router.post("/", async (req, res) => {

    try {

        const { lead, note } = req.body;

        if (!mongoose.isValidObjectId(lead)) {

            return res.status(400).json({
                message: "A valid lead ID is required."
            });

        }

        if (typeof note !== "string" || !note.trim()) {

            return res.status(400).json({
                message: "Note cannot be empty."
            });

        }

        const existingLead = await Lead.findById(lead);

        if (!existingLead) {

            return res.status(404).json({
                message: "Lead not found."
            });

        }

        const newNote = await Note.create({
            lead,
            note: note.trim()
        });

        return res.status(201).json(newNote);

    } catch (error) {

        return res.status(500).json({
            message: "Failed to create note.",
            error: error.message
        });

    }

});


// UPDATE NOTE
// PUT /api/notes/:noteId
router.put("/:noteId", async (req, res) => {

    try {

        const { noteId } = req.params;
        const { note } = req.body;

        if (!mongoose.isValidObjectId(noteId)) {

            return res.status(400).json({
                message: "Invalid note ID."
            });

        }

        if (typeof note !== "string" || !note.trim()) {

            return res.status(400).json({
                message: "Note cannot be empty."
            });

        }

        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {
                $set: {
                    note: note.trim()
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNote) {

            return res.status(404).json({
                message: "Note not found."
            });

        }

        return res.status(200).json(updatedNote);

    } catch (error) {

        return res.status(500).json({
            message: "Failed to update note.",
            error: error.message
        });

    }

});


// DELETE NOTE
// DELETE /api/notes/:noteId
router.delete("/:noteId", async (req, res) => {

    try {

        const { noteId } = req.params;

        if (!mongoose.isValidObjectId(noteId)) {

            return res.status(400).json({
                message: "Invalid note ID."
            });

        }

        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {

            return res.status(404).json({
                message: "Note not found."
            });

        }

        return res.status(200).json({
            message: "Note deleted successfully.",
            deletedNote
        });

    } catch (error) {

        return res.status(500).json({
            message: "Failed to delete note.",
            error: error.message
        });

    }

});

module.exports = router;