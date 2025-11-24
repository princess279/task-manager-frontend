import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Use the correct auth API
  const API_URL = import.meta.env.VITE_API_AUTH_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      alert('Signup successful! Please login.');
      navigate('/'); // redirect to login page
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required
          style={{ width: '100%', padding: '10px', margin: '8px 0' }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: '100%', padding: '10px', margin: '8px 0' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: '100%', padding: '10px', margin: '8px 0' }}
        />
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;