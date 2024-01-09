import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


import './hotel_report.css';

export default function Hotel_report() {
    const [hotels, setHotels] = useState([]);

    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: '#E4E4E4',
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        },
        header: {
          fontSize: 20,
          marginBottom: 10,
          borderBottom: '1px solid #333',
          paddingBottom: 5,
        },
        hotel: {
          marginBottom: 10,
          border: '1px solid #333',
        },
        price: {
          marginLeft: 10,
          display: 'flex',

          border: '1px solid #333',
        },
      });

    const getHotels = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/hotels/report`);
            // console.log(res.data);

            // Create an object to organize prices by hotel ID
            const organizedData = res.data.reduce((acc, current) => {
                const { hotel_id, hotel_name, hotel_lat, hotel_lang, hotel_category } = current;
                const priceInfo = { start_date: current.start_date, end_date: current.end_date, price: current.price };

                if (!acc[hotel_id]) {
                    acc[hotel_id] = {
                        hotel_id,
                        hotel_name,
                        hotel_lat,
                        hotel_lang,
                        hotel_category,
                        hotel_prices: [priceInfo],
                    };
                } else {
                    acc[hotel_id].hotel_prices.push(priceInfo);
                }

                return acc;
            }, {});

            // Convert the object back to an array
            const organizedHotels = Object.values(organizedData);

            setHotels(organizedHotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    useEffect(() => {
        getHotels();
    }, []);





    const generatePDF = (hotels) => {
        return (
          <Document>
            <Page size="A4" style={styles.page} wrap={false}>
              <View style={styles.section}>
                <Text style={styles.header}>Hotels Report</Text>
                {hotels.map((hotel) => (
                  <View key={hotel.hotel_id} style={styles.hotel}>
                    <Text>Hotel ID: {hotel.hotel_id}</Text>
                    <Text>Hotel Name: {hotel.hotel_name}</Text>
                    <Text>Hotel Lang: {hotel.hotel_lang}</Text>
                    <Text>Hotel Lat: {hotel.hotel_lat}</Text>
                    <Text>Hotel Category: {hotel.hotel_category}</Text>
                    <Text>Price List:</Text>
                    {hotel.hotel_prices.map((price, index) => (
                      <View key={index} style={styles.price}>
                        <Text>Start Date: {price.start_date}</Text>
                        <Text>End Date: {price.end_date}</Text>
                        <Text>Price: {price.price}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </Page>
          </Document>
        );
      };

    return (
        <div className='hotel-report'>
            <h1>Hotels</h1>
            <PDFDownloadLink document={generatePDF(hotels)} fileName="hotels_report.pdf" className='hotel-report-btn'>
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
            <div className='hotel-report-sub-div'>
                {hotels.map((hotel) => (
                    <div className='hotel-report-sub' key={hotel.hotel_id}>
                        <h3>hotel id: {hotel.hotel_id}</h3>
                        <h3>hotel name: {hotel.hotel_name}</h3>
                        <h3>hotel lang: {hotel.hotel_lang}</h3>
                        <h3>hotel lat: {hotel.hotel_lat}</h3>
                        <h3>hotel Category: {hotel.hotel_category}</h3>
                        <h3>Price List:</h3>
                        {hotel.hotel_prices.map((price, index) => (
                            <div className='hotel-report-sub-price-div' key={index}>
                                <p className='hotel-report-sub-price-div-p1' >start date: {price.start_date}</p>
                                <p className='hotel-report-sub-price-div-p2'>end date: {price.end_date}</p>
                                <p className='hotel-report-sub-price-div-p3'>price: {price.price}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
