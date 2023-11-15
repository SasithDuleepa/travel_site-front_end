import React, { useEffect, useState } from 'react';
import './tcPriview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Card from './card/card';

export default function TCPriview() {
    const {tour}= useParams();

    const[tours,setTours] = useState([])
      //get tours according to tour category
  const GetTours = async() =>{
    const res = await axios.get(`http://localhost:8080/tour/tours/${tour}`)
    console.log(res.data)
    setTours(res.data)
  }
  useEffect(()=>{
    GetTours()
  },[tour])


  return (
    <div className='TCPriview'>
        <div className='TCPriview-hero'></div>
        <p className='TCPriview-description'>
        Lorem ipsum dolor sit amet consectetur. Erat nisi 
        scelerisque aliquet nunc mauris aliquam sapien vitae
        . Diam nulla etiam mauris eget malesuada consequat 
        pharetra odio in. Iaculis nisi vehicula maecenas
         facilisis vestibulum ultrices amet ac. Mattis
          diam sit fermentum pharetra consectetur sollicitudin.
           Consequat porta nullam aenean sit quam tellus orci.
            Dignissim in pulvinar volutpat nunc. Commodo
             eu sit at elementum. Morbi elementum laoreet 
             sed tortor. Est pellentesque malesuada a dignissim sed id ut.
              Volutpat tempor et congue pellentesque ut tempus.
         Congue sed lectus ornare diam in. Arcu donec tellus fames
          augue nulla enim posuere varius porttitor.
        </p>
        <div className='TCPriview-card-div'>


{tours.map((tour,index)=>{
                    return(
                        <Card key={index} name={tour.tour_name} tour_description={tour.tour_description} link={`/tour/${tour.tour_id
                        }`}
                        />
                    )
                })}
            
            
        </div>
    </div>
  )
}
