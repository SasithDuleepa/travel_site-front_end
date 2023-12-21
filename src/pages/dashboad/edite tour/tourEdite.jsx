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
        tour_distance:'',
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

            // setData({
            //     tour_id: res.data[0].tour_id,
            //     tour_name: res.data[0].tour_name,
            //     tour_description: res.data[0].tour_description,
            //     tour_img: res.data[0].tour_img,
            //     tour_new_img: res.data[0].tour_new_img,
            //     tour_distance: res.data[0].distance,
            //     tour_dates: res.data.map((day) => ({
            //         tour_date: day.tour_date,
            //         tour_date_id: day.tour_date_id,
            //         start_description: day.start_description,
            //         luxary_hotel: day.luxary_hotel,
            //         luxary_hotel_id: day.luxary_hotel_id,
            //         semi_hotel: day.semi_hotel,
            //         semi_hotel_id: day.semi_hotel_id,
            //         places: res.data.map((place)=>({
            //             place_id: place.tour_places_id ,
            //             place_name: place.place_name ,
            //             place_description: place.tour_place_description,
            //         })),
            //     }))
            // });



            setData({
                tour_id: res.data[0].tour_id,
                tour_name: res.data[0].tour_name,
                tour_description: res.data[0].tour_description,
                tour_img: res.data[0].tour_img,
                tour_new_img: res.data[0].tour_new_img,
                tour_distance: res.data[0].distance,
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
            






            
            


         
            

            let newData = res.data.map((day) => (
                {
                day: day.tour_date,
                dateId: day.tour_date_id,
                day_sartDescription: day.start_description,
                luxury_hotel: day.luxary_hotel,
                luxury_hotel_id: day.luxary_hotel_id,
                semi_hotel: day.semi_hotel,
                semi_hotel_id: day.semi_hotel_id,
                places: [],
            }
            ));
            setId(res.data[0].tour_id);
            setName(res.data[0].tour_name);
            setDescription(res.data[0].tour_description);
            setImage(res.data[0].tour_img);
            setPrice(res.data[0].tour_price);
            setDistance(res.data[0].distance);
            setLength(res.data.length);
            setDayData(newData);
            console.log(Data)

                GetPlaces();
               


        } catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };
    

//get placess according to date
const GetPlaces = async () => {
    // console.log('get places called !!')

    dayData.slice(0,length).forEach(async (day,Index) => {
        

        try {            
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour_places/${day.dateId}`);
            // console.log(dayData);
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



//luxury hotels 

const LuxuryHandler =(e) =>{}
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

                }/>
                <p>5 star</p>
                <p>{dayData.length>0?dayData[selectedDay-1].luxury_hotel:null}</p>
                <p>3star/4star</p>
                <p>{dayData.length>0?dayData[selectedDay-1].semi_hotel:null}</p>

                <div>
            <label>5 star hotel :</label>
            <select className='' onChange={(e)=>{
                const newdata = [...dayData]
              newdata[selectedDay-1].luxury_hotel = e.target.value
              newdata[selectedDay-1].luxury_hotel_id = e.target.id
              setDayData(newdata)
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
            <select className='' onChange={(e)=>{
                const newdata = [...dayData]
              newdata[selectedDay-1].semi_hotel = e.target.value
              newdata[selectedDay-1].semi_hotel_id = e.target.id
              setDayData(newdata)
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
