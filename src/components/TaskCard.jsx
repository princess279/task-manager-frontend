import React, { useState } from 'react';

function TaskCard({ task, onEdit, onDelete, onToggleComplete, token }) {
  const [dailyReminder, setDailyReminder] = useState(task.dailyReminder || false);
  const [reminderTime, setReminderTime] = useState(task.reminderTime || '');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#f87171';
      case 'Medium': return '#facc15';
      case 'Low': return '#34d399';
      default: return '#ddd';
    }
  };

  const isTaskDue = task.dueDate ? new Date(task.dueDate) <= new Date() : true;

  // Update backend when daily reminder changes
  const handleDailyToggle = async () => {
    const updated = !dailyReminder;
    setDailyReminder(updated);
    try {
      await fetch(`/api/tasks/${task._id}/reminder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dailyReminder: updated, reminderTime }),
      });
    } catch (err) {
      console.error('Error updating daily reminder:', err);
    }
  };

  // Update backend when time changes
  const handleTimeChange = async (e) => {
    const time = e.target.value;
    setReminderTime(time);
    try {
      await fetch(`/api/tasks/${task._id}/reminder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dailyReminder, reminderTime: time }),
      });
    } catch (err) {
      console.error('Error updating reminder time:', err);
    }
  };

  return (
    <div style={{ ...cardStyle, borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}>
      <div style={headerStyle}>
        <h4 style={{ margin: 0 }}>{task.title || 'Untitled Task'}</h4>
        {reminderTime && <span style={reminderStyle}>🕒 {reminderTime}</span>}
        {dailyReminder && <span style={dailyReminderStyle}>🔔 Daily</span>}
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

      {/* Daily reminder & time input */}
      <div style={{ ...metaStyle, gap: '10px' }}>
        <label>
          <input type="checkbox" checked={dailyReminder} onChange={handleDailyToggle} /> Daily Reminder
        </label>
        <label>
          Set Reminder Time:
          <input type="time" value={reminderTime} onChange={handleTimeChange} style={{ marginLeft: '5px' }} />
        </label>
      </div>

      <div style={buttonGroup}>
        <button onClick={() => onEdit(task)} style={buttonStyle}>Edit</button>
        <button onClick={() => onDelete(task._id)} style={buttonStyle}>Delete</button>
        <button
          onClick={() => onToggleComplete(task)}
          style={buttonStyle}
          disabled={!isTaskDue || task.completed}
        >
          {task.completed ? 'Completed' : 'Mark Completed'}
        </button>
      </div>
    </div>
  );
}

// Styles remain unchanged
const cardStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '15px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  borderLeft: '5px solid #ddd',
};

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '10px' };
const reminderStyle = { fontSize: '14px', color: '#555' };
const dailyReminderStyle = { fontSize: '14px', color: '#3b82f6', fontWeight: 'bold' };
const descStyle = { fontSize: '14px', color: '#666', marginBottom: '8px' };
const metaStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#444', marginBottom: '10px' };
const buttonGroup = { display: 'flex', justifyContent: 'flex-end' };
const buttonStyle = { marginLeft: '5px', padding: '6px 12px', cursor: 'pointer', border: 'none', borderRadius: '4px', backgroundColor: '#3b82f6', color: '#fff', fontSize: '13px' };

export default TaskCard;