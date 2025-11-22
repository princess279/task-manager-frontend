// src/components/TaskList.jsx
import React from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';

function TaskList({ tasks, setTasks, onUpdate, onDelete }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

// complete a Task
  const handleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      const updatedTask = { ...task, completed: true };
      await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask, { headers: { Authorization: `Bearer ${token}` } });
      onUpdate(updatedTask);
    } catch (err) {
      console.error('Error completing task:', err.response?.data || err.message);
    }
  };

// Delete a Task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });
      onDelete(taskId);
    } catch (err) {
      console.error('Error deleting task:', err.response?.data || err.message);
    }
  };

  if (tasks.length === 0) return <p>No tasks yet. Add one above!</p>;

  return (
    <div>
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;