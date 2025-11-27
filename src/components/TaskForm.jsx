import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded, user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dailyReminder, setDailyReminder] = useState(false); // user's daily reminder preference
  const [reminderTime, setReminderTime] = useState('');       // user's reminder time

  const token = localStorage.getItem('token');
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  // Initialize form state based on logged-in user's preferences
  useEffect(() => {
    if (user?.dailyReminder) {
      setDailyReminder(true);
      if (user.reminderTime) setReminderTime(user.reminderTime);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Task title cannot be empty');

    try {
      const payload = { title, description, dueDate, priority };

      if (dailyReminder) {
        payload.dailyReminder = true;
        payload.reminderTime = reminderTime || null; // optional time if they ticked daily
      } else if (reminderTime) {
        payload.reminderTime = reminderTime; // one-time reminder
        payload.dailyReminder = false;
      }

      const res = await axios.post(`${TASK_API_URL}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onTaskAdded(res.data.task);

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
      setDailyReminder(user?.dailyReminder || false);
      setReminderTime(user?.reminderTime || '');
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

      {/* Daily Reminder Toggle */}
      <label style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
        <input
          type="checkbox"
          checked={dailyReminder}
          onChange={(e) => setDailyReminder(e.target.checked)}
          style={{ marginRight: '8px' }}
        />
        Enable Daily Reminder
      </label>

      {/* Only show reminder time if dailyReminder is ticked */}
      {dailyReminder && (
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          style={inputStyle}
        />
      )}

      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
}

const inputStyle = { width: '95%', padding: '8px', margin: '5px 0' };
const buttonStyle = { padding: '8px 16px', marginTop: '10px', cursor: 'pointer' };

export default TaskForm;