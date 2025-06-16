import React from 'react';
import { Users } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-light border-bottom shadow-sm py-3">
      <div className="container d-flex align-items-center">
        <div className="d-flex align-items-center me-3 bg-primary text-white rounded p-2" style={{ width: '40px', height: '40px' }}>
          <Users size={20} />
        </div>
        <div>
          <h1 className="h4 mb-0 fw-bold">Employee Management</h1>
          <small className="text-muted">Manage your organization's employees</small>
        </div>
      </div>
    </header>
  );
};

export default Header;