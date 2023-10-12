import React from 'react';
import './homereview.css';

export default function Homereview(props) {
  return (
    <div className='homereview'>
        <div className='homereview-img-container'>
            
        </div>
        <div className='homereview-text-container'>
            <p className='homereview-text-name'>{props.name}</p>
            <p className='homereview-text-comment'>{props.comment}</p>
        </div>
    </div>
  )
}
