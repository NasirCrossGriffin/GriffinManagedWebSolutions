import { useState, useEffect } from "react"
import "./PortalNav.css"

function PortalNav() {

    const NavLinks = [
        {
            text : "Home",
            link : "/employee/portal"
        },

        {
            text : "Time",
            link : "/employee/time"
        },

        {
            text : "People",
            link : "/employee/people"
        },

        {
            text : "Sales",
            link : "/employee/sales"
        }
    ]

    return (
        <>
            <nav className="PortalNav">
                <div className="NavContainer">
                    <button className="HomeButton">
                        <img src="/static/GriffinLogo.png" className="PortalLogo" />
                    </button>

                    <div className="NavLinks">
                        {
                            NavLinks.map((link, index) => (
                                <a key={index} href={link.link}>{link.text}</a>
                            )) 
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default PortalNav;