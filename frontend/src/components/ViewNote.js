
import React, { useEffect, useState } from "react";

import "./ViewNote.css";

import {
    updateNote,
    deleteNote
} from "../middleware/note-middleware";


function ViewNote({
    selectedNote,
    setToggleNote,
    getAllNotes
}) {

    const [updateNoteView, setUpdateNoteView] = useState(false);
    const [updatedNoteText, setUpdatedNoteText] = useState("");

    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState("");
    const [confirmationType, setConfirmationType] = useState("");


    // INITIALIZE NOTE TEXT
    useEffect(() => {

        if (selectedNote) {

            setUpdatedNoteText(selectedNote.note || "");

        }

    }, [selectedNote]);


    // CONVERT ISO TO READABLE DATE
    function formatIsoString(value) {

        if (!value) return "";

        const date = new Date(value);

        if (isNaN(date.getTime())) return value;

        return date.toLocaleString("en-US", {
            timeZone: "America/Chicago",
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

    }


    // UPDATE NOTE
    async function updateNoteHandler() {

        if (!selectedNote?._id || loading) return;

        if (!updatedNoteText.trim()) {

            setConfirmation("Note cannot be empty.");
            setConfirmationType("error");

            return;

        }

        setLoading(true);
        setConfirmation("");

        try {

            const updatedNote = await updateNote(
                selectedNote._id,
                {
                    note: updatedNoteText.trim()
                }
            );

            if (!updatedNote?._id) {

                throw new Error(
                    updatedNote?.message || "Failed to update note."
                );

            }

            await getAllNotes();

            setToggleNote(false);

        } catch (error) {

            console.error("Failed to update note:", error);

            setConfirmation(
                error.message || "Failed to update note."
            );

            setConfirmationType("error");

        } finally {

            setLoading(false);

        }

    }


    // DELETE NOTE
    async function removeNoteHandler() {

        if (!selectedNote?._id || loading) return;

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this note?"
        );

        if (!confirmed) return;

        setLoading(true);
        setConfirmation("");

        try {

            const removedNote = await deleteNote(
                selectedNote._id
            );

            if (!removedNote || !removedNote.deletedNote) {

                throw new Error(
                    removedNote?.message || "Failed to delete note."
                );

            }

            await getAllNotes();

            setToggleNote(false);

        } catch (error) {

            console.error("Failed to delete note:", error);

            setConfirmation(
                error.message || "Failed to delete note."
            );

            setConfirmationType("error");

        } finally {

            setLoading(false);

        }

    }


    if (!selectedNote) return null;


    return (

        <div className="ViewNote">

            <div
                className="NoteBackground"
                onClick={() => setToggleNote(false)}
            />


            <div className="ViewNoteContainer">

                <div className="ViewNoteContent">

                    <p>
                        {formatIsoString(selectedNote.createdAt)}
                    </p>


                    <div className="NoteText">

                        <p>{selectedNote.note}</p>

                    </div>


                    {updateNoteView && (

                        <div className="UpdateNote">

                            <textarea
                                value={updatedNoteText}
                                onChange={(e) => {

                                    setUpdatedNoteText(e.target.value);

                                    setConfirmation("");

                                }}
                            />

                            <button
                                onClick={updateNoteHandler}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Confirm Update"}
                            </button>

                        </div>

                    )}


                    {confirmation && (

                        <p className={`NoteConfirmation ${confirmationType}`}>
                            {confirmation}
                        </p>

                    )}


                    <div className="NoteButtons">

                        <button
                            onClick={removeNoteHandler}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Remove"}
                        </button>

                        <button
                            onClick={() => {

                                setUpdateNoteView(!updateNoteView);
                                setConfirmation("");

                            }}
                            disabled={loading}
                        >
                            {updateNoteView ? "Cancel Update" : "Update"}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ViewNote;
