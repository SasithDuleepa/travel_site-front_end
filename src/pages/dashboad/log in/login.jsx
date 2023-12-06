import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

export default function Login() {


    const[userName,setUserName] = useState('');
    const[password,setPassword] = useState('');

    const[error, setError] = useState('');

    const LoginHandler =async() =>{
        console.log(userName,password)
        if (userName === '' || password === '') {
            setError('Please fill all the fields');
        } else {
            let data = {
                userName: userName,
                password: password
            };
    
            try {
                const res = await axios.post(`http://localhost:8080/user/login`, data,{ withCredentials: true });
                console.log(res.data); 
                // console.log(res.cookies.jwt)

                if(res.data.status===200){
                    
                    sessionStorage.setItem('login', 'true');
                    sessionStorage.setItem('user', res.data.role);
                    sessionStorage.setItem('id', res.data.user_id);
                

                    window.location.href = '/dashboad/addplace';
                }
    
                
            } catch (error) {
                console.error('Error submitting form:', error);
    
                
                if (error.response) {
                   
                    console.error('Server responded with:', error.response.status, error.response.data);
                } else if (error.request) {
                   
                    console.error('No response received:', error.request);
                } else {
                  
                    console.error('Error setting up the request:', error.message);
                }
    
               
                setError('An error occurred while submitting the form');
            }
        }
    };
   


  return (
    <div className='admin-login'>
        <div className='admin-login-sub'>
            <div className='admin-login-form'>
                <label className='admin-login-form-label'>user name :</label>
                <input className='admin-login-form-input' type="text" placeholder='Username'  value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className='admin-login-form'>
                <label className='admin-login-form-label'>password :</label>
                <input className='admin-login-form-input' type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className='admin-login-form-button' onClick={LoginHandler}>Login</button>

        </div>
    </div>
  )
}
