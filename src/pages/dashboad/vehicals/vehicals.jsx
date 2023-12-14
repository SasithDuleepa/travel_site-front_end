import React, { useEffect } from 'react';
import './vehicals.css';
import axios from 'axios';
import { useState } from 'react';




export default function Vehicals() {

  const[AllVehicles, setAllVehicles] = useState([]);


  const [data,setData] = useState({
    vehicleType:"",
    minPassengers:"",
    maxPassengers:"",
    ratePerKm:""
    })

  const InputHandler = (e) => {
    let key = e.target.id;
    const newData = {...data};
    newData[key] = e.target.value;
    setData(newData);    
  }

  const AddHandler = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post( `${process.env.REACT_APP_BACKEND_URL}/vehicles/add`, data,{
        headers: {
          'Authorization': `${token}`,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        window.alert("added successfully");
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
        window.alert("Error ");
      }
    }
    

  }

  //get all vehicles
useEffect(() => {
  const AllVehicles = async () => {
    const res = await axios.get( `${process.env.REACT_APP_BACKEND_URL}/vehicles/all`);
    setAllVehicles(res.data);
  
  }
  AllVehicles();
},[])

const ChangeHandler = (e, index) => {
  let key = e.target.id;
  const newData = [...AllVehicles];
  newData[index][key] = e.target.value;
  setAllVehicles(newData);
}

const UpdateHandler =async(id,index)=>  {
  
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.put( `${process.env.REACT_APP_BACKEND_URL}/vehicles/update/${id}`, AllVehicles[index],{
      headers: {
        'Authorization': `${token}`,
      },
      withCredentials: true,
    });
    if (res.status === 200) {
      window.alert("successfully");
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
      window.alert("Error");
    }
  }
}

const DeleteHandler = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await axios.delete( `${process.env.REACT_APP_BACKEND_URL}/vehicles/delete/${id}`,{
      headers: {
        'Authorization': `${token}`,
      },
      withCredentials: true,
    });
    if (res.status === 200) {
      window.alert("successfully");
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
      window.alert("Error");
    }
  }

}

  return (
    <div className='vehical-main'>
      <h1>Add Vehicle</h1>
      <div className='vehical-main-div'>
        <div className='vehicle-main-form'>
          <label>vehicle type :</label>
          <input type='text' value={data.vehicleType} id='vehicleType' onChange={(e)=>InputHandler(e)}/>
        </div>
        <div className='vehicle-main-form'>
          <label>min passengers :</label>
          <input type='number' value={data.minPassengers} id='minPassengers' onChange={(e)=>InputHandler(e)}/>
        </div>
        <div className='vehicle-main-form'>
          <label>max passengers :</label>
          <input type='number' value={data.maxPassengers} id='maxPassengers' onChange={(e)=>InputHandler(e)}/>
        </div>
        <div className='vehicle-main-form'>
          <label>rate per km :</label>
          <input type='number' value={data.ratePerKm} id='ratePerKm' onChange={(e)=>InputHandler(e)}/>
        </div>
        <button className='add-vehicle-btn' onClick={AddHandler}>Add</button>
      </div>



      <h1>update vehicle</h1>
      <div className='vehicle-update-main'>
        <div className='vehicles-available-div'>
          {AllVehicles.map((vehicle,index) => (
            <div key={index} className='vehicles-available-div-child'>
              <div className='vehicles-available-div-child-form'>
                <label className='vehicles-available-div-child-label'>vehicle type :</label>
                <input type='text'  className='vehicles-available-div-child-input' id="vehicle_type" value={vehicle.vehicle_type} onChange={(e)=>ChangeHandler(e,index)}/>
              </div>
              <div className='vehicles-available-div-child-form'>
                <label className='vehicles-available-div-child-label'>min passenger</label>
                <input type='number'  className='vehicles-available-div-child-input' id='min_passengers' value={vehicle.min_passengers} onChange={(e)=>ChangeHandler(e,index)}/>
              </div>
              <div className='vehicles-available-div-child-form'>
                <label className='vehicles-available-div-child-label'>max passenger :</label>
                <input type='number'  className='vehicles-available-div-child-input' id='max_passengers' value={vehicle.max_passengers} onChange={(e)=>ChangeHandler(e,index)}/>
              </div>
              
              <div className='vehicles-available-div-child-form'>
                <label className='vehicles-available-div-child-label'>rate per km:</label>
                <input type='number'  className='vehicles-available-div-child-input' id='rate' value={vehicle.rate} onChange={(e)=>ChangeHandler(e,index)}/>
              </div>
              <button className='update-vehicle-btn' onClick={()=>UpdateHandler(vehicle._id,index)}>Update</button>
              <button className='delete-vehicle-btn' onClick={()=>DeleteHandler(vehicle._id)}>Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
