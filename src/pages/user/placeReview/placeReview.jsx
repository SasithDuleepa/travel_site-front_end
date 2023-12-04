import React, { useEffect, useState } from 'react';
import './placeReview.css';
import { GoogleMap, useLoadScript, MarkerF  } from '@react-google-maps/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Gall from '../../../assets/homeimg/mirisssa.png'
import Cart from '../../../assets/icons/shopping-cart.png'
import Socialmedia from '../../../components/social media/socialmedia';

import RightArrow from './../../../assets/icons/Right Arrow-blue.png';
import LeftArrow from './../../../assets/icons/Left Arrow-blue.png';
import Carousel from "react-simply-carousel";
export default function PlaceReview() {
  let { id } = useParams();



  const [activeSlide, setActiveSlide] = useState(0);
    const[visiteTime, setVisiteTime] = useState(1)
    const[ticketPrice, setTicketPrice] = useState(1)
    const [DATA, setDATA]= useState({
      place_description:"aaaaa",
      place_id: "a43f2a89-b933-4949-99ba-1f2981278490",
      place_lat: 6.02583,
      place_lng: 80.2175,
      place_name:"all fort",
      visit_time: "2h",
      visiting_fee: "1000",
      cover_img:''
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
          visiting_fee: Data.visiting_fee,
          cover_img:Data.cover_img
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
            <img src={`http://localhost:8080/places/placeimg?file=${DATA.cover_img}`} className='placeReview__img'/>
            <div className='placeReview__title-div'>
              <p className='placeReview__title'>{DATA.place_name}</p>
              <div className='placeReview__routes-div'>
                <a className='placeReview__routes'>Home</a>
                <a className='placeReview__routes'>/</a>
                <a className='placeReview__routes'>Popular Destinations</a>
                <a className='placeReview__routes'>/</a>
                <a className='placeReview__routes-active'>{DATA.place_name}</a>
              </div>
              <div className='placeReview__socialmedia'><Socialmedia/></div>
            
            </div>
           
        </div>
        <div className='placceReview-sub-div'>
            <div className='placceReview-sub-div-1'>
              {/* <p className='placeReview-title-2'>About Destination</p>
              <p  className='placeReview-text-3'> Visit time : {DATA.visit_time}</p>
              <p className='placeReview-text-3'> Ticket price : {DATA.visiting_fee} $</p> */}
              
            </div>
            <div className='placceReview-sub-div-2'>
              <a className='placceReview-sub-div-2-more'>Add to cart<img src={Cart}/></a>
              
            </div>
        </div>
        <p className='placeReview-text-2'>{DATA.place_description}</p>
        
        
        
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
        <p className='placeReview-title-5'>Gallery</p>
        

        <div className='placeReview-crousel-div'>
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
        // activeSlideProps={{
        //   style: {
        //     background: "blue"
        //   }
        // }}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: <img src={LeftArrow} className="place-review-carousel-forward-img"/>,
          className:"place-review-carousel-forward-btn",
          
        }}
        backwardBtnProps={{
          children: <img src={RightArrow} className="place-review-carousel-backward-img"/>,
          className:"place-review-carousel-backward-btn",
          
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
        itemsToShow={4}
        speed={1600}
        easing="ease-in-out"
        // centerMode
      >
 

         {imgs ? imgs.map((img, index) => (
         
            <img className={index%2 !==0 ? 'place-review-carousel-img-up':'place-review-carousel-img-down'} key={index} src={`http://localhost:8080/places/placeimg?file=${img.img_name}`}/>
          
            
          )):null}

        
          </Carousel>
          
        </div>

        

    </div>

    </div>
    
  )
}
