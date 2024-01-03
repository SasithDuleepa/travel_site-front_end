import React, { useState } from 'react';
import './homeheader.css';
import axios from 'axios';







export default function Homeheader() {

  const[name , setName] = useState('');
  const[email , setEmail] = useState('');
  const[contact , setContact] = useState('');
  const[country , setCountry] = useState('');

  const SendHandler =async() =>{
    if(name!=='' && email!=='' && contact!=='' && country!==''){
      const data ={
        name:name,
        email:email,
        contact:contact,
        country:country,
      }
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/request/add`,data)
        console.log(res.data)
        window.alert('Request Sent Successfully!')
        setName('')
        setEmail('')
        setContact('')
        setCountry('')
        
      } catch (error) {
        window.alert('please try again!')
      }
      ;
    }

  }
  return (
    <div className='home-header-main'>
      <div className="pic-wrapper">
        {/* <div className='home-header-sub'>
          <p className='home-header-main-text'>Plan your Best tour with</p>
          <p className='home-header-sub-text'>Sri Lanka Travel Experts</p>
        </div> */}


<div className='home-header-sub'>
          <p className='home-header-main-text-1'>Plan your Best tour with</p>
          <p className='home-header-main-text-2'>Sri Lanka Travel Experts</p>
          
        </div>





        <div className='home-header-main-sub2'>
          <p className='homeheader-input-title'>Plan your Best tour with Sri Lanka Travel Expert</p>
          <div className='homeheader-input-div'>
          <input className='homeheader-input-1' placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name}/>
          <input className='homeheader-input-1 homeheader-input-center' placeholder='Your Mail' onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <input className='homeheader-input-1 homeheader-input-center' placeholder='Contact Number' onChange={(e)=>setContact(e.target.value)} value={contact}/>
          <input className='homeheader-input-1 homeheader-input-center' placeholder='Your Country' onChange={(e)=>setCountry(e.target.value)} value={country}/>
          <a onClick={SendHandler} className='homeheader-input-btn'>Plan Your Tour</a>
          </div>
          
          
        </div>
  <div className='figure  pic-1 layer' ></div>
  <div className='figure  pic-2 layer' ></div>
  <div className='figure  pic-3 layer' ></div>
  <div className='figure  pic-4 layer' ></div>
</div>
        
      
    </div>
  )
}
