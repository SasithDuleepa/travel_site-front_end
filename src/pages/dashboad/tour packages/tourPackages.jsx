import React, { useState } from 'react';
import './tourpackages.css';
import axios from 'axios';

export default function TourPackages() {
  const [dayData, setDayData] =useState([
    {day:1 ,
     places:[{
      placeName:"",
      placeId:""}]
    }
  ])

  const[dayDataIndex, setDayDataIndex] = useState(0)

  const[searchData, setSearchData] = useState([])

  //add day
  const AddDay =()=>{
    setDayData([...dayData,{day:dayData.length+1,places:[{placeName:null,placeId:null}]}])
  }


  //set data index
  const setDayDataIndexFunc =(index)=>()=>{
    console.log(index);
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
    console.log(place_name, placeId);
    const newDayData = [...dayData]
    newDayData[dayDataIndex].places.push({placeName:place_name,placeId:placeId})
    setDayData(newDayData)
    // console.log(newDayData[dayDataIndex].places)

  }


  return (
    <div>
      <div>
        <div>
          <label>tour package name:</label>
          <input type="text" />
        </div>
        <div>
          <label>description:</label>
          <input type="text" />
        </div>
        <div>
          <label>image:</label>
          <input type="text" />
        </div>
        <div>
          <label>price:</label>
          <input type="text" />
        </div>
      </div>

      <div className='tour-package-main-2'>
        <div className='tour-package-days-div'>
          {dayData.map((item,index)=>{
            return(
              <a className='day' onClick={setDayDataIndexFunc(index) }>day {index+1}</a>
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
                <a onClick={SelectPlace(place.place_name,place.place_id)}>{place.place_name}</a>
              </div>
            )
          
          })}

          <h1>selected places</h1>
          {dayData[dayDataIndex].places.map((item,index)=>{
            return(
              <div>
                <a>{item.placeName}</a>
              </div>
          )}
          )}
          
        </div>
      </div>
      <a >click</a>
    </div>
  );
}
