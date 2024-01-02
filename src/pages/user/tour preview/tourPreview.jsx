import React, { useEffect, useState } from 'react';
import './tourPreview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PlaceCard from '../../../components/place card/placeCard';
import Carousel from "react-simply-carousel";
import { GoogleMap, useLoadScript, MarkerF ,DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

import Carousel_tp from './carousel/carousel_tp';
import Edite from '../../../assets/icons/edit.png';


import Socialmedia from './../../../components/social media/socialmedia';

import Plus from './../../../assets/icons/plus.png'

export default function TourPreview() {
  const [activeSlide, setActiveSlide] = useState(0);
  const today = 
  new Date().toISOString().slice(0, 10);
  //pop up
  const[pophotel,setPopHotel] = useState('3 star/4 star')
  const[poppassenger,setPopPassneger] = useState(2)
  const[popup1,setPopup1] = useState('hide')
  const[popup2,setPopup2] = useState('hide')
  const[popDate , setPopDate] = useState(today);

  const[startDay, setStartDay] = useState(today)
  const[total,setTotal] = useState(0)
  const[hotel,setHotel] = useState('3 star/4 star')
  const[passenger,setPassenger] = useState(2)

  const[vehicleRate,setVehicleRate] = useState(0)
  const[distance,setDistance] = useState(0)
  const[hotelPrice,setHotelPrice] = useState(0)


  const[TourData,setTourData]= useState([])
  const[placesData, setPlacesData]= useState([])
  const[places,setPlaces] = useState([])

  const[coverImg , setCoverImg] = useState('')
  

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



  const [expandclass,setExpandClass] = useState('close')
  const {tour}= useParams();
  const [expandedDay, setExpandedDay] = useState(0);



 



  //pop up
  const PopUpHandler =() =>{
    setPopup1('tourpreview-popup')
  
  }
  const PopUpHandler2 =() =>{
    setPopup2('tourpreview-popup')
  }
  const EnterHandler = () =>{
    setPassenger(poppassenger)
    setHotel(pophotel)
    setStartDay(popDate)
    setPopup1('hide')
    setPopup2('hide')
  }
  const CancelHandler = () =>{
    setPopup1('hide')
    setPopup2('hide')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vehicles/${passenger}`);
        // console.log(res.data);
        setVehicleRate(res.data[0].rate);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); 
  
  }, [passenger]);

  let hotelprice = 0;
useEffect(() => {
  const GetVisitingFee = async () => {
    
    if (TourData.length > 0) {
      
      if (hotel === '5 star') {
        
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/luxury/price/${tour}/${popDate}`);
          if (res.data.length > 0) {
            // console.log(res.data);
            hotelprice = 0;
            res.data.map((item, index) => {
              return (hotelprice = hotelprice + item.price);
            });
            setHotelPrice(hotelprice)
            
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else if (hotel === '3 star/4 star') {
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/semi/price/${tour}/${popDate}`);
          if (res.data.length > 0) {
            // console.log(res.data);
            hotelprice = 0;
            res.data.map((item, index) => {
              return (hotelprice = hotelprice + item.price);
            });
            setHotelPrice(hotelprice)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
    
  };
  
  GetVisitingFee ();
}, [hotel, popDate, TourData]);






let visiting_fee = 0;


  //get tour and tour dates
  const GetTour = async() => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour/${tour}`);
      setTourData(res.data)
      setCoverImg(res.data[0].cover_img)
      console.log(res.data)
      if(res.data.length>0){
        setDistance(res.data[0].distance)

      }
    } catch (error) {
      console.error('Error fetching tour:', error);
    }
  };
  const GetPlaces = async() => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/places/${tour}`)
    // console.log(res.data)
    setPlaces(res.data)

    let placeData = res.data
    if(placeData.length>0){
      placeData.map((item,index)=>{
        visiting_fee = visiting_fee + item.visiting_fee
        return visiting_fee

        
      })
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await GetTour();
      await GetPlaces();
    };

    fetchData();

    // Move setTotal here if necessary
    // setTotal(defaultValue);

  }, [tour]);





  const expandhandler = (tourDateId)=>async() =>{
    console.log(expandedDay)
    setExpandClass(expandclass === 'TourPreview-center-right-expand-div' ? 'close' : 'TourPreview-center-right-expand-div');
    setExpandedDay(tourDateId);
    try {
      const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tourplaces/${tourDateId}`)
      // console.log(res.data)
      setPlacesData(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  //calculation
const Calculation =()=>{
  // console.log('passengers', passenger )
  // console.log('distance', distance )
  // console.log('vehicle', vehicleRate )
  // console.log('hotel', hotelprice )
  let sub_total = hotelPrice + distance*vehicleRate  + visiting_fee;
  let total = sub_total/passenger
  let total_ = total.toFixed(0)

  let total_1 = total_/10
  let total_2 = Math.ceil(total_1)


  setTotal(total_2*10)
}
useEffect(()=>{
  Calculation();
  // console.log('hotel', hotelPrice )
}
,[distance,hotelprice,visiting_fee,vehicleRate])

  // map
  const [response, setResponse] = React.useState(null)
  const origin = 'colombo';
  let count = React.useRef(0);
  const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
  if (!isLoaded) return (
      <p>Loading...</p>
      )

      const directionsCallback = res => {
        // console.log(res)
        if (res !== null && count.current < 2) {
          if (res.status === 'OK') {
            count.current += 1;
            setResponse(res);
          } else {
            count.current = 0;
            // console.log('res: ', res);
          }
        }
      };

      const Style = {
        backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '424px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };


// book now
const Booknow = () => {
  try {
    const login = sessionStorage.getItem("login");
    if (login === "true") {
      window.location.href = `/tourbook1/${tour}`;
    } else {
      window.location.href = "/login";
    }
  } catch (error) {
    window.location.href = "/login";
  }
};

    return (
    <div className='TourPreview'>
      <div className={popup1}>
        <div  className='tourpreview-popup-main'>
         
          <div className='tourpreview-popup-form'>
            <label className='tourpreview-popup-form-label'>Number of Tourists :</label>
            <input type='number' className='tourpreview-popup-form-input' onChange={(e)=>setPopPassneger(e.target.value)}/>
          </div>
          <div className='tourpreview-popup-form'>
            <label className='tourpreview-popup-form-label'>Hotel Category :</label>

            <select className='tourpreview-popup-form-input' onChange={(e)=>setPopHotel(e.target.value)}>
              <option value=''>Select</option>
              <option value='5 star'>5 start</option>
            <option value='3 star/4 star'>3 star / 4 star</option>
            </select>
          </div>
          <div className='tourpreview-popup-btn-div'>
            <button className='tourpreview-popup-enter-btn' onClick={EnterHandler}>Enter</button>
            <button className='tourpreview-popup-cancel-btn' onClick={CancelHandler}>Cancel</button>
          </div>
        </div>
      </div>
      <div className={popup2}>
        <div  className='tourpreview-popup-main'>
          
          <div className='tourpreview-popup-form'>
            <label className='tourpreview-popup-form-label'>Tour Start Date:</label>
            <input type='date' className='tourpreview-popup-form-input' onChange={(e)=>setPopDate(e.target.value)}/>
          </div>
          <div className='tourpreview-popup-btn-div'>
            <button className='tourpreview-popup-enter-btn' onClick={EnterHandler}>Enter</button>
            <button className='tourpreview-popup-cancel-btn' onClick={CancelHandler}>Cancel</button>
          </div>
        </div>
      </div>
      <div className='TourPreview-hero'>
      <img alt='' src={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg?file=${coverImg}`} className='tour-hero-img'/>
      <div className='TourPreview-hero-sub'>
      <p className='TourPreview-hero-title'>{TourData.length>0 ?TourData[0].tour_name:null}</p>
        <div className='TourPreview-hero-route-div'>
          <a className='TourPreview-hero-route' href='/'>Home/</a>
          <a className='TourPreview-hero-route' href='/tour/tourcategory'>Day Tours/</a>
          <button className='TourPreview-hero_route'>{TourData.length>0 ?TourData[0].tour_name:null}</button>
        </div>

      </div>
        
        <div className='TourPreview-hero-media-div'>
          <Socialmedia/>

          
          
        </div>
      </div>

      <div className='TourPreview-header'>
        <div className='TourPreview-header-left'>
          <div className='TourPreview-header-left-1'>
            <p className='TourPreview-header-left-p'>Package Price :</p>
            <p className='TourPreview-header-left-p' >$</p>
            <p className='TourPreview-header-left-p' > {total}</p>
            <p className='TourPreview-header-left-p-sub'>* per person</p>
          </div>
          <div className='TourPreview-header-info'>
            <div className='TourPreview-header-info2'>
              <p >Number of Tourists : </p>
              <p >{passenger}</p>
            </div>
            <div className='TourPreview-header-info2'>
              <p>Hotel Category : </p>
              <p  >{hotel}</p>
            </div>
          
            
            <a onClick={PopUpHandler}><img src={Edite}/></a>
          </div>
          <div className='TourPreview-header-info1'>
          <p >Tour Start Date : </p>
          <p> {startDay}</p>
          <a onClick={PopUpHandler2}><img src={Edite}/></a>
          </div>
          <div className='TourPreview-header-left-coupen'>
            <p className='TourPreview-header-left-p couponcode-p'>Coupon Code : </p>
            <input className='TourPreview-header-left-input'/>
            <button className='TourPreview-header-left-btn'>enter</button>
          </div>
          <div className='TourPreview-header-left-line'></div>
          
          <button onClick={Booknow} className='TourPreview-header-book-btn'>Book Now</button>
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
                <Carousel_tp key={index} place_id={place.place_id  }/>
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
            <a key={index} onClick={expandhandler(tourDate.tour_date_id)} className='TourPreview-center-right-day-main'>
              <p  className='TourPreview-center-right-day-main-p'>Day {tourDate.tour_date}</p>
               <img   src={Plus}/></a>


               
            <div className={expandedDay === tourDate.tour_date_id ? expandclass : 'close'}>
              <p>{tourDate.start_description}</p>
                  {placesData.map((place,Index)=>{
                return(
                  <div>
                    <p className='TourPreview-expand-place-p1'><b>{place.place_name}</b>{place.short_description}</p>
                    <p>{place.tour_place_description}</p>

                  </div>
                  

                )
              })}
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
                img={place.card_img}
                short={place.short_description}
                link={place.place_id}
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
