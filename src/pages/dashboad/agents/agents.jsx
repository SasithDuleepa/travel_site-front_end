import React from 'react';
import './agents.css';
import { useState } from 'react';
import Axios from 'axios';

export default function Agents() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

  const[editName,setEditName] = useState('');
  const[editEmail,setEditEmail] = useState('');
  const[editPassword,setEditPassword] = useState('');

  const[agent,setAgent] = useState([]);
  const[agentData,setAgentData] = useState([]);
  const[agentId,setAgentId] = useState(''); 

  //add
  const AddHandler = async() =>{
    try {
      const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/agents/add`, {
        name: name,
        email: email,
        password: password
      })
      console.log(res.status);
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("All fields are required");
      }else if(error.response.status === 409){
        window.alert("name already exists");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Error adding agent");
      }
    }
    
  }

  //search
  const SearchHandler= async(e) =>{
    if(e.target.value !== ""){
      try {
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents/search/${e.target.value}`);
        console.log(res.data);
        setAgent(res.data.data);
      } catch (error) {
        
      }
    }else{
      try {
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents`);
        console.log(res.data);
        setAgent(res.data);
      } catch (error) {
        
      }
    }
    
  }

  //select
  const SelectHandler =async(id) =>{
    const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents/${id}`);
    console.log(res.data[0]);
    setEditName(res.data[0].fname);
    setEditEmail(res.data[0].email);
    setEditPassword(res.data[0].password);
    setAgentId(res.data[0].user_id);

  }

  //update
  const UpdateHandler = async() =>{
    try {
      const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/agents/${agentId}`,{
        name: editName,
        email: editEmail,
        password: editPassword
      })
      console.log(res.status);
      if(res.status === 200){
        setEditName("");
        setEditEmail("");
        setEditPassword("");
        setAgentId("");
        window.alert("Agent updated successfully");
      
      }
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("All fields are required");
      }else if(error.response.status === 409){
        window.alert("name already exists");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Error updating agent");
      }
    }
  }

  //delete
  const DeleteHandler = async() =>{
    try {
      const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/agents/${agentId}`);
      console.log(res.status);
      if(res.status === 200){
        setEditName("");
        setEditEmail("");
        setEditPassword("");
        setAgentId("");
        window.alert("Agent deleted successfully");
      }
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("All fields are required");
      }else if(error.response.status === 409){
        window.alert("name already exists");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Error deleting agent");
      }
    }
  }

  return (
    <div className='agent'>
      <div className='agent-left'>
      <h2 className='agent-left-title'>Agents</h2>
      <div className='agent-left-search-div'>
        <div className='agent-left-search-div-left'>
          <label>Search Agent by Name : </label>
          <input type="text" placeholder='Search' onChange={(e)=>SearchHandler(e)}/>
        </div>
        <div className='agent-left-search-div-right'>
          <div className='agent-left-search-div-right-sub'>
            {agent.length > 0 ? agent.map((agent,index) =>{
              return(
                <a key={index} className='agent-left-search-div-right-sub-user' onClick={()=>SelectHandler(agent.user_id)}>{agent.fname}</a>
              )
 
                
              }
              
            ):null}
            
          </div>
        </div>
      </div>
      <div className='agent-left-edit-div'>
        <div className='agent-left-edit-div-form'>
          <label>Agent Name :</label>
          <input type="text" placeholder='Agent Name' onChange={(e)=>setEditName(e.target.value)} value={editName}/>
        </div>
        <div className='agent-left-edit-div-form'>
          <label>Agent Email :</label>
          <input type="email" placeholder='Agent Email' onChange={(e)=>setEditEmail(e.target.value)} value={editEmail}/>
        </div>
        <div className='agent-left-edit-div-form'>
          <label>Agent Password :</label>
          <input type="text" placeholder='Agent Password'onChange={(e)=>setEditPassword(e.target.value)} value={editPassword}/>
        </div>
        <div className='agent-left-edit-div-btn-div'>
          <button className='agent-left-edit-div-btn1' onClick={UpdateHandler}>Update</button>
          <button className='agent-left-edit-div-btn2' onClick={DeleteHandler}>Delete</button>
        </div>

      </div>
      </div>
      <div className='agent-right'>
        <h2 className='agent-right-title'>Add Agent</h2>
        <div className='agent-right-form'>
          <label>Agent Name : </label>
          <input type="text" placeholder='Agent Name'  onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        <div className='agent-right-form'>
          <label>Agent Email : </label>
          <input type="text" placeholder='Agent Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div className='agent-right-form'>
          <label>Agent Password  : </label>
          <input type="text" placeholder='Agent Password'onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>
        <div className='agent-right-btn-div'>
            <button className='agent-right-btn' onClick={AddHandler}>Add</button>
        </div>
      </div>
    </div>
  )
}
