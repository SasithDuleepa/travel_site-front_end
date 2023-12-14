import React, { useEffect, useState } from 'react';
import './request.css';
import axios from 'axios';

export default function Request() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getRequest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/request/pending`);
    // console.log(res.data);
    setPendingRequests(res.data);
  };

  useEffect(() => {
    getRequest();
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredRequests = pendingRequests.filter((request) => {
    if (startDate && endDate) {
      // Filter by date range
      return request.date >= startDate && request.date <= endDate;
    }
    return true; // If no date range specified, include all requests
  });

  return (
    <div className='request'>
      <h1>Requests</h1>

      <div className='request-div'>
        <h2>Home Pending Requests</h2>

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
              <th>name</th>
              <th>email</th>
              <th>contact</th>
              <th>country</th>
              <th>message</th>
              <th>date/time</th>
            </tr>
          </thead>

          <tbody className='request-table-body'>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.contact}</td>
                  <td>{request.country}</td>
                  <td>{request.message}</td>
                  <td>{request.date}</td>
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
    </div>
  );
}
