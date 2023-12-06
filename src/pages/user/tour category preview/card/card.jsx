import React, { useEffect, useState } from 'react';
import './card.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Card(props) {
    const {tour}= useParams();

  return (
    <div className='tc-card'>
      <img className='tc-card-img' src={props.image} alt="" />
        <div className='tc-card-info-div'>
            <p className='tc-card-header'>{props.name}</p>
            <p className='tc-card-p1'>5 Days/ 4 Nights</p>
            <p className='tc-card-p2'>{props.tour_description}</p>
            <a className='tc-card-a' href={props.link} >Read More</a>
        </div>
    </div>
  )
}
