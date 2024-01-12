import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
function Home() {

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);


  const handledelete=(id)=>{
    axios.delete("http://localhost:8080/api/users/delete/"+id)
    .then(res=>{
      setData(prevData => prevData.filter(user => user._id !== id));
    })
    .catch(err=>console.log(err));
  }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: 'linear-gradient(to right, #4b6cb7, #182848)' }}>
      <div className='w-50 bg-white rounded p-3'>
        <div className='d-flex justify-content-start'>
          <Link to="/create" className='btn btn-success'>Create +</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return <tr key={index} style={{ background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'}}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/${user._id}`} className='btn btn-sm btn-info' style={{marginRight:'10px'}}>Read</Link>
                  <Link to={`/update/${user._id}`} className='btn btn-sm btn-primary' style={{marginRight:'10px'}}>Edit</Link>
                  <button onClick={()=>handledelete(user._id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home;
