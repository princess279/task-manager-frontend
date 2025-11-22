// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Backend URL (make sure this includes /auth if your routes are /api/auth/me)
  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login'); // redirect if not logged in
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user); // set user data from backend
      } catch (err) {
        console.error('Failed to load user data:', err.response?.data || err.message);
        localStorage.removeItem('token'); // remove invalid token
        navigate('/login'); // redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading dashboard...</p>;

  if (!user) return <p>No user data available.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button 
        onClick={handleLogout} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;