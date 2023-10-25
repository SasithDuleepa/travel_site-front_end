import React, { Component, useEffect, useState } from "react";
import Carousel from "react-simply-carousel";
import './HomeCarousel.css';
import axios from "axios";

import HomeCaouselCard from "../home carousel card/homeCaouselCard";

import Sinharaja from './../../assets/Sinharaja.png'

export default function HomeCarousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slidefunc = (e) =>{
            console.log(e);
            setActiveSlide(e);
    }

    const[categories, setCategories] = useState([{category_img:"",category_nam:"",category_description:""}])
    //get allcategories
    const Categories = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories/allcategories`);
      console.log(res.data);
      setCategories(res.data);
    }
    useEffect(() => {
      Categories();
    },[])
  return (
    <div className="homecarousel-main-div">
            <div className='homecarousel'>
        
        <div className="homecarousel-main">
            <div className="active-div">
            <img
                className="active-img" 
                src={categories[activeSlide].category_img ? 
                  `http://localhost:8080/categories/categoryimg?file=${categories[activeSlide].category_img}`:
                  Sinharaja
                } 
                alt="" />
                {/* <img
                className="active-img" 
                src={         Sinharaja
                } 
                alt="" /> */}
                <div className="active-over-div">
                  <h1 className="homecarousel-h1">{categories[activeSlide].category_name}</h1>
                  <p className="homecarousel-p1">{categories[activeSlide].category_description}</p>
                </div>
            
                
               
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
        itemsToShow={11}
        speed={1600}
        itemsToScroll={1}
        // autoplayDirection="backward"
        easing="ease-in-out"
        centerMode
      >
        {categories.length > 0 && categories.map((category, index) => (
          <HomeCaouselCard title={category.category_name} img={category.category_img}/>
        ))}
        {/* {categories.length > 0 && categories.map((category, index) => (
          <HomeCaouselCard title={category.category_name} img={category.category_img}/>
        ))}
           */}
 
        
        
      </Carousel>
            </div>
        

        </div>
    </div>



    </div>
    
  )





          }


