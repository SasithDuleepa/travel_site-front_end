import React, { useEffect, useState } from 'react';
import './navbar.css';
import Icon from './../../assets/sidebar_logo.png';
import Menu from './../../assets/menu.png';
import Close from './../../assets/close.png';

import Road from './../../assets/road.png';
import User from './../../assets/user.png';

export default function Navbar() {
    const[menuClass, setMenuClass] = useState('Nav-bar-active')

    const [login,setLogin] = useState(false)
    const [user_id,setUser_id] = useState('')
    useEffect(() => {
      const loginStatus = sessionStorage.getItem('login');
      const user_id = sessionStorage.getItem('id');
      
      if (loginStatus) {
        setLogin(loginStatus);
        setUser_id(user_id);
      } else {
        setLogin(false);
        setUser_id('');
      }
    }, []);
    


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

     


    const { y, x, scrollDirection } = useScroll();  

  const currentPath = window.location.pathname;
  return (
    
    <div className='nav-main'>        
        <nav className= {!scrollDirection || scrollDirection === "down" ? 'active': 'hidden'}    >
        <div className='nav-bar-upper-div'>
          <div className='nav-bar-upper-div-left'>
            <p className='nav-bar-upper-div-left-p'>+94 00 00 00 000</p>
          </div>
          <div className='nav-bar-upper-div-right'>
            <a className='nav-bar-upper-div-right-1'>40C, Hospital Road, Nagoda, Kalutara, Sri Lanka</a>
            <p className='nav-bar-upper-div-right-1'>|</p>
            <a className='nav-bar-upper-div-right-1'>info@srilankatravelexpert.com</a>
            <a className='nav-bar-upper-div-right-1'></a>
          </div>
        </div>
        
      
        
        <div className='Nav-bar-main'>
        <div className='Nav-bar'>
          <div className='Nav-bar-links-div-left'>
            <img src={Icon} alt="Logo" className='nav-bar-img'/>
          </div>
          <div className='Nav-bar-links-div-center'>
            <a className={currentPath==='/'?'nav-links-active': 'nav-links'}  href='/'>Home</a>
            <a className={currentPath==='/tours/tourcategory'?'nav-links-active': 'nav-links'} href='/tours/tourcategory'>Tour Packages</a>
            <a className={currentPath==='/tours/daytour'?'nav-links-active': 'nav-links'} href='/tours/daytour'>Day Tours</a>
            <a className={currentPath==='/popular_destination'?'nav-links-active': 'nav-links'}  href='/popular_destination'>Popular Destinations</a>
            <a className={currentPath==='/about'?'nav-links-active': 'nav-links'}  href='/about'>About Us</a>
            <a className={currentPath==='/contactus'?'nav-links-active': 'nav-links'}  href='/contactus'>Contact Us</a>
          </div>
          <div className='Nav-bar-links-div-right'>
            {login ? 
            <div className='nav-bar-login-div'>
            <a href='/cart/1'><img src={Road} alt="Road" className='nav-bar-road-img'/></a>
            <a href={`/profile/${user_id}`}><img src={User} alt="User" className='nav-bar-user-img'/></a>
            </div>
          :
            <a className='nav-bar-login-btn' href='/login'>Login</a>}
          </div>
        </div>
        </div>
        </nav>

    </div>
   
  )
}


export function useScroll() {
    // storing this to get the scroll direction
   const [lastScrollTop, setLastScrollTop] = useState(0);
    // the offset of the document.body
   const [bodyOffset, setBodyOffset] = useState(
     document.body.getBoundingClientRect()
   );
    // the vertical direction
   const [scrollY, setScrollY] = useState(bodyOffset.top);
    // the horizontal direction
   const [scrollX, setScrollX] = useState(bodyOffset.left);
    // scroll direction would be either up or down
   const [scrollDirection, setScrollDirection] = useState();

   const listener = e => {
     setBodyOffset(document.body.getBoundingClientRect());
     setScrollY(-bodyOffset.top);
     setScrollX(bodyOffset.left);
     setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
     setLastScrollTop(-bodyOffset.top);
   };

   useEffect(() => {
     window.addEventListener("scroll", listener);
     return () => {
       window.removeEventListener("scroll", listener);
    //    console.log(scrollDirection)
     };
   });

   return {
     scrollY,
     scrollX,
     scrollDirection
   };
 }
