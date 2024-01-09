import React, { useEffect, useState } from 'react';
import './description.css';
import axios from 'axios';

export default function Descriptions() {
    const [about,setAbout] = useState('')
    const [tourSlider,setTourSlider] = useState('')
    const [tourpackages,setTourpackages] = useState('')
    const [daytourpackages,setDaytourpackages] = useState('')

    const [voiceofchairman,setVoiceofchairman] = useState('')
    const [popularPlaces, setPopularPlaces] = useState('')


    //about
    const GetAbout = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/about`);
            setAbout(res.data[0].about)

        } catch (error) {
            
        }
    }
    const AboutUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/description/about`,{
                about:about
            });
            window.alert('updated successfully')
            GetAbout();
        } catch (error) {
            window.alert('error updating')
        }
    
    }

    //tour slider
    const GetTourSlider = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/slider`);
            setTourSlider(res.data[0].tp_slider)
        } catch (error) {
            
        }
    }
    const TourSliderUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/description/slider`,{
                tp_slider:tourSlider
            });
            window.alert('updated successfully')
            GetTourSlider();
        } catch (error) {
            window.alert('error updating')
        }
    
    }

    //tour packages
    const GetTourPackages = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/tour_package`);
            setTourpackages(res.data[0].tour_package)
        } catch (error) {
            
        }
    }
    const TourPackageUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/description/tour_package`,{
                tour_package:tourpackages
            });
            window.alert('updated successfully')
            GetTourPackages();
        } catch (error) {
            window.alert('error updating')
        }
    
    }

    //daytour packages
    const GetDaytourPackages = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/daytour_package`);
            setDaytourpackages(res.data[0].daytour_package)
        } catch (error) {
            
        }
    }
    const DaytourPackageUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/description/daytour_package`,{
                daytour_package:daytourpackages
            });
            window.alert('updated successfully')
            GetDaytourPackages();
        } catch (error) {
            window.alert('error updating')
        }
    
    }



    //chairman
    const GetChairman = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/chairman`);
            setVoiceofchairman(res.data[0].chairman)
        } catch (error) {
            
        }
    }
    const ChairmanUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/description/chairman`,{
                chairman:voiceofchairman
            });
            window.alert('updated successfully')
            GetChairman();
        } catch (error) {
            window.alert('error updating')
        }
    
    }


        //popular_places
        const GetPopularPlaces = async() => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/popular_places`);
                setPopularPlaces(res.data[0].popular_places)
            } catch (error) {
                
            }
        }
        const PopularPlacesUpdate = async(e) => {
            e.preventDefault();
            try {
                const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/description/popular_places`,{
                    popular_places:popularPlaces
                });
                window.alert('updated successfully')
                GetPopularPlaces();
            } catch (error) {
                window.alert('error updating')
            }
        
        }




    useEffect(() => {
        GetAbout();
        GetTourSlider();
        GetTourPackages();
        GetDaytourPackages();
        GetChairman();
        GetPopularPlaces();
    
    },[])

  return (
    <div className='dashboad-description'>
        <h1 className='dashboad-description-h1'>descriptions</h1>
        <div  className='dashboad-description-line'></div>
        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>  about description </h2>
            <textarea   className='dashboad-description-1-input' value={about} onChange={(e)=>setAbout(e.target.value)}/>
            <button  className='dashboad-description-btn' onClick={AboutUpdate}>Update</button>
        </div>

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>tour package slider description</h2>
            <textarea   className='dashboad-description-1-input' value={tourSlider} onChange={(e)=>setTourSlider(e.target.value)}/>
            <button  className='dashboad-description-btn' onClick={TourSliderUpdate}>Update</button>
        </div>

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>tour packages description</h2>
            <textarea   className='dashboad-description-1-input' value={tourpackages} onChange={(e)=>setTourpackages(e.target.value)}/>
            <button  className='dashboad-description-btn' onClick={TourPackageUpdate}>Update</button>
        </div>

        

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>daytour packages description</h2>
            <textarea   className='dashboad-description-1-input' value={daytourpackages} onChange={(e)=>setDaytourpackages(e.target.value)}/>
            <button  className='dashboad-description-btn' onClick={DaytourPackageUpdate}>Update</button>
        </div>


        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>Popular Places description</h2>
            <textarea   className='dashboad-description-1-input' value={popularPlaces} onChange={(e)=>setPopularPlaces(e.target.value)}/>
            <button  className='dashboad-description-btn' onClick={PopularPlacesUpdate}>Update</button>
        </div>


        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>VOICE OF CHAIRMAN description</h2>
            <textarea   className='dashboad-description-1-input' value={voiceofchairman} onChange={(e)=>setVoiceofchairman(e.target.value)}/>
            <button  className='dashboad-description-btn' onClick={ChairmanUpdate}>Update</button>
        </div>


    </div>
  )
}
