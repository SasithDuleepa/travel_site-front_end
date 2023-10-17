import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div>
      <div className='footer-container'>
        <div className='footer-left'>
          <p>Help</p>
          <div className='footer-left-links-div'>
            <a href='/'>Home</a>
            <a href='/tours'>Tours</a>
            <a  href='/popular_destination'>Popular Destinations</a>
            <a  href='about'>About Us</a>
            <a  href='contactus'>Contact</a>
          </div>
        </div>
        <div className='footer-center'>
          <p>Contact Us</p>
          <div>
            <p>40C, Hospital Road, Nagoda, Kalutara, Sri Lanka</p>
            <p>+94 7777 17615 (Direct Line)<br/> +94 11279 8800 (Whatsapp)</p>
            <p>info@srilankatravelexpert.com</p>
          </div>
        </div>
        <div className='footer-right'>
          <div className='footer-right-div1'>
            <p className='right-p-1'>Subscribes to</p>
            <p className='right-p-2'>Sri Lanka Travel Expert</p>
          </div>
          <div>
            <p>News letter</p>
          </div>
          <div>
            <input/>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='footer-p'>© 2023 All rights reserved @ Sri Lanka Travel Experts | Designed and developed by Talentfort</p>
    

      </div>
    
    </div>
  )
}
