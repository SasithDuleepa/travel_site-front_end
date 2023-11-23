import React, { useEffect, useState } from 'react';
import './placeCard.css';
import Img from './../../../assets/Galle Fort.png';
import axios from 'axios';



export default function PlaceCard(props) {

    const style_css_up = {
      
    
    }
    const style_css_down = {
        marginTop:'100px'
    
    }

    //Image
    const[img,setimg] = useState('')
    const GetImg = async() => {
      try {
        const res = await axios.get(`http://localhost:8080/places/getplaceimgnames/${props.placeId}`);
        console.log(res.data[0])
        setimg(res.data[1].img_name)

      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{GetImg()},[props.placeId])
  return (
    <a href={`/placeReview/${props.placeId}`}>
      <div className='placecard' style={props.direction === 'style_css_up' ? style_css_up : style_css_down}>
        <div className='placecard-bottom-div'>
            <p className='placecard-header'>{props.title}</p>
        </div>
        <img className='place_img' src={`http://localhost:8080/places/placeimg?file=${img}`} alt="" />

    </div>
    </a>
    
  )
    
}
