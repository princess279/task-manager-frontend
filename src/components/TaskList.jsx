// src/components/TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';

const TaskList = ({ tasks, onDelete, onEdit, onUpdate }) => {
  const token = localStorage.getItem('token');
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  // MARK TASK COMPLETE
  const handleComplete = async (taskId) => {
    try {
      const res = await axios.patch(
        `${TASK_API_URL}/${taskId}/complete`,
        {}, // PATCH body is empty
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data.task);
    } catch (err) {
      console.error('Error marking complete:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to mark task complete');
    }
  };

  // DELETE ALL TASKS
  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete all your tasks? This cannot be undone.')) return;

    try {
      await axios.delete(TASK_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate([]); // Clear tasks in parent
      alert('All tasks deleted successfully');
    } catch (err) {
      console.error('Error deleting all tasks:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to delete all tasks');
    }
  };

  return (
    <div>
      {tasks.length > 0 && (
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <button
            onClick={handleDeleteAll}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Delete All Tasks
          </button>
        </div>
      )}

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={handleComplete}
        />
      ))}

      {tasks.length === 0 && <p>No tasks to show.</p>}
    </div>
  );
};

export default TaskList;