import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import SortableHeader from './SortableHeader';
import axios from 'axios';
import { Plus, Trash2, SquarePen } from 'lucide-react';

function Employee() {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
      .then(() => {
        setEmployee(employee.filter(emp => emp._id !== id));
      })
      .catch(err => console.log("Error deleting employee:", err));
  };

  const sortEmployees = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...employee].sort((a, b) => {
      if (typeof a[key] === 'number') {
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === 'asc'
          ? a[key]?.localeCompare(b[key])
          : b[key]?.localeCompare(a[key]);
      }
    });

    setEmployee(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div className="container py-4 min-vh-100">
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-lg-10 bg-white p-4 rounded shadow-sm">
          <div className="mb-3">
            <Search onSearch={setSearchQuery} />
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-between align-items-center mb-3">
            <h3 className="mb-2 mb-sm-0">Employee List</h3>
            <Link to="/create" className="btn btn-success d-flex align-items-center gap-2">
              <Plus size={18} /> Add
            </Link>
          </div>

          <div className="table-responsive rounded shadow mb-3">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <SortableHeader
                    label="Name"
                    columnKey="name"
                    sortConfig={sortConfig}
                    onSort={sortEmployees}
                  />
                  <th>Email</th>
                  <SortableHeader
                    label="Age"
                    columnKey="age"
                    sortConfig={sortConfig}
                    onSort={sortEmployees}
                  />
                  <th>Role</th>
                  <SortableHeader
                    label="Salary"
                    columnKey="salary"
                    sortConfig={sortConfig}
                    onSort={sortEmployees}
                  />
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map(emp => (
                    <tr key={emp._id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.age}</td>
                      <td>{emp.role}</td>
                      <td>{emp.salary}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2 flex-nowrap">
                          <Link
                            to={`/update/${emp._id}`}
                            className="btn btn-primary d-flex align-items-center gap-1"
                          >
                            <SquarePen size={16} /> Edit
                          </Link>
                          <button
                            className="btn btn-danger d-flex align-items-center gap-1"
                            onClick={() => handleDelete(emp._id)}
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;