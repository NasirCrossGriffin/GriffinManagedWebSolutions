import React from "react";
import { useState, useEffect } from "react";
import "./People.css"
import PortalNav from "./PortalNav";
import { getRolesByTeamMember } from "../middleware/role-middleware";
import { searchTeamMembers } from "../middleware/team-member-middleware";

function People({teamMember}) {
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [thisTeamMember, setThisTeamMember] = useState([]);

    useEffect(() => {
        const acquireRoles = async () => {
            if (!thisTeamMember) return;

            const acquiredRoles = await getRolesByTeamMember(thisTeamMember.id);

            setRoles(acquiredRoles);
        }; acquireRoles();
    }, [thisTeamMember])

    useEffect(() => {
        teamMember ? setThisTeamMember(teamMember) : setThisTeamMember(null);
    }, [teamMember])

    useEffect(() => {
        if (search.length > 0) {
            setSearching(true)
        }

        const acquireResults = async () => {
            const tempResults = await searchTeamMembers(search);

            setResults(tempResults);
        }; acquireResults();
    }, [search])

    const selectTeamMember = async (selected) => {
        setThisTeamMember(selected)
        setSearching(false)
    }

    return(
        <>
            <PortalNav />
            <main className="PeopleMain">
                <div className="Search">
                    <label htmlFor="Search">Search:</label>
                    <input className="SearchBar" name="Search" onChange={(e) => setSearch(e.target.value)}/>
                </div>

                { !searching ? <div className="People">
                    

                    {   teamMember ?
                        <div className="Profile">
                            <div className="ProfilePicture"><img src={teamMember.profilePic} /></div>

                            <div className="ProfileInfo">
                                <p className="TeamMemberName">{teamMember.firstName + " " + teamMember.lastName}</p>
                                <p>Level: {teamMember.level}</p>
                                <div className="MemberRoles">
                                    {roles.length > 0 ? roles.map((role, index) => (
                                        <p key="index">{role.title}</p>
                                    )) : null}
                                </div>
                                <p>Status: {teamMember.status}</p>
                                <p>Email: {teamMember.email}</p>
                            </div>
                        </div> : null
                    }   
                </div> : <div>
                    <div className="SearchResults">
                        {results.length > 0 ? results.map((result, index) => (
                            <button onClick={() => selectTeamMember(result)} className="SearchResult">
                                {result.firstName + " " + result.lastName}
                            </button>
                        )) : null}
                    </div>
                    
                </div>}
            </main>
        </>
    )
}

export default People;