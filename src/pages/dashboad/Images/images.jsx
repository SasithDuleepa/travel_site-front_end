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
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              console.log(res.data);
              window.alert('Tour Image Added!')
        } catch (error) {
            window.alert('Tour Image Added Fail!')
        }
        
    }
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
                <div className='dashboad-home-hero-img1-main'>
                    <div className='dashboad-home-hero-img1-div img-input-div'></div>
                    <div className='dashboad-home-hero-img2-div img-input-div'></div>
                    <div className='dashboad-home-hero-img3-div img-input-div'></div>
                    <div className='dashboad-home-hero-img4-div img-input-div'></div>
                </div>
                

            </div>
            <button className='Images-add-btn'>Add Images</button>
        </div>

        <div className='dashboad-tourimages'>
            <div className='dashboad-tour-hero-img-div'>
                <h2 className='dashboad-tour-hero-header'>Tour page Hero Images</h2>
                <div className='dashboad-tour-hero-line'></div>
                <div className='dashboad-tour-hero-img1-main'>
                    <div className='dashboad-tour-hero-img1-div img-input-div'>
                        <input type="file" className='dashboad-tour-hero-img1-input' onChange={(e)=>setTourImg(e.target.files[0])}/>
                    
                    </div>
                </div>
                

            </div>
            <button className='Images-add-btn' onClick={TourImgAdd}>Add Images</button>

        </div>
        
    </div>
  )
}
