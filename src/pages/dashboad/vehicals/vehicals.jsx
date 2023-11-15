import React from 'react';
import './vehicals.css';

export default function Vehicals() {
  return (
    <div className='vehical-main'>
      <h1>Add Vehicle</h1>
      <div className='vehical-main-div'>
        <div>
          <label>vahical type</label>
          <input />
        </div>
        <div>
          <label>max passengers</label>
          <input />
        </div>
        <div>
          <label>rate per km</label>
          <input />
        </div>
      </div>
    </div>
  )
}
