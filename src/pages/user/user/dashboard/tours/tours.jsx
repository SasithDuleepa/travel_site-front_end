import React from 'react';
import ProfileTourCard from '../card/profileTourCard';

export default function Tours() {
  return (
    <div>
        <div className='profile-dashboard-tour'>
          <ProfileTourCard/>
          <ProfileTourCard/>
          <ProfileTourCard/>
        </div>
    </div>
  )
}
