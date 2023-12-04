import React from 'react'
import './profileTourcard.css';

export default function ProfileTourCard() {
  return (
    <div className='profileTourCard'>
        <div className='profileTourCard-layer'>
            <p className='profileTourCard-layer-p1'>My Tour Kandy</p>
            <p className='profileTourCard-layer-p2'>5 Days/ 4 Nights</p>
            <p className='profileTourCard-layer-p3'>5 Passengers</p>
            <p className='profileTourCard-layer-p4'>Price: $200</p>
            <a className='profileTourCard-layer-more'>Read more</a>
        </div>
    </div>
  )
}
