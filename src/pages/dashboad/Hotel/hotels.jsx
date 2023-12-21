import React, { useState } from 'react';
import './hotels.css';
import axios from 'axios';

import Edite_hotel from '../edite hotel/edite_hotel';
export default function Hotels() {
  const[name,setName] = useState('')
  const[lat,setLat] = useState('')
  const[lang, setLng] = useState('')
  const[category,setCategory] = useState('')
  const[prices, setPrices] = useState([{
    dayStart:"",
    dayEnd:'',
    price:''
  }])
  const [calculatedDays, setCalculatedDays] = useState([]);



  const AddPriceRange =()=>{
      const newData = [...prices]
      newData.push({dayStart:"",
      dayEnd:'',
      price:''})
      setPrices(newData)

      const newCalculatedDays = [...calculatedDays];
  newCalculatedDays.push(0);
  setCalculatedDays(newCalculatedDays);
  }



  const DayStartHandler = (e) => {
  
    if(e.target.value){
    
      const newdata= [...prices]
      newdata[e.target.name].dayStart = e.target.value
      setPrices(newdata)
    }
    
    
  
  }
  const DayEndHandler = (e) => {
    const newdata= [...prices]
    newdata[e.target.name].dayEnd = e.target.value
    setPrices(newdata)

    const start = new Date(prices[e.target.name].dayStart);
  const end = new Date(e.target.value);
  const days = (end - start) / (1000 * 60 * 60 * 24);
  const newCalculatedDays = [...calculatedDays];
  newCalculatedDays[e.target.name] = days;
  setCalculatedDays(newCalculatedDays);
  

  }
  const PriceHandler = (e) => {
    const newdata= [...prices]
    newdata[e.target.name].price = e.target.value
    setPrices(newdata)
  
  }

  const calculateTotalDays = () => {
    return calculatedDays.reduce((total, days) => total + days, 0);
  };

  const DeleteHandler = (index) =>()=> {
    const newdata= [...prices]
    newdata.splice(index,1)
    setPrices(newdata)
  }
  

  const AddHotel = async() => {
    console.log(prices)
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/hotels/add`,{
        hotelName:name,
        lat:lat,
        lng:lang,
        category:category,
        prices:prices,
      },{
        headers: {
          'Authorization': `${token}`,
        },
      })
      if (res.status === 200) {
        window.alert("Place added successfully");
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
        window.alert("Error adding place");
      }
    }
  }
  return (
    <div className='hotels-main'>
      <h1>Add Hotels</h1>

      <div className='hotels-main-div'>
        <div className='hotels-form-div'>
          <label className='hotels-form-label'>hotel name :</label>
          <input className='hotels-form-input' type='text' onChange={(e)=>setName(e.target.value)} />
        </div>
        <div>
          <div className='hotels-form-div'>
            <label className='hotels-form-label'>lat :</label>
            <input  className='hotels-form-input' type='number' onChange={(e)=>setLat(e.target.value)}/>
          </div>
          <div className='hotels-form-div'>
            <label className='hotels-form-label'>lang :</label>
            <input className='hotels-form-input' type='number' onChange={(e)=>setLng(e.target.value)}/>
          </div>
        </div>
        <div className='hotels-form-div'>
          <label className='hotels-form-label'>hotel category :</label>
          <select className='hotels-form-input' onChange={(e)=>setCategory(e.target.value)}>
            <option value=''>select category</option>
            <option value='5 star'>5 start</option>
            <option value='3 star/4 star'>3 star / 4 star</option>
          </select>

        </div>

        <div>
          <h2>prices</h2>

          {prices.length>0 ?
      
      prices.map((prices, index)=>{
        return(
          <div className='hotel-price-main' key={index}>
            <div className='hotel-prices-form-div'>
              <label>day start :</label>
              <input type='date' id='dayStart' name={index} value={prices.dayStart}  onChange={(e)=>DayStartHandler(e)} />
            </div>
            <div  className='hotel-prices-form-div'> 
              <label>day end :</label>
              <input type='date' id='dayEnd' name={index} onChange={(e)=>DayEndHandler(e)} />
            </div>
            <div  className='hotel-prices-form-div'>
              <label>price :</label>
              <input type='number' id='price' name={index} onChange={(e)=>PriceHandler(e)} />
            </div>
            <p>Number of days: {calculatedDays[index]}</p>
            <a className='hotel-prices-form-div-delete-btn' onClick={DeleteHandler(index)}>delete</a>
          </div>
        )

      })
    
  :
  <p>no price range</p>}
          
          <div>
    <p>Total Number of Days: {calculateTotalDays()}</p>
  </div>
          <a className='hotel-prices-dashboad-add-btn' onClick={AddPriceRange}>+</a>
        </div>
        <button className='hotel-dashboad-add-btn' onClick={AddHotel}>Add </button>
      </div>
      <Edite_hotel/>
    </div>
  )
}
