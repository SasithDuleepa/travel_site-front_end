import React, { Component, useEffect, useState } from "react";
import Carousel from "react-simply-carousel";
import './HomeCarousel.css';
import axios from "axios";

import HomeCaouselCard from "../home carousel card/homeCaouselCard";

import Sinharaja from './../../assets/Sinharaja.png'
import Arrow from './../../assets/icons/arrow-right.png'

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
      // console.log(res.data);
      setCategories(res.data);
    }
    useEffect(() => {
      Categories();
      
    },[])
    // console.log(activeSlide)
    // console.log(categories)
  return (
    <div className="homecarousel-main-div">
            <div className='homecarousel'>
        
        <div className="homecarousel-main">
            <div className="active-div">
              {activeSlide===0 ? 
              <>
              <img
                className="active-img" 
                src={categories[activeSlide].category_img ? 
                  `http://localhost:8080/categories/categoryimg?file=${categories[categories.length - 1].category_img}`:
                  Sinharaja
                } 
                alt="" />
                <div className="active-over-div">
                  <h1 className="homecarousel-h1">{categories[categories.length - 1].category_name}</h1>
                  <p className="homecarousel-p1">{categories[categories.length - 1].category_description}</p>
                </div>
              </>
              :
              <>
              <img
              className="active-img" 
              src={categories[activeSlide].category_img ? 
                `http://localhost:8080/categories/categoryimg?file=${categories[activeSlide-1].category_img}`:
                Sinharaja
              } 
              alt="" />
              <div className="active-over-div">
                  <h1 className="homecarousel-h1">{categories[activeSlide-1].category_name}</h1>
                  <p className="homecarousel-p1">{categories[activeSlide-1].category_description}</p>
                </div>
              </>
                 }

               
                
            
                
               
            </div>
            <div className="carousel-div">
            <Carousel
        containerProps={{
          
          style: {
            width: "100%",
            justifyContent: "space-between",
            userSelect: "none"

          }
        }}
        // preventScrollOnSwipe
        swipeTreshold={10}
        activeSlideIndex={activeSlide}

        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: <img className="arrow-right" src={Arrow} />,
          className: "forward-btn",
          
          // style: {
          //   width: 60,
          //   height: 60,
          //   minWidth: 60,
          //   alignSelf: "center",
            
          // }
        }}
        backwardBtnProps={{
          children: <img className="arrow-left" src={Arrow} />,
          className: "backward-btn",
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
        itemsToShow={10}
        speed={1600}
        itemsToScroll={1}
        // autoplayDirection="backward"
        // easing="ease-in-out"
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


