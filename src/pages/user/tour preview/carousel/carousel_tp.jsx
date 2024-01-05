import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './carousel_tp.css'

export default function Carousel_tp(props) {
    // console.log(props.place_id)
    const[imgs,setImgs] = useState([])
    const GetImgNames =async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/getplaceimgnames/${props.place_id}`)
        // console.log(res.data)
        setImgs(res.data)
        // console.log(imgs)
    }
    useEffect(()=>{
        GetImgNames()
    },[props.place_id])
  return (
    <div className='Carousel_tp'>
        <img
        className='Carousel_tp-img'
         src={imgs.length>0 ?  
            `${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${imgs[0].img_name}`:
            null
           } />
        
        
        
    </div>
  )
}
