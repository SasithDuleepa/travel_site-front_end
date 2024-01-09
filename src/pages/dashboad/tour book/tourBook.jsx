import React, { useEffect, useState } from 'react';
import './tourbook.css';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

export default function TourBook() {
    const [tours, setTours] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [fileName, setFilename] = useState('');

    const getRequest = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/getTours`);
        console.log(res.data);
        setTours(res.data);
      };
    
      useEffect(() => {
        getRequest();

        //set today to filename
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFilename(`tour package book report-${formattedDate}` );
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
          return request.start_day >= startDate && request.start_day <= endDate;
        }
        return true; // If no date range specified, include all requests
      });



  //excel
  const columns = [
    { header: 'Name', key: 'Name' },
    { header: 'email', key: 'email' },
    { header: 'tour_id', key: 'tour_id' },
    { header: 'tour_name', key: 'tour_name' },
    { header: 'price', key: 'price' },
    { header: 'hotel_type', key: 'hotel_type' },
    { header: 'passengers', key: 'passengers' },
    { header: 'start_day', key: 'start_day' },
    { header: 'booked_date', key: 'booked_date' },
  ];
  
  const data = filteredRequests.map((request) => {  
    return {
      Name: request.fname,
      email: request.email,
      tour_id: request.tour_id,
      tour_name: request.tour_name,
      price: request.price,
      hotel_type: request.hotel_type,
      passengers: request.passengers,
      start_day: request.start_day,
      booked_date: request.booked_date,
    };
  
  }
  );
  const workbook = new Excel.Workbook();
  const workSheetName = 'Worksheet-1';

  const SaveExcel = async( ) =>{
    try {
      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName);
      worksheet.columns = columns;
      worksheet.getRow(1).font = { bold: true };
      worksheet.columns.forEach(column => {
        column.width = column.header.length + 5;
        column.alignment = { horizontal: 'center' };
      });

      data.forEach(singleData => {
        worksheet.addRow(singleData);
      });
      

      worksheet.eachRow({ includeEmpty: false }, row => {
        // store each cell to currentCell
        const currentCell = row._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach(singleCell => {
          // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
          const cellAddress = singleCell._address;

          // apply border
          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      
    }
  }
    
  return (
    <div className='dashboad-tourbook'>
      <h1>Booked Tour packages</h1>
      <div className='request-table-btn-div'>
        <p>file name : </p>
        <input value={fileName} onChange={(e) => setFilename(e.target.value)} />
        <button className='request-table-btn' onClick={SaveExcel}>Save Excel</button>
      </div>
      <div className='dashboad-tourbook-sub'>

        

       {/* Date Range Filter */}
       <div className='dashboad-tourbook-date-div'>
       <label>
          Start Date:
          <input type='date' value={startDate} onChange={handleStartDateChange} />
        </label>
        <label>
          End Date:
          <input type='date' value={endDate} onChange={handleEndDateChange} />
        </label>

       </div>
       



        <table className='request-table'>
          <thead className='request-table-header'>
            <tr>
              <th>user name</th>
              <th>user email</th>
              <th>tour_id</th>
              <th>tour_name</th>
              <th>price</th>
              <th>hotel_type</th>
              <th>passengers</th>
              <th>start_day</th>
              <th>booked_date</th>
            </tr>
          </thead>

          <tbody className='request-table-body'>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.fname}</td>
                  <td>{request.email}</td>
                  <td>{request.tour_id}</td>
                  <td>{request.tour_name}</td>
                  <td>{request.price}</td>
                  <td>{request.hotel_type}</td>
                  <td>{request.passengers}</td>
                  <td>{request.start_day}</td>
                  <td>{request.booked_date}</td>
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
  )
}
