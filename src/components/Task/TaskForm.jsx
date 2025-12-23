import { useState } from "react";
import api from '../api/api';

export default function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/tasks", { title });
    setTitle("");
    refreshTasks();
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button>Add Task</button>
    </form>
  );
}
