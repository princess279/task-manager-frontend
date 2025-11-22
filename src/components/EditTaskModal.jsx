// src/components/EditTaskModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditTaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
    setDueDate(task?.dueDate ? task.dueDate.split('T')[0] : '');
    setPriority(task?.priority || 'Medium');
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await axios.put(
        `${API_URL}/tasks/${task._id}`,
        { title, description, dueDate, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalStyle}>
        <h3>Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} required style={{ padding: '8px', width: '90%', marginBottom: '10px' }} />
          <textarea value={description} placeholder="Description (optional)" onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px', width: '90%', marginBottom: '10px' }} />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ padding: '8px', marginBottom: '10px' }} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '8px', marginBottom: '10px' }}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <br />
          <button type="submit" style={{ padding: '8px 16px', marginRight: '10px' }}>Save</button>
          <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
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

export default EditTaskModal;