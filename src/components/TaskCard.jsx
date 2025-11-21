import React from 'react';

function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </h3>
      {task.dueDate && (
        <p>
          <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <div>
        {!task.completed && (
          <button style={buttonStyle} onClick={() => onComplete(task._id)}>
            Complete
          </button>
        )}
        <button style={buttonStyle} onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

// Optional inline styles
const cardStyle = {
  border: '1px solid #ccc',
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