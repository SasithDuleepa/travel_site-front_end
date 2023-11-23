import React from 'react';
import './homeCarouselCard.css';

export default function HomeCaouselCard(props) {
  return (
    <div className='homeCarouselCard-main'>
      <div className='homeCarouselCard'>
        <img className='homeCarouselCard__img'
         
         src={props.img ? `http://localhost:8080/tourcategory/img?file=${props.img}`:
         "http://localhost:8080/categories/categoryimg?file=file-1698209731958-wildlife_tour 1.png"}
         alt="" />
         
        <div className='homeCarouselCard__content'>
            <div className='homeCarouselCard__content-sub'>
            <p className='homeCarousel_title'>{props.title}</p>
            <p className='homeCarousel-description'>{props.description} </p>
            <a className='homeCarousel-see_more' href={props.link}>Read More</a>
            </div>
            
        </div>
        
    </div>
    </div>
    
  )
}
