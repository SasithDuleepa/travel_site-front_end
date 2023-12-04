import React, { useEffect, useState } from 'react';
import './tcPriview.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Socialmedia from '../../../components/social media/socialmedia';

import Card from './card/card';


export default function TCPriview() {
    const {tour}= useParams();
    const [category,setCategory] = useState([])

    const[tours,setTours] = useState([])
      //get tours according to tour category
  const GetTours = async() =>{
    const res = await axios.get(`http://localhost:8080/tour/tours/${tour}`)
    console.log(res.data)
    setTours(res.data)
  }
  const GetTourCategory =async() =>{
    const res = await axios.get(`http://localhost:8080/tourcategory/tourcategory/${tour}`)
    console.log(res.data[0])
    setCategory(res.data[0])
  }
  useEffect(()=>{
    GetTours()
    GetTourCategory()
  },[tour])


  return (
    <div className='TCPriview'>
        <div className='TCPriview-hero'>
          <p className='TCPriview-hero-title'>{category.tourcategory_name}</p>
          <div className='TCPriview-hero-route-div'>
            <a className='TCPriview-hero-route'>Home</a>
            <a className='TCPriview-hero-route'>/</a>
            <a className='TCPriview-hero-route'>Tours</a>
            <a className='TCPriview-hero-route-active'>{category.tourcategory_name}</a>
          </div>
          <Socialmedia/>
        </div>
        <div className='TCPriview-sub'>
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
        
        
    </div>
  )
}
