const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;


// CREATE TEAM MEMBER
export const createTeamMember = async (
    firstName,
    lastName,
    username,
    password,
    level,
    email,
    profilePic,
    admin = false
) => {

    const response = await fetch(`${API_URL}/api/team`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            admin_key: ADMIN_KEY,
            firstName,
            lastName,
            username,
            password,
            level,
            email,
            profilePic,
            admin
        })

    });

    return await response.json();
};


// GET ALL TEAM MEMBERS
export const getAllTeamMembers = async () => {

    const response = await fetch(
        `${API_URL}/api/team?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET'
        }
    );

    return await response.json();
};


// GET TEAM MEMBER BY ID
export const getTeamMemberById = async (id) => {

    const response = await fetch(
        `${API_URL}/api/team/${id}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET'
        }
    );

    return await response.json();
};


// UPDATE TEAM MEMBER
export const updateTeamMember = async (
    id,
    teamMember
) => {

    const response = await fetch(
        `${API_URL}/api/team/${id}`,
        {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                ...teamMember
            })

        }
    );

    return await response.json();
};


// DELETE TEAM MEMBER
export const deleteTeamMember = async (id) => {

    const response = await fetch(
        `${API_URL}/api/team/${id}`,
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


// AUTHENTICATE TEAM MEMBER
export const authenticateTeamMember = async (
    username,
    password
) => {

    const response = await fetch(
        `${API_URL}/api/team/authenticate`,
        {

            method: 'POST',
            credentials: 'include', // Include session cookies in requests
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                username,
                password
            })

        }
    );

    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
};

// CHECK SESSION
export const checkSession = async () => {

    try {

        const response = await fetch(
            `${API_URL}/api/team/checkSession`, 
            {
                method: 'POST',                    
                credentials: 'include', // Include session cookies in requests
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    admin_key : ADMIN_KEY
                })
            }, 
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                loggedIn: false,
                teamMember: null
            };
        }

        return data;

    } catch (error) {

        console.error('Failed to check session:', error);

        return {
            loggedIn: false,
            teamMember: null
        };

    }

};

// SEARCH TEAM MEMBERS
export const searchTeamMembers = async (search) => {

    const response = await fetch(
        `${API_URL}/api/team/search/team-members?search=${encodeURIComponent(search)}&admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};