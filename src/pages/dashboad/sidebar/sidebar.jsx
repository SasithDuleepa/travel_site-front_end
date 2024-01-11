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
      <a className={window.location.pathname==='/dashboad/promote_code' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/promote_code"}>Promote code</a>
      <a className={window.location.pathname==='/dashboad/team' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/team"}>Team</a>
      <a className={window.location.pathname==='/dashboad/placeReport' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/placeReport"}>Place Report</a>
      <a className={window.location.pathname==='/dashboad/hotel_report' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/hotel_report"}>Hotel Report</a>
      <a className={window.location.pathname==='/dashboad/request' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/request"}>Request</a>
      <a className={window.location.pathname==='/dashboad/tourbook' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/tourbook"}>Tour book</a> 
      <a className={window.location.pathname==='/dashboad/daytourbook' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/daytourbook"}>Day Tour book</a> 
        <a className={window.location.pathname==='/dashboad/addplace' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/addplace"}>Place</a>
        {/* <a className={window.location.pathname==='/dashboad/placeCategory' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/placeCategory"}>Place Category</a> */}
        
        <a className={window.location.pathname==='/dashboad/daytour' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/daytour"}>Day tour</a>
        <a className={window.location.pathname==='/dashboad/tour' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/tour"}>Tour</a>
       
        
        <a className={window.location.pathname==='/dashboad/tourCategory' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/tourCategory"}>Tour category</a>

        <a className={window.location.pathname==='/dashboad/images' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/images"}>Images</a>


        <a className={window.location.pathname==='/dashboad/hotels' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/hotels"}>Hotel</a>
        <a className={window.location.pathname==='/dashboad/vehicals' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/vehicals"}>Vehicals</a>
        <a className={window.location.pathname==='/dashboad/agents' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/agents"}>Agents</a> 
        <a className={window.location.pathname==='/dashboad/popular_destinations' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/popular_destinations"}>Popular Destinations</a>
        <a className={window.location.pathname==='/dashboad/rates' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/rates"}>Percentages</a> 
        <a className={window.location.pathname==='/dashboad/descriptions' ? "sidebar-links-active":"sidebar-links"} href={"/dashboad/descriptions"}>Descriptions</a> 
      </div>
    </div>
  )
}
