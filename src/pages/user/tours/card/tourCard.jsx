import React from 'react';
import './tourcard.css';

import Image from './../../../../assets/9\ arch\ 1.png';
export default function TourCard(props) {
  return (
    <div className='Tour-card'>
            <img className='Tour-card-img' src={props.img} alt="" />
            <div className='Tour-card-info'>
                <p className='Tour-card-info-header'>{props.title}</p>
                <p className='Tour-card-info-info'>{props.description}</p>
                 <a className='Tour-card-info-more' href={props.link}>Read more</a>
            </div>
    </div>
  )
}
