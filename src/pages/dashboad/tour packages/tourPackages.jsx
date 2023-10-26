import React, { useState } from 'react';
import './tourpackages.css';
import axios from 'axios';

export default function TourPackages() {
  const [placeResult, setPlaceResult] = useState([]);
  const [days, setDays] = useState([{ day: 'day 1', place: ['place 1'] },{ day: 'day 2', place: ['place 2'] }]);
  const [places, setPlaces] = useState([{dayindex:1,places:[]}]);

  const placeSearch = async (e) => {
    let placeInput = e.target.value;
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${placeInput}`);
    setPlaceResult(res.data.data);
  };

  const AddDays = () => {
    setDays([...days, { day: 'day ' + (days.length + 1), place: [] }]);
  };

  const dayHandler = (index) => () => {
    console.log(index);
    setPlaces([...places, {dayindex:index,places:[]}]);
  }

  const placeSelectHandler = (index, place) => () => {
    console.log(index, place);
    if (placeResult[index]) {
      const updatedDays = [...days];
      updatedDays[index].place.push(place);
      setDays(updatedDays);
    }
  };

  const add = () => {
    console.log(days);
  };

  return (
    <div>
      <div>
        <div>
          <label>tour package name:</label>
          <input type="text" />
        </div>
        <div>
          <label>description:</label>
          <input type="text" />
        </div>
        <div>
          <label>image:</label>
          <input type="text" />
        </div>
        <div>
          <label>price:</label>
          <input type="text" />
        </div>
      </div>

      <div className='tour-package-main-2'>
        <div className='tour-package-days-div'>
          {days.map((day, index) => (
            <a className='day' onClick={dayHandler(index)} key={index}>
              {day.day}
              {index + 1}
            </a>
          ))}
          <a className='day' onClick={AddDays}>
            add +
          </a>
        </div>
        <div className='tour-package-place-div'>
          <div>
            <label>place:</label>
            <input type="text" onChange={(e) => placeSearch(e)} />
          </div>
          {placeResult && placeResult.length > 0 ? (
            placeResult.map((place, index) => (
              <ol key={index}>
                <li>
                  <a onClick={placeSelectHandler(index, place.place_name)}>{place.place_name}</a>
                </li>
              </ol>
            ))
          ) : (
            <p>no results</p>
          )}
          {/* {places.length > 0 ? (
            places.map((place, index) => (
              <div key={index}>{place}</div>
            ))
          ) : (
            <p>not selected</p>
          )} */}
        </div>
      </div>
      <a onClick={add}>click</a>
    </div>
  );
}
