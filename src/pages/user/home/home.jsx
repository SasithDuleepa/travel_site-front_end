import React from 'react';
import './home.css';

import Homeheader from '../../../components/home header/homeheader';

import TravelPackage from '../../../components/travelPackage/travelPackage';

//images
import ninearch from '../../../assets/9 arch 1.png';
import Gall from '../../../assets/galle fort 1.png';


import Homereview from '../../../components/home review/homereview';

export default function Home() {
  return (
    <div className='home'>
        <Homeheader/>

        <TravelPackage/>
    </div>
  )
}
