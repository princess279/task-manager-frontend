// src/components/TaskList.jsx
import React from 'react';

function TaskList({ tasks, onUpdate, onDelete, onEdit }) {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <div>
      {tasks.map(task => (
        <div key={task._id} style={taskCard}>
          <div style={{ textAlign: 'left' }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            {task.reminderTime && <p>🕒 Reminder: {task.reminderTime}</p>}
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button onClick={() => onEdit(task)} style={buttonStyle}>Edit</button>
            <button onClick={() => onDelete(task._id)} style={buttonStyle}>Delete</button>
            <button
              onClick={() => onUpdate({ ...task, completed: !task.completed })}
              style={buttonStyle}
            >
              {task.completed ? 'Mark Pending' : 'Mark Completed'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const taskCard = {
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '10px',
  backgroundColor: '#f9f9f9'
};

const buttonStyle = {
  marginRight: '5px',
  padding: '6px 12px',
  cursor: 'pointer'
};

export default TaskList;