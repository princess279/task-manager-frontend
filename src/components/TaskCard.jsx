// src/components/TaskCard.jsx
import React from 'react';

function TaskCard({ task, onComplete, onDelete, onEdit }) {
  if (!task) return null;

  const priorityColor = task.priority === 'High' ? '#ff4d4d' :
                        task.priority === 'Medium' ? '#ffcc00' : '#4dff4d';

  return (
    <div style={{ ...cardStyle, borderColor: priorityColor }}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title || 'Untitled Task'}</h3>
      {task.description && <p>{task.description}</p>}
      {task.dueDate && <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>}
      {task.priority && <p><strong>Priority:</strong> {task.priority}</p>}
      <div>
        {!task.completed && <button style={buttonStyle} onClick={() => onComplete(task._id)}>Complete</button>}
        <button style={buttonStyle} onClick={() => onDelete(task._id)}>Delete</button>
        <button style={buttonStyle} onClick={() => onEdit(task)}>Edit</button>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '2px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  margin: '0.5rem 0',
  backgroundColor: '#1a1a1a',
  color: '#fff',
};

const buttonStyle = {
  marginRight: '0.5rem',
  padding: '0.4rem 0.8rem',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default TaskCard;