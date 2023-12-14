import React, { useEffect, useState } from 'react';
import './tourCategory.css';
import axios from 'axios';
import Delete from './../../../assets/icons/delete.png'

import TcEdite from '../edite tour category/tcEdite';




export default function TourCategory() {
  const[data,setData] = useState({
    name:'',
    description:'',
    img:'',
  })

  const[searchdata,setSearchdata] = useState([])
  const SearchHandler =async (e) =>{
    console.log(e.target.value)
    if(e.target.value){
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/toursSearch/${e.target.value}`);
      console.log(res.data)
      setSearchdata(res.data.data)

    }
    
  }


  const[selectTours, setSelectTours] = useState([])
  const SelectTour =(tourId, tour)=>()=>{
    console.log(tourId, tour)
    const newSelectTours = [...selectTours]
    newSelectTours.push({tour:tour, tourId:tourId})
    setSelectTours(newSelectTours)

  }
 

  const changeHandler =(e) =>{
    setData({...data,[e.target.id]:e.target.value})
  }
  const fileHandler =(e) =>{
    setData({...data,[e.target.id]:e.target.files[0]})
  }

  const AddHandler =async ()=>{
    console.log(data)
    // console.log(selectTours)
    const formData = new FormData();
    formData.append('TourCategory', data.name);
    formData.append('Description', data.description);
    formData.append('file', data.img);
    selectTours.forEach((tour,index)=>{
      formData.append('Tours[]', tour.tourId);
    
    })
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        window.alert("tour category added successful!");
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
        window.alert("tour category added unsuccessful!");
      }
    }
    
  }

  const deleteHandler =(index) =>{
    return ()=>{
      const newSelectTours = [...selectTours]
      newSelectTours.splice(index, 1)
      setSelectTours(newSelectTours)
    }
  }
  return (
    <div className="tourCategory">
      <h1>TOUR CATEGORY</h1>
      <div className='tourcategory-line'></div>
      
      <div className='tourcategory-sub'>
      

      <div>
      <div className='tourcategory-form'>
          <label>name:</label>
          <input type="text" id='name' onChange={(e)=>changeHandler(e)}/>
        </div>
        <div className='tourcategory-form'>
          <label>description:</label>
          <textarea type="text" id='description' onChange={(e)=>changeHandler(e)} />
        </div>
        <div className='tourcategory-form'>
          <label>img:</label>
          <input type="file" id='img' onChange={(e)=>fileHandler(e)}/>
        </div>

        <h2>add tours</h2>
        <div className='tourcategory-form'>
          <label>search tour:</label>
          <input type="text" onChange={(e)=>SearchHandler(e)}/>
        </div>
        
        <div className='tourcategory-result-div'>
          {searchdata.length > 0 ? searchdata.map((item,index)=>{
            return(
              <div className='tourcategory-search-result'>
                <a key={index} onClick={SelectTour(item.tour_id, item.tour_name)}>{item.tour_name}</a>
              </div>
            )
          }
          ) : <p className='tourcategory-p1'>no tour</p>
          }
        </div>

        <h2>selected tours</h2>
        <div className='tourcategory-tour-div'>
          {selectTours.length > 0 ? selectTours.map((item,index)=>{
            return(
              <div className='tourcategory-select-result'>
                <a key={index}>{item.tour}</a><img src={Delete} onClick={deleteHandler(index)} alt="delete" className='tourcategory-delete-img' />
              </div>
            )
          
          }
          ) : <p className='tourcategory-p1'>no tour selected</p>
          }
        </div>

      </div>
      <button className='tourcategory-add-button' onClick={AddHandler}>Add</button>
       
      </div>


      <TcEdite/>
      
    </div>

  )
}
