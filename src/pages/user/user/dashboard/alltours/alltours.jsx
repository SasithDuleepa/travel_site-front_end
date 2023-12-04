import React from 'react'
import ProfileTourCard from '../card/profileTourCard'

export default function Alltours() {
  return (
    <div>
        <div className='profile-dashboard'>
            <p className='profile-dashboard-title'>My Tours</p>
            


            <div className='profile-right-tours-div'></div>
            <div className='profile-right-tours-heder-div'>
              <div className='profile-right-tours-heder-line'></div>
              <a className='profile-right-tours-heder'>Tours</a>
              <div className='profile-right-tours-heder-line'></div>
            </div>

            <div className='profile-right-tours-div'>
              <ProfileTourCard/>
              <ProfileTourCard/>
              <ProfileTourCard/>
              </div>
            
            <div className='profile-right-day-tours-heder-div'>
              <div className='profile-right-day-tours-heder-line'></div>
              <p className='profile-right-day-tours-heder'>Day Tours</p>
              <div className='profile-right-day-tours-heder-line'></div>
            </div>
            <div className='profile-right-day-tours-div'>
            <ProfileTourCard/>
              <ProfileTourCard/>
              <ProfileTourCard/>
            </div>
            <div className='profile-right-custom-tours-heder-div'></div>
            <div className='profile-right-custom-tours-div'></div>

        </div>
    </div>
  )
}
