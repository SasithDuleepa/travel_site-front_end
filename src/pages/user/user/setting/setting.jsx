import React from 'react';
import './setting.css';

export default function Setting() {
  return (
    <div className='setting'>
      <p className='setting-title'>Change Password</p>
      <div className='setting-line'></div>
      <div className='setting-form-div'>
        <div className='setting-form'>
            <label className='setting-form-label'>Current Password :</label>
            <input className='setting-form-input' type="password" />
        </div>
        <div className='setting-form'>
            <label className='setting-form-label'>New Password :</label>
            <input className='setting-form-input' type="password" />
        </div>
        <div className='setting-form'>
            <label className='setting-form-label'>Confirm New Password :</label>
            <input className='setting-form-input' type="password" />
        </div>
        <button className='setting-update-btn'>Update</button>
      </div>
    </div>
  )
}
