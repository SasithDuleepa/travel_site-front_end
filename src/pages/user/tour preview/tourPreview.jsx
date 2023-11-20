import React, { useEffect, useState } from 'react';
import './tourPreview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calander from './../../../assets/icons/calendar.png'
import PlaceCard from '../../../components/place card/placeCard';
import Carousel from "react-simply-carousel";
import { GoogleMap, useLoadScript, MarkerF ,DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import Icon from '../../../assets/icons/icons8-location-48.png';
import Carousel_tp from './carousel/carousel_tp';

export default function TourPreview() {
  const [activeSlide, setActiveSlide] = useState(0);

  const[btn1,setBtn1]=useState('deactive')
  const[btn2,setBtn2]=useState('deactive')
  const[btn3,setBtn3]=useState('TourPreview_bottom-btn')

  const buttonHandler =(index)=>()=>{
    if(index===1){
      setBtn1('TourPreview_bottom-btn')
      setBtn2('deactive')
      setBtn3('deactive')

    }
    if(index===2){
      setBtn1('deactive')
      setBtn2('TourPreview_bottom-btn')
      setBtn3('deactive')

    }
    if(index===3){
      setBtn1('deactive')
      setBtn2('deactive')
      setBtn3('TourPreview_bottom-btn')
 
    }
   
  }



  const [expandclass,setExpandClass] = useState('TourPreview-center-right-expand-div')
  const {tour}= useParams();
  const [expandedDay, setExpandedDay] = useState(null);


  const[TourData,setTourData]= useState([])
  const[placesData, setPlacesData]= useState([])

  const[places,setPlaces] = useState([])


  const[dayPlaces,setDayPlaces] =useState([])

  //get tour and tour dates
  const GetTour = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/tour/tour/${tour}`);
      setTourData(res.data)
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching tour:', error);
    }
  };
  const GetPlaces = async() => {
    const res = await axios.get(`http://localhost:8080/tour/places/${tour}`)
    // console.log(res.data)
    setPlaces(res.data)
  }
  
  useEffect(()=>{
    GetTour()
    GetPlaces()
    
  },[tour])



  const expandhandler = (tourDateId)=>async() =>{
    setExpandClass(expandclass === 'TourPreview-center-right-expand-div' ? 'close' : 'TourPreview-center-right-expand-div');
    setExpandedDay(tourDateId);
    try {
      const res =await axios.get(`http://localhost:8080/tour/tourplaces/${tourDateId}`)
      // console.log(res.data)
      setPlacesData(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  // map
  const [response, setResponse] = React.useState(null)
  const [origin, setOrigin] = React.useState('colombo');
  let count = React.useRef(0);
  const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
  if (!isLoaded) return (
      <p>Loading...</p>
      )

      const directionsCallback = res => {
        console.log(res)
        if (res !== null && count.current < 2) {
          if (res.status === 'OK') {
            count.current += 1;
            setResponse(res);
          } else {
            count.current = 0;
            console.log('res: ', res);
          }
        }
      };
    return (
    <div className='TourPreview'>
      <div className='TourPreview-hero'></div>

      <div className='TourPreview-header'>
        <div className='TourPreview-header-left'>
          <div className='TourPreview-header-left-1'>
            <p className='TourPreview-header-left-p'>Package Price:</p>
            <p className='TourPreview-header-left-p' >$150</p>
            <p className='TourPreview-header-left-p'>$150</p>
          </div>
          <div className='TourPreview-header-info'>
            <p  className='TourPreview-header-info-p'>Hotel Type : 3 star</p>
            <p className='TourPreview-header-info-p'>Passenger Count :2</p>
          </div>
          <div className='TourPreview-header-left-coupen'>
            <p className='TourPreview-header-left-p couponcode-p'>Coupon Code : </p>
            <input className='TourPreview-header-left-input'/>
            <button className='TourPreview-header-left-btn'>enter</button>
          </div>
          <div className='TourPreview-header-left-line'></div>
          
          <a className='TourPreview-header-book-btn'>Book Now</a>
        </div>





        <div className='TourPreview-header-right'>
          <div className='TourPreview-header-right-carousel'>
          <Carousel
        containerProps={{
          
          style: {
            width: "100%",
           
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
        itemsToShow={2}
        speed={1600}
        easing="ease-in-out"
        // centerMode
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
        
        {places.length>0 ? places.map((place,index)=>{
              return(
                <Carousel_tp place_id={place.place_id  }/>
                // <p>{place.place_name  }</p>
              )
            }):null}

     
      </Carousel>
          </div>

        </div>


        

      </div>



      <div className='TourPreview-center-line'></div>

      <p className='TourPreview-center-description'>{TourData.length>0 ?TourData[0].tour_description:null}</p>

      <div className='TourPreview-center' >
        <div className='TourPreview-center-left' >
        <GoogleMap
              mapContainerClassName='map-container1'
              center={{lat: 6.947248052781988, lng: 79.873046875}}
              zoom={7}
                      >

              {placesData.length>0 ?placesData.map((place,index)=>{
                return(
                  <MarkerF key={index}
                  position={{lat: place.place_lat, lng: place.place_lng}}
                  />
                )
              }):null}
            </GoogleMap>
        </div>
        <div className='TourPreview-center-right' >

          {TourData.length>0 ? TourData.map((tourDate,index)=>{
            return(
            <div key={index} className='TourPreview-center-right-day'>
            <div className='TourPreview-center-right-day-main'><p>Day {tourDate.tour_date}</p>  <a key={index} onClick={expandhandler(tourDate.tour_date_id)}>+</a></div>
            <div className={expandedDay === tourDate.tour_date_id ? expandclass : 'close'}>
                  {/* ... (rest of the expanded content) */}

              

              {placesData.map((place,Index)=>{
                return(
                  <div>
                    <p className='TourPreview-expand-p1'>Lorem ipsum dolor sit amet consectetur.
               Velit quisque scelerisque vel faucibus ornare.
               Luctus sapien integer dolor egestas gravida ut eleifend quis. At massa mi
              </p>
                    <p className='TourPreview-expand-place-p1'><b>{place.place_name}</b>{place.place_description}</p>

                  </div>
                  

                )
                  
              })}

              <p className='TourPreview-expand-p1'>
                Lorem ipsum dolor sit amet consectetur. Velit quisque scelerisque
                vel faucibus ornare. Luctus sapien integer dolor egestas gravida ut eleifend quis. At massa mi
              </p>

              

            </div>
            
            </div>)
          }) : <p>no days</p> }



          
        </div>
      </div>

      <div className='TourPreview_bottom-div'>
        <div className='TourPreview_bottom-btn-div'>
          <a className={btn1} onClick={buttonHandler(1)}>Inclusions & Exclusions</a>
          <a className={btn2} onClick={buttonHandler(2)}>Route Map</a>
          <a className={btn3} onClick={buttonHandler(3)}>Travel Places</a>

        </div>
        <div className='TourPreview_bottom-info-div'>
          {btn1==='TourPreview_bottom-btn'?
           <div className='TourPreview-bottom-1'>
            <div className='TourPreview-bottom-1-left'>
              <p>Inclusions</p>
              <ui>
                <li>Private English Speaking driver for the entire Journey</li>
                <li>Fuel & local insurance for the vehicle</li>
                <li>All government taxes</li>
              </ui>
            </div>
            <div className='TourPreview-bottom-1-right'>
            <p>Exclusions</p>
              <ui>
                <li>Private English Speaking driver for the entire Journey</li>
                <li>Fuel & local insurance for the vehicle</li>
                <li>All government taxes</li>
              </ui>
            </div>
          </div> 
          :null}
          {btn2==='TourPreview_bottom-btn'?
          <div className='TourPreview-bottom-2'>
             <div className='TourPreview-bottom-2'>
            <div className='TourPreview-bottom-2-map'>
            <GoogleMap
              mapContainerClassName='map-container1'
              center={{lat: 6.947248052781988, lng: 79.873046875}}
              zoom={10}
                      >
                        <MarkerF position={{ lat: 6.93665, lng: 79.84505 }} />
                        <DirectionsService
            options={{
              destination: origin,
              
              waypoints: [
                ...(places.length > 0
                  ? places.map((place, index) => ({ location: { lat: place.place_lat, lng: place.place_lng },
                    // icon: {
                    //   url: {Icon},
                    //   scaledSize: new window.google.maps.Size(30, 30),
                    // },
                                                    
                  
                  }))
                  : [])
              ],
              
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          <DirectionsRenderer directions={response} />
            </GoogleMap>

            </div>
          </div> 
          </div>
          :null}
          {btn3==='TourPreview_bottom-btn'?
          <div className='TourPreview-bottom-3'>
            {places.length>0 ? places.map((place,index)=>{
              return(
                <PlaceCard key={index} id={place.place_id} place={place.place_name} 
                link ={`/placeReview/${place.place_id}`}
                short={place.short_description}
                />
              )
              
            }):null}
            
            

        </div>:
        null
          }
          
          
          

        </div>
      </div>
        
    </div>
  )
}
