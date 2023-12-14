import React from 'react';
import './profile.css'

export default function Profile() {
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
                <input className='profile-form-input' type="text"/>
            </div>
            <div className='profile-form'>
                <label className='profile-form-label'>Email :</label>
                <input className='profile-form-input' type="text" />
            </div>
            <div className='profile-form'>
                <label className='profile-form-label'>Country :</label>
                <input className='profile-form-input' type="text" />
            </div>
            <button className='profile-update-btn'>Update</button>
        </div>
    </div>
  )
}
