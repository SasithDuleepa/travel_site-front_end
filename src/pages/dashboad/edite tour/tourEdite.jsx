import React, { useEffect, useState } from 'react';
import './tourEdite.css';
import axios from 'axios';

export default function TourEdite() {
    const[tours,setTours] = useState([])

    const[length,setLength] = useState(0)

    const[id,setId] = useState('');


    const[dayData,setDayData] = useState([])

    const[selectedDay,setSelectedDay]= useState(1)


    const TourSearch = async(e) => {
        if(e.target.value){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/toursSearch/${e.target.value}`)
        // console.log(res.data.data);
        setTours(res.data.data)

        }
        
    }

    const[ Data, setData] =useState( {
        tour_id:'',
        tour_name:'',
        tour_description:'',
        tour_img:'',
        tour_new_img:'',
        tour_cover_img:'',
        tour_new_cover_img:'',
        tour_distance:'',
        tour_days:'',
        tour_dates:[{
            tour_date:'',
            tour_date_id:'',
            start_description:'',
            luxary_hotel:'',
            luxary_hotel_id:'',
            semi_hotel:'',
            semi_hotel_id:'',
            places:[{
                place_id:'',
                place_name:'',
                place_description:'',
            }],
        }],
    } )

    const TourSelectHandler = (tourId) => async () => {
        try {


            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour/${tourId}`);
            console.log(res.data)





            setData({
                tour_id: res.data[0].tour_id,
                tour_name: res.data[0].tour_name,
                tour_description: res.data[0].tour_description,
                tour_img: res.data[0].tour_img,
                tour_new_img: '',
                tour_cover_img: res.data[0].cover_img,
                tour_new_cover_img: '',
                tour_distance: res.data[0].distance,
                tour_days: res.data[0].days,
                tour_dates: res.data.reduce((acc, day) => {
                    const existingEntry = acc.find((entry) => entry.tour_date === day.tour_date);
            
                    if (!existingEntry) {
                        acc.push({
                            tour_date: day.tour_date,
                            tour_date_id: day.tour_date_id,
                            start_description: day.start_description,
                            luxary_hotel: day.luxary_hotel,
                            luxary_hotel_id: day.luxary_hotel_id,
                            semi_hotel: day.semi_hotel,
                            semi_hotel_id: day.semi_hotel_id,
                            places: res.data
                                .filter((place) => place.tour_date === day.tour_date)
                                .map((place) => ({
                                    place_id: place.tour_places_id,
                                    place_name: place.place_name,
                                    place_description: place.tour_place_description,
                                })),
                        });
                    }
            
                    return acc;
                }, []),
            });



        } catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };
    



const PlaceDelete =(index)=>()=>{

    const newdata = {...Data}
    newdata.tour_dates[selectedDay-1].places.splice(index,1)
    setData(newdata)
}
       
const UpdateTour = async () => {
  console.log(Data)
  const formData = new FormData();
  formData.append('id', Data.tour_id);
  formData.append('name', Data.tour_name);
  formData.append('description', Data.tour_description);
  formData.append('image', Data.tour_img);
  formData.append('new_image', Data.tour_new_img);
  formData.append('cover_image', Data.tour_cover_img);
  formData.append('new_cover_image', Data.tour_new_cover_img);
  formData.append('distance', Data.tour_distance);
  formData.append('days', Data.tour_days);
  
 
  Data.tour_dates.forEach((day, index) => {
    formData.append(`dayData[${index}][day]`, day.tour_date);
    formData.append(`dayData[${index}][dateId]`, day.tour_date_id);
    formData.append(`dayData[${index}][day_sartDescription]`, day.start_description);
    formData.append(`dayData[${index}][luxury_hotel]`, day.luxary_hotel);
    formData.append(`dayData[${index}][luxury_hotel_id]`, day.luxary_hotel_id);
    formData.append(`dayData[${index}][semi_hotel]`, day.semi_hotel);
    formData.append(`dayData[${index}][semi_hotel_id]`, day.semi_hotel_id);


day.places.forEach((place, placeIndex) => {
  formData.append(`dayData[${index}][places][${placeIndex}][place_name]`, place.place_name);
  formData.append(`dayData[${index}][places][${placeIndex}][place_id]`, place.place_id);
  formData.append(`dayData[${index}][places][${placeIndex}][tour_place_description]`, place.place_description);
  // Add other place properties as needed
});


});



     console.log([...formData])
    try {
        const token = sessionStorage.getItem("token");
        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tour/tourupdate/${Data.tour_id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `${token}`,
            },
          });
      
          if (res.status === 200) {
            window.alert("tour updated successfully");
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
            window.alert("Error updating tour");
          }
    }
}

//search bar

const [searchData,setSearchData] = useState([])
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

const DeleteTour = async () => {
    
    
    try {
        const token = sessionStorage.getItem("token");
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tour/tourdelete/${Data.tour_id}`,{
            headers: {
              'Authorization': `${token}`,
            },
            withCredentials: true,
          })
          if (res.status === 200) {
            window.alert("tour deleted successfully");
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
            window.alert("Error tour deleting");
            console.log(error)
          }
    }
}



    //get hotels
const[luxaryHotels,setLuxuryHotels] = useState([])
const GetLuxuryHotels = async()=>{
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/luxury`)
  // console.log(res.data)
  setLuxuryHotels(res.data)

}
const[semiluxuryHotels,setSemiluxuryHotels]  =useState([])
const GetSemiluxuryHotels = async() =>{
  const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/semi`)
  // console.log(res.data)
  setSemiluxuryHotels(res.data)
}
useEffect(()=>{
  GetLuxuryHotels()
  GetSemiluxuryHotels()
},[])








const AddDayHandler =()=>{
  const newdata = {...Data}
  newdata.tour_dates.push({
    tour_date: Data.tour_dates.length+1,
    tour_date_id: '',
    start_description: '',
    luxary_hotel: '',
    luxary_hotel_id: '',
    semi_hotel: '',
    semi_hotel_id: '',
    places: [],


})
  setData(newdata)
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
                <input className='tour-edite-form-input' type="text" value={Data.tour_name} 
                onChange={(e)=>{
                  const newdata = {...Data}
                  newdata.tour_name = e.target.value
                  setData(newdata)
                }}/>
            </div>
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>description</label>
                <textarea className='tour-edite-form-input' type="text" value={Data.tour_description} 
                onChange={(e)=>{
                  const newdata = {...Data}
                  newdata.tour_description = e.target.value
                  setData(newdata)
                }}/>
            </div>

            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>days</label>
                <input className='tour-edite-form-input' type="number" value={Data.tour_days} 
                onChange={(e)=>{
                  const newdata = {...Data}
                  newdata.tour_days = e.target.value
                  setData(newdata)
                }}/>
            </div>
            
            {/* <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>price</label>
                <input className='tour-edite-form-input' type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div> */}
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>distance</label>
                <input className='tour-edite-form-input' type="text" value={Data.tour_distance} 
                onChange={(e)=>{
                  const newdata = {...Data}
                  newdata.tour_distance = e.target.value
                  setData(newdata)
                
                }}/>
            </div>
            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>image</label>
                <input className='tour-edite-form-input' type="file"  onChange={(e)=>{
                  const newdata = {...Data}
                  newdata.tour_new_img = e.target.files[0]
                  setData(newdata)
                
                }}/>
                {Data.tour_new_img ?
                    <img className='tour-edite-form-img' src={URL.createObjectURL(Data.tour_new_img)} alt="" />
                    :
                    <img className='tour-edite-form-img' src={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg/?file=${Data.tour_img}`} alt="" />
                    
                }
            </div>


            <div className='tour-edite-form'>
                <label className='tour-edite-form-label'>cover image</label>
                <input className='tour-edite-form-input' type="file"  onChange={(e)=>{
                  const newdata = {...Data}
                  newdata.tour_new_cover_img = e.target.files[0]
                  setData(newdata)
                
                }}/>
                {Data.tour_new_cover_img ?
                    <img className='tour-edite-form-img' src={URL.createObjectURL(Data.tour_new_cover_img)} alt="" />
                    :
                    <img className='tour-edite-form-img' src={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg/?file=${Data.tour_cover_img}`} alt="" />
                    
                }
            </div>
          </div>



        <div className='tour-day-edite-form-div'>
        <div className='tour-day-edite-form-div-left'>
            {Data.tour_dates.length>0?Data.tour_dates.map((day,index)=>{
                return(
                    <a className={ day.tour_date===selectedDay?'tour-day-edite-form-div-left-a-active':'tour-day-edite-form-div-left-a'} key={index} onClick={()=>setSelectedDay(day.tour_date)}>Day {day.tour_date}</a>
                )
            
            }):<p>no date</p>}
            <button className='tour-day-edite-form-div-left-button' onClick={AddDayHandler}>Add Day</button>

        </div>

        <div className='tour-day-edite-form-div-right'>
            
            <div className='tour-day-edite-form-div-right-form'>
                <label className='tour-day-edite-form-div-right-form-label'>day start description :</label>
                <textarea className='tour-day-edite-form-div-right-form-input' value={Data.tour_dates.length>0?Data.tour_dates[selectedDay-1].start_description:null} onChange={(e)=>
                    {
                        const newdata = {...Data}
                        newdata.tour_dates[selectedDay-1].start_description = e.target.value
                        setData(newdata)
                    }

                }/>

                <div>
            <label>5 star hotel :</label>
            <select className='' value={Data.tour_dates.length>0?Data.tour_dates[selectedDay-1].luxary_hotel:null} onChange={(e)=>{
                const newdata = {...Data}
              newdata.tour_dates[selectedDay-1].luxary_hotel = e.target.value
              newdata.tour_dates[selectedDay-1].luxary_hotel_id = e.target.id
              setData(newdata)
            }}>
            <option>select hotel</option>
              {luxaryHotels.map((hotel,index)=>{
                return(
                  
                  <option key={index} id={hotel.hotel_id } value={hotel.hotel_name}>{hotel.hotel_name}</option>
                )
              
              })}

            </select>

          </div>



          <div>
            <label>3star/4star hotel :</label>
            <select className='' value={Data.tour_dates.length>0?Data.tour_dates[selectedDay-1].semi_hotel:null} onChange={(e)=>{
                const newdata = {...Data}
              newdata.tour_dates[selectedDay-1].semi_hotel = e.target.value
              newdata.tour_dates[selectedDay-1].semi_hotel_id = e.target.id
              setData(newdata)
            }}>
            <option>select hotel</option>
              {semiluxuryHotels.map((hotel,index)=>{
                return(
                  
                    <option key={index} id={hotel.hotel_id } value={hotel.hotel_name}>{hotel.hotel_name}</option>
                )
              
              })}

            </select>
          </div>

                
            </div>
        {Data.tour_dates.length>0?Data.tour_dates[selectedDay-1].places.map((place,index)=>{
                return(
                    <div className='tour-day-edite-form-div-right-sub' key={index} >
                         
                         {/* <a>{place.place_id}</a> */}
                         <div className='tour-day-edite-form-div-right-form-1'>
                            <label className='tour-day-edite-form-div-right-form-label-1'>place:</label>
                            <input className='tour-day-edite-form-div-right-form-input-1' value={place.place_name} onChange={(e)=>{
                                const newdata = [...Data]
                                newdata[selectedDay-1].places[index].place_name = e.target.value
                                setDayData(newdata)
                            
                            }}/>
                         </div>
                         <div className='tour-day-edite-form-div-right-form-1'>
                            <label className='tour-day-edite-form-div-right-form-label-1'>place description:</label>
                            <textarea  value={Data.tour_dates[selectedDay-1].places[index].place_description}
                                       onChange={(e) => {
                                        const newdata = {...Data}
                                        newdata.tour_dates[selectedDay-1].places[index].place_description = e.target.value
                                        setData(newdata)
                                                            }}
                                                                />
                            <a onClick={PlaceDelete(index)}>DELETE</a>

                         </div>
                         
                         
                         

                    </div>
                   
                )
            
            }):<p>no data</p>}
             <div className='touredite-update-day-place-select-div'>
              <label>select place</label>
              <input onChange={(e)=>SearchHandler(e)}/>
             </div>
             <div>
              {searchData.length>0?searchData.map((place,index)=>{
                return(
                  <div className='touredite-update-day-place-select-div-sub' key={index} >
                    <button onClick={
                      ()=>{
                        const newdata = {...Data}
                        newdata.tour_dates[selectedDay-1].places.push({
                          place_id:place.place_id,
                          place_name:place.place_name,
                          place_description:''})
                        setData(newdata)
                      }
                    }>{place.place_name}</button>
                  </div>
                )
              
              }):<p></p>}
             </div>
            
                        
                        
             
        </div>


       
            
            
             </div>
            <a className='touredite-update-btn' onClick={UpdateTour}>Update</a>
            <a className='touredite-delete-btn' onClick={DeleteTour}>Delete</a>
        



    </div>
  )
}
