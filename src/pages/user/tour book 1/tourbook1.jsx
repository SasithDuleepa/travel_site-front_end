import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './tourbook1.css';
import Socialmedia from '../../../components/social media/socialmedia';

export default function Tourbook1() {
    const{id} = useParams();
    console.log(id);    


    const[hotelType, setHotelType] = useState('');
    const[passengers,setPassengers] = useState('');
    const[startDate,setStartDate] = useState('');

    const NextHandler = () => {
        if(hotelType === '' || passengers === '' || startDate === ''){
            alert('Please fill all the fields');
        }else{
            sessionStorage.setItem('hotelType', hotelType);
            sessionStorage.setItem('passengers', passengers);
            sessionStorage.setItem('startDate', startDate);
            
            window.location.href = `/tourbook2/${id}`;
      
        }
    
    }

    const BackHandler = () => {}
  return (
    <div className='Tourbook1'>
        <div className='Tourbook1-hero'>
            <p className='Tourbook1-hero-title'>Plan My Tour</p>
            <div className='Tourbook1-hero-route-div'>
                <a className='Tourbook1-hero-route'>Home</a>
                <a className='Tourbook1-hero-route'>/</a>
                <a className='Tourbook1-hero-route'></a>
            </div>
            <Socialmedia/>

        </div>

        <div className='Tourbook1-hero-1'>
            <p className='Tourbook1-hero-1-p1'>Select Hotels & Passenger Count</p>
            <p className='Tourbook1-hero-1-p2'>2nd step is you need to select the hotel for
                 Accommodation & need to enter
                 passenger count for choose vehical</p>
            
            <div className='Tourbook1-form-div'>
                <div className='Tourbook1-form'>
                    <label className='Tourbook1-form-label'>Select the Hotel Type:</label>
                    <select className='Tourbook1-form-input' onChange={(e)=>setHotelType(e.target.value)}
                    value={hotelType}>
                        <option value=''>Select Hotel Type</option>
                        <option value='Luxury'>Luxury</option>
                        <option value='Semi-Luxury'>Semi-Luxury</option>
                    </select>
                </div>
                <div className='Tourbook1-form'>
                    <label className='Tourbook1-form-label'>Enter Passenger Count:</label>
                    <input type='number' onChange={(e)=>setPassengers(e.target.value)} value={passengers} min='1' max='10' required className='Tourbook1-form-input'/>
                </div>
                <div className='Tourbook1-form'>
                    <label className='Tourbook1-form-label'>Tour Start Date:</label>
                    <input className='Tourbook1-form-input' type='date' onChange={(e)=>setStartDate(e.target.value)}/>
                </div>

                <div className='Tourbook1-btn-div'>
                    <a className='Tourbook1-btn-1'>Previous</a>
                    <a className='Tourbook1-btn-2'  onClick={NextHandler}>Next</a>
                </div>

            </div>

        </div>
    </div>
  )
}
