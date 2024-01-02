import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './daytour_preview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edite from './../../../assets/icons/edit.png'
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService ,DistanceMatrixService} from '@react-google-maps/api';
import PlaceCard from '../../../components/place card/placeCard';
import Carousel from "react-simply-carousel";





import Socialmedia from './../../../components/social media/socialmedia';

export default function Daytour_preview() {

  


  const[daytourRate,setDaytourRate] = useState(null)
  const[daytourDiscountRate,setDaytourDiscountRate] = useState(null)
  const [response, setResponse] = useState(null)

  const [mapKey, setMapKey] = useState(1);
  const {id}= useParams();
  // console.log(id);

  //map
  const [activeSlide, setActiveSlide] = useState(0);

  const[startDistance, setStartDistance] = useState(0)
  const[startPlace, setStartPlace ] = useState('Naula') 

  //pop up
  const [popup1,setPopup1] = useState('hide');
  const [popup2,setPopup2] = useState('hide');

  const [origin, setOrigin] = useState('Colombo');
  const [popUpOrigin, setPopUpOrigin] = useState('Colombo');

  const[passenger,setpassenger] = useState(2);
  const[popupPassenger,setPopupPassenger] = useState(2)

  const[total,setTotal] = useState(0);
  const[finalTotal,setFinalTotal] = useState(0)
  
  const[distance,setDistance] = useState(0);
  const[oranizingCost, setOrganizingCost] = useState(0)
  const[vehicle,setVehicle] = useState([])


const[btn1,setbtn1] = useState('daytour-preview-bottom-btn-active');
const[btn2,setbtn2] = useState('daytour-preview-bottom-btn-deactive');
const[btn3,setbtn3] = useState('daytour-preview-bottom-btn-deactive');

const[class1,setClass1] = useState('daytour-preview-bottom-info-1 ');
const[class2,setClass2] = useState('daytour-preview-bottom-info-2 hide');
const[class3,setClass3] = useState('daytour-preview-bottom-info-3 hide');


const [coverImg, setCoverImg] = useState('')

  const [data, setData] = useState([]);


  //get daytour rates
  const GetDaytourRates =async ()=>{
    try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/daytour`);
          console.log(res.data);
          
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
  //data about day tour
  const GetData =async ()=>{
    try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytour/${id}`);
          console.log(res.data);
          
          if(res.data.length>0){
            setData(res.data);
            setDistance(res.data[0].distance)
            setOrganizingCost(res.data[0].organizing_cost)
            setCoverImg(res.data[0].cover_img)
          }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    GetData();
  },[id])

//pop up func
const PopupEnter = () =>{
  setpassenger(popupPassenger);
  setOrigin(popUpOrigin);

  setPopup1('hide')
  setPopup2('hide')
}
const PopupCancel = () =>{

  setPopup1('hide')
  setPopup2('hide')
}

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vehicles/${passenger}`);
      let data = res.data[0];
      setVehicle(data.rate);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData(); 

}, [passenger]);










//places according to daytour
const [places, setPlaces] = useState([]);
const [fees, setFees] = useState(0);

const getPlaces = async () => {
  try {
    if (data.length > 0) {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/places/${data[0].day_tour_id}`);
      // console.log(res.data);
      setPlaces(res.data);

      let totalFees = 0;

      if (res.data.length > 0) {
        res.data.forEach((place) => {
          if (place.visiting_fee !== undefined) {
            totalFees += place.visiting_fee;
          }
        });
      }

      setFees(totalFees);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getPlaces();
}, [data]);


//calculation 
useEffect(()=>{
  // console.log('organizing' , oranizingCost)
  // console.log('vehicle' , vehicle)
  // console.log('distance' , distance)
  // console.log('passenger' , passenger)
  // console.log('fees' , fees)
  // console.log('startDistance' , startDistance)
  // console.log('daytour rate' , daytourRate)
  console.log('daytour discount rate' , daytourDiscountRate)

    let sub_total = fees + startDistance*2*vehicle + oranizingCost
    // console.log(sub_total)
    let tot = sub_total/passenger



    let nettotal = (100*tot)/(100-daytourRate)


    

    let tot_1 = nettotal.toFixed(0)

    let tot_2 = tot_1/10
    let tot_3 = Math.ceil(tot_2)
    setTotal(tot_3*10)

    // console.log('tot3 =',tot_3*10)
    let tot_4 = tot_3*10  *(100-daytourDiscountRate)/100
    // console.log('tot 4 =',tot_4)
    // let tot_5 = tot_4/10
    // let tot_6 = Math.ceil(tot_5)
    setFinalTotal(tot_4)

},[vehicle,passenger,fees,startDistance])



  //image id for carousel
  const [imageId,setImageId] = useState([]);
  useEffect(()=>{
    if(places.length>0){
      places.map(async(place)=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/getplaceimgnames/${place.place_id}`)
        if(res.data.length>0){
          res.data.map((img)=>{
            if(img.img_name!== undefined ||img.img_name){
              setImageId((prev)=>{
                return [...prev,img.img_name]
              })
            }
            
          
        })

        // console.log(imageId)
    }
  

    })
    
  }}
  ,[places])

  // useEffect(()=>{
  //   setMapKey((prevKey) => prevKey + 1);
  
  // },[origin])

  useEffect(() => {
setTimeout(() => {
      setMapKey((prevKey) => prevKey + 1);
    }, 1000);
    console.log('origin')

  }, [origin]);
  


   // map

   let count = React.useRef(0);

   const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
   if (!isLoaded) return (
       <p>Loading...</p>
       )
 
       const directionsCallback = (res) => {
        console.log( 'direction call back origin' , origin)
        console.log( 'direction call back' , res)
        console.log('count =' , count)
        
        

        
          if (res !== null && count.current < 2) {
          
           if (res.status === 'OK') {
             count.current += 1;

              console.log( 'direction call back called!!!!!' )
              setResponse(res);

             
           } else {
             count.current = 0;
             console.log('res: ', res);
           }
         } else{
           count.current = 0;
     
         
         }
       };

       const distanceCallback =(response) =>{
        if (response && response.rows && response.rows.length > 0) {
          const distanceValue = response.rows[0].elements[0].distance.value;
          console.log('Distance:', distanceValue/1000);
          setStartDistance(distanceValue/1000)
          // Update your state or perform any other actions with the distance information
        } else {
          console.error('Error retrieving distance information');
        }
       }







const ButtonHandler = (btn)=>() =>{
  if(btn===1){
    setbtn1('daytour-preview-bottom-btn-active');
    setbtn2('daytour-preview-bottom-btn-deactive');
    setbtn3('daytour-preview-bottom-btn-deactive');
    setClass1('daytour-preview-bottom-info-1');
    setClass2('daytour-preview-bottom-info-2 hide');
    setClass3('daytour-preview-bottom-info-3 hide');
  }
  if(btn===2){
    setbtn1('daytour-preview-bottom-btn-deactive');
    setbtn2('daytour-preview-bottom-btn-active');
    setbtn3('daytour-preview-bottom-btn-deactive');
    setClass1('daytour-preview-bottom-info-1 hide');
    setClass2('daytour-preview-bottom-info-2');
    setClass3('daytour-preview-bottom-info-3 hide');
  }
  if(btn===3){
    setbtn1('daytour-preview-bottom-btn-deactive');
    setbtn2('daytour-preview-bottom-btn-deactive');
    setbtn3('daytour-preview-bottom-btn-active');
    setClass1('daytour-preview-bottom-info-1 hide');
    setClass2('daytour-preview-bottom-info-2 hide');
    setClass3('daytour-preview-bottom-info-3');
  }

}


const calculateCenter = () => {
  if (places.length === 0) {
    return { lat: 6.947248052781988, lng: 79.873046875 }; // Default center if no places
  }

  const totalLat = places.reduce((sum, place) => sum + place.place_lat, 0);
  const totalLng = places.reduce((sum, place) => sum + place.place_lng, 0);

  const averageLat = totalLat / places.length;
  const averageLng = totalLng / places.length;

  return { lat: averageLat, lng: averageLng };
};


// book now
const Booknow = () => {
  try {
    const login = sessionStorage.getItem("login");
    if (login === "true") {
      window.location.href = `/daytourbook1/${id}`;
    } else {
      window.location.href = "/login";
    }
  } catch (error) {
    window.location.href = "/login";
  }
};


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


  return (
    <div className='daytour-preview'>
      {/* pop up */}
      <div className={popup1}>
        <div className='day-tour-popup-1-main'>
          <div className='day-tour-popup-1-main-form'>
            <label  className='day-tour-popup-1-main-form-label'>Tour starts from :</label>            
            <select  className='day-tour-popup-1-main-form-input' onChange={(e)=>setPopUpOrigin(e.target.value)} value={popUpOrigin}>
    
            <option value={'Ahungalla'}>Ahungalla</option>
<option value={'Akurala'}>Akurala</option>
<option value={'Aluthgama'}>Aluthgama</option>
<option value={'Ambalangoda'}>Ambalangoda</option>
<option value={'Balapitiya'}>Balapitiya</option>
<option value={'Beruwala'}>Beruwala</option>
<option value={'Bentota'}>Bentota</option>
<option value={'Boossa'}>Boossa</option>
<option value={'Colombo'}>Colombo</option>
<option value={'Dehiwala'}>Dehiwala</option>
<option value={'Galle'}>Galle</option>
<option value={'Hikkaduwa'}>Hikkaduwa</option>
<option value={'Induruwa'}>Induruwa</option>
<option value={'Ja-Ela'}>Ja-Ela</option>
<option value={'Kalutara'}>Kalutara</option>
<option value={'Koggala'}>Koggala</option>
<option value={'Kosgoda'}>Kosgoda</option>
<option value={'Madampagama'}>Madampagama</option>
<option value={'Maggona'}>Maggona</option>
<option value={'Matara'}>Matara</option>
<option value={'Mirissa'}>Mirissa</option>
<option value={'Moratuwa'}>Moratuwa</option>
<option value={'Mount-Lavinia'}>Mount Lavinia</option>
<option value={'Negombo'}>Negombo</option>
<option value={'Panadura'}>Panadura</option>
<option value={'Payagala'}>Payagala</option>
<option value={'Polhena'}>Polhena</option>
<option value={'Rathgama'}>Rathgama</option>
<option value={'Talpe'}>Talpe</option>
<option value={'Unawatuna'}>Unawatuna</option>
<option value={'Wadduwa'}>Wadduwa</option>
<option value={'Wattala'}>Wattala</option>
<option value={'Weligama'}>Weligama</option>



            </select>
          </div>
          <div className='day-tour-popup-1-main-button-div'>
            <a className='day-tour-popup-1-main-ok' onClick={PopupEnter}>Enter</a>
            <a className='day-tour-popup-1-main-cancel' onClick={PopupCancel}>Cancel</a>
          </div>
        </div>
        

      </div>
      <div className={popup2}>
        <div className='day-tour-popup-1-main'>
          
          <div className='day-tour-popup-1-main-form'>
            <label  className='day-tour-popup-1-main-form-label'>Enter Passenger Count:</label>            
            <input type='number' className='day-tour-popup-1-main-form-input' onChange={(e)=>setPopupPassenger(e.target.value)} value={popupPassenger}/>
          </div>

          <div className='day-tour-popup-1-main-button-div'>
            <a className='day-tour-popup-1-main-ok' onClick={PopupEnter}>Enter</a>
            <a className='day-tour-popup-1-main-cancel' onClick={PopupCancel}>Cancel</a>
          </div>
        </div>
        

      </div>
      <div className='daytour-preview-hero'>
      <img alt='' src={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${coverImg}`} className='daytour-hero-img'/>

      <div className='daytour-preview-hero-sub'>
      <p className='daytour-preview-hero-title'>{data.length>0?data[0].day_tour:null}</p>
        <div  className='daytour-preview-hero-route-div'>
          <a className='daytour-preview-hero-route-1' href='/'>home/</a>
          <a className='daytour-preview-hero-route-1' href='/tours/daytour'>day Tours/</a>
          <a className='daytour-preview-hero-route-1 active-route'>{data.length>0?data[0].day_tour:null}</a></div>
        
      </div>
        
        
        </div>

        <div className='daytour-preview-hero-meadia-div'>
          <Socialmedia/>


        </div>

      <div className='daytour-preview-top'>
        <div className='daytour-preview-top-left'>
          <div  className='daytour-preview-top-left-price-div'>
            <p className='daytour-preview-top-left-p1'>Package Price :</p>
            {/* <p className='daytour-preview-top-left-p3'>$</p> */}
            <p className='daytour-preview-top-left-p3'>$ {total }</p>
            <p className='daytour-preview-top-left-p2'>* per person</p>
          </div>
          <h2 class="ribbon">{daytourDiscountRate}% off</h2>


          {/* <svg width="200" height="200">
      <defs>
      
        <path id="textPath" d="M10 80 Q 95 10 180 80" />
      </defs>
      <text>
        
        <textPath href="#textPath">Curved Text</textPath>
      </text>
    </svg> */}


          
          
          <div className='daytour-preview-top-left-info'>
            <div className='daytour-preview-top-left-info-sub'>
              <p>Number of Tourists : {passenger}</p>
              <img alt='' src={Edite} onClick={()=>setPopup2('day-tour-popup-1')}/>
            </div> 
            <div className='daytour-preview-top-left-info-sub'>
              <p>Tour Starts from : {origin}</p>
              <img alt='' src={Edite} onClick={()=>setPopup1('day-tour-popup-1')}/>

            </div>
            
            
          </div>
          
          

          <div  className='daytour-preview-top-left-code'>
            <p className='daytour-preview-top-left-code-p1'>Discounted price :</p>
            {/* <p className='daytour-preview-top-left-code-p2'> $ {total }</p> */}
            <p className='daytour-preview-top-left-code-p3'>$ {finalTotal}</p>
            <p className='daytour-preview-top-left-code-p4'>  * per person</p>
          </div>
          
          <div className='daytour-preview-top-left-line'></div>
          <button className='daytour-preview-top-left-book' onClick={Booknow}>Book Now</button>
        </div>
        <div className='daytour-preview-top-right'>

      <Slider {...settings}>
      {imageId.length>0 ? imageId.map((img,index)=>{
              return(
                <div className='daytour-preview-top-right-img-div'>
                  <img key={index} className='daytour-preview-top-right-img'  src={img!==undefined?`${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${img}`:null} />

                </div>

                  

                
              )
            
            }
            ):null}

      </Slider>
        </div>
      </div>

      <div className='daytour-center-line'></div>
      <p className='daytour-center-info'>{data.length>0?data.description:null}</p>

      <div className='daytour-preview-center'>
        <div className='daytour-preview-center-left'>
        <p>{origin}</p>
        <GoogleMap
        key={mapKey}
        mapContainerClassName='daytour-preview-center-map-container'
        center={calculateCenter()}
        zoom={5}
        >
  {/* {places.length > 0
    ? places.map((place, index) => (
        <MarkerF key={index} position={{ lat: place.place_lat, lng: place.place_lng }} />
      ))
    : null} */}
<MarkerF  position={{ lat: 8.938354312738735, lng: 80.543212890625 }} />

  <DirectionsService
    options={{
      destination: places.length > 0
        ? { location: { lat: places[0].place_lat, lng: places[0].place_lng }
       }
        : null,
      waypoints: [ ],
      origin:origin,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    }}
    callback={directionsCallback}

  />

  <DirectionsRenderer directions={response} />


<DistanceMatrixService
    options={{
      destinations: [
        places.length > 0
          ?
           { location: { lat: places[0].place_lat, lng: places[0].place_lng } }
          : { location: 'Naula' },
      ],
      origins:[origin] ,
      travelMode: 'DRIVING',
    }}
    callback={distanceCallback}
  />





</GoogleMap>
        </div>



        <div className='daytour-preview-center-right'>
          <div  className='daytour-preview-center-right-place-div'>
            <p  className='daytour-preview-center-right-place-div-place-start'>{data.length>0?data[0].start_description:null}</p>
            {places.length>0?places.map((place,index)=>{
              return(
                <div key={index} className='daytour-preview-center-right-place-div-place'>
                <p className='daytour-preview-center-right--place'><b>{place.place_name} - </b> {place.short_description
}</p>

                <p  className='daytour-preview-center-right-place-description'>{place.description}</p>

              </div>

              )
                
}):null}

          </div>
        </div>
      </div>
      <div className='daytour-preview-bottom'>
        <div className='daytour-preview-bottom-btn-div'>
          <a  className={btn1} onClick={ButtonHandler(1)}>Inclusions & Exclusions</a>
          <a className={btn2} onClick={ButtonHandler(2)}>Route Map</a>
          <a className={btn3} onClick={ButtonHandler(3)}>Travel Places</a>
        </div>
        <div className='daytour-preview-bottom-info-div'>

          <div  className={class1}>
            <div className='daytour-preview-bottom-info-1-left'>
              <p>Inclusions</p>
              <ul>
                <li>Private English Speaking driver for the entire Journey</li>
                  <li>Fuel & local insurance for the vehicle</li>
                  <li> All government taxes</li>
              </ul>
            </div>
            <div className='daytour-preview-bottom-info-1-right'>
              <p>Exclusions</p>
              <ul>
                <li>Meals not mentioned in the itinerary</li>
                <li> Personal expenses are excluded.</li>
                <li>Early check-in & Late check-out.</li>
                <li> Camera & Video Permits</li>
                <li> Travel insurance is excluded</li>
                <li>There are no Air-tickets included in the tour package</li>
              </ul>
            </div>
          </div>
          <div  className={class2}>
          {/* <GoogleMap
              mapContainerClassName='daytour-preview-bottom-info-2-map'
              center={{lat: 6.947248052781988, lng: 79.873046875}}
              zoom={7}

                      >

              <DirectionsService
            options={{
              destination: origin,
              
              waypoints: [
                ...(places.length > 0
                  ? places.map((place, index) => ({ location: { lat: place.place_lat, lng: place.place_lng },
                  }))
                  : [])
              ],
              
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          <DirectionsRenderer directions={response} />

              
            </GoogleMap> */}
          </div>
          <div  className={class3}>
          {places.length>0 ? places.map((place,index)=>{
              return(
                <PlaceCard key={index} id={place.place_id} place={place.place_name} 
                img ={place.card_img}
                short={place.short_description}
                />
              )
              
            }):null}

          </div>

        </div>
      </div>




      







    </div>
  )
}
