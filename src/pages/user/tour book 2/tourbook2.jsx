import React from 'react'
import './tourbook2.css';
import { useParams } from 'react-router-dom';


export default function Tourbook2() {
    const{id} = useParams();
    console.log(id); 
  return (
    <div className='tourbook2'>
        <div className='tourbook2-hero'></div>
        
        <div className='tourbook2-sub'>
            <div className='tourbook2-sub-left'>
                <p>Tour Package Places:</p>
                <div className='tourbook2-sub-left-places'>
                    <Tourbook2_card/>
                    <Tourbook2_card/>
                    <Tourbook2_card/>
                </div>
            </div>
            <div className='tourbook2-sub-right'>
                <p className='tourbook2-sub-right-title'>Tour Package Details:</p>
                <p className='tourbook2-sub-right-p'>Tour Package Price:</p>
                <div className='tourbook2-sub-right-coupon-div'>
                    <p>Coupon Code:</p>
                    <input />
                    <button>Apply</button>
                </div>
                <div className='tourbook2-sub-right-line'></div>
                <p className='tourbook2-sub-right-p'>Hotel Type:</p>
                <p className='tourbook2-sub-right-p'>Passenger Count:</p>
                <p className='tourbook2-sub-right-p'>Days:</p>
                <p className='tourbook2-sub-right-p'>Tour Start Date:</p>
                <div className='tourbook2-sub-right-btn-div'>
                    <a className='tourbook2-sub-right-btn-1'>Previous</a>
                    <a className='tourbook2-sub-right-btn-2'>Send Inquiry</a>
                </div>
            </div>
        </div>
    </div>
  )
}






function Tourbook2_card() {
  return (
    <div className='tourbook2_card'>
        <div className='tourbook2_card-left'>
            <p>oytf libu</p>
        </div>
        <div className='tourbook2_card-right'>
        <p>oytf libu</p>
        </div>
    </div>
  )
}
