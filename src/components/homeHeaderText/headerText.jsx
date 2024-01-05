import React, { useEffect, useState } from 'react';
import './headerText.css';
import World from './../../assets/world tour 02 1.png';
import axios from 'axios';

export default function HeaderText() {
  const [about,setAbout] = useState('')
  const GetAbout = async() => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/about`);
        setAbout(res.data[0].about)

    } catch (error) {
        
    }
}

useEffect(() => {
  GetAbout();
},[])
  return (
    <div className='header-text-main'>
      <div className='header-text'>
      <div className='header-text-child1'>
        <p className='header-text-sub-p '>Travel with</p>
        <h1 className='header-text-h1 '>Sri Lanka Travel Experts</h1>
        <p className='header-text-p '>{about}</p>
           <div className=''><a className='headertext-more-btn' href='/about'>Read More</a></div>
           
        

      </div>


      <div className='header-text-child2'>
          <img className='header-text-child2-img ' src={World} alt="" />
      </div>
    </div>

    </div>
    
  )
}

// function reveal() {
//   var reveals = document.querySelectorAll(".reveal");
//   // console.log(reveals);

//   for (var i = 0; i < reveals.length; i++) {
//     var windowHeight = window.innerHeight;
//     var elementTop = reveals[i].getBoundingClientRect().top;
//     var elementVisible = 110;

//     // console.log(windowHeight);
//     // console.log(elementTop);

//     if (elementTop < windowHeight - elementVisible) {
//       reveals[i].classList.add("active_");
//     } else {
//       reveals[i].classList.remove("active_");
//     }
//   }
// }

// window.addEventListener("scroll", reveal);
