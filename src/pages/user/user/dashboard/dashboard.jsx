import React, { useEffect, useState } from 'react'

import './dashboard.css'

import Alltours from './alltours/alltours';
import Tours from './tours/tours';
import Daytours from './day tours/daytours';
import  axios  from 'axios';

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

    //get day tours
    const [daytours,setDaytours]= useState([]);
    const getDaytours = async () => {
      let user = sessionStorage.getItem('id');
      if(user){
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/pendingDayTours/${user}`);
        console.log(res.data)
        setDaytours(res.data);
      }
    }

    //get tours
    const [tours,setTours]= useState([]);
    const getTours = async () => {
      let user = sessionStorage.getItem('id');
      if(user){
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/pendingTours/${user}`);
        console.log(res.data)
        setTours(res.data);
      }
    }


    useEffect(()=>{
      getDaytours()
      getTours()
    },[] )
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
