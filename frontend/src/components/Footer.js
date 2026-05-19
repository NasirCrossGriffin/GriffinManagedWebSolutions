import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import './Footer.css';

function Footer({setScrollTarget}) {


/*function navHandler(index) {
  setScrollTarget(Number(index));
  navigate(`/Home`, { replace: true });
}*/

  return (
    <footer className='Footer'>
      <div className='FooterHeading'>
        <span>Capture More Revenue Today</span>
      </div>

      <div className='ApexContact'>
        <div className='Contact'>
          <p className='ContactField'>Based In</p>
          <p className='ContactValue'>Houston, TX</p>
        </div>

        <div className='Contact'>
          <p className='ContactField'>Email Us</p>
          <p className='ContactValue'>info@griffinmanagedwebsolutions.com</p>
        </div>

        <div className='Contact'>
          <p className='ContactField'>Call Us</p>
          <p className='ContactValue'>+1 (346) 800-2659</p>
        </div>
      </div>

      {/*<div className='FooterNav'>
        <a id='0' onClick={(e) => {navHandler(e.currentTarget.id)}}>Home</a>
        <a id='1' onClick={(e) => {navHandler(e.currentTarget.id)}}>Mission</a>
        <a id='2' onClick={(e) => {navHandler(e.currentTarget.id)}}>Process</a>
        <a id='3' onClick={(e) => {navHandler(e.currentTarget.id)}}>Foreclosure</a>
        <a id='4' onClick={(e) => {navHandler(e.currentTarget.id)}}>Testimonials</a>
        <a id='5' onClick={(e) => {navHandler(e.currentTarget.id)}}>Services</a>
      </div>*/}

      <div className='FooterLogo'>
          <img src='/static/GriffinLogo.png'/>
      </div>

      <div className='LegalProtections'>
        <p className='Operator'>This website is operated by Griffin Managed Web Solutions</p>
      
        <span className='Divider'></span>

        <div className='LegalNav'>
          <a href='/'>Home</a>
          <a href='/privacy-policy'>Privacy Policy</a>
          <a href='/terms-of-use'>Terms Of Use</a>
          <a href='/website-disclaimer'>Web Development Disclaimer</a>
          <a href='/accessibility'>Accessibility</a>
          <a href='/contact-footer'>Contact</a>
        </div>

        <span className='Divider'></span>

        <div className='LegalDisclaimers'>
          <span>
            <span>No guarantee of business results: </span>
            GMWS does not guarantee increased revenue, lead volume, search rankings, customer conversions, or any specific business outcome from the use of our websites, systems, or services.
          </span>

          <span>
            <span>Project scope and functionality: </span>
            Features, integrations, timelines, and deliverables are defined by the agreed project scope. Additional functionality or revisions may require separate approval and pricing.
          </span>

          <span>
            <span>Information and content responsibility: </span>
            Clients are responsible for the accuracy, legality, and ownership of all text, branding, media, business information, and other content submitted for use on their website or system.
          </span>

          <span>
            <span>Hosting and third-party services: </span>
            GMWS may utilize third-party hosting, payment processors, analytics tools, APIs, automation platforms, email services, or external integrations to operate and maintain client projects.
          </span>

          <span>
            <span>Maintenance and support notice: </span>
            Ongoing maintenance, updates, monitoring, and technical support are provided according to the client’s selected service plan and may be modified, paused, or discontinued upon cancellation or non-payment.
          </span>
        </div>

        <span className='Divider'></span>

        <p className='Rights'>© 2026 Griffin Managed Web Solutions. All rights reserved. </p>
      </div>
    </footer>
  );
}

export default Footer;


