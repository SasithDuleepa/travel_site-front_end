import React, { useEffect, useState } from 'react';
import './tcEdite.css';
import axios from 'axios';
import Delete_ from '../../../assets/icons/delete.png';


export default function TcEdite() {
    const[tcId,setTcId] = useState(null)

    const[name,setName] = useState('')
    const[description,setDescription] = useState('')
    const[image,setImage] = useState('')
    const[newImg, setNewImg] = useState(null)

    const[tours,setTours] = useState([])



    //get tour category
const[tourCategory, setTourCategory ] = useState([])
const TourCategory =async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/getall`);
    console.log(res.data);
    setTourCategory(res.data);
}
const TourCategorySearch = async(e) =>{
  if(e.target.value  !== ''){
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/search/${e.target.value}`);
      console.log(res.data);
      setTourCategory(res.data);
      
    } catch (error) {
      setTourCategory([])
    }

  }else{
    TourCategory();
  }
  
  
} 

useEffect(()=>{
    TourCategory()
},[])


const Category =async() =>{    
    if(tcId){
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/tourcategory/${tcId}`);
           
            setName(res.data[0].tourcategory_name)
            setDescription(res.data[0].tourcategory_description)
            setImage(res.data[0].tourcategory_img)
        } catch (error) {
            console.log(error);
        }
    }
    
}
useEffect(()=>{
    Category()
    Tours()
},[tcId])



const Tours =async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/tour/${tcId}`);
    console.log(res.data);
    setTours(res.data);
}


const DeleteHandler =(index)=>{
    console.log(tours[index])
    const data = [...tours]
    data.splice(index,1)
    setTours(data)
}

const[searchdata,setSearchdata] = useState([])
const SearchHandler =async (e) =>{
  console.log(e.target.value)
  if(e.target.value){
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/toursSearch/${e.target.value}`);
    console.log(res.data)
    setSearchdata(res.data.data)

  }
  
}


const UpdateHandler =async()=>{
    console.log(name,description,image,newImg,tours)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('id', tcId);
    formData.append('file', newImg);
    tours.forEach((tour,index)=>{
        formData.append('Tours[]', tour.tour_id);
      
      })
      try {
        const token = sessionStorage.getItem("token");
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/update/${tcId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      if (res.status === 200) {
        window.alert("tour category update successful!");
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
            window.alert("tour category update unsuccessful!");
          }
      }
      
}

const Delete =async()=>{
    
    try {
        const token = sessionStorage.getItem("token");
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/delete/${tcId}`, {
            headers: {
              'Authorization': `${token}`,
            },
            withCredentials: true,
          });
          if (res.status === 200) {
            window.alert("tour category delete successful!");
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
            window.alert("tour category delete unsuccessful!");
          }
    }
}
  return (
    <div className='TcEdite-main'>
        <h1>Edite Tour Category</h1>
        <div className='TcEdite'>
          <div className='TcEdite-search-div'>
            <input onChange={(e)=>TourCategorySearch(e)} placeholder='search tour category'/>

          </div>
          
            <div className='TcEdite-tours'>
                    {tourCategory.length>0 && tourCategory.map((tourcategory,index)=>{
                        return(
                            <div className='TcEdite-tour-results' key={index}>
                                <button className='TcEdite-tour-results-btn' onClick={()=>setTcId(tourcategory.tourcategory_id)}>{tourcategory.tourcategory_name}</button>

                            </div>
                        )
                    
                    }

                    )}

                
            </div>
            <div className='TcEdite-form-div'>
                    <div className='TcEdite-form'>
                        <label className='TcEdite-form-label'>category name:</label>
                        <input  className='TcEdite-form-input' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='TcEdite-form'>
                        <label className='TcEdite-form-label'>category description:</label>
                        <textarea  className='TcEdite-form-input' value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div className='TcEdite-img-form'>
                        
                        {newImg ? 
                        <img className='TcEdite-img' src={URL.createObjectURL(newImg)}/>
                        :
                        <img className='TcEdite-img' src={`${process.env.REACT_APP_BACKEND_URL}/tourcategory/img/?file=${image}`}/>
                        }
                        <input type="file"  onChange={(e)=>setNewImg(e.target.files[0])}/>
                    </div>

                    <div  className='TcEdite-tour-div'>
                        {tours.length>0 && tours.map((tour,index)=>{
                            return(
                                <div className='TcEdite-tour' key={index}>
                                    <a>{tour.tour_name}</a>
                                    <img className='TcEdite-tour-delete-img' onClick={()=>DeleteHandler(index)} src={Delete_} alt="delete" />

                                </div>
                            )
                        
                        
                        })}
                    </div>


                    <div>
                      <label>add tours : </label>
                      <input placeholder='search tour' type="text" onChange={(e)=>SearchHandler(e)}/>
                      <div className='TcEdite-search-result'>
                        {searchdata.length>0 && searchdata.map((item,index)=>{
                            return(
                                <div className='TcEdite-search-result-div' key={index}>
                                    <a onClick={()=>
                                        {
                                            const data = [...tours]
                                            data.push({tour_id:item.tour_id,tour_name:item.tour_name})
                                            setTours(data)
                                        }
                                        
                                        }
                                        
                                        
                                        
                                        key={index}
                                        >{item.tour_name}</a>

                                </div>
                            )
                        })}
                      </div>
                    </div>
                </div>
                <div className='TcEdite-btn-div'>
                <a className='TcEdite-btn-div-update' onClick={UpdateHandler}>Update</a>
                <a className='TcEdite-btn-div-delete' onClick={Delete}>delete</a>
                </div>

                

        </div>
    </div>
  )
}
