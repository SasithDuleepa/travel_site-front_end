import React from 'react';
import './headerText.css';
import World from './../../assets/world tour 02 1.png'

export default function HeaderText() {
  return (
    <div className='header-text'>
      <div className='header-text-child1'>
        <p className='header-text-sub-p reveal'>Travel with</p>
        <h1 className='header-text-h1 reveal'>Sri Lanka Travel Experts</h1>
        <p className='header-text-p reveal'>Lorem ipsum dolor sit amet consectetur. Pharetra lectus nisi lacus non ut turpis.
           Senectus elit lobortis morbi amet. Commodo nullam accumsan fames sed sapien gravida           
            nec gravida id. Netus at proin tristique pharetra eget feugiat tempor amet non.
             Enim vel sodales tellus sem in sit at sodales pharetra. Dictum quis varius
              lacus cursus nullam consectetur amet quis. Orci ligula ac lacus vestibulum 
              blandit at turpis pharetra neque. Mi id non dui velit malesuada sollicitudin
               suspendisse odio rhoncus. Viverra pharetra at pellentesque gravida dictum.
                Sit nec blandit sed enim a commodo quam suspendisse. Sed consectetur
                 molestie non elit porttitor ac auctor. Urna et sed risus sagittis elementum ut.
           Aenean commodo nullam rutrum enim suspendisse blandit ullamcorper nibh.</p>
        

      </div>


      <div className='header-text-child2'>
          <img className='header-text-child2-img reveal' src={World} alt="" />
      </div>
    </div>
  )
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  console.log(reveals);

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    console.log(windowHeight);
    console.log(elementTop);

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active_");
    } else {
      reveals[i].classList.remove("active_");
    }
  }
}

window.addEventListener("scroll", reveal);
