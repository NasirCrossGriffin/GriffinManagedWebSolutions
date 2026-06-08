import './Projects.css';
import './Client.css';
import './Client-Mobile.css';
import './About.css';
import './Contact.css';
import './Footer.css';
import './LandingPage.css';
import './Projects.css';
import './Systems.css';


import React, { useState, useCallback, useRef, useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from 'react-router';
import DividerFirstStyle from './DividerFirstStyle';
import DividerSecondStyle from './DividerSecondStyle';
import DividerThirdStyle from './DividerThirdStyle';

function Client({orientation, appWidth, appHeight, pageHeight}) {
    gsap.registerPlugin(ScrollTrigger);

    const Services = [
        "Captivating Web Design",
        "Seamless Lead-Capture Systems",
        "Open & Honest Communication",
        "Business Outcome Prioritization",
    ];

    const AboutGMWS = useRef(null);
    const AboutHeader = useRef(null);
    const AboutContent = useRef(null);
    const AboutSubtext = useRef(null);
    const AboutSubtextFirst = useRef(null);
    const AboutSubtextSecond = useRef(null);
    const AboutSubtextThird = useRef(null);

    const testimonials = [ 
        {
            client : "JD Multi-Process And Services", 
            image : "/static/Juliana.png", 
            testimony : `"Griffin is the best he did my web page and I like so much is it great."`, 
            Stars : 5
        }, {
            client : "Trinity Silva", 
            image : "/static/Trinity.png", 
            testimony : `"Griffin is an excellent company to work with. they are very professional, 
            creative and have a driven personality to take care of business right away. 
            I recommend them 100% and you won’t regret it!"`, 
            Stars : 5
        }, {
            client : "Dae's Mobile Mechanic", 
            image : "/static/DaesMobileMechanic.png", 
            testimony : `"Very professional website looks extremely professional. 
            He services definitely helps scales growth. Contacting him about any 
            business inquiries or questions was very easy fast and helpful. Any 
            business owner just starting off or established will need him to take 
            you to the next that level."`, 
            Stars : 5
        },
    ]

    const projects = [        
        {
            name: "TRINITY SILVA MODEL PAGE", 
            logo: "/static/TrinityLogo.png",
            preview: "/static/TrinityWebsiteCrawlPreview.mp4", 
            description: `I partnered with Trinity Silva to create a polished portfolio website that positions her as a serious professional model and gives her a centralized platform for agencies, brands, and collaborators. I handled the full design, development, deployment, and hosting process, delivering a long-term digital asset she can confidently share with prospective clients.`,
            testimony: {
                client: "Trinity Silva", 
                image: "/static/Trinity.png", 
                testimony: `"Griffin is an excellent company to work with. they are very professional, 
                creative and have a driven personality to take care of business right away. 
                I recommend them 100% and you won’t regret it!"`, 
                Stars: 5
            },
            link: "https://www.trinitysilva.com"
        },
        {
            name: "APEX INVESTMENTS AND ACQUISITIONS WEBPAGE", 
            logo: "/static/ApexLogo.png",
            preview: "/static/ApexCrawlPreview.mp4", 
            description: `I worked with Apex Investments & Acquisitions to develop a premium real estate platform built around credibility, cinematic presentation, and high-impact lead capture. The site combines modern UI design, advanced animation, and direct CRM integration to position the company as a more elevated real estate brand.`,
            testimony: null,
            link: "http://45.55.248.134:5000/home"
        },
        {
            name: "JD MULTIPROCESS AND SERVICES WEBPAGE", 
            logo: "/static/JDMPLogo.png",
            preview: "/static/JDMPPreviewCrawl.mp4", 
            description: `I worked with Juliana De La Rosa to create a professional website that clearly communicates her notary and multi-service offerings while establishing immediate credibility. I designed, deployed, and fully managed the platform, making it easier for prospective clients to understand her services and contact her without friction.`,
            testimony: {
                client: "JD Multi-Process And Services", 
                image: "/static/Juliana.png", 
                testimony: `"Griffin is the best he did my web page and I like so much is it great."`, 
                Stars: 5
            },
            link: "https://www.jdmultiprocessandservices.com"
        }
    ];

    const systems = [
        {
            name : "AUTO BODY LEAD CAPTURE SYSTEM", 
            image : "/static/GMWSAutobody.png", 
            description : `The GMWS Auto Body Collision System is built to turn inquiries into booked jobs 
            by capturing estimate requests instantly, organizing customer details and vehicle damage in one place, 
            and streamlining communication from first contact to final invoice. Instead of missed calls, scattered 
            messages, and slow follow-ups, your shop gets a structured pipeline that increases response speed, 
            builds customer trust, and helps you close more repair work consistently, without adding extra 
            workload to your team.`, 
            link : "https://www.nasirgriffin.com/autobody"
        },
        {
            name : "REAL ESTATE LEAD CAPTURE SYSTEM", 
            image : "/static/GMWSRealEstate.png", 
            description : `The GMWS Real Estate System is designed to turn interest into qualified deals by capturing 
            buyer and seller leads instantly, organizing them into a clear pipeline, and making follow-up seamless and 
            consistent. Instead of losing opportunities through missed messages or disorganized tracking, you get a 
            system that builds trust from the first interaction, keeps prospects engaged, and helps you move more leads 
            from inquiry to closed transaction, without adding complexity to your workflow.`, 
            link : "https://www.nasirgriffin.com/realestate"
        }
    ]

    const GMWSServices = [
        {
            title : "Elite Designs",
            animation : "./static/minimal_paint_v2.webm",
            copy : "Elite designs establish credibility and authority with your prospects."
        }, {
            title : "Cutting Edge Technology",
            animation : "./static/React_Spin.webm",
            copy : "Your site is built with the same tools used to build Facebook, Instagram, and Netflix."
        }, {
            title : "Systems That Convert",
            animation : "./static/minimal_gears.webm",
            copy : "Lead capture systems that make connecting with prospects seamless."
        }, {
            title : "Ongoing Maintenance",
            animation : "./static/hammer_fluid.webm",
            copy : "Continued support to keep your system online and in line with your vision."
        },
    ]
    
    const projectRefs = useRef(projects.map(() => React.createRef()));
    const systemRefs = useRef(systems.map(() => React.createRef()));
    const projectVisibilityList = projectRefs.current.map((ref) => ({
        ref,
        visibility: false,
    }));

    const systemVisibilityList = systemRefs.current.map((ref) => ({
        ref,
        visibility: false,
    }));

    
    const businessTitleRef = useRef(null);
    const contactRef = useRef(null);

    const [observingContact, setObservingContact] = useState(false);
    const [messageSent, setMessageSent] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState(null);

    //Animation refs
    const ClientServices = useRef(null);
    const PageDetails = useRef(null);
    const ServicesHeader = useRef(null);
    const TestimonialsHeader = useRef(null);
    const CaseStudiesHeader = useRef(null);
    const SystemsHeader = useRef(null);
    const ProductsHeader = useRef(null);
    const ContactHeader = useRef(null);
    const SubmissionBox = useRef(null);

    const HeroRef = useRef(null);
    const BusinessHeader = useRef(null);
    const MainSiteHeader = useRef(null);
    const Slogan = useRef(null);
    const CTAButton = useRef(null);

    const [selectedProject, setSelectedProject] = useState(0)

    const [selectedService, setSelectedService] = useState(0)

    const [currentService, setCurrentService] = useState(0)


    const navigate = useNavigate();

    function scrollToContact() {
        contactRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    const videoRef = useRef(null);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        // Set these properties before calling play().
        // defaultMuted is useful because Safari evaluates the initial media state.
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        const attemptAutoplay = async () => {
            try {
                await video.play();
                setAutoplayBlocked(false);
            } catch (error) {
                console.warn("Safari blocked autoplay:", error);
                setAutoplayBlocked(true);
            }
        };

        // Attempt immediately after mounting.
        attemptAutoplay();

        // Retry once Safari confirms that enough media metadata is available.
        video.addEventListener("loadedmetadata", attemptAutoplay);
        video.addEventListener("canplay", attemptAutoplay);

        return () => {
            video.removeEventListener("loadedmetadata", attemptAutoplay);
            video.removeEventListener("canplay", attemptAutoplay);
        };
    }, [videoRef]);

    const handleManualPlay = async () => {
        const video = videoRef.current;

        if (!video) return;

        try {
        video.muted = true;
        await video.play();
        setAutoplayBlocked(false);
        } catch (error) {
        console.error("Video still could not play:", error);
        }
    };
    
    useEffect(() => {
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, [appWidth, appHeight, pageHeight]);

    useEffect(() => {
        
        requestAnimationFrame(() => {
            const ctx = gsap.context(() => {

                //Hero Animation Timeline

                const HeaderTimeline = gsap.timeline({
                    delay: 0.45, // waits before the first animation starts
                    defaults: {
                        ease: "power3.out",
                    }
                });

                HeaderTimeline.fromTo(
                    HeroRef.current,
                    {
                        autoAlpha: 0,
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.9,
                    }
                );

                HeaderTimeline.fromTo(
                    BusinessHeader.current,
                    {
                        y: -20,
                        scale: 0.96,
                        autoAlpha: 0,
                    },
                    {
                        y: 0,
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.9,
                        filter: "blur(0px)",
                    }, "-=0.45"
                );

                HeaderTimeline.fromTo(
                    MainSiteHeader.current,
                    {
                        x: -20,
                        autoAlpha: 0,
                    },
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 1.2,
                        filter: "blur(0px)",
                    }, "-=0.55"
                );

                HeaderTimeline.fromTo(
                    Slogan.current,
                    {
                        x: -20,
                        autoAlpha: 0,
                    },
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 1.2,
                        filter: "blur(0px)",
                    }, "-=0.55"
                );

                HeaderTimeline.fromTo(
                    CTAButton.current,
                    {
                        y: 20,
                        scale: 0.96,
                        autoAlpha: 0,
                    },
                    {
                        y: 0,
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.9,
                        filter: "blur(0px)",
                    }, "-=0.55"
                );

                //End Header Animations

                //Start About Section Animations

                /*
                    const AboutGMWS = useRef(null);
                    const AboutHeader = useRef(null);
                    const AboutContent = useRef(null);
                    const AboutSubtext = useRef(null);
                    const AboutSubtextFirst = useRef(null);
                    const AboutSubtextSecond = useRef(null);
                    const AboutSubtextThird = useRef(null);
                */

                const AboutTimeline = gsap.timeline({
                    delay : 2,
                    defaults: {
                        ease: "power3.out",
                    },
                    scrollTrigger: {
                        trigger: AboutSubtext.current, // the element that starts the animation
                        start: "top bottom", // when the top of the box hits the center of the viewport
                    }
                });

                gsap.from(
                    AboutHeader.current,
                    {
                        x: -50,
                        autoAlpha: 0,
                    }
                )

                gsap.to(
                    AboutHeader.current,
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 0.9,
                        defaults: {
                            ease: "power3.out",
                        },
                        scrollTrigger : {
                            trigger : AboutHeader.current,
                            start : "top center"
                        }
                    }
                )

                AboutTimeline.fromTo(
                    [
                        AboutSubtextFirst.current,
                        AboutSubtextSecond.current,
                        AboutSubtextThird.current,
                    ],
                    {
                        y: 50,
                        autoAlpha: 0,
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.9,
                        stagger: 0.15,
                    },
                    "-=0.2"
                );

                //End About Section Animations

                //Start Services Section Animations

                /* 
                    <section className='ServiceSection'>
                    <h2 className='ServiceHeader'>What Do We Do For You?</h2>
                    <div className='ServiceSelector'>
                    <div className='ServiceContent'>
                    <h2 className='ServiceTitle'>
                    <div className='InnerServiceContent'>
                    <div className='ServiceAnimationWrapper'>
                    <div className='ServiceAnimation' key={GMWSServices[selectedService].animation}>
                */

                const ServicesTimeline = gsap.timeline({
                    defaults: {
                        ease: "power3.out",
                    },
                    scrollTrigger: {
                        trigger: ".ServiceSection", // the element that starts the animation
                        start: "top center", // when the top of the box hits the center of the viewport
                    }
                });

                ServicesTimeline.fromTo(
                    ".ServiceHeader",
                    {
                        y : 50,
                        scale : 0.3,
                        autoAlpha: 0,
                    },
                    {
                        y : 0,
                        scale : 1,
                        autoAlpha: 1,
                        duration: 0.9,
                    }
                );

                ServicesTimeline.fromTo(
                    ".ServiceSelector",
                    {
                        x : -50,
                        autoAlpha: 0,
                    },
                    {
                        x : 0,
                        autoAlpha: 1,
                        duration: 0.9,
                    }
                );

                ServicesTimeline.fromTo(
                    ".ServiceContentWrapper",
                    {
                        y : 50,
                        autoAlpha: 0,
                    },
                    {
                        y : 0,
                        autoAlpha: 1,
                        duration: 0.9,
                    }
                );

                
                //End Services Section Animations

                //Client Section Animation

                    /*
                        <section className='ClientSection'>
                        <h2 className='ClientSectionHeader'>Join The Elites</h2>
                        <div className='ClientSelector'>
                        <div className={'ClientContent '.concat('slide-right-fade-in')} key={projects[selectedProject].name}>
                    */

                    const ClientTimeline = gsap.timeline({
                        defaults: {
                            ease: "power3.out",
                        },
                        scrollTrigger: {
                            trigger: ".ClientSection", // the element that starts the animation
                            start: "top center", // when the top of the box hits the center of the viewport
                        }
                    });

                    ClientTimeline.fromTo(
                        ".ClientSectionHeader",
                        {
                            y : 50,
                            scale : 0.3,
                            autoAlpha: 0,
                        },
                        {
                            y : 0,
                            scale : 1,
                            autoAlpha: 1,
                            duration: 0.9,
                        }
                    );


                    ClientTimeline.fromTo(
                        ".ClientContent",
                        {
                            y : 50,
                            autoAlpha: 0,
                        },
                        {
                            y : 0,
                            autoAlpha: 1,
                            duration: 0.9,
                        }
                    );

                //End Client Animations

                //Product Animations

                function ProductAnimationsLandscape() {
                    const ProductTimeline = gsap.timeline({
                        defaults: {
                            ease: "power3.out",
                        },
                        scrollTrigger: {
                            trigger: ".ProductsSection", // the element that starts the animation
                            start: "bottom bottom", // when the top of the box hits the center of the viewport
                        }
                    });

                    ProductTimeline.fromTo(
                        ".AlphaContent",
                        {
                            height : 0,
                        },
                        {
                            height : "auto",
                            duration: 1.2,
                        }
                    );

                    ProductTimeline.fromTo(
                        ".GammaContent",
                        {
                            height : 0,
                        },
                        {
                            height : "auto",
                            duration: 1.2,
                        }
                    );

                    ProductTimeline.fromTo(
                        ".OmegaContent",
                        {
                            height : 0,
                        },
                        {
                            height : "auto",
                            duration: 1.2,
                        }
                    );
                }

                function ProductAnimationsPortrait() {
                    gsap.from(
                        ".AlphaContainer",
                        {
                            opacity: 0,
                            x: -150,
                        }
                    )

                    gsap.to(
                        ".AlphaContainer",
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.9,
                            defaults: {
                                ease: "power3.out",
                            },
                            scrollTrigger: {
                                trigger: ".AlphaContainer", // the element that starts the animation
                                start: "top center", // when the top of the box hits the center of the viewport
                            }
                        }
                    )

                    gsap.from(
                        ".GammaContainer",
                        {
                            opacity: 0,
                            x: -150,
                        }
                    )

                    gsap.to(
                        ".GammaContainer",
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.9,
                            defaults: {
                                ease: "power3.out",
                            },
                            scrollTrigger: {
                                trigger: ".GammaContainer", // the element that starts the animation
                                start: "top center", // when the top of the box hits the center of the viewport
                            }
                        }
                    )

                    gsap.from(
                        ".OmegaContainer",
                        {
                            opacity: 0,
                            x: -150,
                        }
                    )

                    gsap.to(
                        ".OmegaContainer",
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.9,
                            defaults: {
                                ease: "power3.out",
                            },
                            scrollTrigger: {
                                trigger: ".OmegaContainer", // the element that starts the animation
                                start: "top center", // when the top of the box hits the center of the viewport
                            }
                        }
                    )
                }

                window.innerHeight < window.innerWidth ? ProductAnimationsLandscape() : ProductAnimationsPortrait()

                //Contact Animations
                gsap.set(SubmissionBox.current, {
                    autoAlpha: 1,
                    clipPath: "inset(0 100% 0 0)",
                });

                gsap.to(SubmissionBox.current, {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                    trigger: SubmissionBox.current,
                    start: "top 50%",
                    once: true,
                    },
                });
            });

            

            return () => ctx.revert();
        })
    }, []);

    useEffect(() => {
        function iterateService() {
            if (currentService === Services.length - 1) {
                setCurrentService(0);
                return;
            }

            setCurrentService(currentService + 1);
        }

        setTimeout(iterateService, 5000);

    }, [currentService])

    const newContact = async (contact) => {
        console.log(contact)

        const BASE_URL = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${BASE_URL}/api/contact/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify(contact),
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.log(await response.status);
                throw new Error("Contact unsuccessful");
            }
        } catch(err) {
            throw new Error("Contact unsuccessful");
        }
    }

    const submitContact = async () => {
        const contactObj = {
            email: email,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            message: message
        };

        try {
        await newContact(contactObj);
            setMessageSent("Your contact message was sent!");
        } catch (err) {
            setMessageSent("Your contact message failed to send.");
        }
    };
    
    
    return (
        <>
            <div className="Projects">
                <header className="BusinessTitle" style={{minHeight : appHeight === 0 ? "100vh" : "0px"}} ref={businessTitleRef}>
                    <div className='HeroInnerContainer'>
                        <div ref={BusinessHeader} className="BusinessHeader"><img src='/static/GriffinLogo.png' alt="Griffin Managed Web Solutions logo"/></div>

                        <h1 ref={MainSiteHeader} className='MainSiteHeader'>Premium Houston Web Design & Development</h1>

                        <p className="LandingCopyright">
                        © 2026 Griffin Managed Web Solutions. All rights reserved.
                        </p>

                        <p ref={Slogan} className="Slogan">
                            We turn leads into customers.
                        </p>

                        <button ref={CTAButton} className='CTAButton' onClick={() => scrollToContact()}>
                            <span>Get Started </span>
                            <svg width="2vw" height="2vw" viewBox="0 0 36 16">
                                <path d="M0 8h24M20 4L28 8L20 12" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </button>
                    </div>
                </header>

                <div className='firstdivider'></div>
                
                <main>
                    <section className='AboutGMWS' ref={AboutGMWS}>
                        <h2 className='AboutHeader' ref={AboutHeader}>Beyond Web Design</h2>

                        <div className='AboutContentContainer' ref={AboutContent}>
                            <img src='./static/ClientServicesAsset.png'/>
                            
                            <div className='ContentInnerContainer' key={Services[currentService]}>
                                <p>{Services[currentService]}</p>
                            </div>
                        </div>

                        <div className='Subtext' ref={AboutSubtext}>
                            <p ref={AboutSubtextFirst}>Accredited Engineering</p>

                            <p ref={AboutSubtextSecond}>Cinematic Presentation</p>

                            <p ref={AboutSubtextThird}>Business Outcomes</p>
                        </div>
                    </section>

                    <DividerFirstStyle />

                    <section className='ServiceSection'>
                        <h2 className='ServiceHeader'>What Do We Do For You?</h2>

                        <div className='ServiceSelector'>
                            {GMWSServices.map((service, index) => (
                                service ? <div>
                                    <a className="SelectorText" onClick={() => setSelectedService(index)}>{service.title}</a>
                                    <span className='SelectorUnderline' style={{width : selectedService === index ? "100%" : "0px"}}></span>
                                </div> : null
                            ))}
                        </div>
                    
                        <div className='ServiceContent'>
                            {GMWSServices ? <h2 className='ServiceTitle'>{GMWSServices[selectedService].title}</h2> : null }

                            {GMWSServices ? <div className='InnerServiceContent'>
                                <div className='ServiceAnimationWrapper'>
                                    <div className='ServiceAnimation' key={GMWSServices[selectedService].animation}>
                                        <video
                                            ref={videoRef} 
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline
                                        >
                                            <source
                                                src={GMWSServices[selectedService].animation}
                                                type="video/webm"
                                            />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>

                                <div className='ServiceContentwrapper'>
                                    <p className='ServiceContentCopy' key={GMWSServices[selectedService].animation}>
                                        {GMWSServices[selectedService].copy}
                                    </p>
                                </div>
                            </div> : null}
                        </div>                    
                    </section>

                    <DividerSecondStyle />

                    <section className='ClientSection'>
                        <h2 className='ClientSectionHeader'>Join The Elites</h2>
                        <div className='ClientSelector'>
                            {projects.map((client, index) => (
                                <a className='ClientLogo' onClick={() => {setSelectedProject(index)}} style={{
                                    boxShadow : selectedProject === index ? "0px 0px 12px 24px rgb(255, 255, 255, 1)" : null, 
                                    backgroundColor : selectedProject === index ? "rgb(255, 255, 255, 1)" : null}}>
                                    <img src={client.logo} />
                                </a>
                            ))}
                        </div>

                        <div className={'ClientContent '.concat('fade-in-animated')} key={projects[selectedProject].name}>
                            <a href={projects[selectedProject].link} target='_blank'><h3>{projects[selectedProject].name}</h3></a>

                            {projects[selectedProject].testimony ? <div className='Testimony'>
                                <div className='Client'>
                                    <div className='ClientImage'>
                                        <img src={projects[selectedProject].testimony.image} />
                                    </div>
                                </div>
                                <p className='TestimonyText'>
                                    {projects[selectedProject].testimony.testimony}
                                </p>
                            </div> : <div></div>}

                            <p className='CaseStudyDescription'>{projects[selectedProject].description}</p>

                            <div  
                                key={projects[selectedProject].preview}
                                className='VideoPreview'
                            >
                               
                                <video 
                                    key={projects[selectedProject].preview}
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline
                                >
                                    <source
                                        src={projects[selectedProject].preview}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </section>

                    <DividerThirdStyle />

                    <section className='ProductsSection'>
                        <h2>Choose Your Level of Digital Dominance</h2>

                        <div className='InnerProductsSection'>

                            {/* Bronze/Alpha Tier Option*/}
                            <div className='ProductContainer AlphaContainer'>
                                <div className='GriffinTier'>
                                    <img src="/static/BronzeGriffin.png" />
                                </div>

                                <div className='bronze-border gradient-border'>
                                <div className='InnerProductContainer AlphaContent'>
                                    <h3 className='TierHeader'>Alpha Tier</h3>

                                    <div className='Tier'>
                                        <img src="/static/alpha.png" />
                                    </div>

                                    <div className='ProductServices'>
                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Fully realized custom homepage.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                SEO optimized web design.
                                        </span>
                                    </div>

                                    <span className='BuildFee'><span>Build Fee: </span> $500</span>
                                    <span className='MonthlyFee'><span>Hosting + Maintenance: </span> $50</span>
                                </div>
                                </div>
                            </div>

                            {/* Silver/Gamma Tier Option*/}
                            <div className='ProductContainer GammaContainer'>
                                <div className='GriffinTier'>
                                    <img src="/static/SilverGriffin.png" />
                                </div>
                                
                                <div className='silver-border gradient-border'>
                                <div className='InnerProductContainer GammaContent'>
                                    <h3 className='TierHeader'>Gamma Tier</h3>

                                    <div className='Tier'>
                                        <img src="/static/gamma.png" />
                                    </div>

                                    <div className='ProductServices'>
                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Fully realized custom homepage.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                SEO optimized web design.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                5 additional pages.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Fully animated elite experience.
                                        </span>
                                    </div>

                                    <span className='BuildFee'><span>Build Fee: </span> $1500</span>
                                    <span className='MonthlyFee'><span>Hosting + Maintenance: </span> $100</span>
                                </div>
                                </div>
                            </div>

                            {/* Gold/Omega Tier Option*/}
                            <div className='ProductContainer OmegaContainer'>
                                <div className='GriffinTier'>
                                    <img src="/static/GoldenGriffin.png" />
                                </div>

                                <div className='gold-border gradient-border'>
                                <div className='InnerProductContainer OmegaContent'>
                                    <h3 className='TierHeader'>Omega Tier</h3>

                                    <div className='Tier'>
                                        <img src="/static/omega.png" />
                                    </div>

                                    <div className='ProductServices'>
                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Fully realized interactive brand experience.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                SEO optimized web design.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                10 additional pages.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Fully animated captivating experience.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Service location pages.
                                        </span>

                                        <span className='ProductServiceCopy'>
                                            <span className='ProductMarker'>
                                                ➤
                                            </span>
                                                Elite UI/UX features.
                                        </span>
                                    </div>

                                    <span className='BuildFee'><span>Build Fee: </span> $2500</span>
                                    <span className='MonthlyFee'><span>Hosting + Maintenance: </span> $150</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className='CallToAction'>
                            <div className='CTAContainer'>
                                <h2>Scale Your Business Today</h2>
                            </div>
                            <button className='CTAButton' onClick={() => scrollToContact()}>
                                <span>Get Started </span>
                                <svg width="2vw" height="2vw" viewBox="0 0 36 16">
                                    <path d="M0 8h24M20 4L28 8L20 12" stroke="currentColor" stroke-width="2" fill="none"/>
                                </svg>
                            </button>
                        </div>
                    </section>

                    <section>
                        <div
                            className='Contact'
                            ref={contactRef}
                            data-section="contact"
                        >
                            <div className='SocialsNav'>
                                <div className='DiamondGriffin'><img src="/static/DiamondGriffin.png" /></div>

                                <a className='SocialNav' 
                                    href='tel:+13468002659'
                                    target='_blank'
                                >
                                    <img src="./static/Phone_Contact.png" />
                                </a>

                                <a className='SocialNav' 
                                    href='mailto:info@griffinmanagedwebsolutions.com'
                                    target='_blank'
                                >
                                    <img src="./static/Email_Contact.png" />
                                </a>

                                <a className='SocialNav' 
                                    href='https://www.facebook.com/profile.php?id=61589903710335'
                                    target='_blank'
                                >
                                    <img src="./static/Facebook_Contact.png" />
                                </a>

                                <a className='SocialNav'
                                    href='https://www.instagram.com/griffinmanagedwebsolutions/'
                                    target='_blank'
                                >
                                    <img src="./static/Instagram_Contact.png" />
                                </a>

                                <a className='SocialNav'
                                    href='https://www.linkedin.com/company/117794294/'
                                    target='_blank'
                                >
                                    <img src="./static/Linkedin_Contact.png" />
                                </a>
                            </div>

                            <h2>Eclipse Your Competition Today</h2>

                            <div className='SubmissionBox' ref={SubmissionBox}>
                                <div className='ContactGrid'>
                                    <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                                    <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                                </div>

                                <textarea
                                placeholder="Enter Your Message Here"
                                onChange={(e) => setMessage(e.target.value)}
                                />

                                <button onClick={messageSent === "Your contact message failed to send." || messageSent === null ? submitContact : null}>Submit</button>
                            
                                <div className='SlashAssets'><img src="/static/SlashAssets.png" /></div>
                            </div>

                        
                            {messageSent ? <p className='ContactMessage'>{messageSent}</p> : null}
                        </div>
                    </section>
                </main>
            </div>

            <div className="BackgroundLayer">
                <div className="StartingBackground">
                    <img ref={HeroRef} src={orientation ? orientation === 'landscape' ? "/static/GriffinHome.png" : "/static/GriffinBGMobile.png" : null} />
                </div>

                <div className="TrueBackground"></div>
            </div>


        </>
    );
}

export default Client;