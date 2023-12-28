import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import './tours.css';
import axios from 'axios';

import TourCard from './card/tourCard';


import Socialmedia from './../../../components/social media/socialmedia';

export default function Tours() {


  let { page } = useParams();
  const[Page,SetPage] = useState('')
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


  useEffect(()=>{
    if(page==='tourcategory'){
      GetTourCategory()
      setTourcatergoryBTN('Tour_button-active')
      setDaytourBTN('Tour_button')
      SetPage("Tour Packages")
      setPageTitle('Tour Packages')

    }else if(page === 'daytour'){
      GetDayTours()
      setDaytourBTN('Tour_button-active')
      setTourcatergoryBTN('Tour_button')
      SetPage('Day Tours')
      setPageTitle("Day Tour Packages")
    }else{
      SetPage('nopage')
    }
    
  },[])



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
      <p className='Tour-description'>day tour Lorem ipsum dolor sit amet consectetur.
      Leo vitae quam feugiat integer. Ac in scelerisque fames eu tempus diam in
       eleifend. Ac id urna ullamcorper suspendisse. Libero dictum vitae duis
        mattis. Commodo adipiscing faucibus iaculis augue sit ac adipiscing
         adipiscing. Est amet ultrices ornare viverra nibh aliquet. Neque mattis
          eleifend sed gravida. Quis suscipit ut mauris cum duis. Convallis in
           potenti amet parturient consectetur id. Feugiat et quis rutrum massa 
           sit suscipit nisl aliquet pellentesque. Laoreet arcu sed urna sed sed
           senectus tortor. Lobortis enim bibendum elit sed fusce congue eget.
      Tincidunt massa augue non ultrices urna etiam. Risus tincidunt aliquam ut nisl nec.</p>
          :null}

       {tourCategory.length>0 ? 
      <p className='Tour-description'>tour category Lorem ipsum dolor sit amet consectetur.
      Leo vitae quam feugiat integer. Ac in scelerisque fames eu tempus diam in
       eleifend. Ac id urna ullamcorper suspendisse. Libero dictum vitae duis
        mattis. Commodo adipiscing faucibus iaculis augue sit ac adipiscing
         adipiscing. Est amet ultrices ornare viverra nibh aliquet. Neque mattis
          eleifend sed gravida. Quis suscipit ut mauris cum duis. Convallis in
           potenti amet parturient consectetur id. Feugiat et quis rutrum massa 
           sit suscipit nisl aliquet pellentesque. Laoreet arcu sed urna sed sed
           senectus tortor. Lobortis enim bibendum elit sed fusce congue eget.
      Tincidunt massa augue non ultrices urna etiam. Risus tincidunt aliquam ut nisl nec.</p>
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
