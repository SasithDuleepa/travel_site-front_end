import React, { useEffect,useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './daytourbook2.css'
import Socialmedia from '../../../components/social media/socialmedia';
import axios from 'axios';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';


export default function Daytourbook2() {
  const history = useHistory();
    const{id} = useParams();
    console.log(id);

    const [isLoading, setIsLoading] = useState(true);


    const[distance,setDistance] = useState(null);
    const[price,setPrice] = useState(null); 
    const[vehicleRate,setVehicleRate] = useState(null);
    

    const[passengers,setPassengers] = useState(1);
    const[startDate,setStartDate]= useState(null);

    const[total,setTotal] = useState(null);
    
    const[places,setPlaces] = useState([])

    useEffect(()=>{
      let passengers_ = sessionStorage.getItem('passengers');
      let date_ = sessionStorage.getItem('date');
      
      setPassengers(passengers_);
      setStartDate(date_);

      console.log(passengers);
      console.log(startDate);

    },[])


    //tour 

    useEffect(() => {
      const GetData = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/daytour/daytour/${id}`);
          console.log(res.data[0]);
          setDistance(res.data[0].distance);
          setPrice(res.data[0].price);
        } catch (error) {
          console.error('Error fetching tour data:', error);
          // Handle the error, e.g., set an error state or show an error message to the user.
        } finally {
          setIsLoading(false);
        }
      };
    
      GetData();
    }, [id]);
    



    //vehicle
    const GetVehicle = async() =>{
      try {
        const res = await axios.get(`http://localhost:8080/vehicles/${passengers}`)
      console.log(res.data[0])
      setVehicleRate(res.data[0].rate)
      } catch (error) {
        console.log(error);
      }
      
    }
    useEffect(()=>{
      GetVehicle();
    }
    ,[passengers])

    //get places
    const GetPlaces = async() =>{
      try {
        const res = await axios.get(`http://localhost:8080/daytour/places/${id}`);
      console.log(res.data)
      setPlaces(res.data)
      } catch (error) {
        console.log(error);
      }
      
    }
    useEffect(()=>{
      GetPlaces();
    }
    ,[id])



    //calculation
    const Calculation =()=>{
      let total = distance * vehicleRate  + price;
      setTotal(total);

    }
    useEffect(()=>{
      Calculation();
    }
    ,[distance,vehicleRate,price])

    

    const SendHandler = async() =>{
      let user = sessionStorage.getItem('id');
      const Data = {
        tour_id:id,
        passengers:passengers,
        date:startDate,
        total:total,
        user_id:user
      }
      try {
        const res = await axios.post('http://localhost:8080/book/bookDayTour',Data );
      console.log(res);
      if(res.status === 200){
       
        sessionStorage.removeItem('passengers');
        sessionStorage.removeItem('date');

        history.push('/tours/tourcategory');



      }
      } catch (error) {
        console.log(error);
      }
    }

    const PreviousHandler=() =>{
      window.history.back();
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
        //  console.log(res)
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
    <div className='daytour-book-2'>
      
        <div className='daytour-book-2-hero'>
        <p className='daytour-book-2-hero-title'>Plan My Tour</p>
        <div className='daytour-book-2-hero-route-div'>
          <a className='daytour-book-2-hero-route-1'>Home</a>
          <a className='daytour-book-2-hero-route-1'>/</a>
          <a className='daytour-book-2-hero-route-1'>Day Tours</a>
          <a className='daytour-book-2-hero-route-1'>/</a>
          <a className='daytour-book-2-hero-route-1 active-route'>Day Tour Booking</a>
        </div>
        <div className='daytour-book-2-hero-social'><Socialmedia/></div>
        
        </div>
        <p className='daytour-book-2-title-sub'>Tour Plan Summary</p>

        <div className='daytour-book-2-sub'>
            <div className='daytour-book-2-sub-left'>
                <p className='daytour-book-2-sub-left-title'>Tour Package Places:</p>
                <div className='daytour-book-2-sub-left-places-div'>
                  {places.length>0 ? places.map((place,index)=>{
                    return(
                      <div>
                        <Placecard_ 
                        place={place.place_name}
                        key={index}
                        img={place.card_img}
                        />
                      </div>
                    )
                  
                  })
                  :null}
                
                </div>
            </div>
            <div className='daytour-book-2-sub-right'>
                <p className='daytour-book-2-sub-right-title'>Tour Package Details:</p>
                <p className='daytour-book-2-sub-right-p'>Tour Package Price: $ {total}</p>
                <div className='daytour-book-2-sub-right-coupen-div'>
                  <p>Coupon Code: </p>
                  <input type="text" placeholder='Enter Coupon Code'/>
                  <a>Enter</a>
                </div>
                <div className='daytour-book-2-sub-right-line'></div>
                <p className='daytour-book-2-sub-right-p'>Passenger Count:{passengers}</p>
                <p className='daytour-book-2-sub-right-p'>Tour Start Date:{startDate}</p>
                <div className='daytour-book-2-sub-right-btn-div'>
                  <a className='daytour-book-2-sub-right-btn-1' onClick={PreviousHandler}>Previous</a>
                  <a className='daytour-book-2-sub-right-btn-2' onClick={SendHandler}>Send Inquiry</a>
                </div>
            </div>
        </div>

        <div className='daytour-book-3-sub'>
          <p className='daytour-book-3-sub-title'>Tour Route:</p>
          <div className='daytour-book-3-sub-map'>
          <GoogleMap
              mapContainerClassName='daytour-preview-bottom-info-2-map'
              center={{lat: 6.947248052781988, lng: 79.873046875}}
              zoom={7}

                      >
              <MarkerF position={{ lat: 6.93665, lng: 79.84505 }} />
              {/* {places.length>0 ? places.map((place,index)=>{
                return(
                  <MarkerF key={index} position={{ lat: place.place_lat, lng: place.place_lng }} />
                )
              
              }):null} */}
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

              
            </GoogleMap>

          </div>
        </div>
    </div>
  )
}




function Placecard_(props) {
  return (
    <div className='Placecard_'>
        <div className='Placecard_left'>
          {props.img ? <img className='Placecard_img' src={`http://localhost:8080/places/placeimg?file=${props.img}`} /> : null}
        </div>
        <div className='Placecard_right'>
            <p>{props.place}</p>
        </div>
    </div>
  )
}
