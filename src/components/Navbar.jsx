// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ userName, taskCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      <div style={leftNav}>
        <h2 style={{ margin: 0 }}>Task Manager</h2>
      </div>

      <div style={rightNav}>
        {userName && <span style={userStyle}>Hello, {userName}</span>}
        {typeof taskCount === 'number' && (
          <span style={taskCountStyle}>{taskCount} Active Tasks</span>
        )}
        <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      </div>
    </nav>
  );
}

// Styles
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#3b82f6', // blue
  color: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderRadius: '6px'
};

const leftNav = {};
const rightNav = { display: 'flex', alignItems: 'center', gap: '15px' };
const userStyle = { fontWeight: 'bold' };
const taskCountStyle = { backgroundColor: '#2563eb', padding: '3px 8px', borderRadius: '4px', fontSize: '14px' };
const buttonStyle = { padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: 'none', backgroundColor: '#ef4444', color: '#fff' };

export default Navbar;