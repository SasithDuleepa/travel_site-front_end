import React from 'react';
import './travelPackage.css';

import Packagecard from '../packageCard/packagecard';

export default function TravelPackage() {
  return (
    <div>
        <div className='travelPackage'>
            <Packagecard/>
            <Packagecard/>
            <Packagecard/>

   
            <Packagecard/>
           
        </div>
    </div>
  )
}
