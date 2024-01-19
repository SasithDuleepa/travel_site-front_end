import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './agentCodeBook.css';
import Excel from 'exceljs';
import { saveAs } from 'file-saver';

export default function AgentCodeBook() {
    const[agent,setAgent] = useState([]);


    const [tours, setTours] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [fileName, setFilename] = useState('');
    useEffect(() => {
           //set today to filename
           const today = new Date();
           const year = today.getFullYear();
           const month = String(today.getMonth() + 1).padStart(2, '0');
           const day = String(today.getDate()).padStart(2, '0');
           const formattedDate = `${year}-${month}-${day}`;
           setFilename(`tour book report-${formattedDate}` );
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

      //search
      const AgentSearchHandler= async(e) =>{
        if(e.target.value !== ""){
          try {
            const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents/search/${e.target.value}`);
            setAgent(res.data.data);
          } catch (error) {
            
          }
        }else{
          try {
            const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents`);
            console.log(res.data);
            setAgent(res.data);
          } catch (error) {
            
          }
        }
        
      }

    const GetToursAccordingToAgent = async(id) =>{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/toursAccToAgent/${id}`)
        console.log(res.data);
        setTours(res.data);
    }



  //codesearch
  const [allCodes, setAllCodes] = useState([]);
  const CodeSearchHandler = async(e) =>{
    if(e.target.value !== ""){
      try {
        const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/promote/search/${e.target.value}`);
        setAllCodes(res.data);
      } catch (error) {
        
      }
    }else{
      try {
        const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/promote/all_code`);
        setAllCodes(res.data);
      } catch (error) {
        
      }
    }
    
  }

  const GetToursAccordingToCode= async(id) =>{
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book/toursAccToCode/${id}`)
    console.log(res.data);
    setTours(res.data);
}



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
    {header:'promote_code',key:'promote_code'},
    {header:'promote_code_discount',key:'promote_code_discount'},
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
      promote_code: request.promote_code,
      promote_code_discount: request.promote_code_discount,
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
    <div className='agent-code-book'>
        <h1>Agent Code Book</h1>
        <div className='agent-code-book-btn-div'>
            <p>file name :</p>
            <input type="text" value={fileName} onChange={(e) => setFilename(e.target.value)}  />
            <button className='agent-code-book-btn' onClick={SaveExcel}>Download</button>
        </div>
        <div className='agent-code-book-sub'>
            <div className='agent-code-book-sub-select-div'>
            <div className='agent-code-book-agent-div'>
                <label>search agent :<input onChange={(e)=>AgentSearchHandler(e)}/></label>
                <div  className='agent-code-book-agent-div-results-div'>
                    {agent.length>0 ? agent.map((agent,index) => (
                        <div key={index}>
                            <a  className='agent-code-book-select-result' onClick={()=>GetToursAccordingToAgent(agent.user_id)}>{agent.fname}</a>
                        </div>
                        )): <p>no agents</p>}
                </div>
            </div>

            <div className='agent-code-book-agent-div'>
                <label>search promote code :<input onChange={(e)=>CodeSearchHandler(e)}/></label>
                <div  className='agent-code-book-agent-div-results-div'>
                    {allCodes.length>0 ?allCodes.map((code,index) => (
                        <div key={index}>
                            <a className='agent-code-book-select-result' onClick={()=>GetToursAccordingToCode(code.promote_code)}>{code.promote_code}</a>
                        </div>
                        )): <p>no promote code</p>}
                </div>
            </div>

            </div>
            
            <div className='agent-code-book-date-div'>
                <label>
                    Start Date:
                    <input type='date' value={startDate} onChange={handleStartDateChange} />
                </label>
                <label>
                    End Date:
                    <input type='date'  value={endDate} onChange={handleEndDateChange}/>
                </label>
            </div>

            
        </div>


        <div>
        <table className='agent-code-book-table'>
                <thead className='agent-code-book-header'>
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
                    <th>promote code</th>
                    <th>promote code discount</th>
                    </tr>
                </thead>
                <tbody className='agent-code-book-table-body'>
                    {filteredRequests.length > 0 ? filteredRequests.map((data,index) => (
                        <tr key={index}>
                            <td>{data.fname}</td>
                            <td>{data.email}</td>
                            <td>{data.tour_id}</td>
                            <td>{data.tour_name}</td>
                            <td>{data.price}</td>
                            <td>{data.hotel_type}</td>
                            <td>{data.passengers}</td>
                            <td>{data.start_day}</td>
                            <td>{data.booked_date}</td>
                            <td>{data.promote_code}</td>
                            <td>{data.promote_code_discount}</td>
                        </tr>
                    )) : <tr>
                    <td colSpan='12'>No matching tours found.</td>
                  </tr>}
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
