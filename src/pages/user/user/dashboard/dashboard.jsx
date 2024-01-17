import React, {  useState } from 'react'

import './dashboard.css'

import Alltours from './alltours/alltours';
import Tours from './tours/tours';
import Daytours from './day tours/daytours';


export default function Dashboard_() {
    //button
    const[allbtn,setAllbtn]= useState(true);
    const[tourbtn,setTourbtn]= useState(false);
    const[daytourbtn,setDaytourbtn]= useState(false);
  
    const AllBtnHandler = () => {
      setAllbtn(true);
      setTourbtn(false);
      setDaytourbtn(false);
    }
    const TourBtnHandler = () => {
      setAllbtn(false);
      setTourbtn(true);
      setDaytourbtn(false);
    }
    const DaytourBtnHandler = () => {
      setAllbtn(false);
      setTourbtn(false);
      setDaytourbtn(true);
    }







  return (
    <div>
        <div className='profile-dashboard-line-1'></div>

        <div className='profile-dashboard-btn-div'>
              <button className={allbtn===true? 'profile-dashboard-btn-active':'profile-dashboard-btn-deactive'} onClick={AllBtnHandler}>All</button>
              <button className={tourbtn===true?'profile-dashboard-btn-active':'profile-dashboard-btn-deactive'} onClick={TourBtnHandler}>Tours</button>
              <button className={daytourbtn===true?'profile-dashboard-btn-active':'profile-dashboard-btn-deactive'} onClick={DaytourBtnHandler}>Day Tours</button>
              {/* <a className='profile-dashboard-btn'>Custom Tours</a> */}
            </div>

        {allbtn===true?<Alltours/>:null}
            {tourbtn===true?<Tours/>:null}
            {daytourbtn===true?<Daytours/>:null}
    </div>
  )
}
