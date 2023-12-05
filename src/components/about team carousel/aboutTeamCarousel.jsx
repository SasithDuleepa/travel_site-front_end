import React from 'react';
import './aboutTeamCarousel.css';


import AboutTeamCarouselCard from '../about team carousel card/aboutTeamCarouselCard';


import Person from '../../assets/teamMember.png';

export default function AboutTeamCarousel() {
  return (
    <div>
      <AboutTeamCarouselCard img={Person} name='Udara Nilupul' designation='Assistant Manager'/>
    </div>
  )
}
