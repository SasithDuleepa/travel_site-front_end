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


    //home hero img
    const [homeHeroImg1 , setHomeHeroImg1] = useState()
    const[homeHeroImg2, setHomeHeroImg2] = useState()
    const[homeHeroImg3, setHomeHeroImg3] = useState()
    const[homeHeroImg4, setHomeHeroImg4] = useState()

    //update
    const UpdateImg1 =async()=>{
        try {
            const formData = new FormData();
        formData.append('newImage', homeHeroImg1);
        formData.append('img', 'slider1.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(res.data);
        } catch (error) {
            
        }
    }
    const UpdateImg2 =async()=>{
       try {
        const formData = new FormData();
        formData.append('newImage', homeHeroImg2);
        formData.append('img', 'slider3.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(res.data);
       } catch (error) {
        
       }
    }
    const UpdateImg3 =async()=>{
        try {
            const formData = new FormData();
        formData.append('newImage', homeHeroImg3);
        formData.append('img', 'slider5.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(res.data);
        } catch (error) {
            
        }
    }

    const UpdateImg4 =async()=>{
        try {
            const formData = new FormData();
        formData.append('newImage', homeHeroImg4);
        formData.append('img', 'slider2.jpg');
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images/Home/heroimg`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(res.data);
        } catch (error) {
            
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


                <div className='dashboad-home-hero-img-main'>
                    <div className='dashboad-home-hero-img-div-form'>
                    {homeHeroImg1?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg1)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={'http://localhost:8080/images/Home/heroimg/slider1.jpg'} alt="" />}
                        <input type="file"  onChange={(e)=>setHomeHeroImg1(e.target.files[0])}/>
                        <button className='hero-Images-add-btn' onClick={UpdateImg1}>Add Images</button>
                    </div>


                    <div className='dashboad-home-hero-img-div-form'>                  
                    {homeHeroImg2 ?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg2)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={'http://localhost:8080/images/Home/heroimg/slider3.jpg'} alt="" />}
                    <input type="file" onChange={(e)=>setHomeHeroImg2(e.target.files[0])} />
                    <button className='hero-Images-add-btn' onClick={UpdateImg2}>Add Images</button>
                    </div>


                    <div className='dashboad-home-hero-img-div-form'>                   
                    {homeHeroImg3 ?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg3)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={'http://localhost:8080/images/Home/heroimg/slider5.jpg'} alt="" />}
                    <input type="file" onChange={(e)=>setHomeHeroImg3(e.target.files[0])} />
                    <button className='hero-Images-add-btn' onClick={UpdateImg3}>Add Images</button>
                    </div>


                    <div className='dashboad-home-hero-img-div-form'>                   
                    {homeHeroImg4 ?
                        <img className='dashboad-home-hero-img' src={URL.createObjectURL(homeHeroImg4)} alt="" />
                        :
                        <img className='dashboad-home-hero-img' src={'http://localhost:8080/images/Home/heroimg/slider2.jpg'} alt="" />}
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
