const API_URL = process.env.REACT_APP_API_URL;
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;


// CREATE LEAD
export const createLead = async (
    type,
    firstName,
    lastName,
    company,
    contact,
    teamMember,
    result,
    followUp,
    inboundOrOutbound
) => {

    const response = await fetch(
        `${API_URL}/api/lead`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                type,
                firstName,
                lastName,
                company,
                contact,
                teamMember,
                result,
                followUp,
                inboundOrOutbound
            })
        }
    );

    return await response.json();
};


// GET ALL LEADS
export const getAllLeads = async () => {

    const response = await fetch(
        `${API_URL}/api/lead?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET LEADS BY TEAM MEMBER
export const getLeadsByTeamMember = async (
    teamMemberId
) => {

    const response = await fetch(
        `${API_URL}/api/lead/team-member/${teamMemberId}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET LEADS THAT REQUIRE FOLLOW-UP
export const getFollowUpLeads = async () => {

    const response = await fetch(
        `${API_URL}/api/lead/follow-up/all?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// GET LEAD BY ID
export const getLeadById = async (id) => {

    const response = await fetch(
        `${API_URL}/api/lead/${id}?admin_key=${ADMIN_KEY}`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );

    return await response.json();
};


// UPDATE LEAD
export const updateLead = async (
    id,
    lead
) => {

    const response = await fetch(
        `${API_URL}/api/lead/${id}`,
        {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json'
            },

            credentials: 'include',

            body: JSON.stringify({
                admin_key: ADMIN_KEY,
                ...lead
            })
        }
    );

    return await response.json();
};


// DELETE LEAD
export const deleteLead = async (id) => {

    const response = await fetch(
        `${API_URL}/api/lead/${id}`,
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