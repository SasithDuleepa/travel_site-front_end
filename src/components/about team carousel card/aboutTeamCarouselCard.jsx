import React from 'react';
import './aboutTeamCarouselCard.css';



export default function AboutTeamCarouselCard(props) {
  return (
    <div className='aboutTeamCarouselCard-main'>
      <div className='aboutTeamCarouselCard'>
        
        <div className='aboutTeamCarouselCard-content'>
          <p className='aboutTeamCarouselCard-content-name'>{props.name}</p>
          <p className='aboutTeamCarouselCard-content-designation'>{props.designation}</p>
        </div>

        <img className='aboutTeamCarouselCard-img' src={props.img} alt='' />
      </div>
    </div>
  )
}
