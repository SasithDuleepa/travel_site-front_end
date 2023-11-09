import React, { useEffect } from 'react';
import './homeDayTour.css';
import axios from 'axios';
import { useState } from 'react';
import Carousel from "react-simply-carousel";
import Arrow from './../../assets/icons/arrow-right.png';
import Sinharaja from './../../assets/Sinharaja.png'

export default function HomeDayTour() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide_, setActiveSlide_] = useState(0);
  const activeslideHandler = (val) =>{
    setActiveSlide(val)
      console.log('active val',val);
      setTimeout(() => {
        setActiveSlide(val)
      },0);
      setTimeout(() => {
        setActiveSlide_(val)
      },2000);
  }
  const [daytours,setDaytours] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [daytours,setDaytours] = useState([{day_tour:"",day_tour_id:"",description:"",img:"",price:"",_id:""}]);
  const GetDayTours = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytours`);
    // console.log(res.data);
    setDaytours(res.data);
    console.log(daytours)
    
  }
  useEffect(()=>{GetDayTours()
  
},[])

  useEffect(() => {
    console.log(daytours, activeSlide);
    console.log(daytours[activeSlide])
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, [daytours, activeSlide]);


  
  return (
    <div className='HomeDayTour'>
      <div className='HomeDayTour-main'>
        
        

          
          {daytours.length > 0 ?
          <div className='HomeDayTour-carousel-info'>
          <h1 className='HomeDayTour-carousel-info-h1'>Day Tour Packages</h1>
          <p className={`HomeDayTour-carousel-info-p1 ${isLoaded ? 'start-animation' : ''}`}>{daytours[activeSlide_].day_tour}</p>
          <p className={`HomeDayTour-carousel-info-p2 ${isLoaded ? 'start-animation' : ''}`}>{daytours[activeSlide_].description}</p>
          
             <div className='HomeDayTour-carousel-info-price-div'>
             <p className={`HomeDayTour-carousel-price-p ${isLoaded ? 'start-animation' : ''}`}>price :</p>
              
              <p className={`HomeDayTour-carousel-price ${isLoaded ? 'start-animation' : ''}`}>${daytours[activeSlide_].price}</p>

             </div>
             <a className={`HomeDayTour-carousel-readmore ${isLoaded ? 'start-animation' : ''}`} href='/tours/daytour'>Read more...</a>
            
          </div>
          :null
          }
          

             

        







        {/* <div className='HomeDayTour-carousel-info'>

          <h1 className='HomeDayTour-carousel-info-h1'>Day Tour Packages</h1>
          {daytours.length > 0 ?
          <p className={`HomeDayTour-carousel-info-p1 ${isLoaded ? 'start-animation' : ''}`}>{daytours[activeSlide].day_tour}</p>
          :null
          }
          
          <p className='HomeDayTour-carousel-info-p2'>Lorem ipsum dolor sit amet consectetur. 
            Pellentesque enim vestibulum sapien pellentesque
             sagittis ac massa felis. Nisi pharetra ultricies vel sollicitudin.
              Convallis netus facilisi phasellus purus laoreet eu.
               Hac sit ultricies in sed enim tortor eros commodo.
                Dolor elit magna sem blandit purus a pretium. 
                Tincidunt vitae in mi nibh ut arcu sodales nunc vitae. Ultricies sollicitudin id orci pellentesque morbi tempor.
             Odio tellus enim velit tellus massa etiam aenean pellentesque. Tortor.</p>
             <div className='HomeDayTour-carousel-info-price-div'>
              <p className='HomeDayTour-carousel-price-p'>price :</p>
              <p className='HomeDayTour-carousel-price'>$77</p>
             </div>
             <a className='HomeDayTour-carousel-readmore'>Read more...</a>

        </div> */}












        <div>
        <Carousel
        containerProps={{
          
          style: {
            width: "100%",
          }
        }}
        // preventScrollOnSwipe
        swipeTreshold={10}
        activeSlideIndex={activeSlide_}

        onRequestChange={activeslideHandler}
        forwardBtnProps={{
          children: <img className="arrow-right" src={Arrow} />,
          className: "HomeDayTour-carousel-forward-btn",
        }}
        backwardBtnProps={{
          children: <img className="arrow-left" src={Arrow} />,
          className: "HomeDayTour-carousel-backward-btn",
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
        delay={2000}
        itemsToShow={1}
        speed={1000}
        itemsToScroll={1}
        // autoplayDirection="backward"
        // easing="ease-in-out"
        centerMode
      >
        {daytours.length > 0 && daytours.map((daytour, index) => (
          <img key={index} src={`http://localhost:8080/daytour/daytourimg?file=${daytour.img}`} alt="" className='DayTourCarousel-img'/>
          // <div className='DayTourCarousel-img'>{daytour._id}</div>
        ))
          }


 
        {/* <img src={Sinharaja} alt="" className='DayTourCarousel-img'/> */}
        
      </Carousel>
        </div>
      </div>
    </div>
  )
}
