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

      //search
  const AgentSearchHandler= async(e) =>{
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

  const AgentSelectHandler =async(id,name) =>{
    console.log(id,name)
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
      console.log(res.status);
    } catch (error) {
      if(error.response.status === 401){
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }
  }

  return (
    <div className='promote-code'>
        <div className='promote-code-left'>
            <h2 className='promote-code-left-title'>Promote Code</h2>
            <div className='promote-code-left-search'>
                <div className='promote-code-left-search-left'>
                    <label>search : </label><input />
                </div>
                <div className='promote-code-left-search-right'>
                    <div className='promote-code-left-search-right-sub'>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                            <a className='promote-code-left-search-right-code'>iyuyiu iyi b </a>
                    </div>
                </div>
            </div>
            <div className='promote-code-left-edit'>
                <div className='promote-code-left-edit-form'>
                    <label>user name  :</label>
                    <input  disabled/>
                </div>
                <div className='promote-code-left-edit-form'>
                    <label>discount rate : </label>
                    <input />
                </div>
                <div className='promote-code-left-edit-form'>
                    <label>exp date  :  </label>
                    <input />
                </div>
                <div className='promote-code-left-edit-btn-div'>
                    <button className='promote-code-left-edit-btn1'>update</button>
                    <button className='promote-code-left-edit-btn2'>delete</button>
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
                <a key={index} className='promote-code-right-search-results' onClick={()=>AgentSelectHandler(agent.user_id,agent.fname)}>{agent.fname}</a>
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
