import React from 'react';
import './placeImgs.css';

import Mirissa from './../../assets/homeimg/mirisssa.png'
import Sripadaya from './../../assets/homeimg/pik-adama-1.png'
import Gall from './../../assets/homeimg/Galle-Fort-1.png'
import Kandalama from './../../assets/homeimg/Kandalama – The Surreal Village.png'
import Riveston from './../../assets/homeimg/Sunset_at_riverston.png'

export default function PlaceImgs() {
  return (
    <div className='place-Imgs'>
        <div className='placeimg-div-left'>
            <div className='placeimg-div-left-top'>
                <img className='placeimg-div-left-top-img' src={Mirissa} alt="" />
            </div>
            <div className='placeimg-div-left-bottom'>
                <div className='placeimg-div-left-bottom-left'>
                    <img src={Gall} alt="" className='placeimg-div-left-bottom-left-img' />
                
                </div>
                <div className='placeimg-div-left-bottom-right'>
                    <img src={Kandalama} alt="" className='placeimg-div-left-bottom-right-img' />
                
                
                </div>
            </div>
        </div>
        <div className='placeimg-div-right'>
            <div className='placeimg-div-right-top'>
            <img src={Sripadaya} alt="" className='placeimg-div-right-top-img'/>
            </div>
            <div className='placeimg-div-right-bottom'>
               
                <img src={Riveston} alt="" className='placeimg-div-right-bottom-img'/>
            </div>
        </div>
    </div>
  )
}
