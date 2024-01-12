import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function User() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/" + id)
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    return (
        <div className='d-flex vh-100 justify-content-center align-items-center' style={{ background: 'linear-gradient(to right, #4b6cb7, #182848)' }}>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Information</h2>
                <p>{user._id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <Link to='/' className='btn btn-primary me-2'>Back</Link>
                <Link to={`/update/${user._id}`} className='btn btn-info'>Edit</Link>
            </div>
        </div>
    )
}

export default User
