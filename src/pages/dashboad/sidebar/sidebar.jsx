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
        <a className='sidebar-links-active'>Add Place</a>
        <a className='sidebar-links'>Add Place</a>
        <a className='sidebar-links'>Add Place</a>
        <a className='sidebar-links'>Add Place</a>
      </div>
    </div>
  )
}
