import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import './daytourbook1.css';
import Socialmedia from '../../../components/social media/socialmedia';

export default function Daytourbook1() {
  const{id} = useParams();
  console.log(id);

  const[passengers,setPassengers]= useState(1)
  const[date,setDate]= useState(null)

  const NextHandler =()=>{
    if(passengers === 0 || date === null){
      alert("Please enter valid input")
    }else{
      window.location.href = `/daytourbook2/${id}/${passengers}/${date}`;
    }
    

  }

  const Style = {
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
    <div className='daytour-book-1'>
      <div style={Style}>
        <p className='daytour-book-1-hero-title'>wd</p>
        <div className='daytour-book-1-hero-route-div'>
          <a className='daytour-book-1-hero-route-1'>Home</a>
          <a className='daytour-book-1-hero-route-1'>/</a>
          <a className='daytour-book-1-hero-route-1'>Day Tours</a>
          <a className='daytour-book-1-hero-route-1'>/</a>
          <a className='daytour-book-1-hero-route-1 active-route'>Day Tour Booking</a>
        </div>
        <div className='daytour-book-1-hero-social'><Socialmedia/></div>
        
      </div>

      <div className='daytour-book-1-sub'>
        <p className='daytour-book-1-sub-title'>Please select the hotel type and passenger count for tour tour.</p>
        <div className='daytour-book-1-form'>
          <label className='daytour-book-1-form-label'>Enter Passenger Count:</label>
          <input type='number'  className='daytour-book-1-form-input' value={passengers} onChange={(e)=>setPassengers(e.target.value)}/>
        </div>
        <div className='daytour-book-1-form'>
          <label className='daytour-book-1-form-label'>Tour Start Date:</label>
          <input type='date' className='daytour-book-1-form-input' value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>

        <div  className='daytour-book-1-btn-div'>
          <a className='daytour-book-1-btn-1' href={`/daytour/${id}`}>Previous</a>
          <a className='daytour-book-1-btn-2'  onClick={NextHandler}>Next</a>
        </div>

      </div>



    </div>
  )
}
