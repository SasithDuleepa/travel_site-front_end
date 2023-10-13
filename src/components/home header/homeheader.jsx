import React from 'react';
import './homeheader.css';

import Homereview from '../home review/homereview';
import Carousel1 from '../carousel/carousel1';


//images
import ninearch from '../../assets/9 arch 1.png';
import Gall from '../../assets/galle fort 1.png';
import Sigiriya from '../../assets/Images.png';

export default function Homeheader() {
  return (
    <div className='home-header-main'>
        <div className='home-header'>
            <div className="parent-home-header">
                <div className="div1-home-header">
                    <div className='div1-home-header-subdiv'>
                        <p className='div1-home-header-p1'>Plan your Best tour with</p>
                        <p className='div1-home-header-p2'>Sri Lanka Travel Experts</p>
                        <a className='div1-home-header-btn'>Plan Now</a>
                    </div>
                </div>
                <div className="div2-home-header">
                    <img className='div2-home-header-img' src={ninearch} alt="" />

                </div>
                <div className="div3-home-header">
                {/* <img className='div3-home-header-img' src={Sigiriya} alt="" /> */}
                <Carousel1/>
                </div>
                <div className="div4-home-header"> 
                    <img className='div4-home-header-img' src={Gall} alt="" /></div>
                <div className="div5-home-header"> 
                        <Homereview name='Andrew John' comment='Very Good'/> 
                        <Homereview name='Andrew John' comment='Superb'/> 
                </div>
            </div>
        </div>
        <div className="home-body">

        </div>
    </div>
  )
}
