import React, { useEffect, useState } from 'react';
import './places.css';
import Axios from 'axios';


import Fb from '../../../assets/icons/facebook.png';
import Insta from '../../../assets/icons/instagram.png';    
import Twitter from '../../../assets/icons/twitter.png';

import PlaceCard from '../../../components/place card/placeCard';
export default function Places() {

    const[places,setPlaces] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage] = useState(8);
    
    const GetPlaces = async()=>{
        try {
            const res = await Axios.get('http://localhost:8080/places/all')
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
            const res = await Axios.get(`http://localhost:8080/places/placesearch/${e.target.value}`)
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
  return (
    <div className='Places'>
        <div className='Places-main'>
        <p  className='Places-main-title'>Places</p>
            <div className='Places-main-route'>
                <a className='Places-main-route-link' href='/'>Home /</a>
                <a className='Places-main-route_link '>places</a>
            </div>
            <div className='Places-main-media'>
                <div className='Places-main-media-main'>
                    <img className='Places-main-media-main-icon' src={Fb} />
                    <a className='Places-main-media-main-link'>Facebook</a>
                </div>
                <div className='Places-main-media-main'>
                    <img className='Places-main-media-main-icon' src={Insta} />
                    <a className='Places-main-media-main-link'>Instagram</a>
                </div>
                <div className='Places-main-media-main'>
                    <img className='Places-main-media-main-icon' src={Twitter} />
                    <a className='Places-main-media-main-link'>Twitter</a>
                </div>
            </div>
        </div>

        <div className='Places-search-div'>
            <div  className='Places-search-div-main'>
                <input className='Places-search-div-input' type="text" placeholder='Search Place' onChange={(e)=>PlaceSearch(e)} />
                <select className='Places-filter'>
                    <option>select category</option>
                </select>
            </div>
            
        </div>

        <div className='Places-places'>
                {currentPlaces.length > 0 && currentPlaces.map((place, index) => {
                    return (
                        <PlaceCard key={index} id={place.place_id} place={place.place_name} short={place.short_description} link={`/placeReview/${place.place_id}`} />
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="Places-pagination">
                {Array.from({ length: Math.ceil(places.length / placesPerPage) }, (_, i) => (
                    <button className='Places-pagination-btn' key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
                ))}
            </div>
        
    </div>
  )
}
