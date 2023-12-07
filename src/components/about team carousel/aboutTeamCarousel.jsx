import React, { Component, useState } from "react";
import './aboutTeamCarousel.css';
import Carousel from "react-simply-carousel";

import AboutTeamCarouselCard from '../about team carousel card/aboutTeamCarouselCard';

import Left from './../../assets/icons/Left Arrow-blue.png';
import Right from './../../assets/icons/Right Arrow-blue.png';


import Person from '../../assets/teamMember.png';

export default function AboutTeamCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className="AboutTeamCarousel">
     

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
          children: <img src={Left} className="AboutTeamCarousel-right-img"/>,
          className:"AboutTeamCarousel-right"
          
          
        }}
        backwardBtnProps={{
          children: <img src={Right} className="AboutTeamCarousel-left-img"/>,
          className:"AboutTeamCarousel-left"
         
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


<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
      </Carousel>
    </div>
  )
}
