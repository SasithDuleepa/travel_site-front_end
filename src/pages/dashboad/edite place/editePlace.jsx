import React, { useEffect, useState } from 'react';
import './editeplace.css';
import Axios from 'axios';

export default function EditePlace() {
    const [places, setPlaces] = useState([]);
    const [placeInfo, setPlaceInfo] = useState([]);
    const [imgs, setImgs] = useState([]);

    // Input values
    const[id,setId] = useState('')
    const [name, setName] = useState('');
    const[priority,setPriority] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [time, setTime] = useState('');
    const [fee, setFee] = useState('');
    const [description, setDescription] = useState('');
    const [short, setShort] = useState('');
    const [cardImg, setCardImg] = useState('');
    const [coverImgs, setCoverImgs] = useState('');

    const[newImgs,setNewImgs] = useState([])
    const[newCardImg,setNewCardImg] = useState(null)
    const[newCoverImgs,setNewCoverImgs] = useState(null)
    const[deletedImgs,setDeletedImgs] = useState([])

    const GetPlaces = async () => {
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/all_admin`);
        setPlaces(res.data.data);
    };
    const PlaceSearcHandler =async(e) =>{
        if(e.target.value){
            const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/placesearch/${e.target.value}`);
            setPlaces(res.data.data);
        
        }else{
            GetPlaces();
        }
        

    }

    const SelectHandler =  (id)=>async() => {
        // console.log(id);
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/getplace/${id}`);
        console.log(res.data[0]);
        setId(res.data[0].place_id);
        setPlaceInfo(res.data[0]);
        setName(res.data[0].place_name);
        setPriority(res.data[0].priority);
        setLat(res.data[0].place_lat);
        setLng(res.data[0].place_lng);
        setTime(res.data[0].visit_time);
        setFee(res.data[0].visiting_fee);
        setDescription(res.data[0].place_description);
        setShort(res.data[0].short_description);
        setCardImg(res.data[0].card_img);
        setCoverImgs(res.data[0].cover_img);
        setNewCardImg(null)
        setNewCoverImgs(null)
        setNewImgs([])
    };

    const GetImgs = async() =>{
        const res = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/places/getplaceimgnames/${placeInfo.place_id}`);
        // console.log(res.data);
        setImgs(res.data);
    }
    useEffect(() => {
        GetImgs();
        setDeletedImgs([])
    }, [placeInfo]);

    useEffect(() => {
        GetPlaces();
    }, []);


    const ImgDeleteHandler = (index,id) => async() =>{
        // console.log(index,id)
        //delete img from imgs
        const new_Imgs = [...imgs];
        new_Imgs.splice(index,1);
        setImgs(new_Imgs);

        //add deleted img to deletedImgs
        const deleted_Imgs = [...deletedImgs];
        deleted_Imgs.push(id);
        setDeletedImgs(deleted_Imgs);
    }
    const Filehandler = (e) => {
        const selectedFile = e.target.files[0];
        // console.log(selectedFile)
        const new_file = [...newImgs];
        new_file.push({file:selectedFile});
        setNewImgs(new_file);
        
    };

    //delete new images
    const newImgDeleteHandler = (index) => () => {
        const new_Imgs = [...newImgs];
        new_Imgs.splice(index, 1);
        setNewImgs(new_Imgs);
    };
    
    
    

    //Update
    const UpdateHandler =async()=> {
        


        const formData = new FormData();
        formData.append('name', name);
        formData.append('priority', priority);
        formData.append('lat', lat);
        formData.append('lng', lng);
        formData.append('time', time);
        formData.append('fee', fee);
        formData.append('description', description);
        formData.append('short', short);
        formData.append('cardImg', cardImg);
        formData.append('newCardImg', newCardImg);
        formData.append('coverImgs', coverImgs);
        formData.append('newCoverImg', newCoverImgs);
        // formData.append('newImgs',newImgs)



        deletedImgs.forEach((file, index) => {
            formData.append('deletedImgs', [file]);
          });

        

        
        newImgs.forEach((file, index) => {
            formData.append('newImgs', file.file );
          });


          console.log([...formData])

        

        try {
            
            // console.log(newImgs)
            const token = sessionStorage.getItem("token");
            const res = await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/places/updateplace/${id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `${token}`,
                },
              });
          
              if(res.status === 200){
                window.alert("Place updated successfully");
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
                window.alert("Error adding place");
              }
        }

    }

    const DeleteHandler=async() =>{
        try {
            const token = sessionStorage.getItem("token");
            const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/places/deleteplace/${id}`,
            {
                headers: {
                  'Authorization': `${token}`,
                },
              })
              if(res.status === 200){
                window.alert("Place hide successfully");
                window.location.reload();
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
                window.alert("Error adding place");
              }
        }
    }

    const DELETE = async() =>{
        try {
            const token = sessionStorage.getItem("token");
            const res = await Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/places/delete/${id}`,
            {
                headers: {
                  'Authorization': `${token}`,
                },
                      })
            // console.log(res.data)
            if(res.status === 200){
                window.alert("Place deleted successfully");
                window.location.reload();
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
                window.alert("Error deleting place");
              }
        }
    }


  return (
    <div className='editeplace'>
        <h1>EditePlace</h1>
        <div className='editeplace-line'></div>

        <div className='editeplace-div1'>
            <div className='editeplace-search-div'>
                <input  className='editeplace-search-input' type="text" placeholder='search place' onChange={(e)=>PlaceSearcHandler(e)}/>
            </div>

            <div className='editeplace-search-result-div'>
                {places.length>0 && places.map((place,index)=>{
                    return(

                            <button key={index} className='editeplace-search-result' onClick={SelectHandler(place.place_id)}>{place.place_name}</button>
                     
                    )
                }    )}
            </div>

            <div>
            <button className='edite-place-update-btn' onClick={UpdateHandler}>Update</button>
        {/* <button className='edite-place-delete-btn' onClick={DeleteHandler}>hide</button> */}
        <button className='edite-place-delete-btn' onClick={DELETE}>DELETE </button>
            </div>


            <div className='editeplace-form-div'>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>Name:</label>
                    <input className='editeplace-form-input' type='text'  value={name}  onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>Priority:</label>
                    <input className='editeplace-form-input' type='text'  value={priority}  onChange={(e)=>setPriority(e.target.value)}/>
                </div>
                <div className='editeplace-form-location'>
                    <div className='editeplace-form'>
                        <label className='editeplace-form-label'>Lat</label>
                        <input className='editeplace-form-input'  type='number' value={lat} onChange={(e)=>setLat(e.target.value)}/>
                    </div>
                    <div className='editeplace-form'>
                        <label className='editeplace-form-label'>Lng</label>
                        <input className='editeplace-form-input'  type='number' value={lng} onChange={(e)=>setLng(e.target.value)}/>
                    </div>
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>time duration</label>
                    <input  className='editeplace-form-input'  value={time} onChange={(e)=>setTime(e.target.value)}/>
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>visiting fee</label>
                    <input className='editeplace-form-input'  type='number'  value={fee} onChange={(e)=>setFee(e.target.value)}/>
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>description</label>
                    <textarea  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>short description</label>
                    <textarea value={short} onChange={(e)=>setShort(e.target.value)}/>
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>card image:</label>
                    <input type='file' onChange={(e)=>setNewCardImg(e.target.files[0])}/>
                    {newCardImg ?
                        <img className='editeplace-form-img-card' src={URL.createObjectURL(newCardImg)} alt="" />
                        :
                        <img className='editeplace-form-img-card'   src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg/?file=${cardImg}`}/>
                    }
                    
                    
                </div>
                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>cover image:</label>
                    <input type='file' onChange={(e)=>setNewCoverImgs(e.target.files[0])}/>
                    {newCoverImgs ?
                        <img className='editeplace-form-img-cover' src={URL.createObjectURL(newCoverImgs)} alt="" />
                        :
                        <img  className='editeplace-form-img-cover'  src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg/?file=${coverImgs}`}/>
                    }
                    
                    
                </div>
                
            </div>

            <div className='editeplace-form-img-div'>
                <p className='editeplace-form-img-div-title'>Available images</p>
                <div  className='editeplace-form-placeimg-div'>
                {imgs.length>0 && imgs.map((img,index)=>{
                    return(
                        <div  className='editeplace-form-placeimg-div-sub1' key={index}>
                            <img className='editeplace-form-img' src={`${process.env.REACT_APP_BACKEND_URL}/places/placeimg/?file=${img.img_name}`} alt="" />
                            <button className='editeplace-form-placeimg-div-sub1-edite' onClick={ImgDeleteHandler(index,img.img_name)}>DELETE</button>
                        </div>
                    )
                
                }
                )}
                </div>

                

                <div className='editeplace-form'>
                    <label className='editeplace-form-label'>Add Image</label>
                    <input  className='editeplace-form-ims-input' type='file' placeholder='Upload' multiple={true} onChange={(e) => Filehandler(e)}  />
                
                </div>
                <div className='editeplace-form-addedimages'>
                {newImgs.length > 0 && newImgs.map((img, index) => (
    <div className='editeplace-form-img_div' key={index}>
        <img className='editeplace-form-addedimg' src={URL.createObjectURL(img.file)} alt="" />
        <button className='editeplace-form-addedimg-delete' onClick={newImgDeleteHandler(index)}>DELETE</button>
    </div>
))}

</div>

            </div>

        </div>
        
    
                    
    
    </div>
  )
}
