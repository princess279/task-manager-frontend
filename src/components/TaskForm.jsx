import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [reminderTime, setReminderTime] = useState(''); // Optional
  const token = localStorage.getItem('token');
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Task title cannot be empty');

    try {
      const payload = { title, description, dueDate, priority };
      if (reminderTime) payload.reminderTime = reminderTime; // Optional

      const res = await axios.post(`${TASK_API_URL}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onTaskAdded(res.data.task);

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
      setReminderTime('');
    } catch (err) {
      console.error('Failed to add task:', err.response?.data || err.message);
      alert('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={inputStyle}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={inputStyle}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={inputStyle}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
}

const inputStyle = { width: '95%', padding: '8px', margin: '5px 0' };
const buttonStyle = { padding: '8px 16px', marginTop: '10px', cursor: 'pointer' };

export default TaskForm;