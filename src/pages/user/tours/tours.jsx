import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import './tours.css';
import axios from 'axios';

import TourCard from './card/tourCard';


import Socialmedia from './../../../components/social media/socialmedia';

export default function Tours() {


  let { page } = useParams();

  const [dayTour, setDayTour] = useState([]);
  const [tourCategory, setTourCategory] = useState([])

  const[pageTitle,setPageTitle] = useState("Tour Packages")



  const GetTourCategory = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tourcategory/getall`)
    // console.log(res.data)
    setTourCategory(res.data)
    

  }
  const GetDayTours = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/daytour/daytours`)

    setDayTour(res.data)

    
  }
  


  //descriptions
  const [tourpackages,setTourpackages] = useState('')
    const [daytourpackages,setDaytourpackages] = useState('')
    const GetTourPackages = async() => {
      try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/tour_package`);
          setTourpackages(res.data[0].tour_package)
      } catch (error) {
          
      }
  }
  const GetDaytourPackages = async() => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/description/daytour_package`);
        setDaytourpackages(res.data[0].daytour_package)
    } catch (error) {
        
    }
}



  useEffect(()=>{
    if(page==='tourcategory'){
      GetTourCategory()
      setTourcatergoryBTN('Tour_button-active')
      setDaytourBTN('Tour_button')

      setPageTitle('Tour Packages')

    }else if(page === 'daytour'){
      GetDayTours()
      setDaytourBTN('Tour_button-active')
      setTourcatergoryBTN('Tour_button')

      setPageTitle("Day Tour Packages")
    }else{

    }
    
    GetTourPackages();
    GetDaytourPackages();
  },[page])



  //button handle
  const[tourcatergoryBTN, setTourcatergoryBTN] = useState('Tour_button');
  const[daytourBTN,setDaytourBTN] =useState('Tour_button')

  const tourcatergoryBTNHandler=()=>{
    setTourcatergoryBTN('Tour_button-active')
    setDaytourBTN('Tour_button')
    
   
  }
  const daytourBTNHandler=()=>{
    setDaytourBTN('Tour_button-active')
    setTourcatergoryBTN('Tour_button')
    
   
  }

  const Style = {
    backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/images/Tour/heroimg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '424px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };


  return (
    <div className='Tours'>
      <div className=' wrapper' style={Style}>
        <p className='Tour-over-layer-p'>{pageTitle}</p>
        <div className='Tour-over-layer-route-div'>
          <a  className='Tour-over-layer-route' href='/'>Home</a>
          <p className='Tour-over-layer-route'>/</p>
          <p  className='Tour-over-layer_route'>{pageTitle}</p>
        </div>
        <div className='Tour-over-layer-media-div'>
          <Socialmedia/>

        </div>
        
      </div>
      {dayTour.length>0 ? 
      <p className='Tour-description'>{daytourpackages}</p>
          :null}

       {tourCategory.length>0 ? 
      <p className='Tour-description'>{tourpackages}</p>
          :null}

       <div className='button-div'>
        <a className={tourcatergoryBTN} href='/tours/tourcategory' onClick={tourcatergoryBTNHandler}>Tour Packages</a>
        <a className={daytourBTN}  href='/tours/daytour'  onClick={daytourBTNHandler}>Day Tour Packages</a>
       </div>
       <div className='tours-card-container-div'>
        <div className='tours-card-container-div-sub'>
          {dayTour.length>0 ? dayTour.map((tour,index)=>{
          return(
            <div key={index}>
                <TourCard key={index} title={tour.day_tour} description={tour.description} link={`/daytour/${tour.day_tour_id}`}  img={`${process.env.REACT_APP_BACKEND_URL}/daytour/daytourimg?file=${tour.img}`}  />
            </div>

                )
            }
            ):null
          }

          {tourCategory.length>0 ? tourCategory.map((tour,index)=>{
            return(
              <div key={index}>
                <TourCard key={index}  title={tour.tourcategory_name} description={tour.tourcategory_description} link={`/tourcategory/${tour.tourcategory_id}`} img={`${process.env.REACT_APP_BACKEND_URL}/tourcategory/img?file=${tour.tourcategory_img}`} />
              </div>
            )
          }):null}
        


        </div>

       </div>
    </div>
    
  )
}
