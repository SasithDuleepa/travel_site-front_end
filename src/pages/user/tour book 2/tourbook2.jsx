import React, { useEffect,useRef, useState } from 'react';

import './tourbook2.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import Socialmedia from '../../../components/social media/socialmedia';


export default function Tourbook2() {
    
    const{id,hotel,pcount,date} = useParams();
 

    const [hotelType, setHotelType] = useState('');
    const [passengers, setPassengers] = useState('');
    const [startDate, setStartDate] = useState('');

    const[tour,setTour] = useState([]);
    const[distance,setDistance] = useState(null);

    const[total,setTotal] = useState(null);
    const[vehicleRate,setVehicleRate] = useState(null); 


    useEffect(()=>{
        setHotelType(hotel);
        setPassengers(pcount);
        setStartDate(date);
      },[id])

      //tour details
      useEffect(()=>{
        const fetchTour = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour/${id}`);
            const data = await response.data;
            if(data.length>0){
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
      let fees = 0;
      const [tourPlaces, setTourPlaces] = useState([]);
      useEffect(()=>{
        const fetchTourPlaces = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/places/${id}`);
            const data = await response.data;
            // console.log(data);
            setTourPlaces(data);
            if(response.data.length>0){
              let Data = response.data;
              fees=0
              {Data.map((item,index)=>{
                
                return(fees = fees+item.visiting_fee)
              })}
            }
            // console.log(fees)
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
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/vehicles/${passengers}`)
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
      let hotel_fees = 0;
      useEffect(()=>{
        const fetchHotelsPrices = async () => {
                if(hotelType==='5 star'){
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/luxury/price/${id}/${startDate}`);
                        const data = await res.data;
                        console.log(data)
                       

                        if(data.length>0){
                          hotel_fees = 0;
                          {data.map((item,index)=>{
                            return(hotel_fees = hotel_fees+item.price)                          
                          })}
                        }
                        console.log(hotel_fees)
                    } catch (error) {
                        console.log(error);
                    }
                }else if(hotelType==='3 star/4 star'){
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/semi/price/${id}/${startDate}`);
                    const data = await res.data;
                    console.log(data)
                    
                    if(data.length>0){
                      hotel_fees = 0;
                      {data.map((item,index)=>{
                        return(hotel_fees = hotel_fees+item.price)                          
                      })}
                    }
                    console.log(hotel_fees)
                }
        };
        fetchHotelsPrices();
      }
      ,[tour])

      //calculation
      const Calculation =()=>{
        let sub_total = distance * vehicleRate + fees +hotel_fees  ;
        let total = sub_total / passengers;
        setTotal(total.toFixed(2));
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
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/book/bookTour`,Data );
          console.log(res);
          if(res.status === 200){
           
            sessionStorage.removeItem('hotelType');
            sessionStorage.removeItem('passengers');
            sessionStorage.removeItem('startDate');
    
            
    
    
    
          }
          } catch (error) {
            console.log(error);
          }
       }
       const PreviousHandler=() =>{
        window.history.back();
      }
  

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
  return (
    <div className='tourbook2'>
        <div style={Style}>
            <p className='tourbook2-hero-title'>Tour Summary</p>
            <div className='tourbook2-hero-route-div'>
                <a className='tourbook2-hero-route' href='/'>Home</a>
                <p className='tourbook2-hero-route'>/</p>
                <a className='tourbook2-hero-route'>Tours</a>
                <p className='tourbook2-hero-route'>/</p>
                <p className='tourbook2-hero-route active-route'>{tour.length>0 && tour[0].tour_name}</p>
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
                <div  className='tourbook2-sub-right-price-div'>
                  <p className='tourbook2-sub-right-p'>Tour Package Price :</p>
                  <p className='tourbook2-sub-right-p'>$ {total}</p>
                  <p className='tourbook2-sub-right-p-sub'> * per person</p>
                </div>

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
        {props.img ? <img className='tourbook2-Placecard-img' src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${props.img}`} /> : null}
        </div>
        <div className='tourbook2_card-right'>
        <p className='tourbook2_card-right-p'>{props.place}</p>
        </div>
    </div>
  )
}
