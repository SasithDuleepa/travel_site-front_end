import React from 'react';
import './card.css';
import { useParams } from 'react-router-dom';


export default function Card(props) {
  return (
    <div className='tc-card'>
      <img className='tc-card-img' src={props.image} alt="" />
        <div className='tc-card-info-div'>
            <p className='tc-card-header'>{props.name}</p>
            <p className='tc-card-p1'>{props.days} Days / {props.days - 1} Nights</p>
            <p className='tc-card-p2'>{props.tour_description}</p>
            <a className='tc-card-a' href={props.link} >Read More</a>
        </div>
    </div>
  )
}
