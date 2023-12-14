import React, { useEffect, useState } from 'react';
import './tourEdite.css';
import axios from 'axios';

export default function TourEdite() {
    const[tours,setTours] = useState([])

    const[length,setLength] = useState(0)

    const[id,setId] = useState('');
    const[name,setName] = useState('');
    const[description,setDescription] = useState('');
    const[image,setImage] = useState('');

    const[price,setPrice] = useState('');
    const[distance,setDistance] = useState('');
    const[startDescription,setStartDescription] = useState('');

    const[newImg, setNewImg] = useState('');

    const[dayData,setDayData] = useState([])

    const[selectedDay,setSelectedDay]= useState(1)


    const TourSearch = async(e) => {
        if(e.target.value){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/toursSearch/${e.target.value}`)
        console.log(res.data.data);
        setTours(res.data.data)

        }
        
    }

    const TourSelectHandler = (tourId) => async () => {
        try {


            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour/${tourId}`);
            // console.log(res.data);
            setId(res.data[0].tour_id);
            setName(res.data[0].tour_name);
            setDescription(res.data[0].tour_description);
            setImage(res.data[0].tour_img);
            setPrice(res.data[0].tour_price);
            setDistance(res.data[0].distance);
            setLength(res.data.length);

            const newData = res.data.map((day) => ({
                day: day.tour_date,
                dateId: day.tour_date_id,
                day_sartDescription: day.start_description,
                luxury_hotel: day.luxary_hotel,
                semi_hotel: day.semi_hotel,
                places: [],
            }));
            setDayData(newData);
            // console.log(dayData)
            if(res.data.length===dayData.length){
                GetPlaces();
                console.log('get places called!!!')
            }

        } catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };
    

//get placess according to date
const GetPlaces = async () => {
    dayData.forEach(async (day,Index) => {
        console.log(day)
        try {            
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour_places/${day.dateId}`);
            console.log(res.data);
            res.data.forEach((place, index) => {
                const newdata = [...dayData];                
                newdata[Index].places.push(place)
                setDayData(newdata);
            });
        }catch(error){
            console.log(error)
        }
    })
}

const PlaceDelete =(index)=>()=>{
    // console.log(index,selectedDay-1)
    const newdata = [...dayData]
    // console.log(newdata)
    newdata[selectedDay-1].places.splice(index,1)
    setDayData(newdata)
}
       
const UpdateTour = async () => {
    // console.log(dayData)
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('distance', distance);
    
    formData.append('file', newImg);
    dayData.forEach((day, index) => {
        formData.append(`dayData[${index}][day]`, day.day);
        formData.append(`dayData[${index}][dateId]`, day.dateId);
        formData.append(`dayData[${index}][day_sartDescription]`, day.day_sartDescription);
        formData.append(`dayData[${index}][luxury_hotel]`, day.luxury_hotel);
        formData.append(`dayData[${index}][semi_hotel]`, day.semi_hotel);
    
        day.places.forEach((place, placeIndex) => {
            formData.append(`dayData[${index}][places][${placeIndex}][place_name]`, place.place_name);
            formData.append(`dayData[${index}][places][${placeIndex}][place_id]`, place.place_id);
            formData.append(`dayData[${index}][places][${placeIndex}][tour_place_description]`, place.tour_place_description);
            // Add other place properties as needed
        });
    });
    

    // console.log([...formData])
    try {
        const token = sessionStorage.getItem("token");
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tour/tourupdate/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `${token}`,
            },
          });
      
          if (res.status === 200) {
            window.alert("Place added successfully");
           
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

const DeleteTour = async () => {
    
    
    try {
        const token = sessionStorage.getItem("token");
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tour/tourdelete/${id}`,{
            headers: {
              'Authorization': `${token}`,
            },
            withCredentials: true,
          })
          if (res.status === 200) {
            window.alert("update successfully");
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
    <div className='tour-edite'>
        <h1 className='tour-edite-title'>Tour Edite</h1>
        <div className='tour-edite-line'></div>


        <div className='tour-edite-search-div'>
            <input className='tour-edite-search-input' type="text" placeholder='search Tour' onChange={(e)=>TourSearch(e)}/>
            <div className='tour-edite-search-result-div'>
                {tours.length>0?tours.map((tour,index)=>{
                    return(<a className='tour-edite-search-result' key={index} onClick={TourSelectHandler(tour.tour_id)}>{tour.tour_name}</a>)
                    
                }):<p>no results</p>}
            </div>
        </div>



        <div className='tour-edite-form-div-main'>
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>name</label>
                <input className='tour-edite-form-input' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>description</label>
                <textarea className='tour-edite-form-input' type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>price</label>
                <input className='tour-edite-form-input' type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>distance</label>
                <input className='tour-edite-form-input' type="text" value={distance} onChange={(e)=>setDistance(e.target.value)}/>
            </div>
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>image</label>
                <input className='tour-edite-form-input' type="file"  onChange={(e)=>setNewImg(e.target.files[0])}/>
                {newImg ?
                    <img className='tour-edite-form-img' src={URL.createObjectURL(newImg)} alt="" />
                    :
                    <img className='tour-edite-form-img' src={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg/?file=${image}`} alt="" />
                    
                }
            </div>
          </div>



        <div className='tour-day-edite-form-div'>
        <div className='tour-day-edite-form-div-left'>
            {dayData.length>0?dayData.map((day,index)=>{
                return(
                    <a className={ day.day===selectedDay?'tour-day-edite-form-div-left-a-active':'tour-day-edite-form-div-left-a'} key={index} onClick={()=>setSelectedDay(day.day)}>Day {day.day}</a>
                )
            
            }):<p>no date</p>}
        </div>

        <div className='tour-day-edite-form-div-right'>
            
            <div className='tour-day-edite-form-div-right-form'>
                <label className='tour-day-edite-form-div-right-form-label'>day start description :</label>
                <textarea className='tour-day-edite-form-div-right-form-input' value={dayData.length>0?dayData[selectedDay-1].day_sartDescription:null} onChange={(e)=>
                    {
                        const newdata = [...dayData]
                        console.log(newdata)
                        newdata[selectedDay-1].day_sartDescription = e.target.value
                        setDayData(newdata)
                    }
                    
                    
                    
                    
                }></textarea>

                
            </div>
        {dayData.length>0?dayData[selectedDay-1].places.map((place,index)=>{
                return(
                    <div className='tour-day-edite-form-div-right-sub' key={index} >
                         
                         {/* <a>{place.place_id}</a> */}
                         <div className='tour-day-edite-form-div-right-form-1'>
                            <label className='tour-day-edite-form-div-right-form-label-1'>place:</label>
                            <input className='tour-day-edite-form-div-right-form-input-1' value={place.place_name} onChange={(e)=>{
                                const newdata = [...dayData]
                                newdata[selectedDay-1].places[index].place_name = e.target.value
                                setDayData(newdata)
                            
                            }}/>
                         </div>
                         <div className='tour-day-edite-form-div-right-form-1'>
                            <label className='tour-day-edite-form-div-right-form-label-1'>place description:</label>
                            <textarea  value={place.tour_place_description}
                                       onChange={(e) => {
                                            setDayData((prevData) => {
                                             const newdata = [...prevData];
                                            newdata[selectedDay - 1].places[index].tour_place_description = e.target.value;
                                            return newdata;
                                                });
                                                            }}    />
                            <a onClick={PlaceDelete(index)}>DELETE</a>

                         </div>
                         
                         
                         

                    </div>
                   
                )
            
            }):<p>no data</p>}
            
                        
                        
             
        </div>
            
            
             </div>
            <a className='touredite-update-btn' onClick={UpdateTour}>Update</a>
            <a className='touredite-delete-btn' onClick={DeleteTour}>Delete</a>
        



    </div>
  )
}
