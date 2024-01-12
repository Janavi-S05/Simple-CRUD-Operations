import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Create() {
    const [values,setValues]=useState({
        name:'',
        email:''
    });
    const navigate=useNavigate();
    const handle=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/users',values)
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
            <h2>Add Users</h2>
            <div className='mb-2'>
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter name" className='form-control'
                onChange={(e)=>setValues({...values,name:e.target.value})}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Enter email" className='form-control'
                onChange={(e)=>setValues({...values,email:e.target.value})}/>
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}
export default Create;
