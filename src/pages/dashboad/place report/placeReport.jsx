import React, { useEffect, useState } from 'react';
import './placeReport.css';
import Axios from 'axios';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

export default function PlaceReport() {
    const [places,setPlaces] = useState([]);
    const [fileName, setFilename] = useState('');

    const GetPlaces = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/all_admin`);
        console.log(res.data.data);
        setPlaces(res.data.data);
    };
    useEffect(() => {
        GetPlaces();
        //set today to filename
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFilename(`place report-${formattedDate}` );
    },[])

      //excel
  const columns = [
    { header: 'Place Name', key: 'Name' },
    { header: 'Visiting Time', key: 'time' },
    { header: 'Visiting Fee', key: 'fee' },
  ];
  
  const data = places.map((request) => {  
    return {
      Name: request.place_name,
      time: request.visit_time,
      fee: request.visiting_fee,
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
    <div className='place-report'>
        <h1 className='place-report-title'>Place Report</h1>
        <div className='place-report-btn-div' >
        <p>file name : </p>
        <input value={fileName} onChange={(e) => setFilename(e.target.value)} />
        <button className='place-report-btn' onClick={SaveExcel}>Save Excel</button>
      </div>
        <div className='place-report-sub'>
        <table  className='place-report-table'>
            <thead className='place-report-table-head'>
                <tr>
                    <th>Place Name</th>
                    <th>Place visit_time</th>
                    <th>Place visiting_fee</th>
                </tr>
            </thead>
            <tbody>
                {places.map((place,index) => {
                    return (
                        <tr className='place-report-table-tr' key={index}>
                            <td>{place.place_name}</td>
                            <td>{place.visit_time}</td>
                            <td>{place.visiting_fee}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        </div>


        
        
</div>
  )
}
