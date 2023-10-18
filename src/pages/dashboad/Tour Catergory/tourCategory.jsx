import React from 'react';
import './tourCategory.css';

import Delete from './../../../assets/icons/delete.png'

export default function TourCategory() {
  const result =[{place: 'place 1'  }, {place: 'place 2'  }, {place: 'place 3'  }, {place: 'place 4'  }]
  const selected = [{place: 'place 1'  }, {place: 'place 2'  }, {place: 'place 3'  }, {place: 'place 4'  }]
  return (
    <div className='tourcategory'>
      <div className='tourcategory__container'>
      <h1 className='tourcategory__container-form-main-div-title'>Add Tour Category</h1>
        <div className='tourcategory__container-line'></div>
        
        <div className='tourcategory__container-form-main-div'>
          <div>
          <div className='tourcategory__container-form-div'>
          <label className='tourcategory__container-form-label'>Catergory Name :</label>
          <input type="text"  className='tourcatergory-input'/>
        </div>
        <div className='tourcategory__container-form-div'>
          <label className='tourcategory__container-form-label'>Description :</label>
          <input type="text"  className='tourcatergory-input'/>
        </div>
        <div className='tourcategory__container-form-div'>
          <label className='tourcategory__container-form-label'>Image :</label>
          <input type="file" className='tourcatergory-input' />
        </div>

        <div className='tourcategory__container-form-div'>
          <label className='tourcategory__container-form-label'>Add Places :</label>
          <input  placeholder='search place'className='tourcatergory-input'/>
          <div className='tourcategory-add-place-search-result-div'>
            {result.map((item, index) => (
              <a key={index}>{item.place}</a>
            )
            )}
          </div>
          <div className='tourcategory-add-place-list-div'>
          {selected.map((item, index) => (
            <div className='tourcategory-add-place-list-div-sub'><a key={index}>{item.place}</a><a><img className='detete-img-addcatergory' src={Delete} alt="" /></a></div>
              
          ))}
          </div>
          
         
        </div>
            
          </div>
        
        


        </div>
      <button className='tourcategory__container-form-add-button'>Add</button>
      </div>
    </div>
  )
}
