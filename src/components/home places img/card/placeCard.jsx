import React, { useEffect, useState } from 'react';
import './placeCard.css';
import Img from './../../../assets/Galle Fort.png';
import axios from 'axios';



export default function PlaceCard(props) {

  const style_css_up = {


  }
  const style_css_down = {
    marginTop: '100px'

  }

  return (
    <a href={`/placeReview/${props.placeId}`}>
      <div className='placecard' style={props.direction === 'style_css_up' ? style_css_up : style_css_down}>
        <div className='placecard-bottom-div'>
          <p className='placecard-header'>{props.title}</p>
        </div>
        <img className='place_img' src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${props.img}`} alt="" />

      </div>
    </a>

  )

}
