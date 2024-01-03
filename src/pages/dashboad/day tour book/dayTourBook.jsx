import React, { useEffect, useState } from 'react';
import './dayTourBook.css';
import axios from 'axios';

export default function DayTourBook() {
    const [tours, setTours] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getRequest = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/getDayTours`);
        console.log(res.data);
        setTours(res.data);
      };
    
      useEffect(() => {
        getRequest();
      }, []);

      const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
      };
    
      const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      }


      const filteredRequests = tours.filter((request) => {
        if (startDate && endDate) {
          // Filter by date range
          return request.tour_date >= startDate && request.tour_date <= endDate;
        }
        return true; // If no date range specified, include all requests
      });
  return (
    <div className='dashboad-DayTourBook'>

            {/* Date Range Filter */}
       <label>
          Start Date:
          <input type='date' value={startDate} onChange={handleStartDateChange} />
        </label>
        <label>
          End Date:
          <input type='date' value={endDate} onChange={handleEndDateChange} />
        </label>



        <table className='request-table'>
          <thead className='request-table-header'>
            <tr>
              <th>user_id</th>
              <th>daytour_id</th>
              <th>tour_date</th>
              <th>passengers</th>
              <th>total</th>
              <th>start_from</th>
             
            </tr>
          </thead>

          <tbody className='request-table-body'>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.user_id}</td>
                  <td>{request.daytour_id}</td>
                  <td>{request.tour_date}</td>
                  <td>{request.passengers}</td>
                  <td>{request.total}</td>
                  <td>{request.start_from}</td>
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6'>No matching requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}
