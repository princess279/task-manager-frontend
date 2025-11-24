// src/components/TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';
import axios from 'axios';

const TaskList = ({ tasks, onDelete, onEdit, onUpdate }) => {
  const token = localStorage.getItem('token');
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;

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

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={handleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;