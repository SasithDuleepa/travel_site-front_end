import React, { useEffect, useState } from 'react';
import './about.css';
import axios from 'axios';



import World from '../../../assets/world tour 02 1.png';
import Beach from '../../../assets/aboutUs/beach.png';
import Dollar from '../../../assets/aboutUs/Dollar.png';
import TravelBag from '../../../assets/aboutUs/travel-luggage.png';
import Travelersexperience from '../../../components/home traveler experience/travelersexperience';
import ChairmanImage from '../../../assets/aboutUs/person.png';
import AboutTeamCarousel from '../../../components/about team carousel/aboutTeamCarousel';

import Socialmedia from '../../../components/social media/socialmedia';

export default function About() {

  const [about,setAbout] = useState('');
  const [voiceofchairman,setVoiceofchairman] = useState('');
  const [chairmanName,setChairmanName] = useState('');
  const [chairmanImg,setChairmanImg] = useState(null);



  const GetTeam = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/get`);
      console.log(response.data);

      // Extract CEO data
      const ceoData = response.data.find(member => member.position.toLowerCase() === 'ceo');
      if (ceoData) {
        setChairmanName(ceoData.name);
        setChairmanImg(ceoData.image);
      }
     

    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    GetTeam()
  },[])

  const GetAbout = async() => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/about`);
        setAbout(res.data[0].about)

    } catch (error) {
        
    }
}
const GetChairman = async() => {
  try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/chairman`);
      setVoiceofchairman(res.data[0].chairman)
  } catch (error) {
      
  }
}

useEffect(() => {
  GetAbout();
  GetChairman();
},[])

  const contact_us={
    backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '424px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <div className='About'>

      <div className=' wrapper' style={contact_us}>
        <p className='About-main-title'>About Us</p>
        <div className='About-main-route'>
          <a className='About-main-route-link' href='/'>Home /</a>
          <a className='About-main-route_link' > About Us</a>
        </div>
        <div className='About-main-media'>
          <Socialmedia/>
        </div>
      </div>

      <div className='About-header-text'>
      <div className='About-header-text-row'>
          <div className='About-header-text-row-content'>
            <p className='About-header-text-row-content-travelWith'>Travel with</p>
            <p className='About-header-text-row-content-title'>Sri Lanka Travel Experts</p>
            <p className='About-header-text-row-content-description'>{about}</p>
          </div>
          <img className='About-header-text-row-img' src={World} />
        </div>
      </div>

      <div className='About-vm-main'>
        <div className='About-vm-main-vm'>
          <div className='About-vm-main-vm_vm'>
            <p className='About-vm-main-vm_vm-title'>Our Mission</p>
            <p className='About-vm-main-vm_vm-description'>Providing professional travel recommendations and guidance to business and leisure clients, supported by customer service which exceeds expectations. Giving a trustworthy, reliable, Affordable, accurate service to the clients.</p>
          </div>
          <div className='About-vm-main-vm_vm'>
            <p className='About-vm-main-vm_vm-title'>Our Mission</p >
            <p className='About-vm-main-vm_vm-description'>Providing professional travel recommendations and guidance to business and leisure clients, supported by customer service which exceeds expectations. Giving a trustworthy, reliable, Affordable, accurate service to the clients.</p>
          </div>
        </div>
        <div className='About-vm-main-keyTags'>
          <div className='About-vm-main-keyTags-key'>
            <img className='About-vm-main-keyTags-key-image' src={Beach} />
            <p className='About-vm-main-keyTags-key-description'>We have wide range of Tour packages you can choose</p>
          </div>
          <div className='About-vm-main-keyTags-key'>
            <img className='About-vm-main-keyTags-key-image' src={Dollar} />
            <p className='About-vm-main-keyTags-key-description'>We provide a best value for our Tour Packages</p>
          </div>
          <div className='About-vm-main-keyTags-key'>
            <img className='About-vm-main-keyTags-key-image' src={TravelBag} />
            <p className='About-vm-main-keyTags-key-description'>We provide a best hospitality service for our Travelers’</p>
          </div>
        </div>
      </div>

      <div className='About-VoC-main'>
        <div className='About-VoC-main-section'>
          <p className='About-VoC-main-section-title'>VOICE OF CHAIRMAN</p>
          <div className='About-VoC-main-section-row'>
            

            {chairmanImg ? <img className='About-VoC-main-section-row-image' src={`${process.env.REACT_APP_BACKEND_URL}/team/image/${chairmanImg}`} /> : 
            <img className='About-VoC-main-section-row-image' src={ChairmanImage} />}
            <div className='About-VoC-main-section-row-description'>
              <p className='About-VoC-main-section-row-description-msg'>{voiceofchairman}</p>
              <div className='About-VoC-main-section-row-description-company'>
                <p className='About-VoC-main-section-row-description-company-ceo'>{chairmanName}</p>
                <p className='About-VoC-main-section-row-description-company-nc'>CEO, Sri Lanka Travel Experts (PVT) LTD</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div  className='About-carousel'>
        <p  className='About-carousel-title'>Meet our Professional team</p>
        <div><AboutTeamCarousel/></div>
      
      </div>

      <Travelersexperience />

    </div>
  )
}
