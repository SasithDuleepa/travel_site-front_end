import React, { useEffect, useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import './tours.css';
import axios from 'axios';

import TourCard from './card/tourCard';

export default function Tours() {
  const history = useHistory();

  let { page } = useParams();
  const[Page,SetPage] = useState('')
  const [dayTour, setDayTour] = useState([]);
  const [tourCategory, setTourCategory] = useState([])

  const GetTourCategory = async() =>{
    const res = await axios.get('http://localhost:8080/tourcategory/getall')
    // console.log(res.data)
    setTourCategory(res.data)
    SetPage("tourcategory")
    console.log(tourCategory)
  }
  const GetDayTours = async() =>{
    const res = await axios.get('http://localhost:8080/daytour/daytours')
    console.log(res.data)
    setDayTour(res.data)
    console.log(dayTour)
    SetPage('daytour')
  }


  useEffect(()=>{
    if(page==='tourcategory'){
      GetTourCategory()
      setTourcatergoryBTN('Tour_button-active')
      setDaytourBTN('Tour_button')

    }else if(page === 'daytour'){
      GetDayTours()
      setDaytourBTN('Tour_button-active')
      setTourcatergoryBTN('Tour_button')
    }else{
      SetPage('nopage')
    }
    
  },[])



  console.log(page)

  //button handle
  const[tourcatergoryBTN, setTourcatergoryBTN] = useState('Tour_button');
  const[daytourBTN,setDaytourBTN] =useState('Tour_button')

  const tourcatergoryBTNHandler=()=>{
    setTourcatergoryBTN('Tour_button-active')
    setDaytourBTN('Tour_button')
    history.push('/tours/tourcategory');
  }
  const daytourBTNHandler=()=>{
    setDaytourBTN('Tour_button-active')
    setTourcatergoryBTN('Tour_button')
    history.push('/tours/daytour');
  }


  return (
    <div className='Tours'>
      <div className='Tour-head wrapper'><p className='Tour-over-layer'>Travel in Sri Lanka</p></div>
      <p className='Tour-description'>Lorem ipsum dolor sit amet consectetur.
       Leo vitae quam feugiat integer. Ac in scelerisque fames eu tempus diam in
        eleifend. Ac id urna ullamcorper suspendisse. Libero dictum vitae duis
         mattis. Commodo adipiscing faucibus iaculis augue sit ac adipiscing
          adipiscing. Est amet ultrices ornare viverra nibh aliquet. Neque mattis
           eleifend sed gravida. Quis suscipit ut mauris cum duis. Convallis in
            potenti amet parturient consectetur id. Feugiat et quis rutrum massa 
            sit suscipit nisl aliquet pellentesque. Laoreet arcu sed urna sed sed
            senectus tortor. Lobortis enim bibendum elit sed fusce congue eget.
       Tincidunt massa augue non ultrices urna etiam. Risus tincidunt aliquam ut nisl nec.</p>

       <div className='button-div'>
        <a className={tourcatergoryBTN} href='/tours/tourcategory' onClick={tourcatergoryBTNHandler}>Tour category</a>
        <a className={daytourBTN}  href='/tours/daytour'  onClick={daytourBTNHandler}>Day Tour Package</a>
       </div>
       <div className='tours-card-container-div'>
        <div className='tours-card-container-div-sub'>
          {dayTour.length>0 ? dayTour.map((tour,index)=>{
          return(
            <div>
                <TourCard title={tour.day_tour} link={`/daytour/${tour.day_tour}`}  img={`http://localhost:8080/daytour/daytourimg?file=${tour.img}`}  key={index}/>
            </div>

                )
            }
            ):null
          }

          {tourCategory.length>0 ? tourCategory.map((tour,index)=>{
            return(
              <div>
                <TourCard  title={tour.tourcategory_name} link={`/tourcategory/${tour.tourcategory_id}`} img={`http://localhost:8080/tourcategory/img?file=${tour.tourcategory_img}`} key={index}/>
              </div>
            )
          }):null}
        


        </div>

       </div>
    </div>
    
  )
}
