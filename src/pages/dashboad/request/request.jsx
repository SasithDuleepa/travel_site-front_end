import React, { useEffect, useState } from 'react'
import './request.css';
import axios from 'axios';

export default function Request() {

    const[pendingRequests, setPendingRequests] = useState([])
    const getRequest = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/request/pending`);
        console.log(res.data);
        setPendingRequests(res.data);
    
    }
    useEffect(()=>{
        getRequest();
        
    },[])

    const PendingHandler =async(id) =>{
        console.log(id)
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/request/update/${id}`);
            console.log(res.data);
            
                window.location.reload();
           
        } catch (error) {
            window.alert('error request update!!')
        }
    }
  return (
    <div className='request'>
        <h1>Requests</h1>

        <div className='request-pending-div'>
        <h2>Pending Requests</h2>
        <div>
            {pendingRequests.length>0 ? pendingRequests.map((request,index)=>{
                return(
                    <div  className='request-pending-div-results' key={index}>
                        <div   className='request-pending-results'>
                            <label className='request-pending-results-label'>name : </label>
                            <p>{request.name}</p>
                        </div>
                        <div className='request-pending-results'>
                            <label className='request-pending-results-label'>email :</label>
                            <p>{request.email}</p>
                        </div>
                        <div className='request-pending-results'>
                            <label className='request-pending-results-label'>contact :</label>
                            <p>{request.contact}</p>
                        </div>
                        <div className='request-pending-results'>
                            <label className='request-pending-results-label'>country :</label>
                            <p>{request.country}</p>
                        </div>
                        <button className='request-pending-results-button' onClick={()=>PendingHandler(request._id)}>Accept</button>

                    </div>
                )
            
            }):null}

        </div>
        </div>

        
    </div>
  )
}
