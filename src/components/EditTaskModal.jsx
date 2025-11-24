import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditTaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [reminderTime, setReminderTime] = useState(''); // Optional HH:mm

  const API_URL = import.meta.env.VITE_TASK_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setPriority(task.priority || 'Medium');
      setReminderTime(task.reminderTime || '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Task title cannot be empty');

    try {
      const payload = { title, description, dueDate, priority };
      if (reminderTime) payload.reminderTime = reminderTime; // Only send if set

      const res = await axios.put(`${API_URL}/${task._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onUpdate(res.data.task);
      onClose();
    } catch (err) {
      console.error('Failed to update task:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to update task');
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalStyle}>
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
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
          <div style={{ marginTop: '10px' }}>
            <button type="submit" style={buttonStyle}>Save</button>
            <button type="button" onClick={onClose} style={buttonStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  maxWidth: '90%',
  textAlign: 'center',
};

const inputStyle = { width: '90%', padding: '8px', margin: '8px 0' };
const buttonStyle = { padding: '8px 16px', margin: '0 5px' };

export default EditTaskModal;