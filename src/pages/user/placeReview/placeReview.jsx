import React, { useState } from 'react';
import './placeReview.css';
import { GoogleMap, useLoadScript, MarkerF  } from '@react-google-maps/api';

import Gall from '../../../assets/homeimg/mirisssa.png'

export default function PlaceReview() {
    const[visiteTime, setVisiteTime] = useState(1)
    const[ticketPrice, setTicketPrice] = useState(1)

    const[data , setData] = useState({
        name:"",
        description:"",
        lat:6.947248052781988,
        lng:79.873046875
      })

      // map
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
    if (!isLoaded) return (
        <p>Loading...</p>
        )
   

  return (
    <div className='placeReview__container-main'>
        <div className='placeReview'>
        <div>
            <img src={Gall} className='placeReview__img'/>
            <div className='placeReview__title-div'>
            <p className='placeReview__title'>Mirissa</p>
            </div>
           
        </div>

        <p className='placeReview-title-2'>about destination</p>
        <p className='placeReview-text-2'>Lorem ipsum dolor sit amet consectetur. Interdum eget maecenas
             faucibus eu blandit nibh eu egestas. Risus elementum turpis
              adipiscing ultricies quam. Sed egestas a iaculis massa nunc.
               Mi aliquet duis a tellus nunc ultricies. Sagittis duis in 
               condimentum enim et odio sed. Eleifend pretium massa quam 
               fringilla elit et dolor risus ipsum. Vitae sed ultrices
                commodo vulputate duis ultrices. In enim orci morbi
                 faucibus amet. Cras risus amet erat bibendum ridiculus.
             Justo sed amet et tincidunt mattis ac sagittis sem. Eget arcu eget nibh eget.</p>
        
        <p className='placeReview-title-3'>Additional details</p>
        <p  className='placeReview-text-3'> Visit time : 2 hours</p>
        <p className='placeReview-text-3'> Ticket price : 2 $</p>
        <p className='placeReview-title-4'>Location</p>
        <div className='placeReview-map-div'>
            <GoogleMap
            mapContainerClassName='map-container'
            center={{lat: data.lat, lng: data.lng}}
            zoom={11}
           >
           <MarkerF position={{lat: data.lat, lng: data.lng}}/>
           </GoogleMap>

        </div>
        <p className='placeReview-title-5'>Images</p>

    </div>

    </div>
    
  )
}
