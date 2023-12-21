import React, { useEffect, useState } from 'react';
import './edite_hotel.css';
import axios from 'axios';

export default function Edite_hotel() {
    const[hotel,setHotel] = useState([])

    const[hotelData,setHotelData] = useState([])
    
    const[id,setId] = useState("")
    const[name,setName] = useState("")
    const[lat,setLat] = useState("")
    const[lang, setLang] = useState("")
    const[type, setType] = useState("5 star")

    const[prices, setPrice] = useState([
        // {
        //     start_date:'',
        //     end_date:'',
        //     price:''
        // }
    ])


    const GetHotelData = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/all`)
        // console.log(res.data)
        setHotel(res.data)
    }



    const SearchHandler = async(e)=>{
        
        if(e.target.value===""){
            GetHotelData()
        }else{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/search/${e.target.value}`)
            // console.log(res.data)
            setHotel(res.data)

        }
    }

    const SelectHotelHandler = async(id)=>{
        console.log(id)
        setId(id)
        setPrice([])
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/hotel/${id}`);
            console.log(res.data)
            setHotelData(res.data)
            if(res.data.length>0){
                setName(res.data[0].hotel_name)
                setLat(res.data[0].hotel_lat)
                setLang(res.data[0].hotel_lang)
                setType(res.data[0].hotel_category)
            }
        } catch (error) {
            
        }
    }

    const FormattedtDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };
    

    const DeletePrice = (index) =>{
        const newdata= [...hotelData]
        newdata.splice(index,1)
        setHotelData(newdata)
    
    }


    //add new prices
    const AddPrice = () =>{
        const newdata= [...prices]
        newdata.push({
            start_date:'',
            end_date:'',
            price:''
        })
        setPrice(newdata)
    
    
    }

    const PricesDelete = (index) =>{
        const newdata= [...prices]
        newdata.splice(index,1)
        setPrice(newdata)
    
    
    }

    const UpdateHandler = async() =>{
        console.log(type)
        try {
            const token = sessionStorage.getItem("token");
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/hotels/update/${id}`,{
                hotel_name:name,
                lat:lat,
                lang:lang,
                type:type,
                new_prices:prices,
                hotel_data:hotelData

            },{
                headers: {
                  'Authorization': `${token}`,
                },
              })
            if (res.status === 200) {
                window.alert("Place Update successfully");
                setId("")
                setName("")
                setLang("")
                setLat("")
                setPrice([])
                GetHotelData()
                setHotelData([])

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
                window.alert("Error updating place");
              }
        }



    }

    const DeleteHandler = async() =>{
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/hotels/delete/${id}`)
            if (res.status === 200) {
                window.alert("Place Deleted successfully");
                setId("")
                setName("")
                setLang("")
                setLat("")
                setType([])
                setPrice([])
                GetHotelData()
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
                window.alert("Error Deleting place");
              }
        }
    
    }

  return (
    <div className='edit-hotel-main'>
        <h1>Edit Hotel</h1>

        <div className='edit-hotel-search-div'>
            <input className='edit-hotel-search' type='text' onChange={(e)=>SearchHandler(e)} placeholder='search hotel'/>

        </div>

        <div className='edit-hotel-main-results-div'>
            {hotel.length>0?hotel.map((hotel,index)=>{
                return(
                        <button className='edit-hotel-main-results' key={index} onClick={()=>SelectHotelHandler(hotel.hotel_id)}>{hotel.hotel_name}</button>
                    
                )

            }):null}

        </div>

        <div  className='edit-hotel-form-div'>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel Name :</label>
                <input className='edit-hotel-form-input' type="text" value={name} onChange={(e)=>setName(e.target.value)}  />
            </div>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel lat :</label>
                <input className='edit-hotel-form-input' type="number" value={lat} onChange={(e)=>setLat(e.target.value)}    />
            </div>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel lang :</label>
                <input className='edit-hotel-form-input' type="number" value={lang} onChange={(e)=>setLang(e.target.value)}      />
            </div>
            <div className='edit-hotel-form'>
                <label className='edit-hotel-form-label'>Hotel Category :</label>
                <select onChange={(e)=>setType(e.target.value)}>
                <option value={type}>{type}</option>
                    <option value={'5 star'}>5 star</option>
                    <option value={'3 star/4 star'}>3 star/4 star</option>
                </select>
            </div>
        </div>


        <div className='edit-hotel-date-form-div'>
            {hotelData.length>0?hotelData.map((hotel,index)=>{
                return(
                    <div className='edit-hotel-date-form' key={index}>
                    <div className='edit-hotel-date-form-sub'>
                        <label>day start :</label>
                        <input className='edit-hotel-date-form-input' type="date"  value={FormattedtDate(hotel.start_date)} 
                        onChange={(e) => {
                                        const updatedHotelData = [...hotelData];
                                        updatedHotelData[index].start_date = e.target.value;
                                        setHotelData(updatedHotelData);
                                        }}
                                        />
                    </div>
                    <div className='edit-hotel-date-form-sub'>
                        <label>day end :</label>
                        <input className='edit-hotel-date-form-input' type="date" value={FormattedtDate(hotel.end_date)}  
                        onChange={(e) => {
                            const updatedHotelData = [...hotelData];
                            updatedHotelData[index].end_date = e.target.value;
                            setHotelData(updatedHotelData);
                            }}
                        />
                    </div>
                    <div className='edit-hotel-date-form-sub'>
                        <label>price :</label>
                        <input className='edit-hotel-date-form-input' type="number" value={hotel.price} 
                        onChange={(e) => {
                            const updatedHotelData = [...hotelData];
                            updatedHotelData[index].price = e.target.value;
                            setHotelData(updatedHotelData);
                            }}
                        />
                    </div>
                    <div className='edit-hotel-date-form-sub'>
                        <label>action :</label>
                        <button onClick={()=>DeletePrice(index)}>Delete</button>
                    </div>
    
                </div>
                )

            }):null}



            {prices.length>0?prices.map((price,index)=>{
                return(
                    <div className='edit-hotel-date-form-new' key={index}>
                <div className='edit-hotel-date-form-sub'>
                    <label>day start :</label>
                    <input className='edit-hotel-date-form-input' type="date" value={prices[index].start_date} onChange={
                        (e) => {
                            const updatedPrices = [...prices];
                            updatedPrices[index].start_date = e.target.value;
                            setPrice(updatedPrices);
                        }
                    
                    } />
                </div>
                <div className='edit-hotel-date-form-sub'>
                    <label>day end :</label>
                    <input className='edit-hotel-date-form-input' type="date"  value={prices[index].end_date} onChange={
                        (e) => {
                            const updatedPrices = [...prices];
                            updatedPrices[index].end_date = e.target.value;
                            setPrice(updatedPrices);
                        }
                    
                    
                    }/>
                </div>
                <div className='edit-hotel-date-form-sub'>
                    <label>price :</label>
                    <input className='edit-hotel-date-form-input' type="number"  value={prices[index].price} onChange={
                        (e) => {
                            const updatedPrices = [...prices];
                            updatedPrices[index].price = e.target.value;
                            setPrice(updatedPrices);
                        
                    }
                }/>
                </div>
                <div className='edit-hotel-date-form-sub'>
                    <label>action :</label>
                    <button onClick={()=>PricesDelete(index)}>Delete</button>
                </div>

            </div>

                )

            }):null}


            <button onClick={()=>AddPrice()}> Add price</button>





            

            <div className='edit-hotel-btn-div'>
                <button className='edit-hotel-btn-update' onClick={UpdateHandler}>update</button>
                <button className='edit-hotel-btn-delete' onClick={DeleteHandler}>delete</button>
            </div>
        </div>
    </div>
  )
}
