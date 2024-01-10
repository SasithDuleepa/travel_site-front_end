import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './tourPreview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaceCard from '../../../components/place card/placeCard';
import { GoogleMap, useLoadScript, MarkerF ,DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

import Carousel_tp from './carousel/carousel_tp';
import Edite from '../../../assets/icons/edit.png';
import Socialmedia from './../../../components/social media/socialmedia';

import LeftArrow from './../../../assets/icons/Left Arrow-blue.png';
import RightArrow from './../../../assets/icons/Right Arrow-blue.png';

let dayArray = [];
const generateDayArray = (startDate, numDays) => {
  
  dayArray = [];
  const startTimestamp = new Date(startDate).getTime();

  for (let i = 0; i < numDays; i++) {
    const currentDayTimestamp = startTimestamp + i * 24 * 60 * 60 * 1000;
    const currentDay = new Date(currentDayTimestamp);
    const formattedDay = currentDay.toISOString().split('T')[0];
    dayArray.push(formattedDay);
  }

  return dayArray;
};



export default function TourPreview() {
  const[tourRate,setTourRate] = useState(null)

  const[days,setDays] = useState(0);
  
  const realToday = new Date();
  realToday.setDate(realToday.getDate() + 3);
  const today = realToday.toISOString().slice(0, 10);




  //pop up
  const[pophotel,setPopHotel] = useState('3 star/4 star');
  const[poppassenger,setPopPassneger] = useState(2);
  const[popDate , setPopDate] = useState(today);

  const[hotel,setHotel] = useState('3 star/4 star');
  const[passenger,setPassenger] = useState(2);
  const[startDay, setStartDay] = useState(today);




  const[popup0,setPopup0] = useState('hide')
  const[popup1,setPopup1] = useState('hide')
  const[popup2,setPopup2] = useState('hide')
  

  
  const[total,setTotal] = useState(0)
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
  const[activeIndex,setActiveIndex] = useState(0)



    //get tour and tour dates
    const GetTour = async() => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour/tour/${tour}`);
        setTourData(res.data)
        setCoverImg(res.data[0].cover_img)
        setDays(res.data.length)
        // console.log(res.data)
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
  
          setPlaceFee(visiting_fee)
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
    }, [tour]);

  //pop up
  const PopUpHandler =() =>{
    setPopup1('tourpreview-popup')
  
  }
  const PopUpHandler0 =() =>{
    setPopup0('tourpreview-popup')
  
  }
  const PopUpHandler2 =() =>{
    setPopup2('tourpreview-popup')
  }


  const EnterHandler = () =>{
    setHotel(pophotel)
    setPassenger(poppassenger)
    setStartDay(popDate)

    setPopup1('hide')
    setPopup2('hide')
    setPopup0('hide')
  }
  const CancelHandler = () =>{
    setPopup1('hide')
    setPopup2('hide')
    setPopup0('hide')
  }


  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vehicles/${passenger}`);
      // console.log(res.data);
      setVehicleRate(res.data[0].rate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [passenger]);




//hotel fees
  const GetHotelFee = async () => {
    const startDate = startDay;
    const numDays = days;
    const dayArray = generateDayArray(startDate, numDays);
    if (TourData.length > 0) {
      if (hotel === '5 star') {
        console.log('luxury hotel prices called!!!');
        if (dayArray.length > 0) {
          try {
            const promises = dayArray.map(async (date) => {
              const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/luxury/price/${tour}/${date}`);
              console.log('luxury hotel called')
              if (res.data.length > 0) {
                let hotelprice = res.data[0].price;
                return hotelprice;
              }
              return 0; 
            });
  
            const hotelPrices = await Promise.all(promises);
            const totalHotelPrice = hotelPrices.reduce((acc, price) => acc + price, 0);
            setHotelPrice(totalHotelPrice);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      } else if (hotel === '3 star/4 star') {
        if (dayArray.length > 0) {
          try {
            const promises = dayArray.map(async (date) => {
              const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/semi/price/${tour}/${date}`);
              console.log('semi hotel called')
              if (res.data.length > 0) {
                let hotelprice = res.data[0].price;
                return hotelprice;
              }
              return 0; 
            });
            const hotelPrices = await Promise.all(promises);
            const totalHotelPrice = hotelPrices.reduce((acc, price) => acc + price, 0);
            setHotelPrice(totalHotelPrice);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      }
    }
  };
  
useEffect(() => {
  GetHotelFee ();
}, [startDay,hotel,TourData]);





const [placeFee,setPlaceFee] = useState(0)
let visiting_fee = 0;








  const expandhandler = (tourDateId,index)=>async() =>{
    console.log(expandedDay)
    setExpandedDay(tourDateId);

    if(activeIndex === index){
      setActiveIndex(null)
    }else{
      setActiveIndex(index)
    }
    
    // setExpandClass(expandclass === 'TourPreview-center-right-expand-div' ? 'close' : 'TourPreview-center-right-expand-div');
    setExpandClass( 'TourPreview-center-right-expand-div');
    
    try {
      const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tourplaces/${tourDateId}`)
      // console.log(res.data)
      setPlacesData(res.data)
    } catch (error) {
      console.log(error)
    }
  }



  //get daytour rates
  const GetDaytourRates =async ()=>{
    try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/tour`);
          console.log(res.data);
          
          if(res.data.length>0){
            setTourRate(res.data[0].tour_rate)
          }
    } catch (error) {
      console.log(error)
    }
  
  }
  useEffect(()=>{
    GetDaytourRates();
  }
  ,[])


  //calculation
const Calculation =()=>{
  console.log('passengers', passenger )
  console.log('fee', placeFee )
  console.log('distance', distance )
  console.log('vehicle', vehicleRate )
  console.log('hotel', hotelPrice )
  console.log('tour rate', tourRate )


    



  //passenger count for hotel room
  let tot_passengers = passenger
  let passengers_1 = tot_passengers/2
  // console.log('num of couples', passengers_1)
  let rooms = Math.ceil(passengers_1)
  console.log('num of rooms ', rooms)
 
  let sub_total = hotelPrice*rooms + distance*vehicleRate  + placeFee;
  let total = sub_total/passenger

  
  let nettotal = (100*total)/(100-tourRate)

  let total_ = nettotal.toFixed(0)
  let total_1 = total_/10
  let total_2 = Math.ceil(total_1)
  let total_3 = total_2*10

  setTotal(total_3)
}
useEffect(()=>{

  Calculation();

}
,[distance,hotelPrice,placeFee,vehicleRate,passenger])

  // map
  const [response, setResponse] = React.useState(null)
  const origin = 'colombo';
  let count = React.useRef(0);
  const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7kkl5NmkqNgHTrlXjdI9YNaJnnoLpBEA"});
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



// book now
const Booknow = async() => {
  try {
    const login = sessionStorage.getItem("login");
    if (login === "true") {

      let user = sessionStorage.getItem('id');
        let Data ={
            tour_id:tour,
            user_id:user,
            tour_price:total,
            hotel_type:hotel,
            passengers:passenger,
            start_date:startDay,
            booked_date:new Date().toISOString().slice(0, 10)
            
        }

        try {
          const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/bookTour`,Data );
        console.log(res);
        if(res.status === 200){


  
        }
        } catch (error) {
          console.log(error);
        }



    } else {
      window.location.href = "/login";
    }
  } catch (error) {
    window.location.href = "/login";
  }
};




const calculateCenter = () => {
  if (placesData.length === 0) {
    return { lat: 7.677340477913782, lng: 80.7080078125}; // Default center if no places
  }

  const totalLat = placesData.reduce((sum, place) => sum + place.place_lat, 0);
  const totalLng = placesData.reduce((sum, place) => sum + place.place_lng, 0);

  const averageLat = totalLat / placesData.length;
  const averageLng = totalLng / placesData.length;

  return { lat: averageLat, lng: averageLng };
};



function SampleNextArrow(props) {
  const {onClick } = props;
  return (

       <img alt="" onClick={onClick} src={RightArrow} className= "TourPreview-bottom-3-forward-arrow"/>
    
  );
}

function SamplePrevArrow(props) {
  const {  onClick } = props;
  return (

      <img alt="" onClick={onClick} src={LeftArrow} className= "TourPreview-bottom-3-backward-arrow" />

  );
}


const settings = {
  dots: false,
  speed: 1900,
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows:false
};
const settings2 = {
  dots: false,
  speed: 1900,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  // arrows:false
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

    return (
    <div className='TourPreview'>
      <div className={popup0}>
        <div  className='tourpreview-popup-main'>
         
          <div className='tourpreview-popup-form'>
            <label className='tourpreview-popup-form-label'>Number of Tourists :</label>
            <input type='number' className='tourpreview-popup-form-input' onChange={(e)=>setPopPassneger(e.target.value)}/>
          </div>
          <div className='tourpreview-popup-btn-div'>
            <button className='tourpreview-popup-enter-btn' onClick={EnterHandler}>Enter</button>
            <button className='tourpreview-popup-cancel-btn' onClick={CancelHandler}>Cancel</button>
          </div>
        </div>
      </div>
      <div className={popup1}>
        <div  className='tourpreview-popup-main'>
         

          <div className='tourpreview-popup-form'>
            <label className='tourpreview-popup-form-label'>Hotel Category :</label>

            <select className='tourpreview-popup-form-input' onChange={(e)=>setPopHotel(e.target.value)}>
              <option value=''>Select</option>
              <option value='5 star'>Category A</option>
            <option value='3 star/4 star'>Category B</option>
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
              <p >Number of Tourists : </p>
              <p >{passenger}</p>
              <a onClick={PopUpHandler0}><img src={Edite}/></a>
            </div>
          
           
            <div className='TourPreview-header-info'>
              <p>Hotel Category : </p>
              <p  >{hotel}</p>
              <a onClick={PopUpHandler}><img src={Edite}/></a>
            </div>           
            
        


          <div className='TourPreview-header-info'>
          <p >Tour Start Date : </p>
          <p> {startDay}</p>
          <a onClick={PopUpHandler2}><img src={Edite}/></a>
          </div>
          <div className='TourPreview-header-left-coupen'>
            <p className='TourPreview-header-left-p couponcode-p'>Coupon Code </p>
            <p className='TourPreview-header-left-p couponcode-p'>: </p>
            <input className='TourPreview-header-left-input'/>
            <button className='TourPreview-header-left-btn'>enter</button>
          </div>
          <div className='TourPreview-header-left-line'></div>
          
          <button onClick={Booknow} className='TourPreview-header-book-btn'>Book Now</button>
        </div>





        <div className='TourPreview-header-right'>
          <div className='TourPreview-header-right-carousel'>




      <Slider {...settings}>
      {places.length>0 ? places.map((place,index)=>{
              return(
                <Carousel_tp key={index} place_id={place.place_id  }/>
              )
            }):null}

      </Slider>
          </div>

        </div>


        

      </div>



      <div className='TourPreview-center-line'></div>

      <p className='TourPreview-center-description'>{TourData.length>0 ?TourData[0].tour_description:null}</p>

      <div className='TourPreview-center' >
        <div className='TourPreview-center-left' >
        <GoogleMap
              mapContainerClassName='map-container1'
              center={calculateCenter()}
              zoom={8}
                      >

              {placesData.length>0 ?placesData.map((place,index)=>{
                return(
<MarkerF
  key={index}
  position={{ lat: place.place_lat, lng: place.place_lng }}
  
  icon={{
    // url: `data:image/svg+xml,${encodeURIComponent(
    //   '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"><path d="M 45 90 c -1.415 0 -2.725 -0.748 -3.444 -1.966 l -4.385 -7.417 C 28.167 65.396 19.664 51.02 16.759 45.189 c -2.112 -4.331 -3.175 -8.955 -3.175 -13.773 C 13.584 14.093 27.677 0 45 0 c 17.323 0 31.416 14.093 31.416 31.416 c 0 4.815 -1.063 9.438 -3.157 13.741 c -0.025 0.052 -0.053 0.104 -0.08 0.155 c -2.961 5.909 -11.41 20.193 -20.353 35.309 l -4.382 7.413 C 47.725 89.252 46.415 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(4,136,219); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 45 45.678 c -8.474 0 -15.369 -6.894 -15.369 -15.368 S 36.526 14.941 45 14.941 c 8.474 0 15.368 6.895 15.368 15.369 S 53.474 45.678 45 45.678 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g></svg>'
    // )}`,
    url: require('./../../../assets/icons/location.svg').default,
    // url: 'http://localhost:8080/images/Home/heroimg/slider1.jpg',
    scaledSize: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(1, 1),
    
    className: 'your-custom-class',
    }
  }
  title={place.place_name}

/>

                )
              }):null}
            </GoogleMap>
        </div>
        <div className='TourPreview-center-right' >

          {TourData.length>0 ? TourData.map((tourDate,index)=>{
            return(
            <div key={index} className='TourPreview-center-right-day'>
              <a  key={index} onClick={expandhandler(tourDate.tour_date_id,index)} className={`TourPreview-center-right-day-main-${index}`}>
              <p  className='TourPreview-center-right-day-main-p'>Day {tourDate.tour_date}</p>
               
               <div className={expandedDay === tourDate.tour_date_id && activeIndex === index ? `TourPreview-center-right-day-main-icon-${index}-active` : `TourPreview-center-right-day-main-icon-${index}`}></div>
               
               </a>


               
            <div className={expandedDay === tourDate.tour_date_id && activeIndex === index? expandclass : 'close'}>

              <p className='TourPreview-center-right-day-description'>{tourDate.start_description}</p>
                  {placesData.map((place,Index)=>{
                return(
                  <div>
                    <p className='TourPreview-expand-place-p1'><b className='TourPreview-expand-place-p1-b'>{place.place_name}</b> - {place.short_description}</p>
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
              <p className='TourPreview-bottom-1-left-title'>The above cost includes:</p>
              <ui>
                <li className='TourPreview-bottom-p1'>Package Price For Per Person with Minimum Two pax.</li>
                <li className='TourPreview-bottom-p1'>Accommodation on bed and breakfast will be offered on the basis hotel's options.</li>
                <li className='TourPreview-bottom-p1'>Private semi-luxury car/van (air-conditioned)</li>
                <li className='TourPreview-bottom-p1'>Private English Speaking driver for the entire Journey</li>
                <li className='TourPreview-bottom-p1'>Fuel & local insurance for the vehicle</li>
                <li className='TourPreview-bottom-p1'>All government taxes</li>
              </ui>
            </div>
            <div className='TourPreview-bottom-1-right'>
            <p className='TourPreview-bottom-1-right-title'>The above cost does not include:</p>
              <ui>
                <li className='TourPreview-bottom-p1'>This package excludes the sightseeing entrance charges (Unless Specified)</li>
                <li className='TourPreview-bottom-p1'>Meals not mentioned in the itinerary</li>
                <li className='TourPreview-bottom-p1'>Personal expenses are excluded.</li>
                <li className='TourPreview-bottom-p1'>Early check-in & Late check-out.</li>
                <li className='TourPreview-bottom-p1'>Camera & Video Permits</li>
                <li className='TourPreview-bottom-p1'>Guide/Driver tips</li>
                <li className='TourPreview-bottom-p1'>Travel insurance is excluded</li>
                <li className='TourPreview-bottom-p1'>There are no Air-tickets included in the tour package</li>
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


<Slider {...settings2}>
          {places.length>0 ?
            places.map((place,index)=>{
              return(
                <PlaceCard key={index} id={place.place_id} place={place.place_name} 
                img={place.card_img}
                short={place.short_description}
                link={place.place_id}
                />
              )
            })
              :null
          }


          </Slider>
            
            

        </div>:
        null
          }
          
          
          

        </div>
      </div>
        
    </div>
  )
}
