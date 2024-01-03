import React, { useState } from 'react';
import './images.css';
import axios from 'axios';

export default function Images() {

    //tour img
    const [tourImg , setTourImg] = useState()
    const TourImgAdd = async() =>{
        const formData = new FormData();
        formData.append('newImage', tourImg);
        try {
            const token = sessionStorage.getItem("token");
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `${token}`,
                },
              });
              if (res.status === 200) {
                window.alert("successfully");
              
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
                window.alert("Error ");
              }
        }
        
    }


    //home hero img
    const [homeHeroImg1 , setHomeHeroImg1] = useState()
    const[homeHeroImg2, setHomeHeroImg2] = useState()
    const[homeHeroImg3, setHomeHeroImg3] = useState()
    const[homeHeroImg4, setHomeHeroImg4] = useState()

    //update
    const UpdateImg1 =async()=>{
        try {
            const token = sessionStorage.getItem("token");
            const formData = new FormData();
        formData.append('newImage', homeHeroImg1);
        formData.append('img', 'slider1.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
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
                window.alert("Error ");
              }
            
        }
    }
    const UpdateImg2 =async()=>{
       try {
        const token = sessionStorage.getItem("token");
        const formData = new FormData();
        formData.append('newImage', homeHeroImg2);
        formData.append('img', 'slider3.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
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
    const UpdateImg3 =async()=>{
        try {
            const token = sessionStorage.getItem("token");
            const formData = new FormData();
        formData.append('newImage', homeHeroImg3);
        formData.append('img', 'slider5.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
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

    const UpdateImg4 =async()=>{
        try {
            const token = sessionStorage.getItem("token");
            const formData = new FormData();
        formData.append('newImage', homeHeroImg4);
        formData.append('img', 'slider2.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
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
    const css = {
      backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    width: '800px',

    
    
    
    
    };
  return (
    <div className='Dashboad-Images'>
        <div className='Dashboad-Images-div'>
            <h1 className='Dashboad-img-header'>Site Images</h1>
            <div className='Dashboad-img-line'></div>
        </div>

        <div className='dashboad-homeimages'>
            <div className='dashboad-home-hero-img-div'>
                <h2 className='dashboad-home-hero-header'>Home page Hero Images</h2>
                <div className='dashboad-home-hero-line'></div>


                <div className='dashboad-home-hero-img-main'>
                    <div className='dashboad-home-hero-img-div-form'>
                    {homeHeroImg1?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg1)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg/slider1.jpg`} alt="" />}
                        <input type="file"  onChange={(e)=>setHomeHeroImg1(e.target.files[0])}/>
                        <button className='hero-Images-add-btn' onClick={UpdateImg1}>Add Images</button>
                    </div>


                    <div className='dashboad-home-hero-img-div-form'>                  
                    {homeHeroImg2 ?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg2)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg/slider3.jpg`} alt="" />}
                    <input type="file" onChange={(e)=>setHomeHeroImg2(e.target.files[0])} />
                    <button className='hero-Images-add-btn' onClick={UpdateImg2}>Add Images</button>
                    </div>


                    <div className='dashboad-home-hero-img-div-form'>                   
                    {homeHeroImg3 ?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg3)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg/slider5.jpg`} alt="" />}
                    <input type="file" onChange={(e)=>setHomeHeroImg3(e.target.files[0])} />
                    <button className='hero-Images-add-btn' onClick={UpdateImg3}>Add Images</button>
                    </div>


                    <div className='dashboad-home-hero-img-div-form'>                   
                    {homeHeroImg4 ?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg4)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg/slider2.jpg`} alt="" />}
                    <input type="file" onChange={(e)=>setHomeHeroImg4(e.target.files[0])} />
                    <button className='hero-Images-add-btn' onClick={UpdateImg4}>Add Images</button>
                    </div>
                </div>
                

            </div>
            
        </div>

        <div className='dashboad-tourimages'>
            <div className='dashboad-tour-hero-img-div'>
                <h2 className='dashboad-tour-hero-header'>Tour page Hero Images</h2>
                <div className='dashboad-tour-hero-line'></div>
                <div className='dashboad-tour-hero-img1-main'>
                    <div className=' img-input-div' style={css}>
                      
                        <input type="file" className='dashboad-tour-hero-img1-input' onChange={(e)=>setTourImg(e.target.files[0])}/>
                    
                    </div>
                </div>
                

            </div>
            <button className='Images-add-btn' onClick={TourImgAdd}>Add Images</button>

        </div>
        
    </div>
  )
}
