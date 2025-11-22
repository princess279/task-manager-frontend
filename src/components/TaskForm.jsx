// src/components/TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await axios.post(
        `${API_URL}/tasks`,
        { title, description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTaskAdded(res.data);
      setTitle(''); setDescription(''); setDueDate('');
    } catch (err) {
      console.error('Error adding task:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required style={inputStyle} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={textareaStyle} />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
}

const inputStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #ccc' };
const textareaStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '60px' };
const buttonStyle = { padding: '10px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none' };

export default TaskForm;