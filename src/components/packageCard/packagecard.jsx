import React from 'react';
import './packageCard.css';

import Gall from './../../assets/galle fort 1.png'

export default function Packagecard() {
  return (
    <div className='Packagecard-main-div'>
      
  <div className = "Packagecard">
    <img className='Packagecard-img' src={Gall} alt=""/>
    <div className="Packagecard-content">
      <h2 className='Packagecard-title'>
        family tours
      </h2>
      <p className='Packagecard-text'>
        Lorem, ipsum dolor sit amet consectetur adipisicingtatpisci voluptates cumque, veritatis atque nostrum corrupti ipsa asperiores harum? Dicta odio aut hic.
      </p>
      <a href="#" className="Packagecard-findmore">
        see more 
        {/* <span className="material-symbols-outlined">
          arrow_right_alt
        </span> */}
      </a>
    </div>
  </div>

    </div>
  )
}
