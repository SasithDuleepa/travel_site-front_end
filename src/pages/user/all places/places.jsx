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

     const totalPages = Math.ceil(places.length / placesPerPage);
 
     const paginate = (pageNumber) => setCurrentPage(pageNumber);

     const renderPageButtons = () => {
        const pageButtons = [];

        // Show previous button if not on the first page
        if (currentPage > 1) {
            pageButtons.push(
                <button key="prev" className='Places-pagination-btn1' onClick={() => paginate(currentPage - 1)}>
                    &lt;
                </button>
            );
        }



        // Display up to 5 page buttons, centered around the current page
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            pageButtons.push(
                <button key={i} className={`Places-pagination-btn2 ${i === currentPage ? 'active' : ''}`} onClick={() => paginate(i)}>
                    {i}
                    
                </button>
            );
        }

        // Show ellipses if there are more than 5 pages
        if (totalPages > 5 && currentPage + 2 < totalPages) {
            pageButtons.push(<span key="ellipsis">...</span>);
        }

         // Show last page button
         if (currentPage < totalPages) {
            pageButtons.push(
                <button key="next" className='Places-pagination-btn3' onClick={() => paginate(currentPage + 1)}>
                    &gt;
                </button>
            );
        }

        return pageButtons;
    };







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
        <div className=' wrapper'  style={Style}>
        <p  className='Places-main-title'>Destinations</p>
            <div className='Places-main-route'>
                <a className='Places-main-route-link' href='/'>Home /</a>
                <p className='Places-main-route_link '>Destinations</p>
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

            {renderPageButtons()}
                
            </div>
        
    </div>
  )
}
