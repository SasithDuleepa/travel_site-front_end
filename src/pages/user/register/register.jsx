import React, { useState } from 'react';
import './register.css';
import Google from './../../../assets/google.png'
import Image1 from './../../../assets/image1.png'
import Line from './../../../assets/Line 29.png'

import axios from 'axios';

import Correct from './../../../assets/icons/check-mark.png'

export default function Register() {
    const[fName,setFname]= useState('');
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const[confirmPassword,setConfirmPassword]= useState('');

    const [agree, setAgree] = useState(false);


    //validation error massages
    const[fnameError,setFnameError]= useState('');
    const[emailError,setEmailError]= useState('');
    const[passwordError,setPasswordError]= useState('');
    const[confirmPasswordError,setConfirmPasswordError]= useState('');

    //validate success icon
    const[fnameSuccess,setFnameSuccess]= useState(false);
    const[emailSuccess,setEmailSuccess]= useState(false);   
    const[passwordSuccess,setPasswordSuccess]= useState(false);
    const[confirmPasswordSuccess,setConfirmPasswordSuccess]= useState(false);


    //full name handler
    const handleFname=(e)=>{
        let input = e.target.value;
        setFname(input)
        if(input.length<5){
            setFnameError('enter full name');
            setFnameSuccess(false);
        }else{
            setFnameError('');
            setFnameSuccess(true);
        }
    }

    //email handle
    const handleEmail=(e)=>{
        let input = e.target.value;
        setEmail(input);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
            setEmailError('enter valid e-mail');
            setEmailSuccess(false);
        }else{
            setEmailError('');
            setEmailSuccess(true);
        }

    }

    //password handle
    const handlePassword=(e)=>{
        let input = e.target.value;
        setPassword(input);

         // At least 8 characters, one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(input)) {
        setPasswordError('At least 8 characters, one uppercase letter, one lowercase letter, and one digit');
        setPasswordSuccess(false);
    }else{
        setPasswordError('');
        setPasswordSuccess(true);
    }

    }

    //confirm password handle
    const handleConfirmPassword=(e)=>{
        let input = e.target.value;
        setConfirmPassword(input);
        if(input!==password){
            setConfirmPasswordError('enter same password');
            setConfirmPasswordSuccess(false);
        }else{
            setConfirmPasswordError('');
            setConfirmPasswordSuccess(true);
        }
    } 

    //agree 
    const handleAgree = (e) => {
        setAgree(e.target.checked);
    }


    //submit
    const handleSubmit=async(e)=>{

        if(agree===false){
            alert('please agree to the terms and conditions')
        }else if(agree===true){
            if(fnameSuccess===true && emailSuccess===true && passwordSuccess===true && confirmPasswordSuccess===true){
                let data = {
                    fName:fName,
                    email:email,
                    password:password
                }
                try {
                    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/add`, data)
                    console.log(res.data);
                    if(res.status===200){
                        alert('success')
                        window.location.href = `/otp/${fName}/${password}/${email}`;
                    
                    }
                    
                } catch (error) {
                    if(error.response.status === 500){
                        window.alert("Internal server error");
                    }
                }
                
                
            }

        }



        // e.preventDefault();
        
        // setFname('');
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
        // setFnameError('');
        // setEmailError('');
        // setPasswordError('');
        // setConfirmPasswordError('');
        // setFnameSuccess(false);
        // setEmailSuccess(false);
        // setPasswordSuccess(false);
        // setConfirmPasswordSuccess(false);
    
    }

  return (
    <div className='register-main'>
        <div className='register'>
            <div className='register-left-div'>
            <div className='register-form-div'>
                    <div className='register-header-text-div'>
                        <p className='register-header-text'>Join with Us</p>
                        <p className='register-header-sub-text'>Join with Sri Lanka’s No. 
                         1 Travel Company to Enjoy
                         the most beautiful country in the world</p>
                    </div>
                    
                    <div className='register-form'>
                        <label className='register-label'>Full Name :</label>
                        <div className='register-form-sub'>
                            <input type='text' className='register-input' value={fName} onChange={(e)=>handleFname(e)}/>
                            {fnameSuccess===true?<img src={Correct} className='register-validate-img'/>:null}
                        </div>
                        <p className='register-input-validate-p '>{fnameError}</p>
                    </div>
                    <div className='register-form'>
                        <label className='register-label'>Email :</label>
                        <div className='register-form-sub'>
                            <input type='text' className='register-input' value={email} onChange={(e)=>handleEmail(e)} />
                            {emailSuccess===true?<img src={Correct} className='register-validate-img'/>:null}
                        </div>                        
                        <p className='register-input-validate-p'>{emailError}</p>
                    </div>
                    <div className='register-form'>
                        <label className='register-label'>Password :</label>
                        <div className='register-form-sub'>
                            <input type='text' className='register-input' value={password} onChange={(e)=>handlePassword(e)} />
                            {passwordSuccess===true?<img src={Correct} className='register-validate-img'/>:null}
                        </div>
                        <p className='register-input-validate-p'>{passwordError}</p>
                    </div>
                    <div className='register-form'>
                        <label className='register-label'>Confirm Password :</label>
                        <div className='register-form-sub'>
                            <input type='text'  className='register-input' value={confirmPassword} onChange={(e)=>handleConfirmPassword(e)} />
                            {confirmPasswordSuccess===true?<img src={Correct} className='register-validate-img'/>:null}
                        </div>
                        <p className='register-input-validate-p'>{confirmPasswordError}</p>
                    </div>
                    <div className='register-form-checkbox'>
                        <input type='checkbox'  className='register-input-checkbox' onChange={(e)=>handleAgree(e)}/>
                        <label className='register-label-checkbox'>By clicking you agree to <a className='register-link'>Terms & Conditions</a> and <a className='register-link'>Privacy Policy</a></label>
                    </div>
                    <button className='register-btn' onClick={handleSubmit}>Register</button>
                    <p className='register-or'>or</p>
                    <a><img src={Google} className='google-icon-register'/></a>
                    <p className='register-bottom-text'>Already have an account?<a className='register-login' href='/login'>Login</a></p>
            </div>

            </div>
            
            <div className='register-center-div'>
                <img className='register-center-img' src={Line} />  
            </div>
            
            <div className='register-right-div'>
                <img className='register-right-img' src={Image1} />
            </div>
        </div>
    </div>
  )
}
