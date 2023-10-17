import React, { useEffect, useState } from 'react';
import './navbar.css';
import Icon from './../../assets/sidebar_logo.png';
import Menu from './../../assets/menu.png';
import Close from './../../assets/close.png';

import Road from './../../assets/road.png';
import User from './../../assets/user.png';

export default function Navbar() {
    const[menuClass, setMenuClass] = useState('Nav-bar-active')

    const login = true;
    


    const[icon,setIcon] = useState(Close)
    const iconHandler =()=>{
        if(icon === Close){
            setIcon(Menu)
            setMenuClass('Nav-bar-hidden')


        }else if(icon === Menu){
            setIcon(Close)
            setMenuClass('Nav-bar-active')
        }
    }

     
  return (
    <div className={menuClass}>
        <div className='Nav-bar-menu-div'>
            <img src={icon} alt="Menu" className='nav-bar-menu-img' onClick={iconHandler}/>
        </div>
        <div className='Nav-bar'>
        <div className='Nav-bar-menu-div'>
            <img src={icon} alt="Menu" className='nav-bar-menu-img' onClick={iconHandler}/>
        </div>



        
        
        <div className='Nav-bar-links-div-left'>
            <img src={Icon} alt="Logo" className='nav-bar-img'/>
        </div>
        <div className='Nav-bar-links-div-center'>
            <a className='nav-links' href='/'>Home</a>
            <a className='nav-links' href='/tours'>Tours</a>
            <a className='nav-links' href='/popular_destination'>Popular Destinations</a>
            <a className='nav-links' href='about'>About Us</a>
            <a className='nav-links' href='contactus'>Contact</a>
        </div>
        <div className='Nav-bar-links-div-right'>
            
            
            {login ? 
            <div className='nav-bar-login-div'>
            <a href='/cart/1'><img src={Road} alt="Road" className='nav-bar-road-img'/></a>
            <a href='/profile/1'><img src={User} alt="User" className='nav-bar-user-img'/></a>
        </div>
        :
        <a className='nav-bar-login-btn'>Login</a>}
        </div>



        </div>

    </div>
  )
}
