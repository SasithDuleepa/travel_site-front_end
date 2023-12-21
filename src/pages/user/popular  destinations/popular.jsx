import React, { useEffect, useState } from 'react';
import './popular.css';
import Axios from 'axios';


import PlaceCard from '../../../components/place card/placeCard';

import Socialmedia from '../../../components/social media/socialmedia';



export default function Popular() {
    const[places,setPlaces] = useState([])

    const GetPopularPlaces = async() => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/popular/place`)
        // console.log(res.data)
        setPlaces(res.data)
    }
    useEffect(()=>{
        GetPopularPlaces()
    
    },[])

    const Style = {
        backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '424px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };
  return (
    <div className='popular-destinations'>
        <div style={Style}>
            <p  className='popular-destinations-main-title'>Popular Destinations</p>
            <div className='popular-destinations-main-route'>
                <a className='popular-destinations-main-route-link'>Home /</a>
                <a className='popular-destinations-main-route_link '>popular destinations</a>
            </div>
            <div className='popular-destinations-main-media'>
                <Socialmedia/>

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
            {places.length>0 ? places.map((place,index)=>{
                return(
                    <PlaceCard key={index} id={place.place_id} link={place.place_id} place={place.place_name} short={place.short_description} img={place.card_img } />
                )
            } ):null
            }
        </div>
        <a className='popular-destinations-more' href='/places'>Find More Places</a>
    </div>
  )
}
