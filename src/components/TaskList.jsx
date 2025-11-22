// src/components/TaskList.jsx
import React from 'react';
import TaskCard from './TaskCard';

function TaskList({ tasks = [], onUpdate, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onComplete={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;