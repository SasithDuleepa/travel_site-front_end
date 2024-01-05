import React, { useEffect, useState } from 'react';
import './aboutTeamCarousel.css';
import Carousel from "react-simply-carousel";
import axios from 'axios';

import AboutTeamCarouselCard from '../about team carousel card/aboutTeamCarouselCard';

import Left from './../../assets/icons/Left Arrow-blue.png';
import Right from './../../assets/icons/Right Arrow-blue.png';


import Person from '../../assets/teamMember.png';

export default function AboutTeamCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const [Team,setTeam] = useState([])

  const GetTeam = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/get`);
      setTeam(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    GetTeam()
  },[])
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
        {Team.length > 0 && Team.map((item, index) => (
          <AboutTeamCarouselCard key={index} img={`${process.env.REACT_APP_BACKEND_URL}/team/image/${item.image}`} name={item.name} designation={item.position}/>
        ) )
        }



<AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
      </Carousel>
    </div>
  )
}
