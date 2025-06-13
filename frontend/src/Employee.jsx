import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';
import { Plus, Trash2, SquarePen } from 'lucide-react';

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employee.filter(emp => {
    const query = searchQuery.trim().toLowerCase();
    return (
      emp.name?.toLowerCase().includes(query) ||
      emp.email?.toLowerCase().includes(query) ||
      emp.role?.toLowerCase().includes(query) ||
      emp.age?.toString().includes(query) ||
      emp.salary?.toString().includes(query)
    );
  });

  useEffect(() => {
    axios.get("https://employee-crud-3.onrender.com/")
      .then(res => setEmployee(res.data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    axios.delete(`https://employee-crud-3.onrender.com/delete/${id}`)
      .then(res => {
        console.log("Employee deleted successfully");
        setEmployee(employee.filter(emp => emp._id !== id));
      })
      .catch(err => {
        console.log("Error deleting employee:", err);
      });
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <Search onSearch={setSearchQuery} />

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">
            <h3 className="mb-2 mb-sm-0">Employee List</h3>
            <Link to="/create" className="btn btn-success d-flex align-items-center gap-2">
              Add <Plus size={18} />
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead className="table">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.age}</td>
                    <td>{emp.role}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Link
                          to={`/update/${emp._id}`}
                          className="btn btn-primary d-flex align-items-center gap-2"
                        >
                          Edit <SquarePen size={18} />
                        </Link>
                        <button
                          className="btn btn-danger d-flex align-items-center gap-2"
                          onClick={() => handleDelete(emp._id)}
                        >
                          Delete <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Employee;
