import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';

function TaskCard({ task, onComplete, onDelete, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: 0 }}>{task.title}</h3>
        <div>
          {!task.completed && (
            <button style={completeBtnStyle} onClick={() => onComplete(task._id)}>Complete</button>
          )}
          <button style={editBtnStyle} onClick={() => setShowEdit(true)}>Edit</button>
          <button style={deleteBtnStyle} onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
      {task.description && <p style={{ margin: '5px 0', color: '#ccc' }}>{task.description}</p>}
      {task.dueDate && <p style={{ margin: '5px 0', color: '#ccc' }}><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>}
      
      {showEdit && <EditTaskModal task={task} onClose={() => setShowEdit(false)} onUpdate={onUpdate} />}
    </div>
  );
}

const cardStyle = {
  border: '1px solid #444',
  borderRadius: '10px',
  padding: '15px',
  margin: '10px 0',
  backgroundColor: '#2a2a2a',
  color: '#fff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  transition: 'transform 0.1s ease-in-out',
};

const completeBtnStyle = { ...buttonBaseStyle, backgroundColor: '#28a745' };
const editBtnStyle = { ...buttonBaseStyle, backgroundColor: '#ffc107', color: '#000' };
const deleteBtnStyle = { ...buttonBaseStyle, backgroundColor: '#dc3545' };

const buttonBaseStyle = {
  marginLeft: '5px',
  padding: '6px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '0.85rem',
};

export default TaskCard;