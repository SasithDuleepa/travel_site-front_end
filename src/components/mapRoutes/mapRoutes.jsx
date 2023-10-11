import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import googleMapsApiKey from '../../google-maps-api-key';

export default function MapRoutes() {
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries: ['places'],
    onLoad: () => {
      // The Google Maps API is loaded and available here.
      // You can safely use the google object.
      initializeDirections();
    },
  });

  const initializeDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRequest = {
      origin: { lat: 6.93665, lng: 79.84505 },
      destination: { lat: 6.91829, lng: 79.88346 },
      travelMode: 'DRIVING',
    };

    directionsService.route(directionsRequest, (result, status) => {
        console.log(status)
        console.log(result)
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(status);
      }
    });
  };

  useEffect(() => {
    // Check if the Google Maps API is already loaded
    if (isLoaded) {
      initializeDirections();
    }
  }, [isLoaded]);

  return (
    <div>
      <GoogleMap
        mapContainerClassName='map-container'
        center={{ lat: 6.947248052781988, lng: 79.873046875 }}
        zoom={11}
      >
        <MarkerF position={{ lat: 6.93665, lng: 79.84505 }} />

        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </div>
  );
}
