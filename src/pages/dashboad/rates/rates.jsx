import React, { useEffect, useState } from 'react';
import './rates.css';
import axios from 'axios';

export default function Rates() {
    const [tourRates, setTourRates] = useState('');
    const [dayTourRates, setDayTourRates] = useState('');


    const [daytourDiscountRate, setDayTourDiscountRates] = useState('');

    const GetTourRates = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/tour`)
            // console.log(res.data);
            setTourRates(res.data[0].tour_rate);
        } catch (error) {
            
        }
    }


    const TourRateSubmit =async() =>{
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data/tour`,{
                tour_rate : tourRates
            })
            // console.log(res.data);
            if(res.status===200){
                window.alert("tour rate added successfully");
                window.location.reload();
            }
        } catch (error) {
            if(error.response.status === 401){
                sessionStorage.clear();
                window.alert("You are not authorized to perform this action");
              }else if(error.response.status === 400){
                window.alert("All fields are required");
              }else if(error.response.status === 500){
                window.alert("Internal server error");
              }else{
                window.alert("Error adding tour rate");
              }
        }

    }


    const GetDayTourRates = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/daytour`)
            // console.log(res.data);
            setDayTourRates(res.data[0].daytour_rate);
        } catch (error) {
            
        }
    }

    const DayTourRateSubmit = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data/daytour`,{
                daytour_rate : dayTourRates
            })
            // console.log(res.data);
            if(res.status===200){
                window.alert("daytour rate added successfully");
                window.location.reload();
            }
        } catch (error) {
            if(error.response.status === 401){
                sessionStorage.clear();
                window.alert("You are not authorized to perform this action");
              }else if(error.response.status === 400){
                window.alert("All fields are required");
              }else if(error.response.status === 500){
                window.alert("Internal server error");
              }else{
                window.alert("Error adding daytour rate");
              }
        }
    }


    const GetDayTourDiscountRates = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/data/daytour_discount`)
            // console.log(res.data);
            setDayTourDiscountRates(res.data[0].daytour_discount_rate);
        } catch (error) {
            
        }
    
    }
    const DayTourDiscountRateSubmit = async() => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/data/daytour_discount`,{
                daytour_discount_rate : daytourDiscountRate
            })
            // console.log(res.data);
            if(res.status===200){
                window.alert("daytour discount rate added successfully");
                window.location.reload();
            }
        } catch (error) {
            if(error.response.status === 401){
                sessionStorage.clear();
                window.alert("You are not authorized to perform this action");
              }else if(error.response.status === 400){
                window.alert("All fields are required");
              }else if(error.response.status === 500){
                window.alert("Internal server error");
              }else{
                window.alert("Error adding daytour discount rate");
              }
        }
    
    }


    useEffect(() => {
        GetTourRates()
        GetDayTourRates()
        GetDayTourDiscountRates()

    },[])
  return (
    <div className='rates'>
        <div className='daytour-rates-div'>
            <h1>day tour rates</h1>
            <div className='daytour-rates-form-div'>
                <label >day tour rate :</label>
                <input  className='daytour-rates-form-input' type="number" placeholder='rate' value={dayTourRates}
                onChange={(e)=>setDayTourRates(e.target.value)}
                />
                <p>%</p>
            </div>
            <button onClick={DayTourRateSubmit}>submit</button>
        </div>
        <div className='tour-rates-div'>
            <h1>tour rates</h1>
            
        <div className='tour-rates-form-div'>
                <label>tour rate :</label>
                <input className='tour-rates-form-input' type="number" placeholder='rate' value={tourRates}
                onChange={(e) => setTourRates(e.target.value)}
                
                />
                <p>%</p>
            </div>
            <button onClick={TourRateSubmit}>submit</button>
        </div>
        <div className='daytour-discount-rates-div'>
            <h1>day tour discount rates</h1>
            <div className='daytour-discount-rates-form-div'>
                <label>day tour discount rate :</label>
                <input className='daytour-discount-rates-form-input' type="number" placeholder='rate' value={daytourDiscountRate}
                onChange={(e)=>setDayTourDiscountRates(e.target.value)}
                />
                <p>%</p>
            </div>
            <button onClick={DayTourDiscountRateSubmit}>submit</button>

        </div>

    </div>
  )
}
