// src/components/TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL; // should point to /api/tasks
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await axios.post(
        `${TASK_API_URL}`,
        { title, description, dueDate, priority },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onTaskAdded(res.data);

      // Clear form
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
        style={{ padding: '8px', width: '60%', marginRight: '10px' }}
      />
      <br />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '8px', width: '60%', marginTop: '10px' }}
      />
      <br />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: '8px', marginTop: '10px' }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ padding: '8px', marginLeft: '10px' }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <br />
      <button type="submit" style={{ marginTop: '10px', padding: '8px 16px' }}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;