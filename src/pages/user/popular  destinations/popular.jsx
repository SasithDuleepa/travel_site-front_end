import React, { useEffect, useState } from 'react';
import './popular.css';
import Axios from 'axios';

import Fb from '../../../assets/icons/facebook.png';
import Insta from '../../../assets/icons/instagram.png';    
import Twitter from '../../../assets/icons/twitter.png';

import PlaceCard from '../../../components/place card/placeCard';



export default function Popular() {
    const[places,setPlaces] = useState([])

    const GetPopularPlaces = async() => {
        const res = await Axios.get('http://localhost:8080/popular/place')
        // console.log(res.data)
        setPlaces(res.data)
    }
    useEffect(()=>{
        GetPopularPlaces()
    
    },[])
  return (
    <div className='popular-destinations'>
        <div  className='popular-destinations-main'>
            <p  className='popular-destinations-main-title'>Popular Destinations</p>
            <div className='popular-destinations-main-route'>
                <a className='popular-destinations-main-route-link'>Home /</a>
                <a className='popular-destinations-main-route_link '>popular destinations</a>
            </div>
            <div className='popular-destinations-main-media'>
                <div className='popular-destinations-media-main'>
                    <img className='popular-destinations-media-main-icon' src={Fb} />
                    <a className='popular-destinations-media-main-link'>Facebook</a>
                </div>
                <div className='popular-destinations-media-main'>
                    <img className='popular-destinations-media-main-icon' src={Insta} />
                    <a className='popular-destinations-media-main-link'>Instagram</a>
                </div>
                <div className='popular-destinations-media-main'>
                    <img className='popular-destinations-media-main-icon' src={Twitter} />
                    <a className='popular-destinations-media-main-link'>Twitter</a>
                </div>
            </div>
        </div>

        <p className='popular-destinations-info'>Lorem ipsum dolor sit amet consectetur. Erat nisi scelerisque aliquet 
            nunc mauris aliquam sapien vitae. Diam nulla etiam mauris eget malesuada
             consequat pharetra odio in. Iaculis nisi vehicula maecenas facilisis 
             vestibulum ultrices amet ac. Mattis diam sit fermentum pharetra consectetur
              sollicitudin. Consequat porta nullam aenean sit quam tellus orci.
               Dignissim in pulvinar volutpat nunc. Commodo eu sit at elementum. Morbi
                elementum laoreet sed tortor. Est pellentesque malesuada a
                 dignissim sed id ut. Volutpat tempor et congue pellentesque ut tempus.
                  Congue sed lectus ornare diam in. Arcu donec tellus fames augue
                   nulla enim posuere varius porttitor.
        </p>
        <div className='popular-destinations-places'>
            {places.length>0 ? places.map(place=>{
                return(
                    <PlaceCard id={place.place_id} place={place.place_name} short={place.short_description} link={`/placeReview/${place.place_id}`}/>
                )
            } ):null
            }
        </div>
        <a className='popular-destinations-more' href='/places'>Find More Places</a>
    </div>
  )
}
