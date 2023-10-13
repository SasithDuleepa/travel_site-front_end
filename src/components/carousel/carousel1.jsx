import React, { Component, useState } from "react";
import Carousel from "react-simply-carousel";
import './carousel1.css';

import sigiriya from './../../assets/Images.png';
import sinharaja from './../../assets/Sinharaja.png';
import gall from './../../assets/Galle Fort.png';
import hikkaduwa from './../../assets/Hikkaduwa Beach.png';
import kandy from './../../assets/Temple of the Tooth.png';

export default function Carousel1() {
    

    const [activeSlide, setActiveSlide] = useState(0);
      
     
  return (
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
        // activeSlideProps={{
        //   style: {
        //     background: "blue"
        //   }
        // }}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
            display:'none'
          }
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
            display:'none'
          }
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
        itemsToShow={1}
        speed={1600}
        easing="ease-in-out"
        centerMode
      >
        {/* {Array.from({ length: 10 }).map((item, index) => (
          <div
            style={{
              background: "yellow",
              width: 300,
              height: 300,
              border: "30px solid white",
              textAlign: "center",
              lineHeight: "240px",
              boxSizing: "border-box"
            }}
            key={index}
          >
            {index}
          </div>
        ))} */}

        <div><img className="carousel-1-img" src={sigiriya} alt="sigiriya" /></div>
        <div><img className="carousel-1-img"  src={sinharaja} alt="sinharaja" /></div>
        <div><img className="carousel-1-img"  src={gall} alt="gall" /></div>
        <div><img className="carousel-1-img"  src={hikkaduwa} alt="hikkaduwa" /></div>
        <div><img className="carousel-1-img"  src={kandy} alt="kandy" /></div>
      </Carousel>

    </div>
  )
}
