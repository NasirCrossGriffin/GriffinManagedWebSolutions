import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import '../styles/Admin.css'
import { check } from './middleware/admin.ts';
import ViewEstimate from './ViewEstimate.tsx';
import { ClassNames } from '@emotion/react';
import { getAllLeads, getFilteredLeads, updateLead } from '../middleware/lead-middleware.js';

function Admin({teamMember}) {
    const [organization, setOrganization] = useState(null);
    const [inquiries, setInquiries] = useState(null);
    const [users, setUsers] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [viewEstimate, setViewEstimate] = useState(false);
    const [inquiryPhotoStatus, setInquiryPhotoStatus] = useState([]);
    const [viewNavDrawer, setViewNavDrawer] = useState();
    const [webhook, setWebhook] = useState("");
    const [inputWebhook, setInputWebhook] = useState(false);
    const [webhookUploaded, setWebhookUploaded] = useState(null);

    // Filters
    const [inForeclosureOnly, setInForeclosureOnly] = useState(false);
    const [withPhotosOnly, setWithPhotosOnly] = useState(false);
    const [sortByFollowUpDate, setSortByFollowUpDate] = useState(false);
    const [sortByStatus, setSortByStatus] = useState(false);
    const [showUnviewedOnly, setShowUnviewedOnly] = useState(false);

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

    useEffect(() => {
        if (!(teamMember)) return;

        if (teamMember.admin !== true) return;

        setIsAdmin(true);
    }, [teamMember])

    useEffect(() => {
        const setMetrics = async () => {
            if (organization === null) return;

            const baseInquiries = await getAllLeads()

            if (baseInquiries.length === 0) return ;
            //Set Number of leads
            setNumberOfLeads(baseInquiries.length)

            //set recent leads
            const todaysDate = new Date();
            let numRecentLeads = 0;

            for (const inquiry of baseInquiries) {
                const createdAt = new Date(inquiry.createdAt);
                const timeDifference = Math.abs(todaysDate.valueOf() - createdAt.valueOf()); 
                if (timeDifference < 259200000) numRecentLeads = numRecentLeads + 1;
            }

            setRecentLeads(numRecentLeads);

            //set unseen leads
            let numUnseenLeads = 0;

            for (const inquiry of baseInquiries) {
                if (inquiry.viewed === false) numUnseenLeads = numUnseenLeads + 1;
            }

            setUnseenLeads(numUnseenLeads);

        }; setMetrics();
    }, [organization])
    
    useEffect(() => {

        async function getFilteredResults() {

            try {

                const filteredLeads = await getFilteredLeads(
                    followUpDate,
                    type,
                    result,
                    viewed
                );

                setLeads(filteredLeads);

            } catch (error) {

                console.error('Failed to retrieve filtered leads:', error);

            }

        }

        getFilteredResults();

    }, [followUpDate, type, result, viewed]);

    useEffect(() => {
        async function getInquiries() {
            const protoInquiries = await getFilteredLeads();
            console.log(protoInquiries)
            setInquiries(protoInquiries);
        }; getInquiries();
    }, [isAdmin])

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
        setSelectedLead(inquiries[index]);
        setViewEstimate(true);
        await updateLead(inquiries[index]._id, {viewed : true})
        await loadLeads();
    }

    const navigate = useNavigate();

    async function loadLeads() {
        try {

            const filteredLeads = await getFilteredLeads(
                followUpDate,
                type,
                result,
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

    async function populateHasPhotos() {
        const hasPhotos = [];
        for (const inquiry of inquiries) {
            const inquiryPhotos = await GetRealEstatePhotos(inquiry._id);

            if (inquiryPhotos.length > 0) {
                hasPhotos.push(true);
                continue;
            }

            hasPhotos.push(false);
        }

        console.log(hasPhotos)

        setInquiryPhotoStatus(hasPhotos);
    }



    useEffect(() => {
        async function getUsers() {
            const protoUsers = [];

            for (const inquiry of inquiries) {
                const protoUser = await getUserById(inquiry.user._id.toString());
                protoUsers.push(protoUser);
            }

            console.log(protoUsers);
            setUsers(protoUsers);
        }; getUsers(); populateHasPhotos(); 
    }, [inquiries])

    useEffect(() => {
        if (users) setLoading(false);
    }, [users])

    async function linkCRM() {
        const updatedOrganization = await updateOrganization(
            organization._id,
            {webhook : webhook}
        )

        setOrganization(updatedOrganization);

        if (updatedOrganization) {
            setWebhookUploaded(true);
            setInputWebhook(false);
        } else {
            setWebhookUploaded(false);
        }
    }

    return (
        <>
            {viewEstimate ? <ViewEstimate loadInquiries={loadInquiries} realEstateQuery={selectedLead} setViewEstimate={setViewEstimate} organization={organization} /> : null}
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
                                <button style={{backgroundColor : inForeclosureOnly ? "green" : "black"}} onClick={() => setInForeclosureOnly(v => !v)}>
                                    In Foreclosure
                                </button>

                                <button style={{backgroundColor : withPhotosOnly ? "green" : "black"}} onClick={() => setWithPhotosOnly(v => !v)}>
                                    With Photos
                                </button>

                                <button style={{backgroundColor : sortByFollowUpDate ? "green" : "black"}} onClick={() => setSortByFollowUpDate(v => !v)}>
                                    Sort By Follow Up Date
                                </button>

                                <button style={{backgroundColor : sortByStatus ? "green" : "black"}} onClick={() => setSortByStatus(v => !v)}>
                                    Sort By Status
                                </button>

                                <button style={{backgroundColor : showUnviewedOnly ? "green" : "black"}} onClick={() => setShowUnviewedOnly(v => !v)}>
                                    Show Unviewed Only
                                </button>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
            {inquiries && loading === false && isAdmin === true ? <div className='AdminDashboard'>
                <div className='CRMIntegration'>
                    <div className='CRMContainer'>
                        <button onClick={() => setInputWebhook(!inputWebhook)}>Integrate CRM</button>
                        {
                            inputWebhook ? <div>
                                <input placeholder='Enter Zapier Webhook'/>
                                <button onClick={() => linkCRM()}>Confirm</button>
                            </div> : null
                        }
                    </div>
                    {
                        webhookUploaded !== null ? <div className='WebhookStatus'>
                            {
                                webhookUploaded === true ? <p style={{color : "green"}}>Webhook attatched successfully</p> : <p style={{color : "red"}}>Webhook attatchment failed</p>
                            }
                        </div> : null
                    }
                </div>

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
                        inquiries.length > 0 && users && users.length > 0 && inquiryPhotoStatus.length > 0 ? inquiries.map((inquiry : any, index : number) => (
                            <div className='Estimate' style={{borderColor: inquiry.viewed ? "black" : "rgb(0, 102, 255)", borderStyle: "solid", borderWidth: "2px", boxShadow: inquiry.viewed ? "0px 0px 0px 0px rgb(0, 0, 0, 0)" : "0px 0px 20px 10px rgb(0, 102, 255)" }} onClick={() => {clickHandler(index)}}>
                                {users.length > 0 ? <p>{users[index] ? (users[index].firstName + " " + users[index].lastName) : null}</p> : null}
                                <p>Looking to {inquiry.service}</p>
                                <p>{formatIsoString(inquiry.createdAt)}</p>
                                <p>facing foreclosure: {(inquiry.facingForeclosure).toString()}</p>
                                <p style={{color : setStatusColor(inquiry.status)}}>{inquiry.status}</p>
                                <p style={{color : getFollowUpColor(inquiry.followUpDate)}}>{formatIsoString(inquiry.followUpDate)}</p>
                                <p style={{color : inquiryPhotoStatus[index] ? "green" : "white"}}>{inquiryPhotoStatus[index] ? "Has Photos" : "No Photos"}</p>
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
                    <img src={`${BASE_URL}/images/loading.png`}/>
                </div>
            </div>}
        </>
    )
}




    export default Admin;
