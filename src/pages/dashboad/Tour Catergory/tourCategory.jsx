import React, { useEffect, useState } from 'react';
import './tourCategory.css';
import axios from 'axios';




export default function TourCategory() {
 
  return (
    <div className="tourCategory">
      
      <div className='tourcategory-sub'>
      <h1>TOUR CATEGORY</h1>
      <div className='tourcategory-line'></div>

      <div>
      <div className='tourcategory-form'>
          <label>name:</label>
          <input type="text" />
        </div>
        <div className='tourcategory-form'>
          <label>description:</label>
          <input type="text" />
        </div>
        <div className='tourcategory-form'>
          <label>img:</label>
          <input type="text" />
        </div>
        <div className='tourcategory-form'>
          <label>add tour:</label>
          <input type="text" />
        </div>

      </div>
       
      </div>
    </div>

  )
}
