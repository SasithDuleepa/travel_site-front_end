import React, { useEffect, useState } from 'react';
import './placeCard.css';
import Img from './../../../assets/Galle Fort.png';
import axios from 'axios';



export default function PlaceCard(props) {


  return (
    <div className='PlaceCard'>
        <img  className='PlaceCard-img' alt='' src={ 
            `${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${props.img}`

           }/>
        <div className='PlaceCard_info'>
            <p className='PlaceCard-info-title'>{props.place}</p>
            <p className='PlaceCard-info-info'>{props.short}</p>
            <a className='PlaceCard-info-more' href={`/placeReview/${props.link}`}>Read more</a>
        </div>
    </div>

  )

}
