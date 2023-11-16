import React, { useEffect, useState } from 'react';
import './tourPreview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calander from './../../../assets/icons/calendar.png'
import PlaceCard from '../../../components/place card/placeCard';

export default function TourPreview() {
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

  //get tour and tour dates
  const GetTour = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/tour/tour/${tour}`);
      setTourData(res.data)
      // console.log(res_data)
    } catch (error) {
      console.error('Error fetching tour:', error);
    }
  };
  
  useEffect(()=>{
    GetTour()
    
  },[tour])



  const expandhandler = (tourDateId)=>async() =>{
    setExpandClass(expandclass === 'TourPreview-center-right-expand-div' ? 'close' : 'TourPreview-center-right-expand-div');
    setExpandedDay(tourDateId);
    try {
      const res =await axios.get(`http://localhost:8080/tour/tourplaces/${tourDateId}`)
      console.log(res.data)
      setPlacesData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
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
          <div className='TourPreview-header-left-coupen'>
            <p className='TourPreview-header-left-p couponcode-p'>Coupon Code:</p>
            <input className='TourPreview-header-left-input'/>
            <button className='TourPreview-header-left-btn'>enter</button>
          </div>
          <div className='TourPreview-header-left-line'></div>
          <div className='TourPreview-header-left-2'>
           <img src={Calander} alt="" />
            <div className='TourPreview-header-left-p'>4 Days/3 Nights</div>
          </div>
          <button>Book Now</button>
        </div>





        <div className='TourPreview-header-right'></div>


        

      </div>



      <div className='TourPreview-center-line'></div>

      <p className='TourPreview-center-description'>Lorem ipsum dolor sit amet
       consectetur. Erat nisi scelerisque aliquet nunc mauris aliquam sapien 
       vitae. Diam nulla etiam mauris eget malesuada consequat pharetra odio
        in. Iaculis nisi vehicula maecenas facilisis vestibulum ultrices
         amet ac. Mattis diam sit fermentum pharetra consectetur sollicitudin.
          Consequat porta nullam aenean sit quam tellus orci. Dignissim in
           pulvinar volutpat nunc. Commodo eu sit at elementum. Morbi elementum
            laoreet sed tortor. Est pellentesque malesuada a dignissim 
            sed id ut. Volutpat tempor et congue pellentesque ut tempus.
             Congue sed lectus ornare diam in.
       Arcu donec tellus fames augue nulla enim posuere varius porttitor.</p>

      <div className='TourPreview-center' >
        <div className='TourPreview-center-left' ></div>
        <div className='TourPreview-center-right' >

          {TourData.length>0 ? TourData.map((tourDate,index)=>{
            return(
            <div key={index} className='TourPreview-center-right-day'>
            <div className='TourPreview-center-right-day-main'><p>Day {tourDate.tour_date}</p>  <a key={index} onClick={expandhandler(tourDate.tour_date_id)}>+</a></div>
            <div className={expandedDay === tourDate.tour_date_id ? expandclass : 'close'}>
                  {/* ... (rest of the expanded content) */}

              <p className='TourPreview-expand-p1'>Lorem ipsum dolor sit amet consectetur.
               Velit quisque scelerisque vel faucibus ornare.
               Luctus sapien integer dolor egestas gravida ut eleifend quis. At massa mi
              </p>

              {placesData.map((place,Index)=>{
                return(
                  <div>
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

            </div>
          </div> 
          </div>
          :null}
          {btn3==='TourPreview_bottom-btn'?
          <div className='TourPreview-bottom-3'>
          <PlaceCard/>
          <PlaceCard/>
          <PlaceCard/>
          <PlaceCard/>
          <PlaceCard/>
        </div>:
        null
          }
          
          
          

        </div>
      </div>
        
    </div>
  )
}
