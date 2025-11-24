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
  const [filter, setFilter] = useState('All');
  const [showArchived, setShowArchived] = useState(false);

  const navigate = useNavigate();
  const AUTH_API_URL = import.meta.env.VITE_API_URL;
  const TASK_API_URL = import.meta.env.VITE_TASK_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return navigate('/login');

      try {
        const userRes = await axios.get(`${AUTH_API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data.user);

        const tasksRes = await axios.get(`${TASK_API_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(tasksRes.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, token, AUTH_API_URL, TASK_API_URL]);

  // Add a new task
  const handleAddTask = (newTask) => setTasks([...tasks, newTask]);

  // Update a task or reset tasks after deleting all
  const handleUpdateTask = (updatedTaskOrArray) => {
    if (Array.isArray(updatedTaskOrArray)) {
      // Reset tasks (used for "Delete All Tasks")
      setTasks([]);
    } else {
      // Single task update
      setTasks(tasks.map((t) => (t._id === updatedTaskOrArray._id ? updatedTaskOrArray : t)));
    }
  };

  // Delete a single task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${TASK_API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleDeleteAll = async () => {
  try {
    await axios.delete(`${TASK_API_URL}/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setTasks([]); // clear UI
    alert("All tasks deleted");
  } catch (err) {
    console.error("Delete all failed:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to delete all tasks");
  }
};

  // Filter tasks
  const filteredTasks = tasks
    .filter(task => showArchived ? task.status === 'archived' : task.status !== 'archived')
    .filter(task => {
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
          onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
          style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Logout
        </button>

        {!showArchived && <TaskForm onTaskAdded={handleAddTask} />}

        <div style={{ margin: '10px 0' }}>
          <label>Filter: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '5px' }}>
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <label style={{ marginLeft: '20px' }}>
            <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} />
            Show Archived
          </label>
        </div>

        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdateTask}   // Can now handle "delete all"
          onDelete={handleDeleteTask}
          onEdit={setEditingTask}
        />

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