import { useState, useEffect } from "react"
import "./EmployeeLogin.css"
import { authenticateTeamMember } from "../middleware/team-member-middleware";
import { useNavigate } from "react-router";

function EmployeeLogin({teamMember, setTeamMember}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (teamMember) {
            navigate("/employee/portal");
        }
    }, [teamMember])

    const submit = async () => {
        const authenticatedTeamMember = await authenticateTeamMember(username, password);

        console.log(authenticatedTeamMember);

        if (authenticatedTeamMember) {
            setTeamMember(authenticatedTeamMember.teamMember)
        }
    }

    return (
    <>
        <main className="Login">
            <div className="LoginContent">
                <div className="LogoContainer">
                    <img src="/static/GriffinLogo.png" />
                </div>

                <div className="LoginForm">
                    <div className="LoginFieldContainer">
                        <label htmlFor="Username">Username: </label>
                        <input name="Username" type="text" onInput={(e) => {setUsername(e.target.value)}}/>
                    </div>
                    
                    <div className="LoginFieldContainer">
                        <label htmlFor="Password">Password: </label>
                        <input name="Password" type="password" onInput={(e) => {setPassword(e.target.value)}}/>
                    </div>

                    <button onClick={() => {submit()}}>
                        <span>Login</span>
                        <svg width="2vw" height="2vw" viewBox="0 0 36 16">
                            <path d="M0 8h24M20 4L28 8L20 12" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    </>
    )
}

export default EmployeeLogin;