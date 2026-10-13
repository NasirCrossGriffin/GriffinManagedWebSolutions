const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;


// CREATE PUNCH
export const createPunch = async (
    teamMember,
    type
) => {

    const response = await fetch(
        `${API_URL}/api/punch`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                teamMember,
                type
            })
        }
    );

    return await response.json();
};


// GET ALL PUNCHES
export const getAllPunches = async () => {

    const response = await fetch(
        `${API_URL}/api/punch?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET PUNCHES BY TEAM MEMBER
export const getPunchesByTeamMember = async (
    teamMemberId
) => {

    const response = await fetch(
        `${API_URL}/api/punch/team-member/${teamMemberId}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET PUNCH BY ID
export const getPunchById = async (id) => {

    const response = await fetch(
        `${API_URL}/api/punch/${id}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// UPDATE PUNCH
export const updatePunch = async (
    id,
    punch
) => {

    const response = await fetch(
        `${API_URL}/api/punch/${id}`,
        {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                ...punch
            })
        }
    );

    return await response.json();
};


// DELETE PUNCH
export const deletePunch = async (id) => {

    const response = await fetch(
        `${API_URL}/api/punch/${id}`,
        {
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY
            })
        }
    );

    return await response.json();
};

// GET PUNCHES BY TEAM MEMBER AND DATE
export const getPunchesByTeamMemberAndDate = async (
    teamMemberId,
    date
) => {

    const response = await fetch(
        `${API_URL}/api/punch/team-member/${teamMemberId}/date/${date}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};