// note.middleware.js

const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;


// GET ALL NOTES BY LEAD ID
export async function getAllNotesByLeadId(leadId) {

    try {

        const response = await fetch(
            `${API_URL}/api/note/lead/${encodeURIComponent(leadId)}?admin_key=${encodeURIComponent(ADMIN_KEY)}`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (response.ok) {

            const notes = await response.json();
            return notes;

        } else {

            return null;

        }

    } catch (error) {

        console.error(error);
        return null;

    }

}


// CREATE NOTE
export async function createNote(protoNote) {

    try {

        const response = await fetch(`${API_URL}/api/note`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                lead: protoNote.lead,
                note: protoNote.note
            })

        });

        if (response.ok) {

            const createdNote = await response.json();
            return createdNote;

        } else {

            return null;

        }

    } catch (error) {

        console.error(error);
        return null;

    }

}


// UPDATE NOTE
export async function updateNote(noteId, updates) {

    try {

        const response = await fetch(
            `${API_URL}/api/note/${encodeURIComponent(noteId)}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    admin_key: ADMIN_KEY,
                    note: updates.note
                })
            }
        );

        if (response.ok) {

            const updatedNote = await response.json();
            return updatedNote;

        } else {

            return null;

        }

    } catch (error) {

        console.error(error);
        return null;

    }

}


// DELETE NOTE
export async function deleteNote(noteId) {

    try {

        const response = await fetch(
            `${API_URL}/api/note/${encodeURIComponent(noteId)}`,
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    admin_key: ADMIN_KEY
                })
            }
        );

        if (response.ok) {

            const result = await response.json();
            return result;

        } else {

            return null;

        }

    } catch (error) {

        console.error(error);
        return null;

    }

}