import React, { useState } from 'react';
import './tourpackages.css';
import axios from 'axios';
import Delete from '../../../assets/icons/delete.png'

export default function TourPackages() {
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
    console.log(dayData)
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
    console.log(res)
  }





  return (
    <div>
      <div>
        <div>
          <label>tour package name:</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
          <label>description:</label>
          <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/> 
        </div>
        <div>
          <label>image:</label>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
        </div>
        <div>
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
          <div>
            <label>place:</label>
            <input type="text" onChange={(e)=>SearchHandler(e)}/>
          </div>
          {searchData.map((place,index)=>{
            return(
              <div>
                <a key={index} onClick={SelectPlace(place.place_name,place.place_id)}>{place.place_name}</a>
              </div>
            )
          
          })}

          <h1>selected places</h1>
          {dayData[dayDataIndex].places.map((item,index)=>{
            return(
              <div className='day-tour-place-div'>
                <a key={index}>{item.placeName}</a><img src={Delete} className='place-delete-img' onClick={DeletePlace(index)}/>
              </div>
          )}
          )}
          <div>
            <label>day description</label>
            <input type="text" onChange={(e)=>DayDescription(e)} value={dayData[dayDataIndex].description}/>
          </div>
        </div>
      </div>
      <a onClick={Submit}>click</a>
    </div>
  );
}
