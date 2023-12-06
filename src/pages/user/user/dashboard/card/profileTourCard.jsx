import React from 'react'
import './profileTourcard.css';

export default function ProfileTourCard(props) {
  return (
    <div className='profileTourCard'>
      <img src={props.img} alt="" className='profileTourCard-img'/>
        <div className='profileTourCard-layer'>
            <p className='profileTourCard-layer-p1'>{props.tour}</p>
            <p className='profileTourCard-layer-p2'>5 Days/ 4 Nights</p>
            <p className='profileTourCard-layer-p3'>5 Passengers</p>
            <p className='profileTourCard-layer-p4'>Price: $200</p>
            <a className='profileTourCard-layer-more'>Read more</a>
        </div>
    </div>
  )
}
