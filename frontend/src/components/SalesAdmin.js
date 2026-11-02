import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import './SalesAdmin.css'
//import { check } from './middleware/admin.ts';
//import ViewEstimate from './ViewEstimate.tsx';
//import { ClassNames } from '@emotion/react';
import { getAllLeads, getFilteredLeads, updateLead } from '../middleware/lead-middleware.js';
import ViewLeads from './ViewLeads.js';

function SalesAdmin({teamMember}) {
    const [organization, setOrganization] = useState(null);
    const [inquiries, setInquiries] = useState(null);
    const [users, setUsers] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [viewLeads, setViewLeads] = useState(false);
    const [inquiryPhotoStatus, setInquiryPhotoStatus] = useState([]);
    const [viewNavDrawer, setViewNavDrawer] = useState();
    const [webhook, setWebhook] = useState("");
    const [inputWebhook, setInputWebhook] = useState(false);
    const [webhookUploaded, setWebhookUploaded] = useState(null);

    // Filters
    const [sortByFollowUpDate, setSortByFollowUpDate] = useState(false);
    const [showUnviewedOnly, setShowUnviewedOnly] = useState(false);
    const [sortByContact, setSortByContact] = useState(false);
    const [sortByResult, setSortByResult] = useState(false);


    //Lead metrics
    const [numberOfLeads, setNumberOfLeads] = useState(0);
    const [recentLeads, setRecentLeads] = useState(0);
    const [unseenLeads, setUnseenLeads] = useState(0);

    //Lead metrics
    const [followUpDate, setFollowUpDate] = useState('');
    const [type, setType] = useState('');
    const [result, setResult] = useState('');
    const [viewed, setViewed] = useState(null);

    const [leads, setLeads] = useState([]);

    const [loading, setLoading] = useState(true);
    const [typeIndex, setTypeIndex] = useState(0);
    const [resultIndex, setResultIndex] = useState(0);

    // TYPE FILTER OPTIONS
    const typeFilters = [
        { type: "", color: "black" },
        { type: "CALL", color: "blue" },
        { type: "EMAIL", color: "green" },
        { type: "INSTAGRAM", color: "purple" },
        { type: "LINKEDIN", color: "cyan" },
        { type: "FACEBOOK", color: "orange" },
        { type: "VISIT", color: "yellow" }
    ];


    // RESULT FILTER OPTIONS
    const resultFilters = [
        { result: "", color: "black" },
        { result: "NO ANSWER", color: "grey" },
        { result: "INTERESTED", color: "green" },
        { result: "UNINTERESTED", color: "red" },
        { result: "UNSURE", color: "yellow" },
        { result: "BUSY", color: "orange" },
        { result: "GATEKEEPER", color: "purple" },
        { result: "MEETING_BOOKED", color: "blue" }
    ];

    // FILTER TYPE
    function filterType() {

        const nextIndex = (typeIndex + 1) % typeFilters.length;

        setTypeIndex(nextIndex);

        const selectedType = typeFilters[nextIndex];

        setSortByContact(
            selectedType.type === "" ? "" : selectedType.type
        );

    }


    // FILTER RESULT
    function filterResult() {

        const nextIndex = (resultIndex + 1) % resultFilters.length;

        setResultIndex(nextIndex);

        const selectedResult = resultFilters[nextIndex];

        setSortByResult(
            selectedResult.result === "" ? "" : selectedResult.result
        );

    }

    useEffect(() => {
        console.log(teamMember);

        if (!(teamMember)) return;

        if (teamMember.admin !== true) return;

        setIsAdmin(true);

        console.log("Admin equals " + isAdmin)
    }, [teamMember])

    useEffect(() => {
        if (isAdmin === true) {
            loadLeads()
            setLoading(false)
        }
    }, [isAdmin])

    useEffect(() => {
        loadLeads()
    }, [sortByFollowUpDate, showUnviewedOnly, sortByContact, sortByResult])

    useEffect(() => {
        const setMetrics = async () => {
            const baseLeads = await getAllLeads()

            console.log(baseLeads)

            if (baseLeads.length === 0) return ;
            //Set Number of leads
            setNumberOfLeads(baseLeads.length)

            //set recent leads
            const todaysDate = new Date();
            let numRecentLeads = 0;

            for (const inquiry of baseLeads) {
                const createdAt = new Date(inquiry.createdAt);
                const timeDifference = Math.abs(todaysDate.valueOf() - createdAt.valueOf()); 
                if (timeDifference < 259200000) numRecentLeads = numRecentLeads + 1;
            }

            setRecentLeads(numRecentLeads);

            //set unseen leads
            let numUnseenLeads = 0;

            for (const lead of baseLeads) {
                if (lead.viewed === false) numUnseenLeads = numUnseenLeads + 1;
            }

            setUnseenLeads(numUnseenLeads);

        }; setMetrics();
    }, [leads])

    const formatIsoString = (value) => {
        if (!value || value.trim().length === 0) return '';

        const d = new Date(value);
        if (isNaN(d.getTime())) return value; // fallback: show raw if invalid

        return d.toLocaleString(undefined, {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    const clickHandler = async (index) => {
        setSelectedLead(leads[index]);
        setViewLeads(true);
        await updateLead(leads[index]._id, {viewed : true})
        await loadLeads();
    }

    const navigate = useNavigate();

    async function loadLeads() {
        try {

            const filteredLeads = await getFilteredLeads(
                followUpDate,
                sortByContact,
                sortByResult,
                viewed
            );

            console.log(filteredLeads);

            setLeads(filteredLeads);

        } catch (error) {

            console.error('Failed to load leads:', error);

        }

    }

    function setTypeColor(type) {

        switch (type) {

            case "CALL":
                return "blue";

            case "EMAIL":
                return "green";

            case "INSTAGRAM":
                return "purple";

            case "LINKEDIN":
                return "cyan";

            case "FACEBOOK":
                return "orange";

            case "VISIT":
                return "yellow";

            default:
                return "grey";

        }

    }

    function setResultColor(result) {

        switch (result) {

            case "NO ANSWER":
                return "grey";

            case "INTERESTED":
                return "green";

            case "UNINTERESTED":
                return "red";

            case "UNSURE":
                return "yellow";

            case "BUSY":
                return "orange";

            case "GATEKEEPER":
                return "purple";

            case "MEETING_BOOKED":
                return "blue";

            default:
                return "grey";

        }

    }

    function getFollowUpColor(isoString) {
        const target = new Date(isoString);
        const now = new Date();
      
        // Normalize both dates to midnight to compare only by date
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());
      
        const diffMs = targetDate.getTime() - today.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
      
        if (diffDays < 0) return "red";        // past date
        if (diffDays === 0) return "orange";   // today
        if (diffDays <= 3) return "yellow";    // within 3 days
        return "green";                        // more than 3 days away
    }

    return (
        <>
            {viewLeads ? <ViewLeads lead={selectedLead} loadLeads={loadLeads} setViewLeads={setViewLeads}/> : null}
            <div className="AdminNav">
                <div className='NavDrawerButton' onClick={() => setViewNavDrawer(!viewNavDrawer)}>
                    <span style={{backgroundColor : viewNavDrawer ? "black" : "white"}}></span>
                    <span style={{backgroundColor : viewNavDrawer ? "black" : "white"}}></span>
                    <span style={{backgroundColor : viewNavDrawer ? "black" : "white"}}></span>
                </div>
                {organization ? 
                <div className='Logo'>
                    <img src={organization.logo} />
                </div> : null}
                {
                    viewNavDrawer ? <div className='NavDrawer'>
                        <div className='NavDrawerBackground' onClick={() => {setViewNavDrawer(!viewNavDrawer)}}></div>
                        <div className='NavDrawerContainer'>
                            <div className='FilterOptions'>
                                <button style={{backgroundColor : typeFilters[typeIndex].color}} onClick={() => filterType()}>
                                    Sort By Contact Type
                                </button>

                                <button style={{backgroundColor : resultFilters[resultIndex].color}} onClick={() => filterResult()}>
                                    Sort By Result
                                </button>

                                <button style={{backgroundColor : sortByFollowUpDate ? "green" : "black"}} onClick={() => setSortByFollowUpDate(v => !v)}>
                                    Sort By Follow Up Date
                                </button>

                                <button style={{backgroundColor : showUnviewedOnly ? "green" : "black"}} onClick={() => setShowUnviewedOnly(v => !v)}>
                                    Show Unviewed Only
                                </button>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
            {leads && loading === false && isAdmin === true ? <div className='AdminDashboard'>
                <div className='Metrics'>
                    <div className='Metric'>
                        <span className='MetricName'>Number of Leads</span>
                        <span className='MetricValue'>{numberOfLeads}</span>
                    </div>

                    <div className='Metric'>
                        <span className='MetricName'>Recent Leads</span>
                        <span className='MetricValue'>{recentLeads}</span>
                    </div>

                    <div className='Metric'>
                        <span className='MetricName'>Unseen Leads</span>
                        <span className='MetricValue'>{unseenLeads}</span>
                    </div>
                </div>

                <div className='EstimateContainer'>
                    {
                        leads.length > 0 ? leads.map((lead : any, index : number) => (
                            <div className='Estimate' style={{borderColor: lead.viewed ? "black" : "rgb(0, 102, 255)", borderStyle: "solid", borderWidth: "2px", boxShadow: lead.viewed ? "0px 0px 0px 0px rgb(0, 0, 0, 0)" : "0px 0px 20px 10px rgb(0, 102, 255)" }} onClick={() => {clickHandler(index)}}>
                                <p>{lead.firstName + " " + lead.lastName}</p>
                                <p>{lead.company}</p>
                                <p>{lead.contact}</p>
                                <p>{lead.inboundOrOutbound}</p>
                                <p style={{color : setTypeColor(lead.status)}}>{lead.type}</p>
                                <p style={{color : setResultColor(lead.result)}}>{lead.result}</p>
                                <p style={{color : getFollowUpColor(lead.followUpDate)}}>{formatIsoString(lead.followUpDate)}</p>
                            </div>                     
                        )) : <div>
                            <p>No Inquiries Yet</p>
                        </div>
                    }
                </div>
            </div>  
            
            : 
            
            <div className='LoadingAdmin'>
                <div className='LoadingIconAdmin'>
                    <img src={`/loading.png`}/>
                </div>
            </div>}
        </>
    )
}




export default SalesAdmin;
