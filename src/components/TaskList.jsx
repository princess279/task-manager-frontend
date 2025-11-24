// src/components/TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';

const TaskList = ({ tasks, onDelete, onEdit, onUpdate }) => {
  const token = localStorage.getItem('token');
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

  const handleToggleComplete = async (task) => {
    try {
      const res = await axios.patch(
        `${TASK_API_URL}/${task._id}/complete`,
        {}, // PATCH body is empty
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data.task);
    } catch (err) {
      console.error('Error toggling complete:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to toggle task complete');
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleComplete={handleToggleComplete} // matches TaskCard prop
        />
      ))}
    </div>
  );
};

export default TaskList;