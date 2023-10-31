import React from 'react';
import './register.css';
import Google from './../../../assets/google.png'

export default function Register() {
  return (
    <div className='register-main'>
        <div className='register'>
            <div className='register-left-div'></div>
            <div className='register-right-div'>
                <div className='register-form-div'>
                    <div className='register-header-text-div'>
                        <p className='register-header-text'>Join with Us</p>
                        <p className='register-header-sub-text'>Join with Sri Lanka’s No. 
                         1 Travel Company to Enjoy
                         the most beautiful country in the world</p>
                    </div>
                    
                    <div className='register-form'>
                        <label className='register-label'>full name</label>
                        <input type='text' className='register-input' />
                    </div>
                    <div className='register-form'>
                        <label className='register-label'>full name</label>
                        <input type='text' className='register-input'  />
                    </div>
                    <div className='register-form'>
                        <label className='register-label'>full name</label>
                        <input type='text' className='register-input'  />
                    </div>
                    <div className='register-form'>
                        <label className='register-label'>full name</label>
                        <input type='text'  className='register-input' />
                    </div>
                    <div className='register-form-checkbox'>
                        <input type='checkbox'  className='register-input-checkbox' />
                        <label className='register-label-checkbox'>By clicking you agree to <a className='register-link'>Terms & Conditions</a> and <a className='register-link'>Privacy Policy</a></label>
                    </div>
                    <button className='register-btn'>Register</button>
                    <p className='register-or'>or</p>
                    <a><img src={Google} className='google-icon-register'/></a>
                    <p className='register-bottom-text'>Already have an account?<a className='register-login' href='/login'>Login</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}
