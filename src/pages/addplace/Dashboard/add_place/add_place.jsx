import React from 'react';
import './add_place.css';

export default function Add_place() {
  return (
    <div>
        <h1 className='header-Add_place'>Add Place</h1>
        <div className="parent-Add_place">
            <div className="div1-Add_place">
                <div className='form-div-Add_place'>
                    <div className='Add_place-form-sub-div'>
                        <label>Name:</label>
                        <input type='text' className='add_place_input'/>
                    </div>
                    <div  className='Add_place-form-location-div'>
                        <div className='Add_place-form-sub-div'>
                        <label>lat:</label>
                        <input type='text'  className='add_place_input-location'/>
                        </div>
                        <div className='Add_place-form-sub-div'>
                        <label>lng:</label>
                        <input type='text' className='add_place_input-location' />
                    </div>
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label>Place visit time Duration:</label>
                        <input type='text'  className='add_place_input'/>
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label>Description:</label>
                        <input type='text' className='add_place_input' />
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <label>Images:</label>
                        <input type='text' placeholder='Upload'  className='add_place_input'/>
                    </div>
                    <div className='Add_place-form-sub-div'>
                        <button className='Add_place-form-sub-div-button'>Add Place</button>
                    </div>
                    
                </div>
            </div>
            <div className="div2-Add_place">
                <div className='Add_place-map-div'>

                </div>
            </div>
        </div>
    </div>
  )
}
