const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;


// CREATE SHIFT
export const createShift = async (teamMember, startTime, endTime) => {

    const response = await fetch(`${API_URL}/shift`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            admin_key: ADMIN_KEY,
            teamMember: teamMember,
            startTime: startTime,
            endTime: endTime
        })

    });

    return await response.json();
};


// GET ALL SHIFTS
export const getAllShifts = async () => {

    const response = await fetch(`${API_URL}/shift`, {

        method: 'GET',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            admin_key: ADMIN_KEY
        })

    });

    return await response.json();
};


// GET SHIFTS BY TEAM MEMBER
export const getShiftsByTeamMember = async (teamMemberId) => {

    const response = await fetch(
        `${API_URL}/shift/team-member/${teamMemberId}`,
        {

            method: 'GET',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY
            })

        }
    );

    return await response.json();
};


// GET SHIFTS BY DATE RANGE
export const getShiftsByDateRange = async (start, end) => {

    const response = await fetch(
        `${API_URL}/shift/range?start=${start}&end=${end}`,
        {

            method: 'GET',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY
            })

        }
    );

    return await response.json();
};


// GET SHIFT BY ID
export const getShiftById = async (id) => {

    const response = await fetch(
        `${API_URL}/shift/${id}`,
        {

            method: 'GET',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY
            })

        }
    );

    return await response.json();
};


// UPDATE SHIFT
export const updateShift = async (id, shift) => {

    const response = await fetch(
        `${API_URL}/shift/${id}`,
        {

            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                ...shift
            })

        }
    );

    return await response.json();
};


// DELETE SHIFT
export const deleteShift = async (id) => {

    const response = await fetch(
        `${API_URL}/shift/${id}`,
        {

            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY
            })

        }
    );

    return await response.json();
};

// GET UPCOMING SHIFTS FOR TEAM MEMBER
export const getUpcomingShifts = async (
    teamMemberId
) => {

    const response = await fetch(
        `${API_URL}/api/shift/upcoming/${teamMemberId}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};