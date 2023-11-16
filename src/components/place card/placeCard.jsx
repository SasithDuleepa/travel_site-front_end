import React from 'react';
import './placeCard.css';

export default function PlaceCard() {
  return (
    <div className='placecard'>
        <img  className='placecard-img'/>
        <div className='placecard_info'>
            <p className='placecard-info-title'>mirissa</p>
            <p className='placecard-info-info'>Lorem ipsum dolor sit amet consectetur. In vivamus neque proin at ut ac turpis velit.</p>
            <a className='placecard-info-more'>Read more</a>
        </div>
    </div>
  )
}
