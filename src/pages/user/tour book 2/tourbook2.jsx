import React, { useEffect,useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './tourbook2.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import Socialmedia from '../../../components/social media/socialmedia';


export default function Tourbook2() {
    const history = useHistory();
    const{id} = useParams();
    console.log(id); 

    const [hotelType, setHotelType] = useState('');
    const [passengers, setPassengers] = useState('');
    const [startDate, setStartDate] = useState('');

    const[tour,setTour] = useState([]);
    const[distance,setDistance] = useState(null);

    const[total,setTotal] = useState(null);
    const[vehicleRate,setVehicleRate] = useState(null); 
    const[hotelRateList,setHotelRateList] = useState(null);

    useEffect(()=>{
        let HotelType = sessionStorage.getItem('hotelType')
        let passengers_ = sessionStorage.getItem('passengers');
        let date_ = sessionStorage.getItem('startDate');

        setHotelType(HotelType);
        setPassengers(passengers_);
        setStartDate(date_);
      },[id])

      //tour details
      useEffect(()=>{
        const fetchTour = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/tour/tour/${id}`);
            const data = await response.data;
            if(data.length>0){
                console.log(data)
                setTour(data);
                setDistance(data[0].distance);
            }
          } catch (error) {
            console.error('Error fetching tour data:', error);
          }
        };
        fetchTour();
      }
      ,[id])

      //tour places
      const [tourPlaces, setTourPlaces] = useState([]);
      useEffect(()=>{
        const fetchTourPlaces = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/tour/places/${id}`);
            const data = await response.data;
            // console.log(data);
            setTourPlaces(data);
          } catch (error) {
            console.error('Error fetching tour places:', error);
          }
        };
      
        fetchTourPlaces();
      }
      ,[id])

          //vehicle
    const GetVehicle = async() =>{
        try {
          const res = await axios.get(`http://localhost:8080/vehicles/${passengers}`)
          if(res.data.length>0){
        setVehicleRate(res.data[0].rate)
            }
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        GetVehicle();
      }
      ,[passengers])

      //get hotels prices
      useEffect(()=>{
        const fetchHotelsPrices = async () => {
                if(hotelType==='Luxury'){
                    try {
                        const res = await axios.get(`http://localhost:8080/hotels/luxury/price/${id}/${startDate}`);
                        const data = await res.data;
                        setHotelRateList(data);
                    } catch (error) {
                        console.log(error);
                    }
                }else if(hotelType==='Semi-Luxury'){
                    const res = await axios.get(`http://localhost:8080/hotels/semi/price/${id}/${startDate}`);
                    const data = await res.data;
                    setHotelRateList(data);
                }
        };
        fetchHotelsPrices();
      }
      ,[tour])

      //calculation
      const Calculation =()=>{
        let total = distance * vehicleRate  ;
            // console.log(tour[0].tour_price)
        setTotal(total);
      }
      useEffect(()=>{
        Calculation();
      }
      ,[distance,vehicleRate])

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



       const SendHandler =async() =>{
        let user = sessionStorage.getItem('id');
        let Data ={
            tour_id:id,
            user_id:user,
            tour_price:total,
            hotel_type:hotelType,
            passengers:passengers,
            start_date:startDate,
        }
        console.log(Data);
        try {
            const res = await axios.post('http://localhost:8080/book/bookTour',Data );
          console.log(res);
          if(res.status === 200){
           
            sessionStorage.removeItem('hotelType');
            sessionStorage.removeItem('passengers');
            sessionStorage.removeItem('startDate');
    
            history.push('/tours/tourcategory');
    
    
    
          }
          } catch (error) {
            console.log(error);
          }
       }
       const PreviousHandler=() =>{
        window.history.back();
      }
  
  return (
    <div className='tourbook2'>
        <div className='tourbook2-hero'>
            <p className='tourbook2-hero-title'>Tour Summary</p>
            <div className='tourbook2-hero-route-div'>
                <a className='tourbook2-hero-route'>Home</a>
                <a className='tourbook2-hero-route'>/</a>
                <a className='tourbook2-hero-route'>Tours</a>
                <a className='tourbook2-hero-route'>/</a>
                <a className='tourbook2-hero-route active-route'>{tour[0].tour_name}</a>
            </div>
            <div className='tourbook2-hero-social-div'>
                <Socialmedia/>
            </div>
        </div>


        
        <div className='tourbook2-sub'>
            <div className='tourbook2-sub-left'>
                <p  className='tourbook2-sub-right-title'>Tour Package Places:</p>
                <div className='tourbook2-sub-left-places'>
                    {tourPlaces.length>0 ? tourPlaces.map((place,index)=>{
                        return(
                            <Tourbook2_card key={index} place={place.place_name} img={place.card_img}/>
                        )
                    }):null}

                </div>
            </div>
            <div className='tourbook2-sub-right'>
                <p className='tourbook2-sub-right-title'>Tour Package Details:</p>
                <p className='tourbook2-sub-right-p'>Tour Package Price : {total}</p>
                <div className='tourbook2-sub-right-coupon-div'>
                    <p className='tourbook2-sub-right-coupon-p'>Coupon Code :</p>
                    <input  className='tourbook2-sub-right-coupon-input'/>
                    <button className='tourbook2-sub-right-coupon-btn'>Enter</button>
                </div>
                <div className='tourbook2-sub-right-line'></div>
                <p className='tourbook2-sub-right-p'>Hotel Type : {hotelType}</p>
                <p className='tourbook2-sub-right-p'>Passenger Count : {passengers}</p>
                <p className='tourbook2-sub-right-p'>Days : {tour.length}</p>
                <p className='tourbook2-sub-right-p'>Tour Start Date : {startDate}</p>
                <div className='tourbook2-sub-right-btn-div'>
                    <a className='tourbook2-sub-right-btn-1' onClick={PreviousHandler}>Previous</a>
                    <a className='tourbook2-sub-right-btn-2' onClick={SendHandler}>Send Inquiry</a>
                </div>
            </div>
        </div>


        <div className='tourbook2-map-div'>
            <div className='tourbook2-map-div_sub'>
                <p className='tourbook2-map-div-sub-p'>Tour Route:</p>
            </div>
            <div className='tourbook2-map-div-sub'>
            <GoogleMap
              mapContainerClassName='daytour-preview-bottom-info-2-map'
              center={{lat: 6.947248052781988, lng: 79.873046875}}
              zoom={8}

                      >
              <MarkerF position={{ lat: 6.93665, lng: 79.84505 }} />
             
              <DirectionsService
            options={{
              destination: origin,
              
              waypoints: [
                ...(tourPlaces.length > 0
                  ? tourPlaces.map((place, index) => ({ location: { lat: place.place_lat, lng: place.place_lng },
                   
                                                    
                  
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






function Tourbook2_card(props) {
  return (
    <div className='tourbook2_card'>
        <div className='tourbook2_card-left'>
        {props.img ? <img className='tourbook2-Placecard-img' src={`http://localhost:8080/places/placeimg?file=${props.img}`} /> : null}
        </div>
        <div className='tourbook2_card-right'>
        <p className='tourbook2_card-right-p'>{props.place}</p>
        </div>
    </div>
  )
}
