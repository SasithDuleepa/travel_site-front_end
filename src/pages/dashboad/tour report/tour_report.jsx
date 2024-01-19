import React, { useEffect, useState } from 'react';
import './tour_report.css';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink,Image } from '@react-pdf/renderer';
import Logo from '../../../assets/sidebar_logo.png';
import Flag from '../../../assets/icons/flag.jpg';

export default function Tour_report() {
    const[tours,setTours] = useState([])

    const TourSearch = async(e) => {
        if(e.target.value){
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/toursSearch/${e.target.value}`)
        console.log(res.data.data);
        setTours(res.data.data)
        }
    }


    const[ Data, setData] =useState( {
        tour_id:'',
        tour_name:'',
        tour_description:'',
        tour_img:'',
        tour_new_img:'',
        tour_cover_img:'',
        tour_new_cover_img:'',
        tour_distance:'',
        tour_days:'',
        tour_dates:[{
            tour_date:'',
            tour_date_id:'',
            start_description:'',
            luxary_hotel:'',
            luxary_hotel_id:'',
            semi_hotel:'',
            semi_hotel_id:'',
            places:[{
                place_id:'',
                place_name:'',
                place_description:'',
                place_cover_img:'',
                place_card_img:'',
            }],
        }],
    } )

    const TourSelectHandler = (tourId) => async () => {
        try {


            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tour/tour/${tourId}`);
            console.log(res.data)





            setData({
                tour_id: res.data[0].tour_id,
                tour_name: res.data[0].tour_name,
                tour_description: res.data[0].tour_description,
                tour_img: res.data[0].tour_img,
                tour_cover_img: res.data[0].cover_img,
                tour_distance: res.data[0].distance,
                tour_days: res.data[0].days,
                tour_dates: res.data.reduce((acc, day) => {
                    const existingEntry = acc.find((entry) => entry.tour_date === day.tour_date);
            
                    if (!existingEntry) {
                        acc.push({
                            tour_date: day.tour_date,
                            tour_date_id: day.tour_date_id,
                            start_description: day.start_description,
                            luxary_hotel: day.luxary_hotel,
                            luxary_hotel_id: day.luxary_hotel_id,
                            semi_hotel: day.semi_hotel,
                            semi_hotel_id: day.semi_hotel_id,
                            places: res.data
                                .filter((place) => place.tour_date === day.tour_date)
                                .map((place) => ({
                                    place_id: place.tour_places_id,
                                    place_name: place.place_name,
                                    place_description: place.tour_place_description,
                                    place_cover_img: place.place_cover_img,
                                    place_card_img: place.card_img,
                                })),
                        });
                    }
            
                    return acc;
                }, []),
            });



        } catch (error) {
            console.error('Error fetching tour data:', error);
        }
    };


    const styles = StyleSheet.create({
        page1: {
          flexDirection: 'column',          
          display:'flex',
          justifyContent:'center',
          alignItems:'center',          
        },
        page1_view:{
            backgroundColor: '#E4E4E4',
            border:'2px solid #333',
            width:'90%',
            height:'90%',
        },
        page1_head_view:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            margin:10,
        },
        flag_image:{
            width:100,
            height:50,
        },
        logo_image:{
            width:80,
            height:50,
        },

        title: {
            fontSize: 30,
            fontWeight:900,
            textAlign:'center',
            color:'#FF5733',
            marginBottom:10,
            marginTop:40,
            textDecoration:'underline',
            textTransform:'uppercase',
          },
          days_p:{
            fontSize: 25,
            fontWeight:900,
            textAlign:'center',
            color:'#FF5733',
            marginBottom:20,
            // marginTop:20,
            textDecoration:'underline',
            textTransform:'uppercase',
        },


        tour_image_view:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        },
        image1:{
            width:400,
            height:200,
            marginTop:40,
            marginBottom:20,
        },
        description1_view:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-end',

            // backgroundColor:"#928FE2",
            height:"30%",
           },
        description1 : {
            fontSize:13,
            textAlign:'justify',

            marginLeft:15,
            marginRight:15,
            marginBottom:10,
            marginTop:30,
        },





       



        page: {
            backgroundColor: '#E4E4E4',
            display:'flex',
            justifyContent:'center',
            alignItems:'center', 
            border:'2px solid #333',
            marginRight:50,
            padding:10,
          },
        page_view:{
            // backgroundColor: '#E4E4E4',
            border:'2px solid #333',
            // display:'flex',
            // flexDirection:'column',
            width:'90%',
            // height:'90%',
            marginTop:20,
            marginBottom:20,
            // position:'relative',

        },


        

        title_1:{
            fontSize:24,
            fontWeight:700,
            color:'#746EFC',
            paddingBottom:5,
            paddingTop:5,
            marginBottom:10,
            marginTop:10,
            marginLeft:'auto',
            marginRight:'auto',

        },
        hotel_view:{
            display:'flex',
            flexDirection:'column',
            marginBottom:10,
            marginTop:10,
            marginLeft:10,
            marginRight:10,
        },
        hotel_text:{
            fontSize:13,
            fontWeight:700,
            color:'#2C25B7',
            marginLeft:10,
        },
        hotel_text1:{
            fontSize:12,
            fontWeight:700,
            color:'#2C25B7',
            marginLeft:15,
            marginTop:5,
        },
        day_description_text:{
            fontSize:14,
            fontWeight:700,
            marginLeft:20,
            marginRight:20,
            marginBottom:10,
            marginTop:20,
            textAlign:'justify',
        },


        place_view:{
            textAlign:'justify',
            marginLeft:10,
            marginRight:10,
            marginBottom:10,
            marginTop:10,
        },
        place_title_text:{
            fontSize:22,
            fontWeight:900,
            marginBottom:-10,
            marginTop:10,
            marginLeft:10,
            marginRight:10,
            color:'#170FC8',
            textTransform:'uppercase',
        },
        place_image_view:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:-10,
        },
        place_image:{
            width:400,
            height:200,
        },
        place_description_text:{
            fontSize:12,
            fontWeight:700,
            marginBottom:10,
            marginTop:10,
            marginLeft:10,
            marginRight:10,
        },
       




      });



    const generatePDF = (Data) => {
        console.log('jgk')
        return (
          <Document>
            <Page size="A4" style={styles.page1}>
                <View style={styles.page1_view}>
                    <View style={styles.page1_head_view}>
                        <Image style={styles.flag_image} src={Flag} />
                        <Image style={styles.logo_image} src={Logo} />
                        <Image style={styles.flag_image} src={Flag} />
                    </View>
                    <Text style={styles.title}>{Data.tour_name}</Text>
                    <Text style={styles.days_p}>{Data.tour_days} days / {Data.tour_days -1} Nights</Text>
                    <View style={styles.tour_image_view}>
                        <Image style={styles.image1} src={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg/?file=${Data.tour_cover_img}`} />
                    </View>
                    <View style={styles.description1_view}>
                        <Text style={styles.description1}>{Data.tour_description}</Text>
                    </View>
                    
                    
                    
                </View>
                
            </Page>
            <Page size="A4" style={styles.page}>
                

                {Data.tour_dates.map((date,index)=>{
                    return <View style={styles.page_view}>
                        <Text style={styles.title_1}>Tour day {date.tour_date}</Text>
                        
                        <Text style={styles.day_description_text}>{date.start_description}</Text>


                        <View style={styles.hotel_view}>
                            <Text style={styles.hotel_text}>Dinner & Overnight stay at</Text>
                            <Text style={styles.hotel_text1}>{date.luxary_hotel} (Superior room)</Text>
                            <Text style={styles.hotel_text1}>{date.semi_hotel} (Standard room)</Text>
                        </View>
                        
                        {date.places.map((place,index)=>{
                            return <View style={styles.place_view}>
                                <Text style={styles.place_title_text}>{place.place_name}</Text>
                                <View style={styles.place_image_view}>
                                    <Image style={styles.image1} src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg/?file=${place.place_cover_img}`}  />
                                </View>
                                <Text style={styles.place_description_text}>{place.place_description}</Text>
                                
                            </View>
                        })}
                    </View>

                })}
                <View>
                    <Text style={styles.tour_date}></Text>
                </View>

            </Page>
          </Document>
        );
      };

  return (
    <div className='tour-report'>
        <h1>Tour Report</h1>

        <div className='tour-report-search-div'>
            <label>search tour</label>
            <input type="text" placeholder='search tour' onChange={(e)=>TourSearch(e)}/>
        </div>
        <div className='tour-report-select-div'>
            <div className='tour-report-results-div'>
                {tours.length?tours.map((tour,index)=>{
                    return(<a className='tour-report-search-result' key={index} onClick={TourSelectHandler(tour.tour_id)}>{tour.tour_name}</a>)
                    
                }):<p>no results</p>}
         

            </div>
        </div>

        <div className='tour-report-tour-div'>
            {Data.tour_id !== '' ?
            <div className='tour-report-tour-report'>
                <img src={Logo} />
                <p>tour name : {Data.tour_name}</p>
                <img className='tour-report-tour-report-coverimg' src={`${process.env.REACT_APP_BACKEND_URL}/tour/tourimg/?file=${Data.tour_cover_img}`} alt="" />
                <p>img = {Data.tour_cover_img}</p>
                <p>tour description : {Data.tour_description}</p>
                <p>tour distance : {Data.tour_distance}</p>
                <p>tour days : {Data.tour_days}</p>

                {Data.tour_dates.map((date,index)=>{
                    return <div className='tour-report-tour-report-day-div' key={index}>
                        <p>tour date : {date.tour_date}</p>
                        <p>start description : {date.start_description}</p>
                        <p>luxary hotel : {date.luxary_hotel}</p>
                        <p>semi hotel : {date.semi_hotel}</p>
                        {date.places.map((place,index)=>{
                            return <div className='tour-report-tour-report-place-div' key={index}>
                                <p>place name : {place.place_name}</p>
                                <img className='tour-report-tour-report-place-img' src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg/?file=${place.place_cover_img}`} alt="" />
                                <p>place description : {place.place_description}</p>
                            </div>
                        })}
                    </div>
                    
                })}

            </div>
        :<p>no tour selected</p>}
        </div>
        <PDFDownloadLink document={generatePDF(Data)} fileName="hotels_report.pdf" className='hotel-report-btn'>
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
    </div>
  )
}
