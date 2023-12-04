import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './daytourEdite.css'


export default function DaytourEdite() {
    const[id,setId] = useState("");
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[distance,setDistance] = useState("");
    const[price,setPrice] = useState("");
    const[currentImg, setCurrentImg] = useState("");
    const[image, setImage] = useState(null);
    const[startDescription, setStartDescription]= useState('')

    const[daytours,setDaytours] = useState([]);
    const[places,setPlaces] = useState([]);

    const[allPlaces,setAllPlaces] = useState([]);

    const SearchAllHandler = async() =>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytours`);
            // console.log(res.data)
            setDaytours(res.data);
        } catch (error) {
            console.log(error);
        }
        ;
    }
    useEffect(()=>{
        SearchAllHandler()
    },[])

    const GetAllPlaces = async() =>{
        const res = await axios.get('http://localhost:8080/places/all');
        // console.log(res.data)
        setAllPlaces(res.data.data);
    }
    useEffect(() => {
        GetAllPlaces();
    }, []);

    const searchHandler =(id)=> async() =>{
        
        GetPlaces(id)
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytour/${id}`);

            // console.log(res.data[0])
            setId(res.data[0].day_tour_id)
            setName(res.data[0].day_tour)
            setDescription(res.data[0].description)
            setDistance(res.data[0].distance)
            setPrice(res.data[0].price)
            setCurrentImg(res.data[0].img)
            setStartDescription(res.data[0].start_description)

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
    const AddPlaceHandler = () => {
        setPlaces([...places, { place_id: '', description: '' }]);
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
    formData.append('price', price);
    formData.append('currentImg', currentImg);
    formData.append('file', image);
    formData.append('startDescription', startDescription); 
    places.forEach((place, index) => {
        formData.append(`places[${index}][place]`, place.place_id);
        formData.append(`places[${index}][placeDescription]`, place.description);
     });
     console.log(currentImg)
     console.log([...formData])
     try {
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/daytour/update/${id}`, formData);
        console.log(res.data)
     } catch (error) {
        console.log(error);
     }
    }

  return (
    <div className='daytouredite'>
        <h1>Day Tour Update</h1>

        <input type="text" placeholder='search day tour' />

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
                <input className='daytouredite-form-input' type="text" value={distance} onChange={(e)=>setDistance(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Price</label>
                <input className='daytouredite-form-input' type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Image</label>
                <input className='daytouredite-form-input' type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                {image ? <img src={URL.createObjectURL(image)} alt="" />
                :<img src={`http://localhost:8080/daytour/daytourimg?file=${currentImg}`} alt="" />}
      
            </div>
            <div className='daytouredite-form'>
                <label className='daytouredite-form-label'>Start Description</label>
                <textarea className='daytouredite-form-input' type="text" value={startDescription} onChange={(e)=>setStartDescription(e.target.value)}/>
            </div>
        </div>

        <div>
            {places.length>0 && places.map((place,index)=>(
                <div key={index}>
                    <p>{place.place_name}</p>
                    <select  onChange={(e)=>PlaceHandler(index,e)}>
                        <option value="">Select Place</option>
                        {allPlaces.length>0 && allPlaces.map((place)=>(
                            <option  value={place.place_id}>{place.place_name}</option>
                        ))}
                
                    </select>
                    <textarea value={place.description} onChange={(e)=>infoHandler(index,e)}></textarea>
                    <a onClick={PlaceDeleteHandler(index)}>DELETE</a>
                </div>
                ))}

                <a onClick={AddPlaceHandler}>Add</a>
        </div>







        <button onClick={UpdateHandler}>Update</button>

    </div>
  )
}
