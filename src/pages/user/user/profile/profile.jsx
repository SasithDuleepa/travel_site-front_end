import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';

export default function Profile() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const user_id = sessionStorage.getItem("id");

    const GetUser = async() =>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${user_id}`)
            console.log(res.data);
            if(res.data.length > 0){
                setName(res.data[0].fname);
                setEmail(res.data[0].email);
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        GetUser();
    },[])

    const updateProfile = async () => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/update`,{
                id:111,
                name:name,
                email:email
            })
            console.log(res);

        } catch (error) {
            
        }
    }
  return (
    <div className='profile'>
        <p className='profile-title'>My Profile</p>
        <div className='profile-line'></div>
        <div className='profile-form-div'>
            <div className='profile-img-div'>
                <div className='img-container'></div>
                <button className='img-edite-btn'>Edite</button>
            </div>

            <div className='profile-form'>
                <label className='profile-form-label'>Name :</label>
                <input className='profile-form-input' type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='profile-form'>
                <label className='profile-form-label'>Email :</label>
                <input className='profile-form-input' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            {/* <div className='profile-form'>
                <label className='profile-form-label'>Country :</label>
                <input className='profile-form-input' type="text" />
            </div> */}
            <button className='profile-update-btn' onClick={updateProfile}>Update</button>
        </div>
    </div>
  )
}
