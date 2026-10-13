import React from "react";
import { useState, useEffect } from "react";
import "./Portal.css"
import PortalNav from "./PortalNav";

function Portal({teamMember}) {

    const portalElements = [
        {
            name : "Time",
            link : "/employee/time",
            img : "/static/Time.png"
        }, {
            name : "People",
            link : "/employee/people",
            img : "/static/People.png"
        }, {
            name : "Sales",
            link : "/employee/sales",
            img : "/static/Sales.png"
        }
    ]

    return(
        <>
            <PortalNav />
            <main className="Portal">
                {teamMember ? <p className="Welcome">Welcome Back {teamMember.firstName + " " + teamMember.lastName}</p> : null}

                <div className="PortalGrid">
                    {
                        portalElements.map((element, index) => (
                            <>
                                <a href={element.link} className="PortalElement">
                                    <p>{element.name}</p>

                                    <img src={element.img} />
                                </a>
                            </>
                        ))
                    }
                </div>
            </main>
        </>
    )
}

export default Portal;