import React, { useEffect, useRef, useState } from 'react';
import './daytour_preview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edite from './../../../assets/icons/edit.png'
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService ,DistanceMatrixService} from '@react-google-maps/api';
import PlaceCard from '../../../components/place card/placeCard';
import Carousel from "react-simply-carousel";



import Socialmedia from './../../../components/social media/socialmedia';

export default function Daytour_preview() {


  

  const {id}= useParams();
  // console.log(id);

  //map
  const [activeSlide, setActiveSlide] = useState(0);

  const[startDistance, setStartDistance] = useState(0)

  //pop up
  const [popup,setPopup] = useState('hide');
  const [popup1,setPopup1] = useState('hide');
  const [popup2,setPopup2] = useState('hide');
  const[popupPassenger,setPopupPassenger] = useState('')

  const[total,setTotal] = useState(0)
  const[passenger,setpassenger] = useState(2);
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
  setPopup('hide')
  setPopup1('hide')
  setPopup2('hide')
}
const PopupCancel = () =>{
  setPopup('hide');
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

    let sub_total = fees + startDistance*2*vehicle + oranizingCost
    let tot = sub_total/passenger

    let tot_1 = tot.toFixed(0)

    let tot_2 = tot_1/10
    let tot_3 = Math.ceil(tot_2)
    setTotal(tot_3*10)

},[vehicle,distance,passenger,fees,startDistance])



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





   // map
   const [response, setResponse] = useState(null)
   const [origin, setOrigin] = useState('colombo');
   let count = React.useRef(0);
   const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
   if (!isLoaded) return (
       <p>Loading...</p>
       )
 
       const directionsCallback = (res) => {

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


//bottom buttons




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
  return (
    <div className='daytour-preview'>
      {/* pop up */}
      <div className={popup1}>
        <div className='day-tour-popup-1-main'>
          <p className='day-tour-popup-1-main-title'>Please select the hotel type and passenger count for tour tour.</p>
          
          <div className='day-tour-popup-1-main-form'>
            <label  className='day-tour-popup-1-main-form-label'>Enter Your Location:</label>            
            <select  className='day-tour-popup-1-main-form-input' onChange={(e)=>setOrigin(e.target.value)} value={origin}>
              <option>select town</option>
              <option value={'colombo'}>colombo</option>
              <option value={'galle'}>galle</option>
              <option value={'matara'}>matara</option>
              <option value={'kandy'}>kandy</option>
              <option value={'jaffna'}>jaffna</option>
              <option value={'kurunegala'}>kurunegala</option>
              <option value={'trincomalee'}>trincomalee</option>
              <option value={'anuradhapura'}>anuradhapura</option>
              <option value={'batticaloa'}>batticaloa</option>
              <option value={'kegalle'}>kegalle</option>
              <option value={'kalutara'}>kalutara</option>
              <option value={'rathnapura'}>rathnapura</option>
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
          <p className='day-tour-popup-1-main-title'>Please select the hotel type and passenger count for tour tour.</p>
          
          <div className='day-tour-popup-1-main-form'>
            <label  className='day-tour-popup-1-main-form-label'>Enter Passenger Count:</label>            
            <input  className='day-tour-popup-1-main-form-input' onChange={(e)=>setPopupPassenger(e.target.value)} value={popupPassenger}/>
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
            <p className='daytour-preview-top-left-p1'>$</p>
            <p className='daytour-preview-top-left-p1'>{total }</p>
            <p className='daytour-preview-top-left-p2'>* per person</p>
          </div>
          
          <div className='daytour-preview-top-left-info'>
            <div className='daytour-preview-top-left-info-sub'>
              <p>Passenger Count : {passenger}</p>
              <img alt='' src={Edite} onClick={()=>setPopup2('day-tour-popup-1')}/>
            </div> 
            <div className='daytour-preview-top-left-info-sub'>
              <p>Your Nearest City : {origin}</p>
              <img alt='' src={Edite} onClick={()=>setPopup1('day-tour-popup-1')}/>

            </div>
            
            
          </div>
          
          

          <div  className='daytour-preview-top-left-code'>
            <p className='daytour-preview-top-left-code-p1'>Coupon Code:</p>
            <input  className='daytour-preview-top-left-code-input'/>
            <button className='daytour-preview-top-left-code-btn'>Enter</button>
          </div>
          
          <div className='daytour-preview-top-left-line'></div>
          <button className='daytour-preview-top-left-book' onClick={Booknow}>Book Now</button>
        </div>
        <div className='daytour-preview-top-right'>
        <Carousel
        containerProps={{
          
          style: {
            width: "100%",
           
          }
        }}
        preventScrollOnSwipe
        swipeTreshold={60}
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
        delay={2000}
        itemsToShow={2}
        speed={1600}
        easing="ease-in-out"
        // centerMode
      >
        

            {imageId.length>0 ? imageId.map((img,index)=>{
              return(
                <img className='daytour-preview-top-right-img' key={index} src={img!==undefined?`${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${img}`:null} />
              )
            
            }
            ):null}

     
      </Carousel>
        </div>
      </div>

      <div className='daytour-center-line'></div>
      <p className='daytour-center-info'>{data.length>0?data.description:null}</p>

      <div className='daytour-preview-center'>
        <div className='daytour-preview-center-left'>
        <GoogleMap
  mapContainerClassName='daytour-preview-center-map-container'
  center={calculateCenter()}
  zoom={7}
>
  {places.length > 0
    ? places.map((place, index) => (
        <MarkerF key={index} position={{ lat: place.place_lat, lng: place.place_lng }} />
      ))
    : null}

  <DirectionsService
    options={{
      destination: origin,
      waypoints: [
        places.length > 0
          ? { location: { lat: places[0].place_lat, lng: places[0].place_lng } }
          : { location: 'Naula' },
      ],
      origin: origin,
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
          ? { location: { lat: places[0].place_lat, lng: places[0].place_lng } }
          : { location: 'Naula' },
      ],
      origins: [origin],
      travelMode: 'DRIVING',
    }}
    callback={distanceCallback}
  />s
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
          <GoogleMap
              mapContainerClassName='daytour-preview-bottom-info-2-map'
              center={{lat: 6.947248052781988, lng: 79.873046875}}
              zoom={7}

                      >
              {/* <MarkerF position={{ lat: 6.93665, lng: 79.84505 }} /> */}
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
