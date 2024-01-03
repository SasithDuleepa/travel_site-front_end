import React, { useState } from 'react';
import './description.css';

export default function Descriptions() {
    const [about,setAbout] = useState('')
    const [tourSlider,setTourSlider] = useState('')
    const [tourpackages,setTourpackages] = useState('')
    const [daytourpackages,setDaytourpackages] = useState('')
    const [tours,setTours] = useState('')
    const [voiceofchairman,setVoiceofchairman] = useState('')

  return (
    <div className='dashboad-description'>
        <h1 className='dashboad-description-h1'>descriptions</h1>
        <div  className='dashboad-description-line'></div>
        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>  about description </h2>
            <textarea   className='dashboad-description-1-input'/>
            <button  className='dashboad-description-btn'>Update</button>
        </div>

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>tour package slider description</h2>
            <textarea   className='dashboad-description-1-input'/>
            <button  className='dashboad-description-btn'>Update</button>
        </div>

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>tour packages description</h2>
            <textarea   className='dashboad-description-1-input'/>
            <button  className='dashboad-description-btn'>Update</button>
        </div>

        

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>daytour packages description</h2>
            <textarea   className='dashboad-description-1-input'/>
            <button  className='dashboad-description-btn'>Update</button>
        </div>

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>tours description</h2>
            <textarea   className='dashboad-description-1-input'/>
            <button  className='dashboad-description-btn'>Update</button>
        </div>

        <div  className='dashboad-description-1'>
            <h2 className='dashboad-description-1-h2'>VOICE OF CHAIRMAN description</h2>
            <textarea   className='dashboad-description-1-input'/>
            <button  className='dashboad-description-btn'>Update</button>
        </div>


    </div>
  )
}
