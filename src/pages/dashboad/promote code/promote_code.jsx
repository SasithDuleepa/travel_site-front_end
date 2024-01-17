import { useEffect, useState } from 'react';
import './promote_code.css';
import Axios from 'axios';

export default function Promote_code() {
    const[agent,setAgent] = useState([]);

    const[userName,setUserName] = useState("");
    const[code,setCode] = useState("");
    const[userId,setUserId] = useState("");
    const[discount,setDiscount] = useState(0);
    const[expDate,setExpDate] = useState('');

    const[codeId,setCodeId] = useState('');
    const[editeName,setEditeName] = useState('');
    const[editeCode,setEditeCode] = useState('');
    const[editeDiscount,setEditeDiscount] = useState(0);
    const[editeExpDate,setEditeExpDate] = useState('');

      //search
  const AgentSearchHandler= async(e) =>{
    if(e.target.value !== ""){
      try {
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents/search/${e.target.value}`);
        setAgent(res.data.data);
      } catch (error) {
        
      }
    }else{
      try {
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/agents`);
        setAgent(res.data);
      } catch (error) {
        
      }
    }
    
  }

  const AgentSelectHandler =async(id,name) =>{
    setUserId(id);
    setUserName(name);
  }


  const generateCouponCode = () => {
    const currentDateTime = new Date();
    const timestamp = currentDateTime.getTime(); // Get the timestamp in milliseconds
  
    // Convert the timestamp to a hexadecimal string and take a portion of it
    const couponCode = timestamp.toString(16).slice(-8).toUpperCase();
  
    return couponCode;
  };

  
  useEffect(()=>{
    const CouponCodeGenerator = () => {
        const newCouponCode = generateCouponCode();
          setCode(newCouponCode);
      }
      CouponCodeGenerator();
  },[])

  //create
  const CreateHandler = async() =>{
    try {
      const res = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/promote/add_code`, {
        user_id: userId,
        code: code,
        discount: discount,
        exp_date: expDate
      })
      if(res.status === 200){
        alert("Promote Code Created Successfully");
        setUserId("");
        setUserName("");
        setCode("");
        setDiscount(0);
        setExpDate('');


        getAllCodes();
      }
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("All fields are required");
      }else if(error.response.status === 409){
        window.alert("Place with the same name already exists");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Error Adding Promote Code");
      }
    }
  }



  //all codes
  const [allCodes, setAllCodes] = useState([]);
  const getAllCodes = async () => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/promote/all_code`);
      setAllCodes(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCodes();
  }
  , [])
  //codesearch
  const CodeSearchHandler = async(e) =>{
    if(e.target.value !== ""){
      try {
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/promote/search/${e.target.value}`);
        setAllCodes(res.data);
      } catch (error) {
        
      }
    }else{
      try {
        const res =await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/promote/all_code`);
        setAllCodes(res.data);
      } catch (error) {
        
      }
    }
    
  }

  //get code data
  const getCodeData = async (code) => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/promote/code_data/${code}`);
      setEditeName(response.data[0].fname);
      setEditeCode(response.data[0].promote_code);
      setEditeDiscount(response.data[0].promote_code_discount);
      setEditeExpDate(response.data[0].promote_code_exp);
      setCodeId(response.data[0].idpromote_code_id);
    } catch (error) {
      
    }
  }
  //update
  const UpdateHandler = async() =>{
    try {
      const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/promote/update_code/${codeId}`, {
        code: editeCode,
        discount: editeDiscount,
        exp_date: editeExpDate
      })

      if(res.status === 200){
        alert("Promote Code Updated Successfully");
        setEditeName("");
        setEditeCode("");
        setEditeDiscount(0);
        setEditeExpDate('');

        getAllCodes();
      }

    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("All fields are required");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Error Updating Promote Code");
      }
    }
  }

  //delete
  const DeleteHandler = async() =>{
    try {
      const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/promote/delete_code/${codeId}`);

      if(res.status === 200){
        alert("Promote Code Deleted Successfully");
        setEditeName("");
        setEditeCode("");
        setEditeDiscount(0);
        setEditeExpDate('');

        getAllCodes();
      }
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.alert("You are not authorized to perform this action");
      }else if(error.response.status === 400){
        window.alert("All fields are required");
      }else if(error.response.status === 500){
        window.alert("Internal server error");
      }else{
        window.alert("Error deleting Promote Code");
      }
    }
  }

  return (
    <div className='promote-code'>
        <div className='promote-code-left'>
            <h2 className='promote-code-left-title'>Promote Code</h2>
            <div className='promote-code-left-search'>
                <div className='promote-code-left-search-left'>
                    <label>search Promote Code: </label><input onChange={(e)=>CodeSearchHandler(e)}/>
                </div>
                <div className='promote-code-left-search-right'>
                    <div className='promote-code-left-search-right-sub'>
                            {allCodes.length > 0 ? allCodes.map((code,index) =>{
                                return(
                                    <button  key={index} className='promote-code-left-search-right-code' onClick={()=>getCodeData(code.promote_code)}>{code.promote_code}</button>
                                )
                            
                            }
                            ):null}

                    </div>
                </div>
            </div>
            <div className='promote-code-left-edit'>
                <div className='promote-code-left-edit-form'>
                    <label>user name  :</label>
                    <input  disabled value={editeName} onChange={(e)=>setEditeName(e.target.value)}/>
                </div>
                <div className='promote-code-left-edit-form'>
                    <label>promot code  :</label>
                    <input  disabled value={editeCode} onChange={(e)=>setEditeCode(e.target.value)}/>
                </div>
                <div className='promote-code-left-edit-form'>
                    <label>discount rate : </label>
                    <input value={editeDiscount} onChange={(e)=>setEditeDiscount(e.target.value)}/>
                </div>
                <div className='promote-code-left-edit-form'>
                    <label>exp date  :  </label>
                    <input value={editeExpDate} onChange={(e)=>setEditeExpDate(e.target.value)}/>
                </div>
                <div className='promote-code-left-edit-btn-div'>
                    <button className='promote-code-left-edit-btn1' onClick={UpdateHandler}>update</button>
                    <button className='promote-code-left-edit-btn2' onClick={DeleteHandler}>delete</button>
                </div>
            </div>
        </div>
        <div className='promote-code-right'>
            <h2 className='promote-code-right-title'>Create Code</h2>
            <div  className='promote-code-right-main'>
                <div className='promote-code-right-title-search-div'>
                    <label>select user : </label><input onChange={(e)=>AgentSearchHandler(e)}/>
                </div>
                <div className='promote-code-right-search-results-div'>
                {agent.length > 0 ? agent.map((agent,index) =>{
              return(
                <button key={index} className='promote-code-right-search-results' onClick={()=>AgentSelectHandler(agent.user_id,agent.fname)}>{agent.fname}</button>
              )
 
                
              }
              
            ):null}
                    
                    

                </div>

            </div>
            


            <div className='promote-code-right-form'>
                <label>user name :</label>
                <input value={userName} onChange={(e)=>setUserName(e.target.value)} disabled/>
            </div>
            <div className='promote-code-right-form'>
                <label>Promote Code :</label>
                <input value={code} onChange={(e)=>setCode(e.target.value)} />
            </div>
            <div className='promote-code-right-form'>
                <label>discount rate:</label>
                <input type='number' value={discount} onChange={(e)=>setDiscount(e.target.value)}/>
            </div>
            <div className='promote-code-right-form'>
                <label>exp date:</label>
                <input type='date' value={expDate} onChange={(e)=>setExpDate(e.target.value)}/>
            </div>
            <div className='promote-code-right-btn-div'>
                <button className='promote-code-right-btn' onClick={CreateHandler}>create</button>
                
            </div>
        </div>
    </div>
  )
}
