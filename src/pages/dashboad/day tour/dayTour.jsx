import React, { useEffect, useState } from 'react';
import './dayTour.css';
import axios from 'axios';
import Delete from './../../../assets/icons/delete.png'

export default function DayTour() {
    const[name,setName] = useState('')
  const[description,setDescription] = useState('')
  const[distance,setDistance]= useState(0)
  const[price,setPrice] = useState('')
  const[image,setImage] = useState('')
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
  
  console.log(selectedPlaces);
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
    formData.append('price', price);
    formData.append('file', image);
    formData.append('startDescription', startDescription);
    // formData.append('places', selectedPlaces);
    // Loop through the files and append them to the formData
    selectedPlaces.forEach((place, index) => {
      formData.append(`places[${index}][place]`, place.placeid);
      formData.append(`places[${index}][placeDescription]`, place.placeDescription);

    // formData.append('places[]', place.placename);
    });
  
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/daytour/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res.data)
    if (res.data.status === 200) {
      alert("category added successfully");
      setDescription('')
      setDistance('')
      setImage('')
      setName('')
      setPrice('')
      setPlaceInput('')
      setSelectedPlaces([])
    
    }else if (res.data.status === 400){
      alert("plese fill required fields");
    }else if (res.data.status === 500){
      alert("internal server error");
    }
  }
  return (  
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
                <label>price</label>
                <input type='text'  className='daytour-input' value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
            <div className='daytour-form-div'>
                <label>image</label>
                <input type='file'   className='daytour-input'  onChange={(e)=>setImage(e.target.files[0])} />
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
            </div>
            <button className='day-tour-add-btn' onClick={Add}>ADD</button>
        </div>
        
    </div>
  )
}
