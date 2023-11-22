import React, { useEffect, useState } from 'react';
import './editeplace.css';
import Axios from 'axios';

export default function EditePlace() {
    const [places, setPlaces] = useState([]);
    const [placeInfo, setPlaceInfo] = useState([]);
    const [imgs, setImgs] = useState([]);

    // Input values
    const [name, setName] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [time, setTime] = useState('');
    const [fee, setFee] = useState('');
    const [description, setDescription] = useState('');
    const [short, setShort] = useState('');
    const [cardImg, setCardImg] = useState('');
    const [coverImgs, setCoverImgs] = useState([]);

    const[newImgs,setNewImgs] = useState([])
    const[newCardImg,setNewCardImg] = useState(null)
    const[newCoverImgs,setNewCoverImgs] = useState(null)
    const[deletedImgs,setDeletedImgs] = useState([])

    const GetPlaces = async () => {
        const res = await Axios.get('http://localhost:8080/places/all');
        setPlaces(res.data.data);
    };

    const SelectHandler =  (id)=>async() => {
        console.log(id);
        const res = await Axios.get(`http://localhost:8080/places/getplace/${id}`);
        console.log(res.data[0]);
        setPlaceInfo(res.data[0]);
        setName(res.data[0].place_name);
        setLat(res.data[0].place_lat);
        setLng(res.data[0].place_lng);
        setTime(res.data[0].visit_time);
        setFee(res.data[0].visiting_fee);
        setDescription(res.data[0].place_description);
        setShort(res.data[0].short_description);
        setCardImg(res.data[0].card_img);
        setCoverImgs(res.data[0].cover_imgs);
    };

    const GetImgs = async() =>{
        const res = await Axios.get(`http://localhost:8080/places/getplaceimgnames/${placeInfo.place_id}`);
        console.log(res.data);
        setImgs(res.data);
    }
    useEffect(() => {
        GetImgs();
    }, [placeInfo]);

    useEffect(() => {
        GetPlaces();
    }, []);


    const ImgDeleteHandler = (index,id) => async() =>{
        console.log(index,id)
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
        setNewImgs([...newImgs, { file: selectedFile }]);
    };

    //delete new images
    const newImgDeleteHandler = (index) => () => {
        const new_Imgs = [...newImgs];
        new_Imgs.splice(index, 1);
        setNewImgs(new_Imgs);
    };
    
    

    //Update
    const UpdateHandler = async() => {
        
        console.log(cardImg)
        console.log(coverImgs)
        console.log(newImgs)
        console.log(newCardImg)
        console.log(newCoverImgs)
        console.log(deletedImgs)
        

    }
  return (
    <div className='editeplace'>
        <h1>EditePlace</h1>
        <div className='editeplace-line'></div>

        <div className='editeplace-div1'>
            <div className='editeplace-search-div'>
                <input type="text" placeholder='Name'/>
            </div>

            <div className='editeplace-search-result-div'>
                {places.length>0 && places.map((place,index)=>{
                    return(
                        <div className='editeplace-search-result' key={index}>
                            <p>{place.place_id}</p>
                            <p>{place.place_name}</p>
                            <a onClick={SelectHandler(place.place_id)}>Select</a>
                        </div>
                    )
                }    )}
            </div>


            <div className='editeplace-form-div'>
                <div>
                    <label>Name:</label>
                    <input type='text'  value={name}  onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <label>Lat</label>
                        <input type='number' value={lat} onChange={(e)=>setLat(e.target.value)}/>
                    </div>
                    <div>
                        <label>Lng</label>
                        <input type='number' value={lng} onChange={(e)=>setLng(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>time duration</label>
                    <input  value={time} onChange={(e)=>setTime(e.target.value)}/>
                </div>
                <div>
                    <label>visiting fee</label>
                    <input type='number'  value={fee} onChange={(e)=>setFee(e.target.value)}/>
                </div>
                <div>
                    <label>description</label>
                    <textarea  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>short description</label>
                    <textarea value={short} onChange={(e)=>setShort(e.target.value)}/>
                </div>
                <div>
                    <label>card image:</label>
                    <input type='file' onChange={(e)=>setNewCardImg(e.target.files[0])}/>
                    {newCardImg ?
                        <img className='editeplace-form-img' src={URL.createObjectURL(newCardImg)} alt="" />
                        :
                        <img   src={`http://localhost:8080/places/placeimg/?file=${cardImg}`}/>
                    }
                    
                    
                </div>
                <div>
                    <label>cover image:</label>
                    <input type='file' onChange={(e)=>setNewCoverImgs(e.target.files[0])}/>
                    {newCoverImgs ?
                        <img className='editeplace-form-img' src={URL.createObjectURL(newCoverImgs)} alt="" />
                        :
                        <img   src={`http://localhost:8080/places/placeimg/?file=${coverImgs}`}/>
                    }
                    
                    
                </div>
                
            </div>

            <div className='editeplace-form-img-div'>
                {imgs.length>0 && imgs.map((img,index)=>{
                    return(
                        <div className='editeplace-form-img_div' key={index}>
                            <img className='editeplace-form-img' src={`http://localhost:8080/places/placeimg/?file=${img.img_name}`} alt="" />
                            <a onClick={ImgDeleteHandler(index,img.img_name)}>DeLETE</a>
                        </div>
                    )
                
                }
                )}

                

                <div>
                    <label>Add Image</label>
                    <input type='file' placeholder='Upload' multiple={true} onChange={(e) => Filehandler(e)} className='add_place_input' />
                
                </div>
                {newImgs.length > 0 && newImgs.map((img, index) => (
    <div className='editeplace-form-img_div' key={index}>
        <img className='editeplace-form-img' src={URL.createObjectURL(img.file)} alt="" />
        <a onClick={newImgDeleteHandler(index)}>DELETE</a>
    </div>
))}



            </div>

        </div>
        <button onClick={UpdateHandler}>Update</button>
    
                    
    
    </div>
  )
}
