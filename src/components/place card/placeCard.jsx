import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './placeCard.css';

export default function PlaceCard(props) {
  // console.log(props.id)

  const[imgs,setImgs] = useState([])
    const GetImgNames =async () => {
        const res = await axios.get(`http://localhost:8080/places/getplaceimgnames/${props.id}`)
        // console.log(res.data)
        setImgs(res.data)
        // console.log(imgs)
    }
    useEffect(()=>{
        GetImgNames()
    },[props.id])
  return (
    <div className='place-card'>
        <img  className='place-card-img' src={imgs.length>0 ?  
            `http://localhost:8080/places/placeimg?file=${imgs[0].img_name}`:
            //    `http://localhost:8080/places/placeimg?file=file-1699505484526-dambulla.jpg`
            null
           }/>
        <div className='place-card_info'>
            <p className='place-card-info-title'>{props.place}</p>
            <p className='place-card-info-info'>{props.short}</p>
            <a className='place-card-info-more' href={props.link}>Read more</a>
        </div>
    </div>
  )
}
