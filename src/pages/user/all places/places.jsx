import React, { useEffect, useState } from 'react';
import './places.css';
import Axios from 'axios';

import Socialmedia from '../../../components/social media/socialmedia';

import PlaceCard from '../../../components/place card/placeCard';
export default function Places() {

    const[places,setPlaces] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage] = useState(8);
    
    const GetPlaces = async()=>{
        try {
            const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/all_prioritized`)
            // const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/all`)
            // console.log(res.data.data)
            setPlaces(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        GetPlaces()
    },[])

    const PlaceSearch = async(e) =>{
        try {
            const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`)
            // console.log(res.data.data)
            setPlaces(res.data.data)
        } catch (error) {
            console.log(error)
            GetPlaces()
        }
        
    }


     // Logic for pagination
     const indexOfLastPlace = currentPage * placesPerPage;
     const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
     const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);
 
     const paginate = (pageNumber) => setCurrentPage(pageNumber);


     const Style = {
        backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '424px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };
  return (
    <div className='Places'>
        <div style={Style}>
        <p  className='Places-main-title'>Places</p>
            <div className='Places-main-route'>
                <a className='Places-main-route-link' href='/'>Home /</a>
                <p className='Places-main-route_link '>places</p>
            </div>
            <div className='Places-main-media'>
                <Socialmedia/>

            </div>
        </div>

        <div className='Places-search-div'>
            <div  className='Places-search-div-main'>
                <input className='Places-search-div-input' type="text" placeholder='Search Place' onChange={(e)=>PlaceSearch(e)} />
                {/* <select className='Places-filter'>
                    <option>select category</option>
                </select> */}
            </div>
            
        </div>

        <div className='Places-places'>
                {currentPlaces.length > 0 && currentPlaces.map((place, index) => {
                    return (
                        <PlaceCard key={index} id={place.place_id} place={place.place_name} short={place.place_description} link={place.place_id} img={place.card_img} />
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="Places-pagination">
            <button></button>
                {Array.from({ length: Math.ceil(places.length / placesPerPage) }, (_, i) => (
                    <button className='Places-pagination-btn' key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
                    
                ))}
                <button onClick={()=>paginate(currentPage+1)}>{ }</button>
            </div>
        
    </div>
  )
}
