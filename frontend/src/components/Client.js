import './Projects.css';
import './Client.css';
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

function Client({orientation, appWidth, appHeight, pageHeight}) {
    gsap.registerPlugin(ScrollTrigger);

    const Services = [
        {
            name: "Systems That Convert",
            description: "Systems that capture leads and turn them into paying customers.",
            image: "/static/systems.png"
        },
        {
            name: "Direct Communication",
            description: "You have direct access when you need help.",
            image: "/static/handshake.png"
        },
        {
            name: "We Handle Everything",
            description: "Everything is managed so you don’t have to worry.",
            image: "/static/handled.png"
        },
        {
            name: "Reliable & Always Online",
            description: "Your website is hosted reliably to stay online and accessible.",
            image: "/static/reliable.png"
        },
        {
            name: "Ongoing Maintenance",
            description: "All changes are handled to keep your site running smoothly.",
            image: "/static/maintenance.png"
        },
        {
            name: "Built to Grow",
            description: "Your website is built to scale as your needs change.",
            image: "/static/grow.png"
        }
    ];

    const testimonials = [ 
        {
            client : "JDMultiprocessAndServices", 
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
            name : "APEX INVESTMENTS AND ACQUISITIONS WEBPAGE", 
            image : "/static/ApexInvestments.png", 
            description : `I worked with Apex Investments & Acquisitions to develop a premium real 
            estate platform focused on credibility, trust, and high-impact visual presentation. The 
            project combines advanced animation, cinematic transitions, and modern UI design to create 
            a distinctive experience tailored to the real estate investment industry. I also integrated 
            the website directly with the company’s CRM workflow to support streamlined lead capture 
            and client communication. This project is currently still under active development, but the 
            Apex team has allowed it to be showcased here as part of my portfolio. The result is a highly 
            customized digital experience built to position the company as a premium brand within the real 
            estate space.`,
            link : "http://73.194.35.163:5000/home"
        },
        {
            name : "TRINITY SILVA MODEL PAGE", 
            image : "/static/trinitysilva.png", 
            description : `I partnered with Trinity Silva to create a polished portfolio website that positioned her as 
            a serious, professional model rather than just a social media presence. I handled the full build, deployment, 
            and hosting, giving her a centralized platform to showcase her work, aesthetic, and versatility to brands and 
            collaborators. The site elevated her personal brand, provided a professional point of contact, and gave her a 
            long-term asset she can confidently share with agencies and clients.`, 
            link : "https://www.trinitysilva.com"
        },
        {
            name : "JD MULTIPROCESS AND SERVICES WEBPAGE", 
            image : "/static/Jdmultiprocessandservices.png", 
            description : `I worked with Juliana De La Rosa to build a professional online presence that clearly 
            communicated her notary and multi-service offerings and established immediate credibility with new clients. 
            I designed, deployed, and fully managed her website so potential customers could quickly understand her 
            services, trust her legitimacy, and contact her without friction. The result was a clean, reliable digital 
            foundation that strengthened her brand and made it easier for clients to find and choose her services.`, 
            link : "https://www.jdmultiprocessandservices.com"
        }
    ]

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

    const [projectVisibilityState, setProjectVisibilityState] = useState(projectVisibilityList);
    const [systemVisibilityState, setSystemVisibilityState] = useState(systemVisibilityList);
    const [projectObserver, setProjectObserver] = useState(null);
    const [systemObserver, setSystemObserver] = useState(null);
    const servicesSectionRef = useRef(null);
    const productsSectionRef = useRef(null);
    const serviceRefs = useRef([]); // array of refs for each ServiceContainer
    const productRefs = []; // array of refs for each ServiceContainer
    const testimonialsSectionRef = useRef(null);
    const testimonialRefs = useRef([]); // array of refs for each TestimonyContainer
    const businessTitleRef = useRef(null);
    const scrollDownRef = useRef(null);
    const contactRef = useRef(null);
    const alphaRef = useRef(null);
    const betaRef = useRef(null);
    const gammaRef = useRef(null);
    const omegaRef = useRef(null);
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


    const navigate = useNavigate();

    function scrollToContact() {
        contactRef?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    
    useEffect(() => {
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, [appWidth, appHeight, pageHeight]);

    useEffect(() => {
        
        requestAnimationFrame(() => {
            const ctx = gsap.context(() => {
                gsap.to(ClientServices.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ClientServices.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.to(ServicesHeader.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ServicesHeader.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.to(TestimonialsHeader.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: TestimonialsHeader.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.to(CaseStudiesHeader.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: CaseStudiesHeader.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.to(SystemsHeader.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: SystemsHeader.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.to(ProductsHeader.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ProductsHeader.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.to(ContactHeader.current, {
                    backgroundPosition: "0% 0",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ContactHeader.current,
                        start: "top 80%",
                        end: "top 30%",
                    }
                });

                gsap.set(PageDetails.current, {
                    autoAlpha: 1,
                    clipPath: "inset(0 100% 0 0)",
                });

                gsap.to(PageDetails.current, {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                    trigger: PageDetails.current,
                    start: "top 50%",
                    once: true,
                    },
                });

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
        const el = businessTitleRef.current;
        const scrollEl = scrollDownRef.current;
        if (!el || !scrollEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Reveal sequence (keep your existing behavior)
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    el.classList.add("RevealActive");

                    // If title is visible, ensure scroll-down is visible
                    scrollEl.classList.remove("Fade-Out");
                } else {
                    // When businessTitle is no longer being observed, fade out scroll text
                    scrollEl.classList.add("Fade-Out");
                }
            }, { threshold: 0.75 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const el = contactRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                setObservingContact(true);
                console.log(observingContact)
            } else {
                setObservingContact(false);
                console.log(observingContact)
            }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
    }, []);

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
    
    useEffect(() => {
        window.scrollTo(0, 0)
        
        console.log("Section refs after mount:", projectRefs.current.map(ref => ref.current));
        console.log(projectRefs)
        if (projectObserver === null) {
            setProjectObserver(new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log(entry.target)
                    if (entry.isIntersecting) {
                        var index = 0;
                        projectRefs.current.forEach((ref) => {
                            if (entry.target === ref.current) {
                                console.log("project " + index + " is currently intersecting")
                                projectVisibilityList[index].visibility = true;
                                const updatedVisibilityList = []
                                projectVisibilityList.forEach((item) => updatedVisibilityList.push(item))
                                setProjectVisibilityState(updatedVisibilityList)  
                            } 
                            index++;
                        }) 
                    } else {
                        var index = 0;
                        projectRefs.current.forEach((ref) => {
                            if (entry.target === ref.current) {
                                console.log("section " + index + " is currently not intersecting")
                                projectVisibilityList[index].visibility = false;
                                const updatedVisibilityList = []
                                projectVisibilityList.forEach((item) => updatedVisibilityList.push(item))
                                setProjectVisibilityState(updatedVisibilityList)    
                            } 
                            index++;
                        }) 
                    }

                    console.log(projectVisibilityList) 
                })
            }, { threshold : 0.60}));
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        
        console.log("Section refs after mount:", systemRefs.current.map(ref => ref.current));
        console.log(systemRefs)
        if (systemObserver === null) {
            setSystemObserver(new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log(entry.target)
                    if (entry.isIntersecting) {
                        var index = 0;
                        systemRefs.current.forEach((ref) => {
                            if (entry.target === ref.current) {
                                console.log("project " + index + " is currently intersecting")
                                systemVisibilityList[index].visibility = true;
                                const updatedVisibilityList = []
                                systemVisibilityList.forEach((item) => updatedVisibilityList.push(item))
                                setSystemVisibilityState(updatedVisibilityList)  
                            } 
                            index++;
                        }) 
                    } else {
                        var index = 0;
                        systemRefs.current.forEach((ref) => {
                            if (entry.target === ref.current) {
                                console.log("section " + index + " is currently not intersecting")
                                systemVisibilityList[index].visibility = false;
                                const updatedVisibilityList = []
                                systemVisibilityList.forEach((item) => updatedVisibilityList.push(item))
                                setSystemVisibilityState(updatedVisibilityList)    
                            } 
                            index++;
                        }) 
                    }

                    console.log(systemVisibilityList) 
                })
            }, { threshold : 0.60}));
        }
    }, [])

    useEffect(() => {
        const el = testimonialsSectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
            const entry = entries[0];
            if (!entry) return;

            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                testimonialRefs.current.forEach((container, i) => {
                if (!container) return;

                // The element we animate inside TestimonyContainer
                const testimonyEl = container.querySelector(".Testimony");
                if (!testimonyEl) return;

                testimonyEl.classList.add("SlideUpAndAppear");
                testimonyEl.style.animationDelay = `${i * 0.5}s`; // same stagger as Services
                });

                observer.unobserve(el); // fire once
            }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        if (projectObserver !== null) {

            console.log(projectObserver)

            projectRefs.current.forEach((ref) => {
                console.log(ref.current)
                projectObserver.observe(ref.current)
            });
        }
    }, projectObserver)

    useEffect(() => {
        if (systemObserver !== null) {

            console.log(systemObserver)

            systemRefs.current.forEach((ref) => {
                console.log(ref.current)
                systemObserver.observe(ref.current)
            });
        }
    }, systemObserver)

    useEffect(() => {
        const el = servicesSectionRef.current;
        if (!el) return;

        let timeoutId = null;

        const observer = new IntersectionObserver(
            (entries) => {
            const entry = entries[0];
            if (!entry) return;

            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                serviceRefs.current.forEach((container, i) => {
                    if (!container) return;

                    // The element with the class "Service Invisible" lives inside ServiceContainer
                    const serviceEl = container.querySelector(".Service");
                    if (!serviceEl) return;

                    serviceEl.classList.add("SlideUpAndAppear");

                    // optional: stagger each element slightly
                    serviceEl.style.animationDelay = `${i * 0.5}s`;
                });

                // If you only want it to fire once:
                observer.unobserve(el);
            }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const el = productsSectionRef.current;
        if (!el) return;

        productRefs.push(alphaRef);
        productRefs.push(betaRef);
        productRefs.push(gammaRef);
        productRefs.push(omegaRef);

        let timeoutId = null;

        const thresholdValue = window.innerHeight > window.innerWidth ? 0.0000001 : 0.2;

        const observer = new IntersectionObserver(
            (entries) => {
            const entry = entries[0];
            if (!entry) return;

            if (entry.isIntersecting && entry.intersectionRatio >= thresholdValue) {
                productRefs.forEach((container, i) => {
                    if (!container) return;

                    // The element with the class "Service Invisible" lives inside ServiceContainer
                    const serviceEl = container.current
                    if (!serviceEl) return;

                    serviceEl.classList.add("SlideUpAndAppear");
                });

                // If you only want it to fire once:
                observer.unobserve(el);
            }
            },
            { threshold: thresholdValue }
        );

        observer.observe(el);

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);
    return (
        <>
            <div className="BackgroundLayer">
                <div className="StartingBackground">
                    <img src={orientation ? orientation === 'landscape' ? "/static/GriffinHome.png" : "/static/GriffinBGMobile.png" : null} />
                </div>

                <div className="TrueBackground"></div>
            </div>

            <div className='SecondBackgroundLayer'>
                <div className="FinalBackground">
                    <img src={orientation ? orientation === 'landscape' ? "/static/GriffinContact.png" : "/static/GriffinContactMobile.png" : null} />
                </div>
            </div>

            <div className="Projects">
                <p className='Scroll-Down' data-text="SCROLL DOWN" ref={scrollDownRef}>SCROLL DOWN</p>
                <div className="BusinessTitle" style={{minHeight : appHeight === 0 ? "100vh" : "0px"}} ref={businessTitleRef}>
                    <div className="BusinessHeader Reveal"><img src='/static/GriffinLogo.png' /></div>

                    <p className="Slogan Reveal">
                        We turn leads into customers.
                    </p>

                    <button className='CTAButton Reveal' onClick={() => scrollToContact()}>
                        <span>Get Started </span>
                        <svg width="2vw" height="2vw" viewBox="0 0 36 16">
                            <path d="M0 8h24M20 4L28 8L20 12" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </button>
                </div>

                <div className='firstdivider'></div>

                <div className="InitialSection Fade-In" >
                    <div class="Information">
                        <h1 className="header TextLayer" ref={ClientServices}>CLIENT SERVICES</h1>
                        <div className="divider"></div>
                        <div className="PageDetails ClientServices" ref={PageDetails}>
                            <h2 style={{textTransform : 'uppercase'}}>Websites that build trust<br />Systems that bring you customers.</h2>
                            <p>
                                We don’t just build websites, we build systems that make your business 
                                look credible and bring in customers. Every site is designed to capture 
                                leads, build trust instantly, and turn visitors into real opportunities.
                            </p>
                        </div>
                    </div>                    
                    
                    <div class="Handshake">
                            <img src="/static/handshake.png" />
                    </div>
                </div>

                <h1 className='SectionHeader ClientServices TextLayer' ref={ServicesHeader}><span>How we strengthen your business</span></h1>

                <div className="Services" ref={servicesSectionRef}>
                    {Services.map((service, index) => (
                        <div
                        key={index}
                        className="ServiceContainer"
                        ref={(node) => (serviceRefs.current[index] = node)}
                        >
                        <div className="Service" id={`service-${index}`}>
                            <p className="ServiceName">{service.name}</p>
                            <div className="ServiceImageContainer">
                                <img src={service.image} alt="no image" />
                            </div>
                            <p className="ServiceDesc">{service.description}</p>
                        </div>
                        </div>
                    ))}
                </div>

                <h1 className='SectionHeader TextLayer' ref={TestimonialsHeader}>Testimonials</h1>

                <div className='CredibilitySection'>
                    <div className='Testimonials' ref={testimonialsSectionRef}>
                        {testimonials.map((testimony, index) => (
                            <div
                                key={index}
                                className='TestimonyContainer'
                                ref={(node) => (testimonialRefs.current[index] = node)}
                            >
                                <div className='Testimony'>
                                    <div className='Client'>
                                    <div className='ClientImage'>
                                        <img src={testimony.image} alt={testimony.client} />
                                    </div>
                                    <h2>{testimony.client}</h2>
                                    </div>

                                    <p className='ClientTestimony'>{testimony.testimony}</p>

                                    <div className='StarRating'>
                                    {Array.from({ length: testimony.Stars }).map((_, starIndex) => (
                                        <div key={starIndex} className="Star">
                                        <img src="/static/star.png" alt="star" />
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='GoogleLink' onClick={() => {window.open(`https://share.google/0dNpvbwOEFTvyWejN`, '_blank')}}>
                        <div className='GoogleIcon'>
                            <img src='/static/google.png' />
                        </div>
                        Google<br />Reviews 
                        <div className='GoogleStars'>
                            5 
                            <div>
                                <img src='/static/GoogleStar.png'/>
                            </div>
                        </div>
                    </button>
                </div>

                <h1 className='SectionHeader TextLayer' ref={CaseStudiesHeader}>High Conversion Websites</h1>

                <div className="ListOfProjects">
                    {  
                        projects.map((project, index) => (
                            <div key={index} className="ProjectContainer" ref={projectRefs.current[index]}>
                                <div className={`Project ${projectVisibilityState[index].visibility ? "Slide-Up" : "Fade-Out"}`}>
                                    <p className="ProjectName">{project.name}</p>
                                    <div className="ImgAndDesc">
                                        <div className="ProjectImageContainer">
                                            <img src={project.image} alt="no image"/>
                                        </div>
                                        <p className="ProjectDesc">{project.description}</p>
                                    </div>
                                    <a className="ProjectLink" href={project.link} target="_blank">CHECK OUT {project.name}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <h1 className='SectionHeader TextLayer' ref={SystemsHeader}>Revenue Optimizing Systems</h1>

                <div className="ListOfProjects">
                    {  
                        systems.map((system, index) => (
                            <div key={index} className="ProjectContainer" ref={systemRefs.current[index]}>
                                <div className={`Project ${systemVisibilityState[index].visibility ? "Slide-Up" : "Fade-Out"}`}>
                                    <p className="ProjectName">{system.name}</p>
                                    <div className="ImgAndDesc">
                                        <div className="ProjectImageContainer">
                                            <img src={system.image} alt="no image"/>
                                        </div>
                                        <p className="ProjectDesc">{system.description}</p>
                                    </div>
                                    <a className="ProjectLink" href={system.link} target="_blank">CHECK OUT {system.name}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <h1 className='SectionHeader TextLayer' ref={ProductsHeader}>CAPTURE MORE REVENUE TODAY</h1>

                <div className='ProductsSection' ref={productsSectionRef}>
                    <div className='Products'>
                        <div className='Product Invisible' ref={alphaRef}>
                            <h1 className='Tier'>GMWS System Access</h1>

                            <div className='TierImage'><img src='/static/alpha.png' /></div>

                            <ul>
                                <li>Instant access to a proven lead capture system</li>
                                <li>Capture and organize customer inquiries automatically</li>
                                <li>Structured pipeline to track and manage every lead</li>
                                <li>Built-in workflows to respond faster and close more deals</li>
                                <li>Customer-friendly intake experience that builds trust</li>
                                <li>Admin dashboard to view, manage, and update leads in real time</li>
                                <li>Integrated into a clean, professional website</li>
                                <li>Fully hosted, maintained, and managed for you</li>
                                <li>Continuous updates and improvements to the system</li>
                            </ul>

                            <div className='Fees'>
                                <span className='BuildFee'>Setup Fee: $500</span>
                                <span className='MonthlyFee'>Monthly Fee: $150</span>
                            </div>
                        </div>

                        <div className='Product Invisible' ref={betaRef}>
                            <h1 className='Tier'>High-Conversion Website</h1>

                            <div className='TierImage'><img src='/static/beta.png' /></div>

                            <ul>
                                <li>Custom-designed website tailored to your business</li>
                                <li>Built to establish trust and professional credibility</li>
                                <li>Mobile-optimized for a seamless experience on all devices</li>
                                <li>Clear messaging that communicates your services effectively</li>
                                <li>Strategic layout designed to guide visitors to take action</li>
                                <li>Contact forms to capture inquiries and leads</li>
                                <li>Fast-loading, reliable performance</li>
                                <li>Deployed and hosted for you (no technical setup required)</li>
                                <li>Ongoing support and maintenance available</li>
                            </ul>

                            <div className='Fees'>
                                <span>Build Fee: $1000</span>
                                <span>Monthly Maintenance: $100</span>
                            </div>
                        </div>

                        <div className='Product Invisible' ref={gammaRef}>
                            <h1 className='Tier'>Elite Brand Experience</h1>

                            <div className='TierImage'><img src='/static/gamma.png' /></div>

                            <ul>
                                <li>Fully custom-built website engineered from the ground up</li>
                                <li>Advanced animations and interactions for a premium user experience</li>
                                <li>Expert-level UI/UX design focused on engagement and retention</li>
                                <li>Strategic storytelling layout that elevates your brand perception</li>
                                <li>High-impact visuals and motion design to stand out from competitors</li>
                                <li>Optimized user flow to guide visitors toward conversion</li>
                                <li>Seamless experience across desktop and mobile devices</li>
                                <li>Fully deployed, hosted, and managed for you</li>
                                <li>Ongoing support, updates, and refinement</li>
                            </ul>

                            <div className='Fees'>
                                <span>Build Fee: $2,500</span>
                                <span>Monthly Maintenance: $150</span>
                            </div>
                        </div>

                        <div className='Product Invisible' ref={omegaRef}>
                            <h1 className='Tier'>Custom Revenue System</h1>

                            <div className='TierImage'><img src='/static/omega.png' /></div>

                            <ul>
                                <li>Fully custom-built lead capture system tailored to your business workflow</li>
                                <li>Custom frontend experience designed for maximum user conversion</li>
                                <li>Advanced backend system to manage, track, and update all leads</li>
                                <li>Structured pipeline to move leads from inquiry to closed deal</li>
                                <li>Admin dashboard with full control over leads, statuses, and data</li>
                                <li>Automated workflows to reduce manual work and increase response speed</li>
                                <li>Custom features built specifically for your industry and operations</li>
                                <li>Fully deployed, hosted, and managed infrastructure</li>
                                <li>Ongoing support, updates, and system expansion</li>
                            </ul>

                            <div className='Fees'>
                                <span>Build Fee: $4,000</span>
                                <span>Monthly Maintenance: $250</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='CallToAction'>
                    <div className='CTAContainer'>
                        <h1>Scale Your Business Today</h1>
                    </div>
                    <button className='CTAButton' onClick={() => scrollToContact()}>
                        <span>Get Started </span>
                        <svg width="2vw" height="2vw" viewBox="0 0 36 16">
                            <path d="M0 8h24M20 4L28 8L20 12" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </button>
                </div>

                <h1 className='SectionHeader TextLayer' ref={ContactHeader}>Let Us Handle This For You</h1>

                <div
                    className='Contact'
                    ref={contactRef}
                    data-section="contact"
                >
                    <img className={`Snapshot ${/*observingContact ? "fade-in" : "fade-out"*/''}`} src="/static/GriffinMWS.png" />
                    <div className='ContactContainer'>
                        <div className='WhiteRectangle'>
                            <p>Get in Touch!</p>
                        </div>
                        <p className='ContactTag'>contact / inquiries</p>
                        <p className='ContactDescription'>Got questions, inquiries, or want information about services? Send me a message below!</p>

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
                        </div>

                        {messageSent ? <p className='ContactMessage'>{messageSent}</p> : null}
                    </div>
                </div>

                {/*<div className='Contact'>
                    <div className='ContactContainer'>
                        <div className='ContactMethod'>
                            <h2 className='MethodHeader'>Email Us</h2>
                            <button className='MethodButton' onClick={() => {navigate(`/contact`, { replace: true })}}>
                                <img className='MethodImage' src='/static/email.png'/>
                            </button>
                        </div>

                        <div className='ContactMethod'>
                            <h2 className='MethodHeader'>Call Us</h2>
                            <a className='MethodButton' href="tel:+16098059113">
                                <img className='MethodImage' src='/static/call.png'/>
                            </a>
                        </div>
                    </div>
                </div>*/}

            </div>
        </>
    );
}

export default Client;