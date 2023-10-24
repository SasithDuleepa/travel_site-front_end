import React, { Component, useState } from "react";
import Carousel from "react-simply-carousel";
import './HomeCarousel.css';

export default function HomeCarousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slidefunc = (e) =>{
            console.log(e);
            setActiveSlide(e);
    }
  return (
    <div className="homecarousel-main-div">
            <div className='homecarousel'>
        
        <div className="homecarousel-main">
            <div className="active-div">
                <h1>{activeSlide}</h1>
                <p className="homecarousel-p1">Discover the world and enjoy your trip</p>
            </div>
            <div className="carousel-div">
            <Carousel
        containerProps={{
          
          style: {
            width: "100%",
           
            
            userSelect: "none",
            marginLeft:"00px",
          
          }
        }}
        preventScrollOnSwipe
        swipeTreshold={1000}
        activeSlideIndex={activeSlide}
        activeSlideProps={{
          style: {
            background: "blue",
            
            
            
          }
        }}
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
          show: true,
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
        itemsToShow={18}
        speed={1600}
        itemsToScroll={1}
        // autoplayDirection="backward"
        easing="ease-in-out"
        centerMode
      >
        {Array.from({ length: 20 }).map((item, index) => (
          <div
            style={{
              background: "yellow",
              width: 200,
              height: 308,
              border: "10px solid white",
              textAlign: "center",
              lineHeight: "240px",
              boxSizing: "border-box"
            }}
            key={index}
          >
            {index}
          </div>
        ))}

        
      </Carousel>
            </div>
        

        </div>
    </div>
    </div>
    
  )
}
