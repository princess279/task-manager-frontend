import React from 'react';

function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#f87171';
      case 'Medium': return '#facc15';
      case 'Low': return '#34d399';
      default: return '#ddd';
    }
  };

  // Only display optional time (HH:mm)
  const getFormattedReminderTime = (reminderTime) => {
    if (!reminderTime) return null;
    return reminderTime; // expect HH:mm string
  };

  const formattedReminder = getFormattedReminderTime(task.reminderTime);

  // Check if task is overdue (past dueDate)
  const isTaskDue = task.dueDate ? new Date(task.dueDate) <= new Date() : true;

  return (
    <div style={{ ...cardStyle, borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}>
      <div style={headerStyle}>
        <h4 style={{ margin: 0 }}>{task.title || 'Untitled Task'}</h4>
        {formattedReminder && (
          <span style={reminderStyle}>🕒 {formattedReminder}</span>
        )}
      </div>

      {task.description && <p style={descStyle}>{task.description}</p>}

      <div style={metaStyle}>
        <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
        <span>
          Status: <b>{task.completed ? 'Completed' : task.status}</b>
          {task.completed && task.autoCompleted && (
            <em style={{ marginLeft: '5px', color: '#888', fontStyle: 'italic', fontSize: '12px' }}>
              (Auto-completed)
            </em>
          )}
        </span>
        <span>Priority: <b>{task.priority}</b></span>
      </div>

      <div style={buttonGroup}>
        <button onClick={() => onEdit(task)} style={buttonStyle}>Edit</button>
        <button onClick={() => onDelete(task._id)} style={buttonStyle}>Delete</button>
        <button
          onClick={() => onToggleComplete(task)}
          style={buttonStyle}
          disabled={!isTaskDue || task.completed} // cannot mark if not due or already completed
        >
          {task.completed ? 'Completed' : 'Mark Completed'}
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '15px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  borderLeft: '5px solid #ddd',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const reminderStyle = {
  fontSize: '14px',
  color: '#555',
};

const descStyle = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '8px',
};

const metaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  color: '#444',
  marginBottom: '10px',
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyle = {
  marginLeft: '5px',
  padding: '6px 12px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3b82f6',
  color: '#fff',
  fontSize: '13px',
};

export default TaskCard;