import React, { useEffect, useState } from 'react';
import './popularDestinations.css'
import axios from 'axios';
import Delete from './../../../assets/icons/delete.png'

export default function PopularDestinations() {

  const[selectedPlace,setSelectedPlace] = useState([])

  //get all popular destinations
  const[popularPlaces, setPopularPlaces] = useState([])
  const PopularDestinations =async () =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/popular/place`)
    setPopularPlaces(res.data)
  }

  //places search
 const[result,setResult] = useState([])
  const handleSearch =async (e) =>{
    if(e.target.value === ''){
      PopularDestinations()
    } else{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`)
    setResult(res.data.data)

    }

  }
  useEffect(()=>{
    PopularDestinations()
  },[])


  const SelectHandler =(place,place_id)=>async() =>{
    const newdata = [...selectedPlace]
    newdata.push({place_name:place,place_id:place_id})
    setSelectedPlace(newdata)
  }


  const AddHandler =async() =>{
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/popular/add`,selectedPlace, {
        headers: {
          'Authorization': `${token}`,
        },
        withCredentials: true,
      }) 
      if (res.status === 200) {
        window.alert("Popular places add successful!");
        setSelectedPlace([])
      }
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("please select place!");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Popular places add unsuccessful!");
      }
    }
  }
  const DeleteHandler =(index) =>{

    const newdata = [...popularPlaces]
    newdata.splice(index,1)
    setPopularPlaces(newdata)
  }
  const UpdateHandler =async() =>{
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/popular/update`,popularPlaces,{
        headers: {
          'Authorization': `${token}`,
        },
        withCredentials: true,
      }) 
      if (res.status === 200) {
        window.alert("popular places update successful!");
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
        window.alert("popular places update unsuccessful!");
      }
    }
  }
  return (
    <div className='PopularDestinations'>
        <h1 className='PopularDestinations-header'>Popular Destinations</h1>
        <div className='PopularDestinations-line'></div>
        <div className='PopularDestinations-form-div'>
            <div className='PopularDestinations-search-place'>
                <label className='PopularDestinations-search-place-label'>find place:</label>
                <input className='PopularDestinations-search-place-input'  onChange={(e)=>handleSearch(e)}/>
            </div>
            <div className='PopularDestinations-result-place'>
              {result.length >0 ? result.map((place, index)=>{
                return(
                  <div className='PopularDestinations-result-place-div' key={index}>
                    <a onClick={SelectHandler(place.place_name,place.place_id)}>{place.place_name}</a>
                  </div>
                )
              
              
              }
              ):
              <p>No Search Result</p>}
              

            </div>

            <div className='PopularDestinations-selected-div'>
                  {selectedPlace.length >0 ? selectedPlace.map((place, index)=>{
                    return(
                      <div className='PopularDestinations-result-place-div' key={index}>
                        <p>{place.place_name}</p>
                        <img className='dashboad-popular-delete-img' src={Delete} alt="delete" />
                      </div>
                    )
                  
                  
                  }
                  ):
                  <p>No Selected places</p>}


            </div>
            <button className='dashboad-popular-add-btn' onClick={AddHandler}>Add</button>

            <div className='PopularDestinations-update-div'>
              <h1>Available Popular Places</h1>
            {popularPlaces.length >0 ? popularPlaces.map((place, index)=>{
                return(
                  <div className='PopularDestinations-result-place-div' key={index}>
                    <p>{place.place_name}</p>
                    <img className='dashboad-popular-delete-img' src={Delete} alt="delete" onClick={()=>DeleteHandler(index)}/>
                  </div>
                )
              
              }
              ):
              <p>No result</p>
            }

            </div>
            <button className='dashboad-popular-delete-btn'  onClick={()=>UpdateHandler()}>Update</button>

        </div>
    </div>
  )
}
