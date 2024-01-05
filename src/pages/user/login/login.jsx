import React, { useState } from 'react';
import './login.css'
import Google from './../../../assets/google.png';
import Image2 from './../../../assets/image2.png';
import Line from './../../../assets/Line 29.png'
import axios from 'axios';

export default function Login() {

    //inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [remember, setRemember] = useState(false);

    const[error, setError] = useState('');


    //email
    const handleEmail = (e) => {
        let email = e.target.value;
        setEmail(email)
    }

    //password
    const handlePassword = (e) => {
        let password = e.target.value;
        setPassword(password)
        
    }

    //remember
    const handleRemember = (e) => {
        let remember = e.target.value;
        setRemember(remember)
        
    }

    //submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        if (email === '' || password === '') {
            setError('Please fill all the fields');
        } else {
            let data = {
                email: email,
                password: password
            };
    
            try {
                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, data);
                console.log(res.data); 
                // console.log(res.cookies.jwt)

                if(res.status===200){
                    
                    sessionStorage.setItem('login', 'true');
                    sessionStorage.setItem('token', res.data.token);
                    sessionStorage.setItem('user', res.data.role);
                    sessionStorage.setItem('id', res.data.user_id);
                

                    window.location.href = '/';
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
    <div className='login-main'>
        <div className='login'>
            <div className='login-left-div'>
                <img className='login-left-img' src={Image2} />
            </div>

            <div className='login-center-div'>
                <img className='login-center-img' src={Line} />
            </div>



            <div className='login-right-div'>
                <div className='login-form-div'>
                    <div className='login-header-text-div'>
                        <p className='login-header-text'>Welcome Back!</p>
                        
                    </div>
                    
                    <div className='login-form'>
                        <label className='login-label'>Email :</label>
                        <input type='text' className='login-input' value={email} onChange={(e)=>handleEmail(e)}/>
                    </div>
                    <div className='login-form'>
                        <label className='login-label'>Password :</label>
                        <input type='text' className='login-input' value={password} onChange={(e)=>handlePassword(e)}  />
                    </div>
                    <p className='login-error'>{error}</p>
                    <div className='login-form-'>
                        <div className='login-form-sub'>
                            <input className='login-form-checkbox' type='checkbox' value={remember} onChange={(e)=>handleRemember(e)}/>
                            <label className='login-label-checkbox'>Remember me</label>
                        </div>
                        
                        <a className='forgot-password' href='/'>Forgot password?</a>
                        
                    </div>
                   
                    <button className='login-btn' onClick={handleSubmit}>Login</button>
                    <p className='login-or'>or</p>
                    <a><img src={Google} className='google-icon-login'/></a>
                    <p className='login-bottom-text'>Don’t have an account?<a className='login-login' href='/register'>Register</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}
