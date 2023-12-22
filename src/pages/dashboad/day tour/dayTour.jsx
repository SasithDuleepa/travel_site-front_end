import React, { useEffect, useState } from 'react';
import './dayTour.css';
import axios from 'axios';
import Delete from './../../../assets/icons/delete.png'

import DaytourEdite from '../edite day_tour/daytourEdite';

export default function DayTour() {
    const[name,setName] = useState('')
  const[description,setDescription] = useState('')
  const[distance,setDistance]= useState(0)
  const[oranizingCost,setOrganizingCost ] = useState(0)
  const[image,setImage] = useState('')
  const[coverImg, setCoverImg] = useState('')
  const[startDescription,setStartDescription] = useState('')

  //place input 
  const[placeInput, setPlaceInput] = useState('')

  //get places acc to input
  const[places, setPlaces] = useState([])
  const GetPlaces =async () =>{
    // console.log(placeInput)
    if(placeInput === ''){
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/null`)
    // console.log(res.data.data)
    setPlaces(res.data.data)
    }else{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${placeInput}`)
  
    setPlaces(res.data.data)
    }

    
  }
  useEffect(() => {
    GetPlaces()
  }
  , [placeInput])

  //selected places
const [selectedPlaces, setSelectedPlaces] = useState([ ]);

//place select
const SelectPlace = (placeId, placeName) => {
  console.log(selectedPlaces.length)
  if(selectedPlaces){
    setSelectedPlaces((prevData) => [
      ...prevData,
      {
        placeid: placeId,
        placename: placeName,
        placeDescription:""
      },
    ]);
  }else{
    setSelectedPlaces({
      placeid: placeId,
      placename: placeName,
      placeDescription:""
    });
  }
  

  setPlaces([])
};

///delete
const deletehandler = (index) => {
    return (e) => {
      selectedPlaces.splice(index, 1);
      setSelectedPlaces([...selectedPlaces]);
    };
  }

  //Add
const Add = async() =>{
    // console.log(name,description,image,selectedPlaces)
    const formData = new FormData();
    formData.append('daytour', name);
    formData.append('description', description);
    formData.append('distance', distance);
    formData.append('organizingcost', oranizingCost);
    formData.append('file', image);
    formData.append('coverImg', coverImg);
    formData.append('startDescription', startDescription);
    // formData.append('places', selectedPlaces);
    // Loop through the files and append them to the formData
    selectedPlaces.forEach((place, index) => {
      formData.append(`places[${index}][place]`, place.placeid);
      formData.append(`places[${index}][placeDescription]`, place.placeDescription);

    // formData.append('places[]', place.placename);
    });

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/daytour/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      console.log(res.data)
      if (res.status === 200) {
        alert("category added successfully");
        setDescription('')
        setDistance('')
        setImage('')
        setCoverImg('')
        setName('')

        setPlaceInput('')
        setSelectedPlaces([])
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
        window.alert("Error adding place");
      }
    }
  


  }
  return (  
    <>
    <div className='daytour'>
        <h1 className='daytour-header'>DAY TOUR</h1>
        <div className='daytour-line'></div>
        
        <div className='daytour-form-main-div'>
        
            <div className='daytour-form-div'>
                <label>day tour name</label>
                <input type='text'  className='daytour-input' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='daytour-form-div'>
                <label>description</label>
                <textarea type='text'    className='daytour-input' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className='daytour-form-div'>
                <label>distance</label>
                <input type='number'    className='daytour-input' value={distance} onChange={(e)=>setDistance(e.target.value)}/>
            </div>

            <div className='daytour-form-div'>
                <label>oranizing cost :</label>
                <input type='number'    className='daytour-input' value={oranizingCost} onChange={(e)=>setOrganizingCost(e.target.value)}/>
            </div>

            <div className='daytour-form-div'>
                <label>image</label>
                <input type='file'   className='daytour-input'  onChange={(e)=>setImage(e.target.files[0])} />
            </div>

            <div className='daytour-form-div'>
                <label> cover image</label>
                <input type='file'   className='daytour-input'  onChange={(e)=>setCoverImg(e.target.files[0])} />
            </div>

            <div className='daytour-form-div'>
                <label>places</label>
                <input type='text' className='daytour-input' value={placeInput} onChange={(e)=>{setPlaceInput(e.target.value)}}/>
                <div className='day-tour-search-result-div'>
                  {places.length>0 ?
                  <>
                  {places.map((item, index) => (
                                    <a className='day-tour-search-result' key={index} onClick={(e)=>SelectPlace(item.place_id,item.place_name)}>{item.place_name}</a>
                                  )
                                  )}
                  </>
                                  
                                  :
                                  <p className='day-tour-search-result-not' >no results to show</p>
                  }

                </div>
                <div>

                  <label>day start description</label>
                  <textarea type='text'  className='daytour-input-daystart' placeholder='day start description' onChange={(e)=>setStartDescription(e.target.value)}/>

                {selectedPlaces.length > 0?(
            selectedPlaces.map((item, index) => (
              <div className='tourcategory-add-place-list-div-sub'>
              <a key={index}>{item.placename}</a>
              <div className='tourcategory-add-place-list-bottom-div'>
                
                <textarea className='dat-tour-day-description' value={item.placeDescription}onChange={(e) => {
                                      const updatedSelectedPlaces = [...selectedPlaces];
                                      updatedSelectedPlaces[index] = {
                                      ...updatedSelectedPlaces[index],
                                      placeDescription: e.target.value,
                                                                     };
                                      setSelectedPlaces(updatedSelectedPlaces);
                                                   }}
                />
                <a><img className='detete-img-addcatergory' src={Delete} onClick={deletehandler(index)} /></a>
              </div>
              

              </div>
                
            ))
          ) : <p>no place</p>
          }
                </div>
                <p> last description should day end description</p>
            </div>
            <button className='day-tour-add-btn' onClick={Add}>ADD</button>
        </div>
        
    </div>
    <DaytourEdite/>
    </>
    
  )
}
