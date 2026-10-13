const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;


// CREATE ROLE
export const createRole = async (
    title,
    description,
    department,
    teamMember
) => {

    const response = await fetch(
        `${API_URL}/api/role`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                title,
                description,
                department,
                teamMember
            })
        }
    );

    return await response.json();
};


// GET ALL ROLES
export const getAllRoles = async () => {

    const response = await fetch(
        `${API_URL}/api/role?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET ROLE BY TEAM MEMBER
export const getRolesByTeamMember = async (
    teamMemberId
) => {

    const response = await fetch(
        `${API_URL}/api/role/team/${teamMemberId}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET ROLE BY ID
export const getRolesById = async (id) => {

    const response = await fetch(
        `${API_URL}/api/role/${id}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// UPDATE ROLE
export const updateRole = async (
    id,
    role
) => {

    const response = await fetch(
        `${API_URL}/api/role/${id}`,
        {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                ...role
            })
        }
    );

    return await response.json();
};


// DELETE ROLE
export const deleteRole = async (id) => {

    const response = await fetch(
        `${API_URL}/api/role/${id}`,
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