import React, { useState } from 'react';
import api from '../api/api';
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";

export default function TaskItem({ task, refreshTasks }) {
  // 1. Add state to track if we are currently editing and what the new title is
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const deleteTask = async () => {
    await api.delete(`/tasks/${task.id}`);
    refreshTasks();
  };

  // 2. Add the function to call the Edit (PUT) API
  const handleEdit = async () => {
    try {
      await api.put(`/tasks/${task.id}`, { title: editedTitle });
      setIsEditing(false); // Hide the input box after saving
      refreshTasks();      // Refresh the list to show the new title
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <li style={{ marginBottom: "20px", listStyle: "none" }}>
      {/* 3. Conditional Rendering: Show input if editing, otherwise show the title */}
      {isEditing ? (
        <span>
          <input 
            type="text" 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)} 
          />
          <button onClick={handleEdit} style={{ marginLeft: "10px" }}>Save</button>
          <button onClick={() => setIsEditing(false)} style={{ marginLeft: "5px" }}>Cancel</button>
        </span>
      ) : (
        <span>
          <strong>{task.title}</strong>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: "10px" }}>
            Edit
          </button>
        </span>
      )}

      <button onClick={deleteTask} style={{ marginLeft: "10px" }}>
        Delete
      </button>

      <div style={{ marginTop: "10px", marginLeft: "20px" }}>
        <CommentForm taskId={task.id} refreshTasks={refreshTasks} />
        <CommentList
          comments={task.comments}
          taskId={task.id}
          refreshTasks={refreshTasks}
        />
      </div>
    </li>
  );
}