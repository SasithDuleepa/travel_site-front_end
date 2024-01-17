import React, { useEffect } from 'react';
import './homeDayTour.css';
import axios from 'axios';
import { useState } from 'react';
import Carousel from "react-simply-carousel";
import Arrow from './../../assets/icons/arrow-right.png';
import Sinharaja from './../../assets/Sinharaja.png'
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService ,DistanceMatrixService} from '@react-google-maps/api';

import LeftArrow from './../../assets/icons/Left Arrow.svg';
import RightArrow from './../../assets/icons/Right Arrow.svg';

export default function HomeDayTour() {

  const[startPlaceLat, setStartPlaceLat] = useState(8.938354312738735);
  const[startPlaceLng, setStartPlaceLng] = useState(80.543212890625);
  const[startDistance, setStartDistance] = useState();
  const[vehicleRate, setVehicleRate] = useState();
  const[daytourRate,setDaytourRate] = useState(null)
  const[daytourDiscountRate,setDaytourDiscountRate] = useState(null);
  const [fees, setFees] = useState(0);
  const[oranizingCost, setOrganizingCost] = useState(0)


  const[packagePrice, setPackageprice] = useState(0)
  const[passengers,setPassengers] = useState(2)
  const[discountedPrice,setDiscountedPrice]= useState(0)



  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide_, setActiveSlide_] = useState(0);

  const activeslideHandler = (val) =>{
    setActiveSlide(val)
      // console.log('active val',val);
      setTimeout(() => {
        setActiveSlide(val)
      },0);
      setTimeout(() => {
        setActiveSlide_(val)
      },2000);


  }
  const [daytours,setDaytours] = useState([]);
  const [isLoade, setIsLoade] = useState(false);
 
  const GetDayTours = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytours`);
    // console.log(res.data);
    setDaytours(res.data);
    // console.log(daytours)
    
  }
  useEffect(()=>{GetDayTours()
  
},[])

  useEffect(() => {
    // console.log(daytours, activeSlide);
    // console.log(daytours[activeSlide].day_tour_id)
    setIsLoade(false);
    setTimeout(() => {
      setIsLoade(true);
    }, 2000);
  }, [daytours, activeSlide]);


  const GetTourData = async() =>{
    
    if(daytours.length>0){
      try {
        // console.log('tour api called!!!')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytour/${daytours[activeSlide].day_tour_id}`);
        // console.log(res.data);
        
        if(res.data.length>0){
         setOrganizingCost(res.data[0].organizing_cost)
        }
  } catch (error) {
    console.log(error)
  }

    }

  }
  const GetTourPlaceData = async() =>{
    
    if(daytours.length>0){
      try {
        // console.log('place data api called!!!')
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/places/${daytours[activeSlide_].day_tour_id}`);
        // console.log(res.data);
        let totalFees = 0;
        
        if(res.data.length>0){
        //  console.log(res.data[0].place_lat)
        //  console.log(res.data[0].place_lng)
         setStartPlaceLat(res.data[0].place_lat)
         setStartPlaceLng(res.data[0].place_lng)

         res.data.forEach((place) => {
          if (place.visiting_fee !== undefined) {
            totalFees += place.visiting_fee;
          }
        });
        }
        setFees(totalFees);
  } catch (error) {
    console.log(error)
  }

    }

  }
useEffect(()=>{
  if(daytours.length>0 ){
  }
  GetTourData();
  GetTourPlaceData();
},[daytours, activeSlide_])





   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vehicles/${passengers}`);
        let data = res.data[0];
        // console.log(data);
        setVehicleRate(data.rate);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData(); 
  
  }, [startDistance]);



    //get daytour rates
    const GetDaytourRates =async ()=>{
      try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/daytour`);
            // console.log(res.data);
            
            if(res.data.length>0){
              setDaytourRate(res.data[0].daytour_rate)
            }
      } catch (error) {
        console.log(error)
      }
    
    }
    const GetDayTourDiscountRates = async() => {
      try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/daytour_discount`)
          // console.log(res.data);
          setDaytourDiscountRate(res.data[0].daytour_discount_rate);
      } catch (error) {
          
      }
  
  }
    useEffect(()=>{
      GetDaytourRates();
      GetDayTourDiscountRates();
    }
    ,[])

    useEffect(()=>{
      let sub_total = fees + startDistance*2*vehicleRate+ oranizingCost

      let tot = sub_total/passengers
      let nettotal = (100*tot)/(100-daytourRate)
      let tot_1 = nettotal.toFixed(0)
      let tot_2 = tot_1/10
    let tot_3 = Math.ceil(tot_2)

    setPackageprice(tot_3*10)

    let tot_4 = tot_3*10  *(100-daytourDiscountRate)/100
    setDiscountedPrice(tot_4)

    },[fees,startDistance,vehicleRate,oranizingCost])



    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: `${process.env.REACT_APP_MAP_API}`,
    });
    
    
    if (loadError) return <p>Error loading Google Maps API</p>;
    if (!isLoaded) return console.log('map loading');
//distance

  const distanceCallback =(response) =>{
    if (response && response.rows && response.rows.length > 0) {
      const distanceValue = response.rows[0].elements[0].distance.value;
      // console.log('Distance:', distanceValue/1000);
      setStartDistance(distanceValue/1000)
      // Update your state or perform any other actions with the distance information
    } else {
      console.error('Error retrieving distance information');
    }
   }
  return (
    <div className='HomeDayTour'>
      <div className='HomeDayTour-main'>
        
        

          
          {daytours.length > 0 ?
          <div className='HomeDayTour-carousel-info'>
          <h1 className='HomeDayTour-carousel-info-h1'>Day Tour Packages</h1>
          <a  className='HomeDayTour-link' href={`/daytour/${daytours[activeSlide_].day_tour_id}`}>
          <p  className={`HomeDayTour-carousel-info-p1 ${isLoade ? 'start-animation' : ''}`}>{daytours[activeSlide_].day_tour}</p>
          <p  className={`HomeDayTour-carousel-info-p2 ${isLoade ? 'start-animation' : ''}`}>{daytours[activeSlide_].description}</p>
          </a>
          <br/>



          <div className={`HomeDayTour-info-div-1 ${isLoade ? 'start-animation' : ''}`} >
          <div className='HomeDayTour-info-sub-div-3'>
            <p className='HomeDayTour-info-p4'>Packages price : </p>
            <p className='HomeDayTour-info-p4'> $ {packagePrice}</p>
          </div>
          <div className='HomeDayTour-info-sub-div-1'>
            <p className='HomeDayTour-info-p2'>Number of Tourists : </p>
            <p className='HomeDayTour-info-p2'>{passengers}</p>
          </div>
          <div className='HomeDayTour-info-sub-div-1'>
            <p className='HomeDayTour-info-p2'>Tour Starts from : </p>
            <p className='HomeDayTour-info-p2'>Colombo</p>
          </div>
          <div className='HomeDayTour-info-sub-div-2'>
            <p className='HomeDayTour-info-p3'>Discounted price : </p>
            <p className='HomeDayTour-info-p3'> $ {discountedPrice}</p>
          </div>
          

          
          </div>
          
             
             <div className={`HomeDayTour-carousel- ${isLoade ? 'start-animation' : ''}`}>
                {/* <a className='HomeDayTour-carousel-readmore'   href={`/daytour/${daytours[activeSlide_].day_tour_id}`}>Read more</a> */}
             </div>
             
            <div className='home-daytour-reacd-more-div'>
              <a className='home-daytour-reacd-more' href='/tours/daytour'>Read More</a>
            </div>
            </div>
             

          :null
          }

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
          children: <img className="HomeDayTour-arrow-right" src={LeftArrow} />,
          className: "HomeDayTour-carousel-forward-btn",
        }}
        backwardBtnProps={{
          children: <img className="HomeDayTour-arrow-left" src={RightArrow} />,
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
          <img key={index} src={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${daytour.home_img}`} alt="" className='DayTourCarousel-img'/>
        ))
          }

        
      </Carousel>



      <div>
        {isLoade && (
          <GoogleMap>
          <DistanceMatrixService
      options={{
        destinations: [{ location: { lat: startPlaceLat, lng: startPlaceLng} }],
        origins:['Colombo'] ,
        travelMode: 'DRIVING',
      }}
      callback={distanceCallback}
    />
          </GoogleMap>

        )}


          


        
      </div>


        </div>
      </div>
    </div>
  )
}
