import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditTaskModal({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedTask = { title, description, dueDate };
      const res = await axios.put(`${API_URL}/tasks/${task._id}`, updatedTask, { headers: { Authorization: `Bearer ${token}` } });
      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error('Error updating task:', err.response?.data || err.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ marginBottom: '15px' }}>Edit Task</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task Title" required style={inputStyle} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={textareaStyle} />
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" style={saveBtnStyle} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <button type="button" style={cancelBtnStyle} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlay = {
  position: 'fixed',
  top:0, left:0, right:0, bottom:0,
  backgroundColor:'rgba(0,0,0,0.6)',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  zIndex:1000,
  animation: 'fadeIn 0.2s',
};

const modal = {
  backgroundColor:'#1f1f1f',
  color:'#fff',
  padding:'25px',
  borderRadius:'10px',
  width:'400px',
  maxWidth:'90%',
  boxShadow:'0 8px 16px rgba(0,0,0,0.3)',
  transform:'translateY(0)',
  animation: 'slideIn 0.2s ease-out',
};

const inputStyle = { padding:'10px', borderRadius:'5px', border:'1px solid #555', backgroundColor:'#2a2a2a', color:'#fff' };
const textareaStyle = { padding:'10px', borderRadius:'5px', border:'1px solid #555', minHeight:'60px', backgroundColor:'#2a2a2a', color:'#fff' };
const saveBtnStyle = { padding:'8px 12px', borderRadius:'5px', cursor:'pointer', border:'none', backgroundColor:'#28a745', color:'#fff' };
const cancelBtnStyle = { padding:'8px 12px', borderRadius:'5px', cursor:'pointer', border:'none', backgroundColor:'#dc3545', color:'#fff' };

export default EditTaskModal;