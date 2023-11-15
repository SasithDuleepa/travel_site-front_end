import React, { useEffect, useState } from 'react';
import './placeImgs.css';
import axios from 'axios';
import Carousel from "react-simply-carousel";

import LeftArrow from './../../assets/icons/Left Arrow-blue.png';
import RightArrow from './../../assets/icons/Right Arrow-blue.png';

import PlaceCard from './card/placeCard';

export default function PlaceImgs() {
  const [activeSlide, setActiveSlide] = useState(0);


  const[places,setPlaces] = useState([])
  const GetPopularPlace = async()=>{
    try {
      const res = await axios.get('http://localhost:8080/popular/place')
      setPlaces(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    GetPopularPlace()
  },[])
  return (
    <div className='place-Imgs'>
       <div className='places-main'>
        <div>
          <Carousel
            containerProps={{
              style: {
                width: "100%",
                justifyContent: "space-between",
                userSelect: "none"
              }
            }}
            preventScrollOnSwipe
            swipeTreshold={60}
            activeSlideIndex={activeSlide}
            onRequestChange={setActiveSlide}
            forwardBtnProps={{
              children: <img src={LeftArrow} className="placeImg-carousel-forward-img"/>,
              className:"placeImg-carousel-forward-btn",
              
            }}
            backwardBtnProps={{
              children: <img src={RightArrow} className="placeImg-carousel-backward-img"/>,
              className:"placeImg-carousel-backward-btn",
              
            }}
            dotsNav={{
              show: false,
              itemBtnProps: {
                style: {
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  border: 0
                }
              },
              activeItemBtnProps: {
                style: {
                  height: 16,
                  width: 16,
                  borderRadius: "50%",
                  border: 0,
                  background: "black"
                }
              }
            }}
            autoplay={true}
            delay={1000}
            itemsToShow={5}
            speed={2000}
            easing="ease-in-out"
            centerMode
          >
         {places.length>0 ?
            places.map((place,index)=>{
              return(
                <PlaceCard 
                  placeId={place.place_id}
                  title={place.place_name}
                  direction={index%2 !== 0 ? 'style_css_down':'style_css_up'}
                />
              )
            })
              :null
          }
          </Carousel>
        </div>
       </div>
    </div>
  )
}
