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
    console.log(res.data)
    setPopularPlaces(res.data)
  }

  //places search
 const[result,setResult] = useState([])
  const handleSearch =async (e) =>{
    if(e.target.value === ''){
      PopularDestinations()
    } else{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`)
    console.log(res.data.data)
    setResult(res.data.data)

    }

  }
  useEffect(()=>{
    PopularDestinations()
  },[])


  const SelectHandler =(place,place_id)=>async() =>{
    console.log(place,place_id)
    const newdata = [...selectedPlace]
    newdata.push({place_name:place,place_id:place_id})
    setSelectedPlace(newdata)
  }
  return (
    <div className='PopularDestinations'>
        <h1 className='PopularDestinations-header'>Popular Destinations</h1>
        <div className='PopularDestinations-line'></div>
        <div className='PopularDestinations-form-div'>
            <div className='PopularDestinations-search-place'>
                <label>find place:</label>
                <input onChange={(e)=>handleSearch(e)}/>
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
              <p>No result</p>}
              

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
                  <p>No result</p>}


            </div>
            <button>Add</button>

            <div className='PopularDestinations-update-div'>
              <h1>update</h1>
            {popularPlaces.length >0 ? popularPlaces.map((place, index)=>{
                return(
                  <div className='PopularDestinations-result-place-div' key={index}>
                    <p>{place.place_name}</p>
                    <img className='dashboad-popular-delete-img' src={Delete} alt="delete" />
                  </div>
                )
              
              }
              ):
              <p>No result</p>
            }

            </div>
            <button>Update</button>

        </div>
    </div>
  )
}
