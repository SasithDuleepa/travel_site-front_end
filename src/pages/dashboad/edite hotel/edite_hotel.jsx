import React, { useEffect, useState } from 'react';
import './edite_hotel.css';
import axios from 'axios';

export default function Edite_hotel() {

    const[hotelData,setHotelData] = useState([])

    const [hotel,setHotel]=useState([]);

    const GetHotelData = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/all`)
        console.log(res.data)
    }

    useEffect(() => {
        GetHotelData()
    },[])

  return (
    <div className='edit-hotel-main'>
        <h1>Edit Hotel</h1>

        <div  className='edit-hotel-form-div'>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel Name :</label>
                <input className='edit-hotel-form-input' type="text"  />
            </div>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel lat :</label>
                <input className='edit-hotel-form-input' type="number"  />
            </div>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel lang :</label>
                <input className='edit-hotel-form-input' type="number"  />
            </div>
        </div>


        <div className='edit-hotel-date-form-div'>






            <div className='edit-hotel-date-form'>
                <div className='edit-hotel-date-form-sub'>
                    <label>day start :</label>
                    <input className='edit-hotel-date-form-input' type="date"  />
                </div>
                <div className='edit-hotel-date-form-sub'>
                    <label>day end :</label>
                    <input className='edit-hotel-date-form-input' type="date"  />
                </div>
                <div className='edit-hotel-date-form-sub'>
                    <label>price :</label>
                    <input className='edit-hotel-date-form-input' type="number"  />
                </div>
                <div className='edit-hotel-date-form-sub'>
                    <label>action :</label>
                    <button>Delete</button>
                </div>

            </div>
        </div>
    </div>
  )
}
