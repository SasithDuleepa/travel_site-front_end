import React from 'react';
import './home.css';

import Homeheader from '../../../components/home header/homeheader';
import HeaderText from '../../../components/homeHeaderText/headerText';

import PlaceImgs from '../../../components/home places img/placeImgs';
import Travelersexperience from '../../../components/home traveler experience/travelersexperience';
import HomeDayTour from '../../../components/home day tour/homeDayTour';




import HomeCarousel from '../../../components/home carousel/HomeCarousel';
import TourPlan from '../../../components/home tour plan/tourPlan';

export default function Home() {
  return (
    <div>

      <Homeheader/>


      <HeaderText/>

        
        
        {/* <TravelPackage/> */}
        <HomeCarousel/>
        <HomeDayTour/>
        <TourPlan/>
        <PlaceImgs/>
        <Travelersexperience/>
    </div>
  )
}
