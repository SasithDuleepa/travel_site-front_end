import React, { Component, useEffect, useState } from "react";
import Carousel from "react-simply-carousel";
import './HomeCarousel.css';
import axios from "axios";

import HomeCaouselCard from "../home carousel card/homeCaouselCard";



import LeftArrow from './../../assets/icons/Left Arrow.svg'
import RightArrow from './../../assets/icons/Right Arrow.svg'

export default function HomeCarousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slidefunc = (e) =>{
            console.log(e);
            setActiveSlide(e);
    }

    const[categories, setCategories] = useState([{category_img:"",category_nam:"",category_description:""}])
    //get all tour categories
    const Categories = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/getall`);
      console.log(res.data);
      setCategories(res.data);
    }
    useEffect(() => {
      Categories();
      
    },[])
    // console.log(activeSlide)
    // console.log(categories)
  return (
    <div className="homecarousel-main-div">
      <div className="homecarousel-sub-div1"></div>
      <div className="homecarousel-sub-div2"></div>

      <div className="homecarousel-upper-div">
        <div className="homecarousel-info-div">
              <p className="homecarousel-info-p1">Tour Packages</p>
              <p className="homecarousel-info-p2">Lorem ipsum dolor sit amet consectetur. Dictum risus praesent
                 convallis morbi auctor vel risus. Tortor vulputate sed neque 
                 varius dictum sagittis blandit mi. 
              </p>
              <a className="homecarousel-info-btn" href='tours/tourcategory'>Find More</a>

        </div>
        <div className='homecarousel'>
          <Carousel
        
        containerProps={{
          
          style: {
            width: "100%",
            justifyContent: "space-between",
            userSelect: "none"
          }
        }}
    preventScrollOnSwipe
    swipeTreshold={90}
    activeSlideIndex={activeSlide}


    onRequestChange={setActiveSlide}
    forwardBtnProps={{
      children: <img src={RightArrow} className= "homecarousel-forward-arrow"/>,
      className: "homecarousel-forward-btn",
      }}
    backwardBtnProps={{
      children:<img src={LeftArrow} className= "homecarousel-backward-arrow" />,
      // children: <img className="arrow-left" src={Arrow} />,
      className: "homecarousel-backward-btn",
    }}
    dotsNav={{
      show: false,
      itemBtnProps: {
        style: {
          height: 16,
          width: 16,
          borderRadius: "50%",
          border: 0,
          
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
    itemsToScroll={1}
    // autoplayDirection="backward"
    // easing="ease-in-out"
    // centerMode
  >
    {categories.length > 0 && categories.map((category, index) => (
      <HomeCaouselCard title={category.tourcategory_name} img={category.tourcategory_img} description={category.tourcategory_description} link={`/tourcategory/${category.tourcategory_id}`}/>
    ))}
   

    
    
          </Carousel>
        </div>
      </div>


      
      



    </div>
    
  )





          }


