import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import googleMapsApiKey from '../../google-maps-api-key';

export default function MapRoutes() {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = React.useState('colombo');
  const [destination, setDestination] = React.useState('polonnaruwa');
  const [response, setResponse] = React.useState(null)
  let count = React.useRef(0);
  const directionsCallback = res => {
    console.log(res)
    if (res !== null && count.current < 2) {
      if (res.status === 'OK') {
        count.current += 1;
        setResponse(res);
      } else {
        count.current = 0;
        console.log('res: ', res);
      }
    }
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });
  if (!isLoaded) return (
    <p>Loading...</p>
    )


  return (
    <div>
      <GoogleMap
        mapContainerClassName='map-container'
        center={{ lat: 6.947248052781988, lng: 79.873046875 }}
        zoom={11}
      >
        <MarkerF position={{ lat: 6.93665, lng: 79.84505 }} />
        <DirectionsService
            options={{
              destination: destination,
              waypoints: [{ location: 'Kandy' },{ location: 'Naula' },{ location: 'Angamedilla' }],
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          <DirectionsRenderer directions={response} />

        {/* {directions && (
          <DirectionsRenderer directions={directions} />
        )} */}
      </GoogleMap>
    </div>
  );
}
