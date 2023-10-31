import React from 'react';
import './login.css'
import Google from './../../../assets/google.png'
export default function Login() {
  return (
    <div className='login-main'>
        <div className='login'>
            <div className='login-left-div'></div>
            <div className='login-right-div'>
                <div className='login-form-div'>
                    <div className='login-header-text-div'>
                        <p className='login-header-text'>Welcome back!</p>
                        
                    </div>
                    
                    <div className='login-form'>
                        <label className='login-label'>full name</label>
                        <input type='text' className='login-input' />
                    </div>
                    <div className='login-form'>
                        <label className='login-label'>full name</label>
                        <input type='text' className='login-input'  />
                    </div>
                    <div className='login-form-'>
                        <div>
                            <input type='checkbox' />
                            <label>Remember me</label>
                        </div>
                        
                        <a href='/'>Forgot password?</a>
                        
                    </div>
                   
                    <button className='login-btn'>Login</button>
                    <p className='login-or'>or</p>
                    <a><img src={Google} className='google-icon-login'/></a>
                    <p className='login-bottom-text'>Don’t have an account?<a className='login-login' href='/register'>Register</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}
