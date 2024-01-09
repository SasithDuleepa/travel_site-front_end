import React, { useEffect, useState } from 'react';
import './popular.css';
import Axios from 'axios';



import PlaceCard from '../../../components/place card/placeCard';

import Socialmedia from '../../../components/social media/socialmedia';



export default function Popular() {
    const[places,setPlaces] = useState([])
    const[description,setdescription] = useState('')

    const GetPopularPlaces = async() => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/popular/place`)
        // console.log(res.data)
        setPlaces(res.data)
    }

    const GetPopularPlacesDescription = async() => {
        try {
            const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/popular_places`);
            setdescription(res.data[0].popular_places)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        GetPopularPlaces()
        GetPopularPlacesDescription()
    
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
        <div className=' wrapper' style={Style}>
            <p  className='popular-destinations-main-title'>Popular Destinations</p>
            <div className='popular-destinations-main-route'>
                <a className='popular-destinations-main-route-link'>Home /</a>
                <a className='popular-destinations-main-route_link '>popular destinations</a>
            </div>
            <div className='popular-destinations-main-media'>
                <Socialmedia/>

            </div>
        </div>

        <p className='popular-destinations-info'>{description}</p>
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
