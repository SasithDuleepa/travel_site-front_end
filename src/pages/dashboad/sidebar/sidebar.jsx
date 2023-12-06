import React from 'react';
import './sidebar.css';
import Icon1 from './../../../assets/sidebar_logo.png'
export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar_logo_container'>
        <img src={Icon1} alt="" className='sidebar_logo'/>
      </div>
      <div className='sidebar-links-div'>
      <a className={window.location.pathname==='/dashboad/request' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/request"}>Request</a>
        <a className={window.location.pathname==='/dashboad/addplace' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/addplace"}>Place</a>
        <a className={window.location.pathname==='/dashboad/placeCategory' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/placeCategory"}>Place Category</a>
        
        <a className={window.location.pathname==='/dashboad/daytour' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/daytour"}>Day tour</a>
        <a className={window.location.pathname==='/dashboad/tour' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/tour"}>Tour</a>
       
        
        <a className={window.location.pathname==='/dashboad/tourCategory' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/tourCategory"}>Tour category</a>

        <a className={window.location.pathname==='/dashboad/images' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/images"}>Images</a>


        <a className={window.location.pathname==='/dashboad/hotels' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/hotels"}>Hotel</a>
        <a className={window.location.pathname==='/dashboad/vehicals' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/vehicals"}>Vehicals</a>
        <a className={window.location.pathname==='/dashboad/agents' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/agents"}>Agents</a> 
        <a className={window.location.pathname==='/dashboad/popular_destinations' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/popular_destinations"}>Popular Destinations</a> 
      </div>
    </div>
  )
}
