import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const {id}=useParams();
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:8080/api/users/" + id)
            .then(res => {
                console.log(res.data);
                setValues({...values,name: res.data.name,email: res.data.email});
            })
            .catch(err => console.log(err));
  },[]);

  const [values,setValues]=useState({
    name:'',
    email:''
  });

 
  const handle=(e)=>{
    e.preventDefault();
    axios.put("http://localhost:8080/api/users/update/"+id,values)
    .then(res=>{
      console.log(res);
      navigate("/");
    })
    .catch(err=>console.log(err));
    
  }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: 'linear-gradient(to right, #4b6cb7, #182848)' }}>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handle}>
            <h2>Update user info</h2>
            <div className='mb-2'>
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter name" className='form-control' value={values.name}
                onChange={(e)=>setValues({...values,name:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Enter email" className='form-control' value={values.email}
                onChange={(e)=>setValues({...values,email:e.target.value})}/>
            </div>
            <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update
