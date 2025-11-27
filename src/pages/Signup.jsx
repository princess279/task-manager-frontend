import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Prepare timezone options for react-select
  const timezoneOptions = Intl.supportedValuesOf('timeZone').map((tz) => ({
    value: tz,
    label: tz,
  }));

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !timezone) {
      alert('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/register`, { name, email, password, timezone });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
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
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#555',
            }}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        {/* Searchable timezone dropdown */}
        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
          <Select
            options={timezoneOptions}
            value={timezoneOptions.find((tz) => tz.value === timezone)}
            onChange={(selected) => setTimezone(selected.value)}
            placeholder="Select your timezone"
            isSearchable
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
``