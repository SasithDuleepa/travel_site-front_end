import React from 'react';
import './homeheader.css';






export default function Homeheader() {
  return (
    <div className='home-header-main'>
      <div class="pic-wrapper">
        <div className='home-header-sub'>
          <p className='home-header-main-text'>Plan your Best tour with</p>
          <p className='home-header-sub-text'>Sri Lanka Travel Experts</p>
        </div>

        <div className='home-header-main-sub2'>
          <p className='homeheader-input-title'>Plan your Best tour with Sri Lanka Travel Expert</p>
          <div className='homeheader-input-div'>
          <input className='homeheader-input-1' placeholder='Your Name'/>
          <input className='homeheader-input-1 homeheader-input-center' placeholder='Your Mail'/>
          <input className='homeheader-input-1 homeheader-input-center' placeholder='Contact Number'/>
          <input className='homeheader-input-1 homeheader-input-center' placeholder='Your Country'/>
          <a className='homeheader-input-btn'>Plan Your Tour</a>
          </div>
          
          
        </div>
  <div className='figure  pic-1 layer' ></div>
  <div className='figure  pic-2 layer' ></div>
  <div className='figure  pic-3 layer' ></div>
  <div className='figure  pic-4 layer' ></div>
</div>
        
      
    </div>
  )
}
