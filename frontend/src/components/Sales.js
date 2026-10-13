import React from "react";
import { useState } from "react";
import "./Sales.css";
import PortalNav from "./PortalNav";
import { createLead } from "../middleware/lead-middleware";


function Sales({ teamMember }) {

    const [type, setType] = useState('CALL');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [contact, setContact] = useState('');

    const [result, setResult] = useState('INTERESTED');
    const [followUp, setFollowUp] = useState(true);
    const [inboundOrOutbound, setInboundOrOutbound] = useState(true);

    const [errors, setErrors] = useState({});
    const [confirmation, setConfirmation] = useState('');
    const [confirmationType, setConfirmationType] = useState('');


    function validate() {

        const newErrors = {};

        if (!type) {
            newErrors.type = "Type is required.";
        }

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required.";
        }

        if (!company.trim()) {
            newErrors.company = "Company is required.";
        }

        if (!contact.trim()) {
            newErrors.contact = "Contact information is required.";
        }

        if (!result) {
            newErrors.result = "Result is required.";
        }

        if (typeof followUp !== "boolean") {
            newErrors.followUp = "Follow up selection is required.";
        }

        if (typeof inboundOrOutbound !== "boolean") {
            newErrors.inboundOrOutbound =
                "Inbound or outbound selection is required.";
        }

        if (!teamMember?.id) {
            newErrors.teamMember =
                "Unable to identify the logged-in team member.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }


    async function submit() {

        setConfirmation('');
        setConfirmationType('');

        const valid = validate();

        if (!valid) {

            setConfirmation(
                "Please correct the highlighted fields before submitting."
            );

            setConfirmationType("error");

            return;
        }


        try {

            const newLead = await createLead(
                type,
                firstName.trim(),
                lastName.trim(),
                company.trim(),
                contact.trim(),
                teamMember.id,
                result,
                followUp,
                inboundOrOutbound
            );


            if (newLead && !newLead.error) {

                setConfirmation(
                    "Lead successfully submitted."
                );

                setConfirmationType("success");


                // CLEAR FORM
                setType('CALL');
                setFirstName('');
                setLastName('');
                setCompany('');
                setContact('');
                setResult('INTERESTED');
                setFollowUp(true);
                setInboundOrOutbound(true);

                setErrors({});

            } else {

                setConfirmation(
                    newLead?.message ||
                    "Failed to submit lead."
                );

                setConfirmationType("error");

            }

        } catch (error) {

            console.error(error);

            setConfirmation(
                "An error occurred while submitting the lead."
            );

            setConfirmationType("error");

        }
    }


    return (
        <>
            <PortalNav />

            <main className="Sales">

                <div className="SalesForm">


                    {/* TYPE */}

                    <div className="SalesField">

                        <label htmlFor="type">
                            Type:
                        </label>

                        <select
                            name="type"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setErrors({
                                    ...errors,
                                    type: null
                                });
                            }}
                        >
                            <option value="CALL">
                                Call
                            </option>

                            <option value="EMAIL">
                                Email
                            </option>

                            <option value="INSTAGRAM">
                                Instagram
                            </option>

                            <option value="LINKEDIN">
                                Linkedin
                            </option>

                            <option value="FACEBOOK">
                                Facebook
                            </option>

                            <option value="VISIT">
                                Visit
                            </option>
                        </select>

                        {errors.type && (
                            <span className="ValidationError">
                                {errors.type}
                            </span>
                        )}

                    </div>


                    {/* FIRST NAME */}

                    <div className="SalesField">

                        <label htmlFor="firstName">
                            First Name:
                        </label>

                        <input
                            name="firstName"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);

                                setErrors({
                                    ...errors,
                                    firstName: null
                                });
                            }}
                        />

                        {errors.firstName && (
                            <span className="ValidationError">
                                {errors.firstName}
                            </span>
                        )}

                    </div>


                    {/* LAST NAME */}

                    <div className="SalesField">

                        <label htmlFor="lastName">
                            Last Name:
                        </label>

                        <input
                            name="lastName"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);

                                setErrors({
                                    ...errors,
                                    lastName: null
                                });
                            }}
                        />

                        {errors.lastName && (
                            <span className="ValidationError">
                                {errors.lastName}
                            </span>
                        )}

                    </div>


                    {/* COMPANY */}

                    <div className="SalesField">

                        <label htmlFor="company">
                            Company:
                        </label>

                        <input
                            name="company"
                            value={company}
                            onChange={(e) => {
                                setCompany(e.target.value);

                                setErrors({
                                    ...errors,
                                    company: null
                                });
                            }}
                        />

                        {errors.company && (
                            <span className="ValidationError">
                                {errors.company}
                            </span>
                        )}

                    </div>


                    {/* CONTACT */}

                    <div className="SalesField">

                        <label htmlFor="contact">
                            Contact:
                        </label>

                        <input
                            name="contact"
                            value={contact}
                            onChange={(e) => {
                                setContact(e.target.value);

                                setErrors({
                                    ...errors,
                                    contact: null
                                });
                            }}
                        />

                        {errors.contact && (
                            <span className="ValidationError">
                                {errors.contact}
                            </span>
                        )}

                    </div>


                    {/* RESULT */}

                    <div className="SalesField">

                        <label htmlFor="result">
                            Result:
                        </label>

                        <select
                            name="result"
                            value={result}
                            onChange={(e) => {
                                setResult(e.target.value);

                                setErrors({
                                    ...errors,
                                    result: null
                                });
                            }}
                        >
                            <option value="NO ANSWER">
                                No Answer
                            </option>

                            <option value="INTERESTED">
                                Interested
                            </option>

                            <option value="UNINTERESTED">
                                Uninterested
                            </option>

                            <option value="UNSURE">
                                Unsure
                            </option>

                            <option value="BUSY">
                                Busy
                            </option>

                            <option value="GATEKEEPER">
                                Gatekeeper
                            </option>

                            <option value="MEETING BOOKED">
                                Meeting Booked
                            </option>

                        </select>

                        {errors.result && (
                            <span className="ValidationError">
                                {errors.result}
                            </span>
                        )}

                    </div>


                    {/* FOLLOW UP */}

                    <div className="SalesField">

                        <label htmlFor="followUp">
                            Follow Up?:
                        </label>

                        <select
                            name="followUp"
                            value={followUp}
                            onChange={(e) => {

                                setFollowUp(
                                    e.target.value === 'true'
                                );

                                setErrors({
                                    ...errors,
                                    followUp: null
                                });
                            }}
                        >

                            <option value="true">
                                Yes
                            </option>

                            <option value="false">
                                No
                            </option>

                        </select>

                        {errors.followUp && (
                            <span className="ValidationError">
                                {errors.followUp}
                            </span>
                        )}

                    </div>


                    {/* INBOUND / OUTBOUND */}

                    <div className="SalesField">

                        <label htmlFor="inboundOrOutbound">
                            Inbound or Outbound?:
                        </label>

                        <select
                            name="inboundOrOutbound"
                            value={inboundOrOutbound}
                            onChange={(e) => {

                                setInboundOrOutbound(
                                    e.target.value === 'true'
                                );

                                setErrors({
                                    ...errors,
                                    inboundOrOutbound: null
                                });
                            }}
                        >

                            <option value="true">
                                Inbound
                            </option>

                            <option value="false">
                                Outbound
                            </option>

                        </select>

                        {errors.inboundOrOutbound && (
                            <span className="ValidationError">
                                {errors.inboundOrOutbound}
                            </span>
                        )}

                    </div>


                    {/* CONFIRMATION MESSAGE */}

                    {confirmation && (

                        <div
                            className={
                                confirmationType === "success"
                                    ? "ConfirmationMessage Success"
                                    : "ConfirmationMessage Error"
                            }
                        >
                            {confirmation}
                        </div>

                    )}


                    {/* SUBMIT */}

                    <button onClick={submit}>

                        <span>
                            Submit
                        </span>

                        <svg
                            width="2vw"
                            height="2vw"
                            viewBox="0 0 36 16"
                        >
                            <path
                                d="M0 8h24M20 4L28 8L20 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>

                    </button>

                </div>

            </main>
        </>
    );
}


export default Sales;