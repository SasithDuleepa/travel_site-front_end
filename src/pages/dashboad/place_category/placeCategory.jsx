import React, { useEffect, useState } from 'react';
import './placeCategory.css'
import axios from 'axios';


import Delete from './../../../assets/icons/delete.png'

export default function PlaceCategory() {
    const[name,setName] = useState('')
    const[description,setDescription] = useState('')
    const[image,setImage] = useState('')
  
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
      console.log(res.data.data)
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
        },
      ]);
    }else{
      setSelectedPlaces({
        placeid: placeId,
        placename: placeName,
      });
    }
    
    console.log(selectedPlaces);
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
    formData.append('category', name);
    formData.append('description', description);
    formData.append('file', image);
    // formData.append('places', selectedPlaces);
    // Loop through the files and append them to the formData
    selectedPlaces.forEach((place, index) => {
      formData.append('places[]', place.placeid);
    // formData.append('places[]', place.placename);
    });
    

    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/categories/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      if (res.status === 200) {
        alert("category added successfully");
        setDescription('')
        setImage('')
        setName('')
        setPlaceInput('')
        setSelectedPlaces([])
      
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
      <div className='placecategory'>
        <div className='placecategory__container'>
        <h1 className='placecategory__container-form-main-div-title'>Add Place Category</h1>
          <div className='placecategory__container-line'></div>
          
          <div className='placecategory__container-form-main-div'>
            <div>
            <div className='placecategory__container-form-div'>
            <label className='placecategory__container-form-label'>Catergory Name :</label>
            <input type="text"  className='placecategory-input' value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className='placecategory__container-form-div'>
            <label className='placecategory__container-form-label'>Description :</label>
            <textarea type="text"  className='placecategory-input' value={description} onChange={(e)=>setDescription(e.target.value)}/>
          </div>
          <div className='placecategory__container-form-div'>
            <label className='placecategory__container-form-label'>Image :</label>
            <input type="file" className='placecategory-input' onChange={(e)=>setImage(e.target.files[0])}/>
          </div>
  
          <div className='placecategory__container-form-div'>
            <label className='placecategory__container-form-label'>Add Places :</label>
            <input  placeholder='search place'className='placecategory-input' value={placeInput} onChange={(e)=>{setPlaceInput(e.target.value)}}/>
            <div className='placecategory-add-place-search-result-div'>
              {places.map((item, index) => (
                <a className='place-catergory-result' key={index} onClick={(e)=>SelectPlace(item.place_id,item.place_name)}>{item.place_name}</a>
              )
              )}
            </div>
            <div className='placecategory-add-place-list-div'>
            {selectedPlaces.length > 0?(
              selectedPlaces.map((item, index) => (
                <div className='placecategory-add-place-list-div-sub'><a key={index}>{item.placename}</a><a><img className='detete-img-addcatergory' src={Delete} onClick={deletehandler(index)} /></a></div>
                  
              ))
            ) : <p>no place</p>
            }
           
            </div>
            
           
          </div>
          
              
            </div>
          
            
  
  
          </div>
          <button className='placecategory__container-form-add-button' onClick={Add}>ADD</button>
        </div>
      </div>
    )
}
