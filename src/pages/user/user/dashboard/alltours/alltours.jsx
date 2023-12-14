import React, { useEffect, useState } from 'react'
import ProfileTourCard from '../card/profileTourCard'
import  axios  from 'axios';



export default function Alltours() {

  
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
        <div className='profile-dashboard'>
            <p className='profile-dashboard-title'>My Tours</p>
            


            <div className='profile-right-tours-div'></div>
            <div className='profile-right-tours-heder-div'>
              <div className='profile-right-tours-heder-line'></div>
              <p className='profile-right-tours-heder'>Tours</p>
              <div className='profile-right-tours-heder-line'></div>
            </div>

            <div className='profile-right-tours-div'>
              <div className='profile-right-tours-div-sub'>
              {tours.length>0?tours.map((tour,index)=>{
                return(
                  <ProfileTourCard key={index} tour={tour.tour_name}
                  img={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg?file=${tour.tour_img}`}
                  />
                )
              
              }
              ):<p className='profile-right-tours-no-p'>No Tours </p>}
              </div>
            </div>
              
            
            <div className='profile-right-day-tours-heder-div'>
              <div className='profile-right-day-tours-heder-line'></div>
              <p className='profile-right-day-tours-heder'>Day Tours</p>
              <div className='profile-right-day-tours-heder-line'></div>
            </div>
            <div className='profile-right-day-tours-div'>
              <div  className='profile-right-day-tours-div-sub'>
              {daytours.length>0?daytours.map((daytour,index)=>{
                return(
                  <ProfileTourCard key={index}
                  tour={daytour.day_tour}
                  img={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${daytour.img}`}
                  />
                )
              
              }
              ):<p className='profile-right-day-tours-heder-not-p'>No Day Tours</p>}
              </div>
            </div>
            <div className='profile-right-custom-tours-heder-div'></div>
            <div className='profile-right-custom-tours-div'></div>

        </div>
    </div>
  )
}
