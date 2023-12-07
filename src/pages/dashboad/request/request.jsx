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





    //constact us
    const[contactUsPending, setContactUsPending] = useState([])
    const getContactUsPendingRequest = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/contact/pending`);
        console.log(res.data);
        setContactUsPending(res.data);
    }
    useEffect(()=>{
        getContactUsPendingRequest();
    },[])

    const ContactUsPendingHandler =async(id) =>{
        console.log(id)
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/request/pendingHandle/${id}`);
        console.log(res.data);
        if(res.status===200){
            window.location.reload();
        }
        } catch (error) {
            
        }
     }
  return (
    <div className='request'>
        <h1>Requests</h1>

        <div className='request-pending-div'>
        <h2>Home Pending Requests</h2>
        <div  className='request-pending-title-div' >
                        <p className='request-pending-title-1'>name</p>
                        <p className='request-pending-title-2'>email</p>
                        <p className='request-pending-title-3'>contact</p>
                        <p className='request-pending-title-4'>country</p>                        
                        <p className='request-pending-title-5'>Action</p>
                    </div>
      
            {pendingRequests.length>0 ? pendingRequests.map((request,index)=>{
                return(
                    <div  className='request-pending-info-div' key={index}>
                        <p className='request-pending-info-1'>{request.name}</p>
                        <p className='request-pending-info-2'>{request.email}</p>
                        <p className='request-pending-info-3'>{request.contact}</p>
                        <p className='request-pending-info-4'>{request.country}</p>                        
                        <a className='request-pending-info-5' onClick={()=>PendingHandler(request._id)}>Accept</a>
                    </div>
                )
            
            }):null}

      
        </div>

        <div className='contactus-request-pending'>
            <h2>Contact Us Pending Request</h2>
            <div>
                         <div className='contactus-request-pending-title-div'>
                            <p className='contactus-request-pending-title-1'>name</p>
                            <p className='contactus-request-pending-title-2'>email</p>
                            <p className='contactus-request-pending-title-3'>contact</p>
                            <p className='contactus-request-pending-title-4'>country</p>
                            <p className='contactus-request-pending-title-5'>message</p>
                            <p className='contactus-request-pending-title-6'>action</p>
                        </div>
                        
                {contactUsPending.length>0 ? contactUsPending.map((contactUs,index)=>{
                    return(
                        <div key={index} className='contactus-request-pending-info-div'>
                            <p className='contactus-request-pending-info-1'>{contactUs.name}</p>
                            <p className='contactus-request-pending-info-2'>{contactUs.email}</p>
                            <p className='contactus-request-pending-info-3'>{contactUs.contact}</p>
                            <p className='contactus-request-pending-info-4'>{contactUs.country}</p>
                            <p className='contactus-request-pending-info-5'>{contactUs.message}</p>
                            <a className='contactus-request-pending-info-6' onClick={()=>ContactUsPendingHandler(contactUs._id)}>Accept</a>
                        </div>
                        
                    )
                }):null
                    }
            </div>
        </div>

        
    </div>
  )
}
