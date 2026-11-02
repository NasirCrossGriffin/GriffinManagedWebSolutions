import React from "react";
import { useState, useEffect } from "react";
import "./Time.css"
import PortalNav from "./PortalNav";
import { getUpcomingShifts } from "../middleware/shift-middleware";
import { createPunch, getPunchesByTeamMemberAndDate } from "../middleware/punch-middleware";


function Time({teamMember}) {
    const [shifts, setShifts] = useState([])
    const [punches, setPunches] = useState([])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [confirmation, setConfirmation] = useState('');
    const [confirmationType, setConfirmationType] = useState('');
    const [punchLoading, setPunchLoading] = useState(false);
    
    useEffect(() => {
        const acquireshifts = async () => {
            if (!(teamMember)) return;

            const acquiredShifts = await getUpcomingShifts(teamMember.id);
            
            setShifts(acquiredShifts);
        }; acquireshifts();
    }, [teamMember])

    useEffect(() => {
        const acquirePunches = async () => {
            if (!(teamMember)) return;

            const acquirePunches = await getPunchesByTeamMemberAndDate(teamMember.id, date);
            
            setPunches(acquirePunches);
        }; acquirePunches();
    }, [teamMember, date]) 

    // CONVERT ISO TO DATE
    const isoToDate = (iso) => {

        const date = new Date(iso);

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };


    // CONVERT ISO TO TIME
    const isoToTime = (iso) => {

        const date = new Date(iso);

        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

    };

    async function createNewPunch(clockingIn) {

        if (!teamMember || punchLoading) return;

        setPunchLoading(true);
        setConfirmation('');
        setConfirmationType('');

        try {

            const newPunch = await createPunch(
                teamMember.id,
                clockingIn ? "CLOCK_IN" : "CLOCK_OUT"
            );

            if (!newPunch || !newPunch._id) {

                throw new Error(
                    newPunch?.message || "Failed to record punch."
                );

            }

            // RESET DATE TO TODAY
            const today = new Date().toLocaleDateString('en-CA', {
                timeZone: 'America/Chicago',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            setDate(today);

            // REFRESH TODAY'S PUNCHES
            const updatedPunches = await getPunchesByTeamMemberAndDate(
                teamMember.id,
                today
            );

            setPunches(updatedPunches);

            // DISPLAY CONFIRMATION
            setConfirmation(
                clockingIn
                    ? "Successfully clocked in."
                    : "Successfully clocked out."
            );

            setConfirmationType('success');

        } catch (error) {

            console.error("Punch error:", error);

            setConfirmation(
                error.message || "Failed to record punch. Please try again."
            );

            setConfirmationType('error');

        } finally {

            setPunchLoading(false);

        }

    }

    return (
        <>
            <PortalNav teamMember={teamMember} />
            <main className="Time">
                <div className="UpcomingShifts">
                    {shifts.length > 0 ? shifts.map((shift, index) => 
                       <>
                        <div className="Shift">
                            <p className="ShiftDate">{isoToDate(shift.startTime)}</p>
                            <div className="ShiftTime">
                                <p className="ShiftStart">{isoToTime(shift.startTime)}</p>
                                <p className="ShiftEnd">{isoToTime(shift.endTime)}</p>
                            </div>
                        </div>
                       </> 
                    ) : <p className="TimePlaceholderText">No Upcoming Shifts</p>}
                </div>

                <div className="PunchActionContainer">

                    <button
                        onClick={() => createNewPunch(true)}
                        disabled={punchLoading}
                    >
                        {punchLoading ? "PROCESSING..." : "CLOCK IN"}
                    </button>

                    <button
                        onClick={() => createNewPunch(false)}
                        disabled={punchLoading}
                    >
                        {punchLoading ? "PROCESSING..." : "CLOCK OUT"}
                    </button>

                    {confirmation && (

                        <p className={`PunchConfirmation ${confirmationType}`}>
                            {confirmation}
                        </p>

                    )}

                </div>

                <div className="Calendar">
                    <input className="PunchDateSelector" type="date" onChange={(e) => setDate(e.target.value)}/>
                </div>

                <div className="PunchContainer">
                    {punches.length > 0 ? punches.map((punch, index) => 
                       <>
                        <div className="Punch">
                            <p className="PunchDate">{punch.type}</p>
                            <p>{isoToTime(punch.createdAt)}</p>
                        </div>
                       </> 
                    ) : <p className="TimePlaceholderText">No Punches For This Date</p>}
                </div>
            </main>
        </>
    )
}

export default Time;