import React, { useEffect, useState } from 'react';
import './add_team.css';
import axios from 'axios';


export default function Add_team() {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('image', image);
    // console.log([...formData])
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/team/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if(response.status === 200){
        window.alert("Member added successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      window.alert("Error adding place");
    }

  }

  const [Team,setTeam] = useState([])

  const GetTeam = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/team/get`);
      setTeam(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    GetTeam()
  },[])

  const UpdateHandler = async (team)=> { 
    console.log(team)
    const formData = new FormData();
    formData.append('name', team.name);
    formData.append('position', team.position);
    if(team.newimage){
      formData.append('image', team.newimage);
    }else{
      formData.append('image', team.image);
    }
      

    // console.log([...formData])
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/team/update/${team.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if(response.status === 200){
        window.alert("Member updated successfully");
        window.location.reload();
      }
    }
    catch (error) {
      console.error(error);
      window.alert("Error updating place");
    }


  }

  const DeleteHandler = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/team/delete/${id}`);
      console.log(response.data);
      if(response.status === 200){
        window.alert("Member deleted successfully");
        window.location.reload();
      }
    }
    catch (error) {
      console.error(error);
      window.alert("Error deleting  place");
    }
  }
  return (
    <div className='add-team'>
      <h1 className='add-team-title-2'>Team members</h1>


      <h2  className='add-team-title-2'>Add members</h2>
      <div className='add-team-add'>
        
        <div  className='add-team-add-left'>
        <div  className='add-team-add-form'>
          <label>Name : </label>
          <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='add-team-add-form'>
          <label>Position : </label>
          <input type="text" placeholder='Position' value={position} onChange={(e)=>setPosition(e.target.value)}/>
        </div>
        <div className='add-team-add-form'>
        <label>Image : </label>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/> 
        </div>
        <div>
        <button className='add-team-add-btn' onClick={handleSubmit}>add</button>
        </div>
        
        </div>
        <div  className='add-team-add-right'>
          {image ?
            <img className='add-team-add-img' src={URL.createObjectURL(image)} alt="" />
            :
            <p className='add-team-add-img-p'>no image </p>}
          
        </div>
        

      </div>


      <h2  className='add-team-title-2'>Edit members</h2>
      <div  className='add-team-view-main'>
        {Team.length>0 && Team.map((team,index)=>{
          return(
            <div key={index} className='add-team-view'>
              <div className='add-team-view-left'>
              <div>
                <label>name :</label>
                <input type="text" value={team.name} onChange={(e)=>{
                  const newTeam = [...Team];
                  newTeam[index].name = e.target.value;
                  setTeam(newTeam);
                }}/>
              </div>
              <div>
                <label>position :</label>
                <input type="text" value={team.position} onChange={(e)=>{
                  const newTeam = [...Team];
                  newTeam[index].position = e.target.value;
                  setTeam(newTeam);

                }}/>
              </div>

              <div className='add-team-view-btn-div'>
                <button className='add-team-view-btn' onClick={()=>UpdateHandler(team)}>update</button>
                <button className='add-team-view_btn' onClick={()=>DeleteHandler(team.id)}>delete</button>
              </div>

              </div>
              <div className='add-team-view-right'>
              <div>
                {team.newimage ?
                  <img className='add-team-view-img' src={URL.createObjectURL(team.newimage)} alt="" />
                  :
                  <img  className='add-team-view-img' src={`${process.env.REACT_APP_BACKEND_URL}/team/image/${team.image}`} alt="" />}
                {/* <p>{team.image}</p>
                <img src={`${process.env.REACT_APP_BACKEND_URL}/team/image/${team.image}`} alt="" /> */}
                <input type="file" onChange={(e)=>{
                  const newTeam = [...Team];
                  newTeam[index].newimage = e.target.files[0];
                  setTeam(newTeam);
                }}/>
              </div>
              </div>
              
              

              

            </div>
          )

        
        })}


      </div>


      
    </div>
  )
}
