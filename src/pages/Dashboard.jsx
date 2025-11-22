// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import EditTaskModal from '../components/EditTaskModal';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All'); // All, Completed, Pending, High, Medium, Low

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  // Fetch user and tasks
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return navigate('/login');

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
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token, API_URL]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Task actions
  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);
  const handleUpdateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  const handleDeleteTask = (taskId) =>
    setTasks(tasks.filter((t) => t._id !== taskId));

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return task.priority === filter;
  });

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <>
      <Navbar userName={user?.name} />

      <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <p>Email: {user?.email || ''}</p>

        <button
          onClick={handleLogout}
          style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Logout
        </button>

        {/* Add Task Form */}
        <TaskForm onTaskAdded={handleAddTask} />

        {/* Filters */}
        <div style={{ margin: '10px 0' }}>
          <label style={{ marginRight: '10px' }}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Task List with Edit button wired */}
        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onEdit={setEditingTask} // Opens EditTaskModal
        />

        {/* Edit Task Modal */}
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onUpdate={handleUpdateTask}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;