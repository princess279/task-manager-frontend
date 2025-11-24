import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete, onUpdate }) {

  // Wrapper to respect "cannot mark complete before dueDate"
  const handleToggleComplete = (task) => {
    const now = new Date();
    const due = task.dueDate ? new Date(task.dueDate) : null;

    // Only allow marking as completed if dueDate has passed
    if (due && due > now) {
      alert("You cannot mark this task as completed before its due date.");
      return;
    }

    // Call original toggle
    onToggleComplete(task);
  };

  return (
    <div>
      {tasks.length === 0 && <p>No tasks to show.</p>}
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={handleToggleComplete} // use wrapper
        />
      ))}
    </div>
  );
}

export default TaskList;