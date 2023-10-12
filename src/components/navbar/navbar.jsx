import React, { useEffect, useState } from 'react';
import './navbar.css';
import Icon from './../../assets/sidebar_logo.png';
import Menu from './../../assets/menu.png';
import Close from './../../assets/close.png';

export default function Navbar() {
    const[menuClass, setMenuClass] = useState('Nav-bar-active')
    


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
            <a className='nav-links'>Home</a>
            <a className='nav-links'>Tours</a>
            <a className='nav-links'>Popular Destinations</a>
            <a className='nav-links'>About Us</a>
            <a className='nav-links'>Contact</a>
        </div>
        <div className='Nav-bar-links-div-right'>
            <a className='nav-bar-login-btn'>Login</a>
        </div>



        </div>

    </div>
  )
}
