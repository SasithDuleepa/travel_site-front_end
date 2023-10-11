import React, { useState } from 'react';
import './addplace.css';

import { GoogleMap, useLoadScript, MarkerF  } from '@react-google-maps/api';

export default function Addplace() {
  const[data , setData] = useState({
    name:"",
    description:"",
    lat:6.947248052781988,
    lng:79.873046875
  })
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

    const AddData = () =>{
      console.log(data)
    }
    
  return (
    <div>
      <div>
        <div>
          <label>place name :</label>
          <input type="text" id='name' onChange={changeHandler} value={data.name} placeholder='place name'/>
        </div>
        <div>
          <label>place description:</label>
          <input type="text" id='description' onChange={changeHandler} value={data.description} placeholder='place description'/>
        </div>
        <div>
          <label>place lattitude  :</label>
          <input type="number" id='lat' onChange={changeNumValues} value={data.lat} placeholder='place lattitude'/>
        </div>
        <div>
          <label>place longitude   :</label>
          <input type="number" id='lng' onChange={changeNumValues} value={data.lng} placeholder='place longitude'/>
        </div>
        <button onClick={AddData}>Add Place</button>
      </div>
      <div>
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
  )
}


