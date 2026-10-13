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
        const newPunch = await createPunch(teamMember.id, clockingIn ? "CLOCK_IN" : "CLOCK_OUT");
        setDate(new Date().toISOString().split('T')[0]);
    }

    return (
        <>
            <PortalNav />
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
                    <button onClick={() => {createNewPunch(true)}}>
                        CLOCK IN
                    </button>

                    <button onClick={() => {createNewPunch(false)}}>
                        CLOCK OUT
                    </button>
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