import React, { useState } from 'react';
import './tours.css';
import axios from 'axios';
import Delete from '../../../assets/icons/delete.png'

export default function Tours()  {
  //head data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  
const [dayData, setDayData] =useState([
  {day:1 ,
    description:null,
   places:[]
  }
])


const[dayDataIndex, setDayDataIndex] = useState(0)

const[searchData, setSearchData] = useState([])

//add day
const AddDay =()=>{
  setDayData([...dayData,{day:dayData.length+1,places:[]}])
}


//set data index
const setDayDataIndexFunc =(index)=>()=>{
  // console.log(index);
  setDayDataIndex(index)
}

//search bar
const SearchHandler =async(e)=>{
  console.log(e.target.value);
  if(e.target.value!==""){
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`)
    // console.log(res.data.data);
    setSearchData(res.data.data)
  }else{
    setSearchData([])
  }
}


//add places to a day
const SelectPlace =(place_name,placeId)=>()=>{
  // console.log(place_name, placeId);
  const newDayData = [...dayData]
  newDayData[dayDataIndex].places.push({placeName:place_name,placeId:placeId})
  setDayData(newDayData)
  // console.log(newDayData[dayDataIndex].places)
  setSearchData([])

}


const DayDescription =(e)=>{
  
  const newDayData = [...dayData]
  newDayData[dayDataIndex].description = e.target.value
  setDayData(newDayData)
}
//delete place  
const DeletePlace =(index)=>()=>{
  const newDayData = [...dayData]
  newDayData[dayDataIndex].places.splice(index,1)
  setDayData(newDayData)
  
  
}

const Submit =async()=>{
 
  const formData = new FormData();
  formData.append('packageName', name);
  formData.append('description', description);
  formData.append('file', image);
  formData.append('price', price);
  formData.append('dayData', JSON.stringify(dayData));

  const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tourpackage/addTourCategory`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(res.data)
}





return (
  <div className='dashboard-tour'>
    <h1>TOUR</h1>
    <div className='dashboard-tour-underline'></div>
      <div className='dashboard-tour-sub'>
    <div className='tour-package-main-1'>
      <div className='dashboard-tour-form'>
        <label>tour name:</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className='dashboard-tour-form'>
        <label>description:</label>
        <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/> 
      </div>
      <div className='dashboard-tour-form'>
        <label>image:</label>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div className='dashboard-tour-form'>
        <label>price:</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} />
      </div>
    </div>

    <div className='tour-package-main-2'>
      <div className='tour-package-days-div'>
        {dayData.map((item,index)=>{
          return(
            <a key={index} className={index===dayDataIndex ? 'day-active':'day'} onClick={setDayDataIndexFunc(index) }>day {index+1}</a>
          )
        })}
        
        <a className='day' onClick={AddDay} >
          add +
        </a>
      </div>
      <div className='tour-package-place-div'>
      <h2 className='tour-places-header2'>about day</h2>
      <div className='tour-places-day-description-div'>
          <label>day description</label>
          <textarea type="text" onChange={(e)=>DayDescription(e)} value={dayData[dayDataIndex].description}/>
        </div>
        <h2 className='tour-places-header2'>search places</h2>
        <div className='tour-package-search-div'>

        <div className='tour-package-place-search-div'>
          <label>place:</label>
          <input type="text" onChange={(e)=>SearchHandler(e)}/>
          <div className='tour-package-place-results'>
          {searchData.map((place,index)=>{
          return(
              <a className='tour-package-place-result' key={index} onClick={SelectPlace(place.place_name,place.place_id)}>{place.place_name}</a>
          )
          })}
          </div>
        </div>

        <div className='tour-package-place-search-div'>
          <label>category:</label>
          <input type="text" />
          
        </div>

        </div>
        
        

        <h2  className='tour-places-header2'>selected places</h2>
        {dayData[dayDataIndex].places.map((item,index)=>{
          return(
            <div className='day-tour-place-div'>
              <a key={index}>{item.placeName}</a><img src={Delete} className='place-delete-img' onClick={DeletePlace(index)}/>
            </div>
        )}
        )}
        
      </div>
    </div>
    <a className='tour-btn' onClick={Submit}>Add Tour</a>
  </div>

  </div>

);
}
