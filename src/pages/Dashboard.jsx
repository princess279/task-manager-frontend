// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userRes = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data.user);

        const tasksRes = await axios.get(`${API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasksRes.data);
      } catch (err) {
        console.error('Error loading dashboard:', err.response?.data || err.message);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTasks();
  }, [navigate, token, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Add new task
  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Update existing task
  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={handleLogout}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Logout
      </button>

      <TaskForm onTaskAdded={handleAddTask} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default Dashboard;