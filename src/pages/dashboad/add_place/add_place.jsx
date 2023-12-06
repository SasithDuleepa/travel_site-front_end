import React, { useState } from 'react';
import './add_place.css';
import axios from 'axios';
import { GoogleMap, useLoadScript, MarkerF  } from '@react-google-maps/api';
import Cookies from 'js-cookie';

import Delete from './../../../assets/icons/delete.png'

import EditePlace from '../edite place/editePlace';

    

export default function Add_place() {
    const[data , setData] = useState({
        name:"",
        description:"",
        short:"",
        time:'',
        fee:'',
        lat:6.947248052781988,
        lng:79.873046875,
        file:[]
      })
      const [cardImg, setCardImg] = useState([]);
      const [coverImgs, setCoverImgs] = useState([]);
      const Filehandler = (e) => {
        
        const selectedFile = e.target.files[0];
        setData({ ...data, file: [...data.file, selectedFile] });
    
      };

      // You can also create a function to remove a file from the array if needed
const removeFile =(index)=> (e) => {

  const updatedFiles = [...data.file];

  updatedFiles.splice(index, 1);
  // console.log(updatedFiles)
  setData({ ...data, file: updatedFiles });
  
};
    // map
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyA7qsYXATZC1Wj57plqEUhy_U7yHJjmNLM"});
    if (!isLoaded) return (
        <p>Loading...</p>
        )

        const markerHandler = (e) => {
            console.log(e.latLng.toJSON());
            setData({...data , lat:e.latLng.toJSON().lat , lng:e.latLng.toJSON().lng})
        }
    
    
        const changeHandler = (e) => {
            setData({...data , [e.target.id]:e.target.value})
        }
        const changeNumValues = (e) =>{
          
          setData({
            ...data, [e.target.id]:parseFloat(e.target.value)
          })
        }
    
        const AddData = async () => {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('description', data.description);
          formData.append('shortDescription', data.short);
          formData.append('time', data.time);
          formData.append('fee', data.fee);
          formData.append('lat', data.lat);
          formData.append('lng', data.lng);
          formData.append('cardImg', cardImg); 
          formData.append('coverImgs', coverImgs);
          
          // Loop through the files and append them to the formData
          data.file.forEach((file, index) => {
            formData.append('files', file);
          });
        
          // console.log(data);
        
          try {
            console.log([...formData]); 
            const token = Cookies.get('jwt');

            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/places/addplace`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
            });
        
            console.log(res.data);
            if (res.data.status === 200) {
              alert("Place added successfully");
              setData({
                name:"",
                description:"",
                time:'',
                fee:'',
                lat:6.947248052781988,
                lng:79.873046875,
                file:[]
              })
            }else if (res.data.status === 500) {
              alert("Internal Server Error");
            } else if (res.data.status === 400) {
              alert("Please fill in the required fields");
            }
          } catch (error) {
            // Handle Error
            if (error.status === 500) {
              alert("Internal Server Error");
            } else if (error.status === 400) {
              alert("Please fill in the required fields");
            }else if (error.status === 401) {
              alert("Unauthorized");
            }
          }
        };
        
  return (
    <>
    <div className='add-place'>
      <div className='add-place-sub'>
        <h1 className='header-Add_place'>ADD PLACE</h1>
        <div className='Add_place-line'></div>
        <div className="parent-Add_place">
            <div className="div1-Add_place">
                <div className='form-div-Add_place'>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Name:</label>
                        <input type='text' className='add_place_input' id='name' onChange={changeHandler} value={data.name} />
                    </div>
                    <div  className='Add_place-form-location-div'>
                        <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>lat:</label>
                        <input type='text'  className='add_place_input-location' id='lat' onChange={changeNumValues} value={data.lat} />
                        </div>
                        <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>lng:</label>
                        <input type='text' className='add_place_input-location' id='lng' onChange={changeNumValues} value={data.lng}  />
                    </div>
                    </div>
                    <div >
                      <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Place visit time Duration:</label>
                        <input type='text'  className='add_place_input' id='time' onChange={changeHandler} value={data.time} />
                      </div>
                      <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Place visiting fee:</label>
                        <input type='text'  className='add_place_input' id='fee' onChange={changeHandler} value={data.fee} />
                      </div>
                        
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Description:</label>
                        <textarea type='text' className='add_place_input-description' id='description' onChange={changeHandler} value={data.description} />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Short Description:</label>
                        <textarea type='text' className='add_place_input-description' id='short' onChange={changeHandler} value={data.short} />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Card Image:</label>
                        <input type='file' className='add_place_input'  onChange={(e)=>setCardImg(e.target.files[0])}  />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Cover Image:</label>
                        <input type='file' className='add_place_input'  onChange={(e)=>setCoverImgs(e.target.files[0])}  />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label className='Add_place-form-sub-div-label'>Images:</label>
                        <input type='file' placeholder='Upload' multiple={true} onChange={(e) => Filehandler(e)} className='add_place_input' />

                        {data.file.length > 0 ?
                            data.file.map((file, index) => (
                                <div className='Add_place-img-list-div' key={index}>
                                    <p>{file.name}</p>
                                    <a onClick={removeFile(index)}><img className='Add_place-img-list-delete-img' src={Delete} alt="" /></a>

                               </div>
                            )):null}
                           </div>
                    <div className='Add_place-form-sub-div'>
                        <button className='Add_place-form-sub-div-button' onClick={AddData}>Add Place</button>
                    </div>
                    
                </div>
            </div>
            <div className="div2-Add_place">
                <div className='Add_place-map-div'>
                <GoogleMap
        mapContainerClassName='map-container1'
        center={{lat: data.lat, lng: data.lng}}
        zoom={7}
       >
            <MarkerF 
        position={{ lat:data.lat, lng:data.lng }}
        draggable={true}
        onDragEnd={(e)=>markerHandler(e)}
      />
      </GoogleMap>

                </div>
            </div>
        </div>
        </div>

       
    
    </div>
     <EditePlace />
    </>
    
  )
}
