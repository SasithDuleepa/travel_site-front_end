import React from 'react'
import './contactus.css'

import Fb from '../../../assets/icons/facebook.png';
import Insta from '../../../assets/icons/instagram.png';
import Twitter from '../../../assets/icons/twitter.png';
import Location from '../../../assets/icons/map-pin.png';
import Call from '../../../assets/icons/phone-call.png';
import Email from '../../../assets/icons/mail.png';
import FacebookBlue from '../../../assets/icons/facebook-blue.png';
import InstaBlue from '../../../assets/icons/instagram-blue.png';
import TwitterBlue from '../../../assets/icons/twitter-blue.png';

export default function Contactus() {
  return (
    <div className='Contact'>

      <div className='Contact-main'>
        <p className='Contact-main-title'>Contact Us</p>
        <div className='Contact-main-route'>
          <a className='Contact-main-route-link' href='/'>Home /</a>
          <a className='Contact-main-route_link' > Contact Us</a>
        </div>
        <div className='Contact-main-media'>
          <div className='Contact-main-media-main'>
            <img className='Contact-main-media-main-icon' src={Fb} />
            <a className='Contact-main-media-main-link'>Facebook</a>
          </div>
          <div className='Contact-main-media-main'>
            <img className='Contact-main-media-main-icon' src={Insta} />
            <a className='Contact-main-media-main-link'>Instagram</a>
          </div>
          <div className='Contact-main-media-main'>
            <img className='Contact-main-media-main-icon' src={Twitter} />
            <a className='Contact-main-media-main-link'>Twitter</a>
          </div>
        </div>
      </div>

      <div className='Contact-getintouch'>
        <p className='Contact-getintouch-title'>Get in Touch with us Easily</p>
        <p className='Contact-getintouch-description'>Lorem ipsum dolor sit amet consectetur. Erat nisi scelerisque aliquet nunc mauris aliquam sapien vitae. Diam nulla etiam mauris eget malesuada consequat pharetra odio in. Iaculis nisi vehicula maecenas facilisis vestibulum ultrices amet ac. Mattis diam sit fermentum pharetra consectetur
        </p>

        <div className='Contact-getintouch-contactrow'>
          <div className='Contact-getintouch-contactrow-input'>
            <div className='Contact-getintouch-contactrow-input-row1'>
              <div className='Contact-getintouch-contactrow-input-row1-name'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Name:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' />
              </div>
              <div className='Contact-getintouch-contactrow-input-row1-email'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Email:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' />
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-input-row2'>
              <div className='Contact-getintouch-contactrow-input-row2-number'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Number:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' />
              </div>
              <div className='Contact-getintouch-contactrow-input-row2-country'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Country:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' />
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-input-row3'>
              <div className='Contact-getintouch-contactrow-input-row2-number'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Message:</label>
                <textarea className='Contact-getintouch-contactrow-input-textarea' rows="4" cols="90"></textarea>
              </div>
            </div>

            <button type='submit' className='Contact-getintouch-contactrow-input-btn'>Send Your Message</button>
          </div>




          <div className='Contact-getintouch-contactrow-contacts'>
            <div className='Contact-getintouch-contactrow-contacts-row1'>
              <img className='Contact-getintouch-contactrow-contacts-row1-icon' src={Location} />
              <div className='Contact-getintouch-contactrow-contacts-row1-contact'>
                <p className='Contact-getintouch-contactrow-contacts-row1-contact-address'>
                  Sri Lanka Travel Experts (Pvt.) Ltd,
                  40C, Hospital Road, Nagoda,
                  Kalutara, Sri Lanka
                </p>
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-contacts-row2'>
              <img className='Contact-getintouch-contactrow-contacts-row2-icon' src={Call} />
              <div className='Contact-getintouch-contactrow-contacts-row2-contact'>
                <p className='Contact-getintouch-contactrow-contacts-row2-contact-number1'>+94 7777 17615 (Direct Line)</p>
                <p className='Contact-getintouch-contactrow-contacts-row2-contact-number2'>+94 11279 8800 (Whatsapp)</p>
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-contacts-row3'>
              <img className='Contact-getintouch-contactrow-contacts-row3-icon' src={Email} />
              <div className='Contact-getintouch-contactrow-contacts-row3-contact'>
                <p className='Contact-getintouch-contactrow-contacts-row3-contact-email'>info@srilankatravelexpert.com</p>
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-contacts-row4'>
              <img className='Contact-getintouch-contactrow-contacts-row4-icon' src={FacebookBlue} />
              <img className='Contact-getintouch-contactrow-contacts-row4-icon' src={InstaBlue} />
              <img className='Contact-getintouch-contactrow-contacts-row4-icon' src={TwitterBlue} />
            </div>
          </div>


        </div>
      </div>

    </div>
  )
}
