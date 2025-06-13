import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditEmp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://employee-crud-3.onrender.com/${id}`)
      .then(res => {
        const emp = res.data;
        setName(emp.name);
        setEmail(emp.email);
        setAge(emp.age);
        setRole(emp.role);
        setSalary(emp.salary);
      })
      .catch(err => console.log("Error loading employee:", err));
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    axios.put(`https://employee-crud-3.onrender.com/update/${id}`, {
      name,
      email,
      age,
      role,
      salary
    })
    .then(() => navigate('/'))
    .catch(err => console.log("Update failed:", err));
  };

  const Back = (e) => {
    e.preventDefault();
    navigate('/');
  };

  // Handlers without inline e =>
  const handleAgeChange = ({ target: { value } }) => setAge(value);
  const handleSalaryChange = ({ target: { value } }) => setSalary(value);

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 bg-white rounded p-3 shadow'>
        <form onSubmit={handleEdit}>
          <h2 className="mb-4">Edit Employee Details</h2>

          <div className='mb-3'>
            <label>Name</label>
            <input type="text" className='form-control' value={name} onChange={e => setName(e.target.value)} required/>
          </div>

          <div className='mb-3'>
            <label>Email</label>
            <input type="email" className='form-control' value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>

          <div className='mb-3'>
            <label>Age</label>
            <input type="number" className='form-control' value={age} onChange={handleAgeChange} required min={18} max={65}/>
          </div>

          <div className='mb-3'>
            <label>Role</label>
            <input type="text" className='form-control' value={role} onChange={e => setRole(e.target.value)} required/>
          </div>

          <div className='mb-3'>
            <label>Salary</label>
            <input type="number" className='form-control' value={salary} onChange={handleSalaryChange} required min={0}/>
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-success' type="submit">Update</button>
            <button className='btn btn-success' onClick={Back}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmp;