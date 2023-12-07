import React from 'react';
import './about.css';

import HeaderText from '../../../components/homeHeaderText/headerText';


import Fb from '../../../assets/icons/facebook.png';
import Insta from '../../../assets/icons/instagram.png';
import Twitter from '../../../assets/icons/twitter.png';
import World from '../../../assets/world tour 02 1.png';
import Beach from '../../../assets/aboutUs/beach.png';
import Dollar from '../../../assets/aboutUs/Dollar.png';
import TravelBag from '../../../assets/aboutUs/travel-luggage.png';
import Travelersexperience from '../../../components/home traveler experience/travelersexperience';
import ChairmanImage from '../../../assets/aboutUs/person.png';
import AboutTeamCarousel from '../../../components/about team carousel/aboutTeamCarousel';


export default function About() {
  return (
    <div className='About'>

      <div className='About-main'>
        <p className='About-main-title'>About Us</p>
        <div className='About-main-route'>
          <a className='About-main-route-link' href='/'>Home /</a>
          <a className='About-main-route_link' > About Us</a>
        </div>
        <div className='About-main-media'>
          <div className='About-main-media-main'>
            <img className='About-main-media-main-icon' src={Fb} />
            <a className='About-main-media-main-link'>Facebook</a>
          </div>
          <div className='About-main-media-main'>
            <img className='About-main-media-main-icon' src={Insta} />
            <a className='About-main-media-main-link'>Instagram</a>
          </div>
          <div className='About-main-media-main'>
            <img className='About-main-media-main-icon' src={Twitter} />
            <a className='About-main-media-main-link'>Twitter</a>
          </div>
        </div>
      </div>

      <div className='About-header-text'>
        <div className='About-header-text-row'>
          <div className='About-header-text-row-content'>
            <p className='About-header-text-row-content-travelWith'>Travel with</p>
            <p className='About-header-text-row-content-title'>Sri Lanka Travel Experts</p>
            <p className='About-header-text-row-content-description'>Lorem ipsum dolor sit amet consectetur. In eget placerat auctor adipiscing
              felis euismod massa mattis facilisis. Nisl in lacus pharetra cursus enim vitae ultrices odio iaculis. Ut posuere feugiat et pellentesque dui.
              Nulla nunc aliquam duis a viverra at metus morbi. Eu urna arcu ipsum dignissim sit et et faucibus quam.
              Dignissim semper ornare nisi purus ac risus mi. In sed in nisi varius sed ullamcorper lorem. Fames in vulputate faucibus pretium nulla
              fringilla aliquam vulputate. Mauris eget nulla morbi aliquet malesuada donec magnis in nec. Malesuada nibh purus ut imperdiet at laoreet.
              Curabitur commodo nunc et condimentum amet cursus at felis
            </p>
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
            <img className='About-VoC-main-section-row-image' src={ChairmanImage} />
            <div className='About-VoC-main-section-row-description'>
              <p className='About-VoC-main-section-row-description-msg'>Lorem ipsum dolor sit amet consectetur. Sem mattis diam diam sem interdum non. Dui ultrices in in nisi. Sem eu phasellus bibendum porttitor risus mattis massa tristique. Sagittis dui vitae lobortis nisl tincidunt lectus. Posuere velit donec ornare lectus amet vitae odio proin. Pellentesque enim id elit lacinia sodales dui sit dignissim lacus. Sed senectus ut purus at libero ipsum gravida. Porttitor mauris ut vitae nulla purus netus. Felis dictum morbi in purus nunc est proin tellus morbi.
                Tempor facilisi nec dignissim pellentesque facilisi. Porttitor arcu commodo in libero auctor tincidunt. Integer cursus sem est enim orci maecenas justo lorem. Quis in ac lectus tempor consequat nunc non nulla egestas. Arcu ultricies proin vivamus donec diam consequat at diam. Dui neque eget urna velit mollis. In nunc adipiscing leo adipiscing. Rhoncus ultrices egestas id placerat urna faucibus vitae in egestas. Eget habitant egestas ut ornare nibh sed.
              </p>
              <div className='About-VoC-main-section-row-description-company'>
                <p className='About-VoC-main-section-row-description-company-ceo'>Harsha Walisundra </p>
                <p className='About-VoC-main-section-row-description-company-nc'>CEO, Sri Lanka Travel Experts (PVT) LTD</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Travelersexperience />

    </div>
  )
}
