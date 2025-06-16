import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddEmp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios.post("https://employee-crud-3.onrender.com/addEmployee", {
      name,
      email,
      age,
      role,
      salary
    })
    .then(result => {
      console.log(result);
      navigate('/');
    })
    .catch(err => {
      console.log("Full Error Response:", err.response);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); 
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
  };

  const Back = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3 shadow'>
        <form onSubmit={Submit}>
          <h2>Add Employee</h2>
          <div className='mb-2'>
            <label>Name</label>
            <input type="text" className='form-control' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input type="email" className='form-control' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className='mb-2'>
            <label>Age</label>
            <input type="number" className='form-control' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} required min={18} max={65}/>
          </div>
          <div className='mb-2'>
            <label>Role</label>
            <input type="text" className='form-control' placeholder='Enter Role' onChange={(e) => setRole(e.target.value)} required/>
          </div>
          <div className='mb-2'>
            <label>Salary</label>
            <input type="number" className='form-control' placeholder='Enter Salary' onChange={(e) => setSalary(e.target.value)} required min={0}/>
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-success'>Submit</button>
            <button className='btn btn-success' onClick={Back}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmp;
