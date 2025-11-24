// src/components/TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const token = localStorage.getItem('token');
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        TASK_API_URL,
        { title, description, dueDate, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onTaskAdded(res.data.task);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    } catch (err) {
      console.error('Error adding task:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: '6px', marginRight: '5px' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '6px', marginRight: '5px' }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        style={{ padding: '6px', marginRight: '5px' }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '6px', marginRight: '5px' }}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>Add Task</button>
    </form>
  );
};

export default TaskForm;