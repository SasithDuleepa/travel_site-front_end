import React, { useState } from 'react'
import './contactus.css'
import axios from 'axios';


import Location from '../../../assets/icons/map-pin.png';
import Call from '../../../assets/icons/phone-call.png';
import Email from '../../../assets/icons/mail.png';
import FacebookBlue from '../../../assets/icons/facebook-blue.png';
import InstaBlue from '../../../assets/icons/instagram-blue.png';
import TwitterBlue from '../../../assets/icons/twitter-blue.png';

import Socialmedia from '../../../components/social media/socialmedia';

export default function Contactus() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[contact,setContact] = useState('');
  const[country,setCountry] = useState('');
   const[message,setMessage] = useState('');

   const SubmitHandler =async() =>{
    let data = {
      name:name,
      email:email,
      contact:contact,
      country:country,
      message:message
    }
    if(name==='' || email==='' || contact==='' || country==='' || message===''){
      alert('Please fill all the fields')
    }else{
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/request/add`,data)
          if(res.status===200){
            alert('Message Sent Successfully')
            setName('')
            setEmail('')
            setContact('')
            setCountry('')
            setMessage('')
          
          }
      } catch (error) {
        window.alert('Something went wrong!')
      }
          
    }
   } 
   const contactStyle = {
    backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '424px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div className='Contact'>

      <div  className=' wrapper' style={contactStyle}>
        <p className='Contact-main-title'>Contact Us</p>
        <div className='Contact-main-route'>
          <a className='Contact-main-route-link' href='/'>Home /</a>
          <a className='Contact-main-route_link' > Contact Us</a>
        </div>
        <div className='Contact-main-media'>
          <Socialmedia/>

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
                <input type='string' className='Contact-getintouch-contactrow-input-input' value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className='Contact-getintouch-contactrow-input-row1-email'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Email:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-input-row2'>
              <div className='Contact-getintouch-contactrow-input-row2-number'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Number:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' value={contact} onChange={(e)=>setContact(e.target.value)} />
              </div>
              <div className='Contact-getintouch-contactrow-input-row2-country'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Country:</label>
                <input type='string' className='Contact-getintouch-contactrow-input-input' value={country} onChange={(e)=>setCountry(e.target.value)}/>
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-input-row3'>
              <div className='Contact-getintouch-contactrow-input-row2-number'>
                <label className='Contact-getintouch-contactrow-input-label'>Your Message:</label>
                <textarea className='Contact-getintouch-contactrow-input-textarea' rows="4" cols="90" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
              </div>
            </div>

            <button type='submit' className='Contact-getintouch-contactrow-input-btn' onClick={SubmitHandler}>Send Your Message</button>
          </div>




          <div className='Contact-getintouch-contactrow-contacts'>
            <div className='Contact-getintouch-contactrow-contacts-row1'>
              <img className='Contact-getintouch-contactrow-contacts-row1-icon' src={Location} />
              <div className='Contact-getintouch-contactrow-contacts-row1-contact'>
                <p className='Contact-getintouch-contactrow-contacts-row1-contact-address'>
                785, Negombo Road, Liyanagemulla, Seeduwa, Sri Lanka
                </p>
              </div>
            </div>
            <div className='Contact-getintouch-contactrow-contacts-row2'>
              <img className='Contact-getintouch-contactrow-contacts-row2-icon' src={Call} />
              <div className='Contact-getintouch-contactrow-contacts-row2-contact'>
                <p className='Contact-getintouch-contactrow-contacts-row2-contact-number1'>+94112833833 (Direct Line)</p>
                <p className='Contact-getintouch-contactrow-contacts-row2-contact-number2'>+94764998615 (Whatsapp)</p>
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
