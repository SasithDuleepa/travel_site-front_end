import React from 'react'
import './socialmedia.css'

import Fb from './../../assets/icons/facebook.png';
import Insta from './../../assets/icons/instagram.png';
import Twitter from './../../assets/icons/twitter.png';

export default function Socialmedia() {
  return (
    <div className='Socialmedia-div'>
        <a className='Socialmedia-div-a'><img className='Socialmedia-div-img' src={Fb} /> Facebook</a>
        <a className='Socialmedia-div-a'><img className='Socialmedia-div-img' src={Insta} /> Instagram</a>
        <a className='Socialmedia-div-a'><img className='Socialmedia-div-img' src={Twitter} /> Twitter</a>
    </div>
  )
}
