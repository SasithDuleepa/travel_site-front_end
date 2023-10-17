import React from 'react';
import './cart.css';

export default function Cart() {
  return (
    <div className='tour-cart'>
      <div className='tour-cart-tours-div'>
        <a className='tour-cart-tours-link'>Tour 01</a>
        <a className='tour-cart-tours-link'>Tour 02</a>
        <a className='tour-cart-tours-link'>ADD +</a>
      </div>
      <div className='tour-cart-tour-places-div'>
          <a className='tour-cart-tour-places-link'>place 01</a>
          <a className='tour-cart-tour-places-link'>place 01</a>
          <a className='tour-cart-tour-places-link'>place 01</a>
          <a className='tour-cart-tour-places-link'>place 01</a>
          <a className='tour-cart-tour-places-link'>place 01</a>
          <a className='tour-cart-tour-places-link'>place 01</a>
      </div>
    </div>
  )
}
