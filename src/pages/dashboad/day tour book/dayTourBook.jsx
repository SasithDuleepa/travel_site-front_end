import React, { useEffect, useState } from 'react';
import './dayTourBook.css';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

export default function DayTourBook() {
    const [tours, setTours] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [fileName, setFilename] = useState('');

    const getRequest = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/getDayTours`);
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
    setFilename(`daytour book report-${formattedDate}` );
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



//excel
  const columns = [
    { header: 'Name', key: 'Name' },
    { header: 'email', key: 'email' },
    { header: 'daytour id', key: 'daytour_id' },
    { header: 'daytour name', key: 'daytour_name' },
    { header: 'tour date', key: 'tour_date' },
    { header: 'passengers', key: 'passengers' },
    { header: 'total', key: 'total' },
    { header: 'start from', key: 'start_from' },
  ];
  
  const data = filteredRequests.map((request) => { 
    return {
      Name: request.fname,
      email: request.email,
      daytour_id: request.daytour_id,
      daytour_name: request.day_tour,
      tour_date: request.tour_date,
      passengers: request.passengers,
      total: request.total,
      start_from: request.start_from,
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
    <div className='dashboad-DayTourBook'>
      <h1>Booked Day Tours</h1>
      <div className='daytour-book-btn-div'>
        <p>file name : </p>
        <input value={fileName} onChange={(e) => setFilename(e.target.value)} />
        <button className='daytour-book-btn' onClick={SaveExcel}>Save Excel</button>
      </div>
      <div className='dashboad-DayTourBook-sub'>
        <div className='dashboad-DayTourBook-date-div'>
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
              <th>daytour_id</th>
              <th>daytour name</th>
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
                  <td>{request.fname}</td>
                  <td>{request.email}</td>
                  <td>{request.daytour_id}</td>
                  <td>{request.day_tour}</td>
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

      
      
    </div>
  )
}
 