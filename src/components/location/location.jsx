import React from 'react';

const CustomMarker = ({ text }) => (
  <div style={{ position: 'relative', width: '30px', height: '30px', background: 'transparent' }}>
    <img
      src="http://localhost:8080/images/Home/heroimg/slider1.jpg"
      alt="Custom Marker"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {text}
    </div>
  </div>
);

export default CustomMarker;