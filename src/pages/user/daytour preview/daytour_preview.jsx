import React, { useEffect, useState } from 'react';
import './daytour_preview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edite from './../../../assets/icons/edit.png'
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

export default function Daytour_preview() {
  const {id}= useParams();
  // console.log(id);

  const[price,setprice] = useState(300);
  const[hotel,sethotel] = useState("Luxury");
  const[passenger,setpassenger] = useState(2);


  const [data, setData] = useState([]);
  //data about day tour
  const GetData =async ()=>{
    const res = await axios.get(`http://localhost:8080/daytour/daytour/${id}`);
    console.log(res.data);
    setData(res.data);
  }
  useEffect(()=>{
    GetData();
  },[id])



  //places according to daytour
  const [places,setplaces] = useState([]);
  const GetPlaces =async ()=>{
    try {
      if(data.length>0){
        const res = await axios.get(`http://localhost:8080/daytour/places/${data[0].day_tour_id}`);
      console.log(res.data)
      setplaces(res.data)
      }
      
    } catch (error) {
      console.log(error);
    }
   
     
  
   
  }
  useEffect(()=>{
    GetPlaces();
  },[data])




  const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
  if (!isLoaded) return (
    <p>Loading...</p>
    )
  return (
    <div className='daytour-preview'>
      <div className='daytour-preview-hero'>
        <p className='daytour-preview-hero-title'>{data.length>0?data[0].day_tour:null}</p>
      </div>

      <div className='daytour-preview-top'>
        <div className='daytour-preview-top-left'>
          <p className='daytour-preview-top-left-p1'>Package Price:{data.length>0 ? data[0].price  :null}</p>
          <div className='daytour-preview-top-left-info'>
            <p>Hotel Type : {hotel}</p>
            <p>Passenger Count : {passenger}</p>
            <img src={Edite} />
          </div>
          <div  className='daytour-preview-top-left-code'>
            <p className='daytour-preview-top-left-code-p1'>Coupon Code:</p>
            <input  className='daytour-preview-top-left-code-input'/>
            <a className='daytour-preview-top-left-code-btn'>Enter</a>
          </div>
          
          <div className='daytour-preview-top-left-line'></div>
          <a className='daytour-preview-top-left-book'>Book Now</a>
        </div>
        <div className='daytour-preview-top-right'></div>
      </div>

      <div className='daytour-center-line'></div>
      <p className='daytour-center-info'>{data.length>0?data.description:null}</p>

      <div className='daytour-preview-center'>
        <div className='daytour-preview-center-left'>
       < GoogleMap
        mapContainerClassName='daytour-preview-center-map-container'
        center={{ lat: 6.947248052781988, lng: 79.873046875 }}
        zoom={7}
      >
        {places.length>0?places.map((place,index)=>{
          return(
            <MarkerF key={index} position={{ lat: place.place_lat, lng: place.place_lng }} />
          )
         
        }):null}
     
        


      </GoogleMap>
        </div>



        <div className='daytour-preview-center-right'>
          <div  className='daytour-preview-center-right-place-div'>
            <p>{data.length>0?data[0].start_description:null}</p>
            {places.length>0?places.map((place,index)=>{
              return(
                <div key={index} className='daytour-preview-center-right-place-div-place'>
                <p><b>{place.place_name} </b> {place.place_description}</p>

                <p>{place.description}</p>

              </div>

              )
                
}):null}

          </div>
        </div>
      </div>
      <div className='daytour-preview-bottom'>
        <div className='daytour-preview-bottom-btn-div'>
          <a  className='daytour-preview-bottom-btn-active'>Inclusions & Exclusions</a>
          <a className='daytour-preview-bottom-btn-active'>Route Map</a>
          <a className='daytour-preview-bottom-btn-active'>Travel Places</a>
        </div>
        <div className='daytour-preview-bottom-info-div'>

          <div  className='daytour-preview-bottom-info-1'>
            <div className='daytour-preview-bottom-info-1-left'>
              <p>Inclusions</p>
              <ul>
                <li>Private English Speaking driver for the entire Journey</li>
                  <li>Fuel & local insurance for the vehicle</li>
                  <li> All government taxes</li>
              </ul>
            </div>
            <div className='daytour-preview-bottom-info-1-right'>
              <p>Exclusions</p>
              <ul>
                <li>Meals not mentioned in the itinerary</li>
                <li> Personal expenses are excluded.</li>
                <li>Early check-in & Late check-out.</li>
                <li> Camera & Video Permits</li>
                <li> Travel insurance is excluded</li>
                <li>There are no Air-tickets included in the tour package</li>
              </ul>
            </div>
          </div>
          <div  className='daytour-preview-bottom-info-2'></div>
          <div  className='daytour-preview-bottom-info-3'></div>

        </div>
      </div>
    </div>
  )
}
