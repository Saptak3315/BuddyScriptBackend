import React, { useEffect, useState } from 'react';
import Nb from './Nb';
import Post from './Post';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logedin, setpost } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


const Feed1: React.FC = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:3333/islogin',{withCredentials:true})
    .then(res=>{
      const user=res.data;
      dispatch(logedin({id:user.id,name:user.username}))
      
    }).catch(error=>{
      navigate('/login')
    })
    axios.get(`http://localhost:3333/ap/${1}`,{withCredentials:true}).then(res=>{dispatch(setpost(res.data))})
  },[])
  /*if (!username) {
    window.location.href = "/login";
    return null;
  }*/
  

  return (
    <div className='_layout _layout_main_wrapper'>
      <div className="_main_layout">
        <Nb />
        <Post />
      </div>
    </div>
  );
};

export default Feed1;
