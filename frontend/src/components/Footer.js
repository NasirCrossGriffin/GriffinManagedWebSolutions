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

      <nav className='SocialsNav'>
        <a href='https://www.linkedin.com/company/griffin-managed-web-solutions/' target="_blank"><img src='/static/Linkedin.png' alt="Griffin Managed Web Solutions LinkedIn Link"/></a>
        <a href='https://www.facebook.com/profile.php?id=61589903710335' target="_blank"><img src='/static/Facebook.png' alt="Griffin Managed Web Solutions Facebook Link" /></a>
        <a href='https://www.instagram.com/griffinmanagedwebsolutions/' target="_blank"><img src='/static/Instagram.png' alt="Griffin Managed Web Solutions Instagram Link"/></a>
      </nav>

      <nav className='LegalNav'>
        <a href='/'>Home</a>
        <a href='/privacy-policy'>Privacy Policy</a>
        <a href='/terms-of-use'>Terms Of Use</a>
        <a href='/website-disclaimer'>Web Development Disclaimer</a>
        <a href='/accessibility'>Accessibility</a>
        <a href='/contact-footer'>Contact</a>
      </nav>
      
    </footer>
  );
}

export default Footer;


