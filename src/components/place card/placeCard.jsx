import React from 'react';
import './placeCard.css';

export default function PlaceCard(props) {
  // console.log(props.id)


  return (
    <div className='place-card'>
        <img  className='place-card-img' alt='' src={ 
            `${process.env.REACT_APP_BACKEND_URL}/places/placeimg?file=${props.img}`

           }/>
        <div className='place-card_info'>
            <p className='place-card-info-title'>{props.place}</p>
            <p className='place-card-info-info'>{props.short}</p>
            <a className='place-card-info-more' href={`/placeReview/${props.link}`}>Read more</a>
        </div>
    </div>
  )
}
