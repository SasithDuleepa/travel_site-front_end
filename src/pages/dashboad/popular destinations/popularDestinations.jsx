import React from 'react';
import './popularDestinations.css'

export default function PopularDestinations() {
  return (
    <div className='PopularDestinations'>
        <h1 className='PopularDestinations-header'>Popular Destinations</h1>
        <div className='PopularDestinations-line'></div>
        <div className='PopularDestinations-form-div'>
            <div className='PopularDestinations-search-place'>
                <label>find place:</label>
                <input />
            </div>
            <div className='PopularDestinations-result-place'>

            </div>

        </div>
    </div>
  )
}
