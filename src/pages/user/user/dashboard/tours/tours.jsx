import React, { useEffect, useState } from 'react'
import ProfileTourCard from '../card/profileTourCard';
import  axios  from 'axios';

export default function Tours() {
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
        getTours()
      },[] )

  return (
    <div>
        <div className='profile-dashboard-tour'>
        
        {tours.length>0?tours.map((tour,index)=>{
                return(
                  <ProfileTourCard key={index} tour={tour.tour_name}
                  img={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg?file=${tour.tour_img}`}
                  />
                )
              
              }
              ):<p className='profile-dashboard-day-tour-no-p'>No Tours</p>}
        </div>
    </div>
  )
}
