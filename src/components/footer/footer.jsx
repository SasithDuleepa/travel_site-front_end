import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-main'>
      <div className='footer-container'>
        <div className='footer-left'>
          <p className='footer-help'>Help</p>
          <div className='footer-left-links-div'>
            <a className='footer-link' href='/'>Home</a>
            <a className='footer-link' href='/tours'>Tours</a>
            <a  className='footer-link' href='/popular_destination'>Popular Destinations</a>
            <a  className='footer-link' href='about'>About Us</a>
            <a className='footer-link'  href='contactus'>Contact</a>
          </div>
        </div>
        <div className='footer-center'>
          <p className='footer-contact'>Contact Us</p>
          <div>
            <p className='footer-center-p'>785, Negombo Road, Liyanagemulla, Seeduwa, Sri Lanka</p>
            <p className='footer-center-p'>+94112833833 (Direct Line)<br/> +94764998615 (Whatsapp)</p>
            <p className='footer-center-p'>info@srilankatravelexpert.com</p>
          </div>
        </div>
        <div className='footer-right'>
          <div className='footer-right-div1'>
            <p className='right-p-1'>Subscribes To</p>
            <p className='right-p-2'>Sri Lanka Travel Expert</p>
          </div>
          <div>
            <p className='footer-right-p'>News letter</p>
          </div>
          <div className='footer-right-subs'>
            <input className='footer-right-subs-input' placeholder='Enter you email here'/>
            <button className='footer-right-subs-btn'>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='footer-p'>© 2023 All rights reserved @ Sri Lanka Travel Experts | Designed and developed by Talentfort</p>
    

      </div>
    
    </div>
  )
}
