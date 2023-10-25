import React from 'react';
import './homeheader.css';
import VideoPlayer from "react-background-video-player";




//images
import video1 from '../../assets/homeimg/aa83c2c7-43a9-4dcd-8bec-5ba6fcaf1e33.mp4';

export default function Homeheader() {
  return (
    <div className='home-header-main'>
        
        <video className="background-video" autoPlay loop muted>
          <source src = {video1} type = 'video/mp4' />
          </video>

          <div className='header-over-div'>
                <h1 className='header-h1-1'>Plan your Best tour with</h1>
                <h1 className='header-h1-2'>Sri Lanka Travel Experts</h1>
                <div className='header-sub-div'>
                    <a className='header-sub-div-btn'>Plan Your Tour <a className='header-sub-div-icon'>^</a></a>
                </div>
          </div>
    </div>
  )
}
