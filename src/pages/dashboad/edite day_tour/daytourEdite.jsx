import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './daytourEdite.css'


export default function DaytourEdite() {
    const[id,setId] = useState("");
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[distance,setDistance] = useState("");
    const[organizingCost , setOrganizingCost] = useState(0);
    const[price,setPrice] = useState("");
    const[currentImg, setCurrentImg] = useState("");
    const[image, setImage] = useState(null);
    const[currentCoverImg, setCurrentCoverImg] = useState('')
    const[coverImg, setCoverImg] = useState(null);
    const[homeImg,setHomeImg] = useState(null);
    const[currentHomeImg, setCurrentHomeImg] = useState(null)
    
    const[startDescription, setStartDescription]= useState('')

    const[daytours,setDaytours] = useState([]);
    const[places,setPlaces] = useState([]);

    const[allPlaces,setAllPlaces] = useState([]);

    const SearchAllHandler = async() =>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytours`);
            console.log(res.data)
            setDaytours(res.data);
        } catch (error) {
            console.log(error);
        }
        ;
    }

    const TourSearchHandler =async (e) =>{
        console.log(e.target.value)
        if(e.target.value){
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/Search/${e.target.value}`);
          console.log(res.data)
          setDaytours(res.data.data)
      
        }else{
            SearchAllHandler()
        }
        
      }

    
    useEffect(()=>{
        SearchAllHandler()
    },[])

    const GetAllPlaces = async() =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/all`);
        // console.log(res.data)
        setAllPlaces(res.data.data);
    }
        //search bar
const SearchHandler =async(e)=>{
    console.log(e.target.value);
    if(e.target.value!==""){
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`)
      // console.log(res.data.data);
      setAllPlaces(res.data.data)
    }else{
        GetAllPlaces()
    }
  }


    const searchHandler =(id)=> async() =>{
        
        GetPlaces(id)
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytour/${id}`);

            // console.log(res.data[0])
            setId(res.data[0].day_tour_id)
            setName(res.data[0].day_tour)
            setDescription(res.data[0].description)
            setDistance(res.data[0].distance)
            setOrganizingCost(res.data[0].organizing_cost)
            setPrice(res.data[0].price)
            setCurrentImg(res.data[0].img)
            setStartDescription(res.data[0].start_description)
            setCurrentCoverImg(res.data[0].cover_img)
            setCurrentHomeImg(res.data[0].home_img)

        } catch (error) {
            console.log(error);
        }
    }

    const GetPlaces = async(id) =>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/place/${id}`);
            console.log(res.data)
            setPlaces(res.data);

        } catch (error) {
            console.log(error);
        }
        ;
    
    }

  

    const PlaceDeleteHandler =(index)=> async() =>{
        const newPlaces = [...places];
        newPlaces.splice(index, 1);
        setPlaces(newPlaces);
    

    }
    const AddPlaceHandler = (place,id) => {
        setPlaces([...places, { place_id: id,place_name: place, description: '' }]);
      }

      const PlaceHandler = (index, e) => {
        const selectedValue = e.target.value;
        const selectedPlace = allPlaces.find(place => place.place_id === selectedValue);
      
        const newdata = [...places];
        newdata[index] = {
          ...newdata[index],
          place_id: selectedPlace.place_id,
          place_name: selectedPlace.place_name,
        };
      
        setPlaces(newdata);
      };

      const infoHandler = (index, e) => {
        const newdata = [...places];
        newdata[index] = {
          ...newdata[index],
          description: e.target.value,
        };
      
        setPlaces(newdata);
      }
      

    const UpdateHandler = async() =>{
        const formData = new FormData();
    formData.append('daytour', name);
    formData.append('description', description);
    formData.append('distance', distance);
    formData.append('organizingCost', organizingCost);
    formData.append('price', price);
    formData.append('currentImg', currentImg);
    formData.append('file', image);
    formData.append('currentCoverImg', currentCoverImg);
    formData.append('coverImg', coverImg);
    formData.append('homeImg', homeImg);
    formData.append('currentHomeImg', currentHomeImg);
    formData.append('startDescription', startDescription); 
    places.forEach((place, index) => {
        formData.append(`places[${index}][place]`, place.place_id);
        formData.append(`places[${index}][placeDescription]`, place.description);
     });

     try {
        const token = sessionStorage.getItem("token");
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/daytour/update/${id}`, formData,{
            headers: {
             'Content-Type': 'multipart/form-data',
              'Authorization': `${token}`,
            },
            withCredentials: true,
          });
        console.log(res.data)
        if (res.status === 200) {
            window.alert("day tour updated successfully");

            setId("")
            setName('')
            setDescription('')
            setDistance('')
            setOrganizingCost(0)
            setPrice('')
            setCurrentImg('')
            setImage(null)
            setCurrentCoverImg('')
            setCoverImg(null)
            setStartDescription('')
            setPlaces([])
            setCurrentHomeImg('')
            setHomeImg(null)
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


    const DeleteHandler = async() =>{
        try {
            const token = sessionStorage.getItem("token");
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/daytour/delete/${id}`, {
                headers: {
                  'Authorization': `${token}`,
                },
                withCredentials: true,
              });
            console.log(res.data)
            if(res.status === 200){
                window.alert("day tour deleted successfully");
                window.location.reload()
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
    
    <div  className='daytouredite-main'>
        <h1>Day Tour Update</h1>

<div className='daytouredite'>
        

        <input type="text" placeholder='search day tour' onChange={(e)=>TourSearchHandler(e)}/>

        <div  className='daytouredite-result'>
            {daytours.length>0 && daytours.map((daytour)=>(
                <a key={daytour._id} onClick={searchHandler(daytour.day_tour_id)}>{daytour.day_tour}</a>
                    ))}
        </div>

        <div className='daytouredite-form-div'>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Day Tour</label>
                <input className='daytouredite-form-input' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Description</label>
                <input className='daytouredite-form-input' type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Distance</label>
                <input className='daytouredite-form-input' type="number" value={distance} onChange={(e)=>setDistance(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Organizing Cost : </label>
                <input className='daytouredite-form-input' type="number" value={organizingCost} onChange={(e)=>setOrganizingCost(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Price</label>
                <input className='daytouredite-form-input' type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>card Image</label>
                <input className='daytouredite-form-input' type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                {image ? <img src={URL.createObjectURL(image)} alt="" />
                :<img src={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${currentImg}`} alt="" />}
      
            </div>


            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>cover Image</label>
                <input className='daytouredite-form-input' type="file" onChange={(e)=>setCoverImg(e.target.files[0])}/>
                {coverImg ? <img src={URL.createObjectURL(coverImg)} alt="" />
                :<img src={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${currentCoverImg}`} alt="" />}
      
            </div>

            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>home Image</label>
                <input className='daytouredite-form-input' type="file" onChange={(e)=>setHomeImg(e.target.files[0])}/>
                {homeImg ? <img src={URL.createObjectURL(homeImg)} alt="" />
                :<img src={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${currentHomeImg}`} alt="" />}
      
            </div>


            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Start Description</label>
                <textarea className='daytouredite-form-input' type="text" value={startDescription} onChange={(e)=>setStartDescription(e.target.value)}/>
            </div>
        </div>

        <div className='daytouredite-places-form-div'>
            {places.length>0 && places.map((place,index)=>(
                <div key={index}  className='daytouredite-places-form'>
                    <p className='daytouredite-places-form-place'>{place.place_name}</p>
                    {/* <select  onChange={(e)=>PlaceHandler(index,e)}>
                        <option value="">Select Place</option>
                        {allPlaces.length>0 && allPlaces.map((place)=>(
                            <option  value={place.place_id}>{place.place_name}</option>
                        ))}
                
                    </select> */}
                    <textarea className='daytouredite-places-form-info' value={place.description} onChange={(e)=>infoHandler(index,e)}></textarea>
                    <a className='daytouredite-places-form-btn' onClick={PlaceDeleteHandler(index)}>DELETE</a>
                </div>

                ))}

                <div className='daytouredite-places-form-div-search'>
                    <input onChange={(e)=>SearchHandler(e)} />
                    <div className='daytouredite-places-form-div-search-results'>
                        {allPlaces.map((place,index)=>{
                            return(
                                <a onClick={()=>AddPlaceHandler(place.place_name,place.place_name)}>{place.place_name}</a>

                            )
                            

                        })}
                    </div>
                </div>

                {/* <a onClick={AddPlaceHandler}>add</a> */}
                

              
        </div>







        <button className='daytouredite-update-btn' onClick={UpdateHandler}>Update</button>
        <a onClick={DeleteHandler} className='daytouredite-delete-btn'>delete</a>

    </div>
    </div>
  )
}
