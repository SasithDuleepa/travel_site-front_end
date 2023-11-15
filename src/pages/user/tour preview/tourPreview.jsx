import React, { useEffect, useState } from 'react';
import './tourPreview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calander from './../../../assets/icons/calendar.png'

export default function TourPreview() {
  const {tour}= useParams();
  // console.log(tour)

  const[Tour,setTour]= useState([])
  //get tour
  const GetTour = async() =>{
    const res = await axios.get(`http://localhost:8080/tour/tour/${tour}`)
    // console.log(res.data)
    setTour(res.data[0]);

  }
  useEffect(()=>{
    GetTour()
    
  },[tour])

  useEffect(() => {
    console.log(Tour);
  }, [Tour]);

  //get tour days
  const GetTourdays = async() =>{
    const res = await axios.get(`http://localhost:8080/tourdays/${Tour[0].tour_id}`)
    console.log(res.data)
  }
  // useEffect(()=>{
  //   GetTourdays()
  // },[Tour])

  const [expandclass,setexpandclass] = useState('TourPreview-center-right-expand-div')

  const expandhandler = () =>{
    {expandclass === 'TourPreview-center-right-expand-div' ? setexpandclass('close') : setexpandclass('TourPreview-center-right-expand-div')}
   
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
          <div className='TourPreview-center-right-day'>
            <div className='TourPreview-center-right-day-main'><p>Day</p>  <a onClick={expandhandler}>+</a></div>
            <div className={expandclass}>

              <p className='TourPreview-expand-p1'>Lorem ipsum dolor sit amet consectetur.
               Velit quisque scelerisque vel faucibus ornare.
               Luctus sapien integer dolor egestas gravida ut eleifend quis. At massa mi
              </p>


              <p className='TourPreview-expand-place-p1'>
                <b>place</b>Lorem ipsum dolor sit amet consectetur. Velit quisque scelerisque
                vel faucibus ornare. Luctus sapien integer dolor egestas gravida ut eleifend quis. At massa mi
              </p>

              <p className='TourPreview-expand-p1'>
                Lorem ipsum dolor sit amet consectetur. Velit quisque scelerisque
                vel faucibus ornare. Luctus sapien integer dolor egestas gravida ut eleifend quis. At massa mi
              </p>

              

            </div>
            
          </div>
          
        </div>
      </div>
        
    </div>
  )
}
