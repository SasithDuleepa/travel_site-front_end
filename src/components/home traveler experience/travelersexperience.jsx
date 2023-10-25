import React, { useState } from 'react';
import './travelerexperience.css';
import Carousel from "react-simply-carousel";
import review from './../../assets/review.png';

export default function Travelersexperience() {
    const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className='traveler_experience'>
      <div className='traveler-experience'>
      
      <h1 className='travelerexperience-title'>Traveler Experience</h1>

     
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
          borderRadius:"100px",
          border:"none",
          background:"rgba(97, 97, 97, 0.214",
         
        
         
        }
      }}
      backwardBtnProps={{
        children: "<",
        style: {
          width: 60,
          height: 60,
          minWidth: 60,
          alignSelf: "center",
          borderRadius:"100px",
          border:"none",
          marginRight:"00px",
          
          background:"rgba(97, 97, 97, 0.214"
          
        }
      }}
      dotsNav={{
        show: false,
        itemBtnProps: {
          style: {
            height: 16,
            width: 16,
            borderRadius: "50%",
            border: 0,
            marginLeft:"50px",
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

<Travelerexperience/>
<Travelerexperience/>
<Travelerexperience/>
<Travelerexperience/>
    </Carousel>
  </div>
    </div>
    
  )
}
function Travelerexperience(){
    return(
        <div className='travelerexperience-container'>
        <div className='travelerexperience-container-left'>
            <img src={review}/>
        </div>
        <div className='travelerexperience-container-right'>
            <h1 className='travelerexperience-container-right-title'>james</h1>
            <p className='travelerexperience-container-right-text'>Lorem ipsum dolor sit amet consectetur. 
                Nisl urna luctus urna massa. Quis sed metus 
                sagittis eu pellentesque fringilla. In senectus 
                vitae dictum ut auctor at. Sed sapien magna euismod lacus.
                 Ut interdum interdum mattis sit morbi aenean id. 
                 Felis lectus sollicitudin mauris sed mattis nibh sit. 
                 Diam scelerisque cras bibendum lacus nam
                  condimentum eget orci. Feugiat dui augue massa
                   quisque pulvinar fusce. Eget eu dictum eu mattis 
                   etiam aliquam venenatis feugiat.
                 Nunc libero viverra natoque diam at.</p>
                 <p className='travelerexperience-container-right-text'>Date </p>
        </div>
    </div>
    )
}


