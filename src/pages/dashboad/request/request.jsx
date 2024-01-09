import React, { useEffect, useState } from 'react';
import './request.css';
import axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';


export default function Request() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [fileName, setFilename] = useState('');

  const getRequest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/request/pending`);
    // console.log(res.data);
    setPendingRequests(res.data);
  };

  useEffect(() => {
    getRequest();

    //set today to filename
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFilename(`guest report-${formattedDate}` );
  }, []);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredRequests = pendingRequests.filter((request) => {
    if (startDate && endDate) {
      return request.date >= startDate && request.date <= endDate;
    }
    return true; 
  });



  //excel
  const columns = [
    { header: 'Name', key: 'Name' },
    { header: 'email', key: 'email' },
    { header: 'contact', key: 'contact' },
    { header: 'country', key: 'country' },
    { header: 'message', key: 'message' },
    { header: 'date/time', key: 'date/time' },
  ];
  
  const data = filteredRequests.map((request) => {  
    return {
      Name: request.name,
      email: request.email,
      contact: request.contact,
      country: request.country,
      message: request.message,
      'date/time': request.date
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
    <div className='request'>
      <h1>Requests</h1>
      <div className='request-table-btn-div'>
        <p>file name : </p>
        <input value={fileName} onChange={(e) => setFilename(e.target.value)} />
        <button className='request-table-btn' onClick={SaveExcel}>Save Excel</button>
      </div>

      <div className='request-div'>
        <h2>Home Pending Requests</h2>

        {/* Date Range Filter */}
        <div  className='request-date-div'>
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
