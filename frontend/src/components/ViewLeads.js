
import React, { useEffect, useState } from "react";

import "./ViewLeads.css";

import {
    updateLead,
    deleteLead
} from "../middleware/lead-middleware";

import {
    createNote,
    getAllNotesByLeadId
} from "../middleware/note-middleware";

import ViewNote from "./ViewNote";


function ViewLeads({
    lead,
    loadLeads,
    setViewLeads
}) {

    const [currentLead, setCurrentLead] = useState(lead);

    const [result, setResult] = useState(lead?.result || "INTERESTED");
    const [type, setType] = useState(lead?.type || "CALL");
    const [followUp, setFollowUp] = useState(lead?.followUp ?? false);
    const [viewed, setViewed] = useState(lead?.viewed ?? false);

    const [followUpDate, setFollowUpDate] = useState(
        lead?.followUpDate || ""
    );

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState(false);
    const [noteInput, setNoteInput] = useState("");
    const [selectedNote, setSelectedNote] = useState(null);
    const [toggleNote, setToggleNote] = useState(false);

    const [loading, setLoading] = useState(false);
    const [noteLoading, setNoteLoading] = useState(false);

    const [confirmation, setConfirmation] = useState("");
    const [confirmationType, setConfirmationType] = useState("");


    useEffect(() => {

        setCurrentLead(lead);
        setResult(lead?.result || "INTERESTED");
        setType(lead?.type || "CALL");
        setFollowUp(lead?.followUp ?? false);
        setViewed(lead?.viewed ?? false);
        setFollowUpDate(lead?.followUpDate || "");

    }, [lead]);


    useEffect(() => {

        if (!lead?._id) return;

        let active = true;

        async function acquireNotes() {

            const acquiredNotes = await getAllNotesByLeadId(lead._id);

            if (active) {
                setNotes(Array.isArray(acquiredNotes) ? acquiredNotes : []);
            }

        }

        acquireNotes();

        return () => {
            active = false;
        };

    }, [lead?._id]);


    // CONVERT ISO TO READABLE DATE AND TIME
    function formatIsoString(value) {

        if (!value) return "N/A";

        const date = new Date(value);

        if (isNaN(date.getTime())) return "N/A";

        return date.toLocaleString("en-US", {
            timeZone: "America/Chicago",
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZoneName: "short"
        });

    }


    // CONVERT ISO TO HOUSTON DATE INPUT VALUE
    function getDateInputValue(value) {

        if (!value) return "";

        const date = new Date(value);

        if (isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat("en-CA", {
            timeZone: "America/Chicago",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);

    }


    // CONVERT ISO TO HOUSTON TIME INPUT VALUE
    function getTimeInputValue(value) {

        if (!value) return "";

        const date = new Date(value);

        if (isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat("en-GB", {
            timeZone: "America/Chicago",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        }).format(date);

    }


    // CONVERT HOUSTON DATE AND TIME TO UTC
    function chicagoDateTimeToISO(dateValue, timeValue) {

        if (!dateValue || !timeValue) return null;

        const [year, month, day] = dateValue.split("-").map(Number);
        const [hours, minutes] = timeValue.split(":").map(Number);

        if (
            !year || !month || !day ||
            !Number.isInteger(hours) ||
            !Number.isInteger(minutes)
        ) {
            return null;
        }

        const requestedLocal = Date.UTC(
            year,
            month - 1,
            day,
            hours,
            minutes
        );

        let timestamp = requestedLocal;

        // Resolve the America/Chicago UTC offset for the selected date.
        for (let i = 0; i < 3; i++) {

            const parts = new Intl.DateTimeFormat("en-US", {
                timeZone: "America/Chicago",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23"
            }).formatToParts(new Date(timestamp));

            const values = {};

            parts.forEach((part) => {
                values[part.type] = part.value;
            });

            const displayedLocal = Date.UTC(
                Number(values.year),
                Number(values.month) - 1,
                Number(values.day),
                Number(values.hour),
                Number(values.minute),
                Number(values.second)
            );

            timestamp += requestedLocal - displayedLocal;

        }

        const resultDate = new Date(timestamp);

        // Reject nonexistent local times during DST transitions.
        if (
            getDateInputValue(resultDate.toISOString()) !== dateValue ||
            getTimeInputValue(resultDate.toISOString()) !== timeValue
        ) {
            return null;
        }

        return resultDate.toISOString();

    }


    // UPDATE LEAD
    async function updateLeadField(updates) {

        if (!currentLead?._id || loading) return false;

        setLoading(true);
        setConfirmation("");

        try {

            const updated = await updateLead(
                currentLead._id,
                updates
            );

            if (!updated?._id) {

                throw new Error(
                    updated?.message || "Failed to update lead."
                );

            }

            setCurrentLead(updated);

            setResult(updated.result);
            setType(updated.type);
            setFollowUp(updated.followUp);
            setViewed(updated.viewed);
            setFollowUpDate(updated.followUpDate || "");

            setConfirmation("Lead updated successfully.");
            setConfirmationType("success");

            if (loadLeads) {
                await loadLeads();
            }

            return true;

        } catch (error) {

            console.error("Failed to update lead:", error);

            setConfirmation(
                error.message || "Failed to update lead."
            );

            setConfirmationType("error");

            return false;

        } finally {

            setLoading(false);

        }

    }


    // UPDATE RESULT
    async function updateResultHandler(value) {

        await updateLeadField({
            result: value
        });

    }


    // UPDATE OUTREACH TYPE
    async function updateTypeHandler(value) {

        await updateLeadField({
            type: value
        });

    }


    // UPDATE FOLLOW-UP REQUIREMENT
    async function updateFollowUpHandler(value) {

        await updateLeadField({
            followUp: value === "true"
        });

    }


    // UPDATE VIEWED STATUS
    async function updateViewedHandler(value) {

        await updateLeadField({
            viewed: value === "true"
        });

    }


    // UPDATE FOLLOW-UP DATE AND TIME
    async function updateFollowUpDateTime(dateValue, timeValue) {

        const isoDate = chicagoDateTimeToISO(
            dateValue,
            timeValue
        );

        if (!isoDate) {

            setConfirmation(
                "Please select a valid follow-up date and time."
            );

            setConfirmationType("error");

            return;

        }

        await updateLeadField({
            followUpDate: isoDate
        });

    }


    // REFRESH NOTES
    async function getAllNotes() {

        if (!currentLead?._id) return;

        const acquiredNotes = await getAllNotesByLeadId(
            currentLead._id
        );

        setNotes(
            Array.isArray(acquiredNotes) ? acquiredNotes : []
        );

    }


    // CREATE NOTE
    async function createNewNote() {

        if (!noteInput.trim() || !currentLead?._id || noteLoading) {

            setConfirmation("Please enter a note before submitting.");
            setConfirmationType("error");

            return;

        }

        setNoteLoading(true);
        setConfirmation("");

        try {

            const createdNote = await createNote({
                lead: currentLead._id,
                note: noteInput.trim()
            });

            if (!createdNote?._id) {

                throw new Error("Failed to create note.");

            }

            await getAllNotes();

            setNoteInput("");
            setNewNote(false);

            setConfirmation("Note created successfully.");
            setConfirmationType("success");

        } catch (error) {

            console.error(error);

            setConfirmation("Failed to create note.");
            setConfirmationType("error");

        } finally {

            setNoteLoading(false);

        }

    }


    // VIEW SELECTED NOTE
    function toggleNoteHandler(note) {

        setSelectedNote(note);
        setToggleNote(true);

    }


    // DELETE LEAD
    async function deleteHandler() {

        if (!currentLead?._id || loading) return;

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this lead?"
        );

        if (!confirmed) return;

        setLoading(true);
        setConfirmation("");

        try {

            const deleted = await deleteLead(currentLead._id);

            if (!deleted || deleted.error) {

                throw new Error(
                    deleted?.message || "Failed to delete lead."
                );

            }

            if (loadLeads) {
                await loadLeads();
            }

            setViewLeads(false);

        } catch (error) {

            console.error(error);

            setConfirmation(
                error.message || "Failed to delete lead."
            );

            setConfirmationType("error");

            setLoading(false);

        }

    }


    if (!currentLead) return null;


    return (

        <>

            {toggleNote && selectedNote && (

                <ViewNote
                    selectedNote={selectedNote}
                    setToggleNote={setToggleNote}
                    getAllNotes={getAllNotes}
                />

            )}


            <div className="ViewLeads">

                <div
                    className="Background"
                    onClick={() => setViewLeads(false)}
                />


                <div className="ViewLeadsContainer">

                    <div className="ContentContainer">


                        <h1>Lead Information</h1>


                        <div className="LeadInformation">

                            <div className="LeadField">
                                <h3>Created At:</h3>
                                <p>{formatIsoString(currentLead.createdAt)}</p>
                            </div>

                            <div className="LeadField">
                                <h3>First Name:</h3>
                                <p>{currentLead.firstName || "N/A"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Last Name:</h3>
                                <p>{currentLead.lastName || "N/A"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Company:</h3>
                                <p>{currentLead.company || "N/A"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Contact Information:</h3>
                                <p>{currentLead.contact || "N/A"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Team Member ID:</h3>
                                <p>{currentLead.teamMember || "N/A"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Outreach Type:</h3>
                                <p>{currentLead.type || "N/A"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Result:</h3>
                                <p>
                                    {currentLead.result?.replaceAll("_", " ") || "N/A"}
                                </p>
                            </div>

                            <div className="LeadField">
                                <h3>Inbound or Outbound:</h3>
                                <p>
                                    {currentLead.inboundOrOutbound
                                        ? "Inbound"
                                        : "Outbound"}
                                </p>
                            </div>

                            <div className="LeadField">
                                <h3>Follow-Up Required:</h3>
                                <p>{currentLead.followUp ? "Yes" : "No"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Viewed:</h3>
                                <p>{currentLead.viewed ? "Yes" : "No"}</p>
                            </div>

                            <div className="LeadField">
                                <h3>Follow-Up Date:</h3>
                                <p>{formatIsoString(currentLead.followUpDate)}</p>
                            </div>

                        </div>


                        <h1>Adjust Result</h1>

                        <h2 className="StatusValue">
                            {result.replaceAll("_", " ")}
                        </h2>

                        <select
                            className="UpdateStatusSelect"
                            value={result}
                            disabled={loading}
                            onChange={(e) => updateResultHandler(e.target.value)}
                        >

                            <option value="NO ANSWER">No Answer</option>
                            <option value="INTERESTED">Interested</option>
                            <option value="UNINTERESTED">Uninterested</option>
                            <option value="UNSURE">Unsure</option>
                            <option value="BUSY">Busy</option>
                            <option value="GATEKEEPER">Gatekeeper</option>
                            <option value="MEETING_BOOKED">Meeting Booked</option>

                        </select>


                        <h1>Adjust Outreach Type</h1>

                        <select
                            className="UpdateStatusSelect"
                            value={type}
                            disabled={loading}
                            onChange={(e) => updateTypeHandler(e.target.value)}
                        >

                            <option value="CALL">Call</option>
                            <option value="EMAIL">Email</option>
                            <option value="INSTAGRAM">Instagram</option>
                            <option value="LINKEDIN">LinkedIn</option>
                            <option value="FACEBOOK">Facebook</option>
                            <option value="VISIT">Visit</option>

                        </select>


                        <h1>Follow-Up Required?</h1>

                        <select
                            className="UpdateStatusSelect"
                            value={String(followUp)}
                            disabled={loading}
                            onChange={(e) => updateFollowUpHandler(e.target.value)}
                        >

                            <option value="true">Yes</option>
                            <option value="false">No</option>

                        </select>


                        <h1>Viewed?</h1>

                        <select
                            className="UpdateStatusSelect"
                            value={String(viewed)}
                            disabled={loading}
                            onChange={(e) => updateViewedHandler(e.target.value)}
                        >

                            <option value="true">Yes</option>
                            <option value="false">No</option>

                        </select>


                        <h1>Adjust Follow-Up Date</h1>

                        <h2 className="FollowUpDate">
                            {formatIsoString(followUpDate)}
                        </h2>

                        <div className="FollowUpDateControls">

                            <input
                                className="InputFollowUpDate"
                                type="date"
                                value={getDateInputValue(followUpDate)}
                                disabled={loading}
                                onChange={(e) => {

                                    updateFollowUpDateTime(
                                        e.target.value,
                                        getTimeInputValue(followUpDate) || "09:00"
                                    );

                                }}
                            />

                            <input
                                className="InputFollowUpTime"
                                type="time"
                                value={getTimeInputValue(followUpDate)}
                                disabled={loading}
                                onChange={(e) => {

                                    updateFollowUpDateTime(
                                        getDateInputValue(followUpDate),
                                        e.target.value
                                    );

                                }}
                            />

                        </div>


                        <h1>Description</h1>

                        <div className="Description">

                            <p>
                                {currentLead.description || "No description provided."}
                            </p>

                        </div>


                        {confirmation && (

                            <p className={`LeadConfirmation ${confirmationType}`}>
                                {confirmation}
                            </p>

                        )}


                        <h1>Notes</h1>

                        <button
                            className="ToggleNoteButton"
                            onClick={() => setNewNote(!newNote)}
                        >
                            {newNote ? "Cancel" : "New Note"}
                        </button>


                        {newNote && (

                            <div className="NewNote">

                                <textarea
                                    value={noteInput}
                                    onChange={(e) => setNoteInput(e.target.value)}
                                    placeholder="Enter a note about this lead..."
                                />

                                <button
                                    disabled={noteLoading}
                                    onClick={createNewNote}
                                >
                                    {noteLoading ? "Saving..." : "Create New Note"}
                                </button>

                            </div>

                        )}


                        <div className="NotesContainer">

                            {notes.length > 0 ? (

                                <div className="NotesGrid">

                                    {notes.map((note) => (

                                        <div
                                            className="Note"
                                            key={note._id}
                                            onClick={() => toggleNoteHandler(note)}
                                        >

                                            <p className="Date">
                                                {formatIsoString(note.createdAt)}
                                            </p>

                                            <div className="NotePreview">
                                                {note.note}
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            ) : (

                                <p>You haven't created any notes.</p>

                            )}

                        </div>


                        <button
                            className="RemoveButton"
                            disabled={loading}
                            onClick={deleteHandler}
                        >
                            Remove Lead
                        </button>


                    </div>

                </div>

            </div>

        </>

    );

}

export default ViewLeads;
