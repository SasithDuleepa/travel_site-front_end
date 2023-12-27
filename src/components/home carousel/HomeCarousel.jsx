import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './HomeCarousel.css';
import axios from "axios";

import HomeCaouselCard from "../home carousel card/homeCaouselCard";



import LeftArrow from './../../assets/icons/Left Arrow.svg'
import RightArrow from './../../assets/icons/Right Arrow.svg'

export default function HomeCarousel() {



    const[categories, setCategories] = useState([{category_img:"",category_nam:"",category_description:""}])
    //get all tour categories
    const Categories = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/getall`);
      // console.log(res.data);
      setCategories(res.data);
    }
    useEffect(() => {
      Categories();
      
    },[])


    const settings = {
      dots: false,
      speed: 1400,
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      // arrows:false,
      nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />


    };

    function SampleNextArrow(props) {
      const {onClick } = props;
      return (

           <img alt="" onClick={onClick} src={RightArrow} className= "homecarousel-forward-arrow"/>
        
      );
    }
    
    function SamplePrevArrow(props) {
      const {  onClick } = props;
      return (

          <img alt="" onClick={onClick} src={LeftArrow} className= "homecarousel-backward-arrow" />

      );
    }
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

          <Slider {...settings}>
          {categories.length > 0 && categories.map((category, index) => (
            <div>
              <HomeCaouselCard key={index} title={category.tourcategory_name} img={category.tourcategory_img} description={category.tourcategory_description} link={`/tourcategory/${category.tourcategory_id}`}/>
    

            </div>
      ))}


          </Slider>
        </div>
      </div>


      
      



    </div>
    
  )





          }


