import React, { useState } from 'react';
function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // Pass task object to parent component
    onSubmit({ title, dueDate: dueDate || null });
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        style={inputStyle}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
}

// Optional inline styles
const formStyle = {
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1rem',
  flexWrap: 'wrap',
};

const inputStyle = {
  padding: '0.4rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.4rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default TaskForm;