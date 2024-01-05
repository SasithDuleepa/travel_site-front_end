import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './placeImgs.css';
import axios from 'axios';


import LeftArrow from './../../assets/icons/Left Arrow-blue.png';
import RightArrow from './../../assets/icons/Right Arrow-blue.png';

import PlaceCard from './card/placeCard';

export default function PlaceImgs() {
  


  const[places,setPlaces] = useState([])
  const GetPopularPlace = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/popular/place`)
      if(res.data.length%2===0){
        setPlaces(res.data)
      }else{
        const modifiedData = res.data.slice(0, -1);
      setPlaces(modifiedData);
      }
      
    } catch (error) {
    
    }
  }
  useEffect(()=>{
    GetPopularPlace()
  },[])



  const settings = {
    dots: false,
    speed: 1400,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    // arrows:false,
    nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />


  };
  return (
    <div className='place-Imgs'>
      <h1  className='place-Imgs-title'>Popular Places</h1>
       <div className='places-main'>


          <Slider {...settings}>
          {places.length>0 ?
            places.map((place,index)=>{
              return(
                <PlaceCard 
                key={index}
                id={place.place_id} link={place.place_id} place={place.place_name} short={place.short_description} img={place.card_img }

                />
              )
            })
              :null
          }


          </Slider>

       </div>
    </div>
  )
}


function SampleNextArrow(props) {
  const {onClick } = props;
  return (

       <img alt="" onClick={onClick} src={RightArrow} className= "homecarousel-forward-arrow"/>
    
  );
}

function SamplePrevArrow(props) {
  const {  onClick } = props;
  return (

      <img alt="" onClick={onClick} src={LeftArrow} className= "homecarousel-backward-arrow" />

  );
}