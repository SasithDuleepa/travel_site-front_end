import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import './otp.css';
import axios from 'axios';

export default function Otp() {
    let { name , pwd, mail } = useParams();
    const[otp,setOtp] = useState('');
    console.log(name, pwd, mail);

    const SubmitHandler = async() =>{
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/save`,{
                fName:name,
                email:mail,
                password:mail,
                otp:otp
            })
            console.log(res);
            if(res.status===200){
                alert('success')
                window.location.href = '/login';
            }
        } catch (error) {
            if(error.response.status === 401){
                sessionStorage.clear();
                window.alert("You are not authorized to perform this action");
              }else if(error.response.status === 400){
                window.alert("Entered otp is not valid");
              }else if(error.response.status === 409){
                window.alert("Place with the same name already exists");
              }else if(error.response.status === 500){
                window.alert("Internal server error");
              }else{
                window.alert("Error adding ");
              }
        }

    }
  return (
    <div className='otp'>
        <h1>otp</h1>
        <input type="text" placeholder='otp' onChange={(e)=>setOtp(e.target.value)}/>
        <button onClick={SubmitHandler}>submit</button>
    </div>
  )
}
