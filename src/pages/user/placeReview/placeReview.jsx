import React, { useEffect, useState } from 'react';
import './placeReview.css';
import { GoogleMap, useLoadScript, MarkerF  } from '@react-google-maps/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Gall from '../../../assets/homeimg/mirisssa.png'

export default function PlaceReview() {
  let { id } = useParams();



    const[visiteTime, setVisiteTime] = useState(1)
    const[ticketPrice, setTicketPrice] = useState(1)
    const [DATA, setDATA]= useState({
      place_description:"aaaaa",
      place_id: "a43f2a89-b933-4949-99ba-1f2981278490",
      place_lat: 6.02583,
      place_lng: 80.2175,
      place_name:"all fort",
      visit_time: "2h",
      visiting_fee: "1000"
    })



      // map
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
   
   


        
const[imgs, setImgs] = useState([])
const[landimg,setLandimg] = useState()
useEffect(() => {
  const GetImg = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/getplaceimgnames/${id}`)
    console.log(res.data);
    if(res.data){
        setImgs(res.data)
        setLandimg(res.data[0].img_name)
    }
  }
  
  const GetPlace = async() =>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/getplace/${id}`)
      console.log(res.data);
      if(res.data){
        let Data = res.data[0];
        
        setDATA({
          place_description:Data.place_description,
          place_id: Data.place_id,
          place_lat: Data.place_lat,
          place_lng: Data.place_lng,
          place_name:Data.place_name,
          visit_time: Data.visit_time,
          visiting_fee: Data.visiting_fee
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoaded) {
    return; // Don't fetch data until the Google Maps script is loaded
  }
  GetPlace();
  GetImg();
}
, [id, isLoaded])
           
if (!isLoaded) return (
  <p>Loading...</p>
  )

  return (
    <div className='placeReview__container-main'>
        <div className='placeReview'>
        <div className='plecereview-img-div'>
            <img src={
              imgs.length > 0 ? 
              
              `http://localhost:8080/places/placeimg?file=${landimg}`: 
              Gall
             } className='placeReview__img'/>
            <div className='placeReview__title-div'>
            <p className='placeReview__title'>{DATA.place_name}</p>
            </div>
           
        </div>
        <div className='placceReview-sub-div'>
            <div className='placceReview-sub-div-1'>
              <p className='placeReview-title-2'>About Destination</p>
              <p className='placeReview-text-2'>{DATA.place_description}</p>
            </div>
            <div className='placceReview-sub-div-2'>
              <p className='placeReview-title-3'>Additional Details</p>
              <p  className='placeReview-text-3'> Visit time : {DATA.visit_time}</p>
              <p className='placeReview-text-3'> Ticket price : {DATA.visiting_fee} $</p>
            </div>
        </div>
            
        
        
        
        <p className='placeReview-title-4'>Location</p>
        <div className='placeReview-map-div'>
            <GoogleMap
            mapContainerClassName='map-container'
            center={{lat: DATA.place_lat, lng: DATA.place_lng}}
            zoom={10}
           >
           <MarkerF position={{lat: DATA.place_lat, lng: DATA.place_lng}}/>
           </GoogleMap>

        </div>
        <p className='placeReview-title-5'>Images</p>
        <div className='placeReview-img-all-div'>
          {imgs ? imgs.map((img, index) => (
            <img key={index} src={`http://localhost:8080/places/placeimg?file=${img.img_name}`} className='placeReview-all-img'/>
          )):null}
        </div>

    </div>

    </div>
    
  )
}
