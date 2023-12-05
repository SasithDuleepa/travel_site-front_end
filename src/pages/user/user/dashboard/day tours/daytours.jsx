import React, { useEffect, useState } from 'react'
import  axios  from 'axios';
import ProfileTourCard from './../card/profileTourCard'

export default function Daytours() {
      //get day tours
      const [daytours,setDaytours]= useState([]);
      const getDaytours = async () => {
        let user = sessionStorage.getItem('id');
        if(user){
          const res = await axios.get(`http://localhost:8080/book/pendingDayTours/${user}`);
          console.log(res.data)
          setDaytours(res.data);
        }
      }
      useEffect(()=>{
        getDaytours()

      },[] )
  return (
    <div>
        <div className='profile-dashboard-day-tour'>
        {daytours.length>0?daytours.map((daytour,index)=>{
                return(
                  <ProfileTourCard key={index}
                  tour={daytour.day_tour}
                  img={`http://localhost:8080/daytour/daytourimg?file=${daytour.img}`}
                  />
                )
              
              }
              ):null}
        </div>
    </div>
  )
}
