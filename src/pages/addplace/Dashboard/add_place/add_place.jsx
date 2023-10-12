import React, { useState } from 'react';
import './add_place.css';
import axios from 'axios';
import { GoogleMap, useLoadScript, MarkerF  } from '@react-google-maps/api';

    

export default function Add_place() {
    const[data , setData] = useState({
        name:"",
        description:"",
        time:'',
        lat:6.947248052781988,
        lng:79.873046875,
        file:null
      })
      const Filehandler = (e) => {
        const selectedFile = e.target.files[0];
        setData({ ...data, file: selectedFile });
    
      };
    // map
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
    if (!isLoaded) return (
        <p>Loading...</p>
        )

        const markerHandler = (e) => {
            console.log(e.latLng.toJSON());
            setData({...data , lat:e.latLng.toJSON().lat , lng:e.latLng.toJSON().lng})
        }
    
    
        const changeHandler = (e) => {
            setData({...data , [e.target.id]:e.target.value})
        }
        const changeNumValues = (e) =>{
          
          setData({
            ...data, [e.target.id]:parseFloat(e.target.value)
          })
        }
    
        const AddData =async () =>{
            const formData = new FormData()
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('time', data.time);
            formData.append('lat', data.lat);
            formData.append('lng', data.lng);
            formData.append('file', data.file);
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/places/addplace`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                console.log(res.data);
                if(res.status === 200){alert("Category added successfully")}
                
            
              } catch (error) {
                // Handle Error 
                if(error.response.status === 500){alert("Internal Server Error")}      
                else if(error.response.status === 400){ alert("please fill catergory name")}
              }
            
         
        
        }
  return (
    <div>
        <h1 className='header-Add_place'>Add Place</h1>
        <div className="parent-Add_place">
            <div className="div1-Add_place">
                <div className='form-div-Add_place'>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Name:</label>
                        <input type='text' className='add_place_input' id='name' onChange={changeHandler} value={data.name} />
                    </div>
                    <div  className='Add_place-form-location-div'>
                        <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>lat:</label>
                        <input type='text'  className='add_place_input-location' id='lat' onChange={changeNumValues} value={data.lat} />
                        </div>
                        <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>lng:</label>
                        <input type='text' className='add_place_input-location' id='lng' onChange={changeNumValues} value={data.lng}  />
                    </div>
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Place visit time Duration:</label>
                        <input type='text'  className='add_place_input' id='time' onChange={changeHandler} value={data.time} />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Description:</label>
                        <input type='text' className='add_place_input-description' id='description' onChange={changeHandler} value={data.description} />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Images:</label>
                        <input type='file' placeholder='Upload' onChange={(e) => Filehandler(e)}  className='add_place_input'/>
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <button className='Add_place-form-sub-div-button' onClick={AddData}>Add Place</button>
                    </div>
                    
                </div>
            </div>
            <div className="div2-Add_place">
                <div className='Add_place-map-div'>
                <GoogleMap
        mapContainerClassName='map-container'
        center={{lat: data.lat, lng: data.lng}}
        zoom={7}
       >
            <MarkerF 
        position={{ lat:data.lat, lng:data.lng }}
        draggable={true}
        onDragEnd={(e)=>markerHandler(e)}
      />
      </GoogleMap>

                </div>
            </div>
        </div>
    </div>
  )
}