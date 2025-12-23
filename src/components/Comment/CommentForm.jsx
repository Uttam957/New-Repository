import { useState } from "react";
import api from '../api/api';

export default function CommentForm({ taskId, refreshTasks }) {
  const [text, setText] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post(`/tasks/${taskId}/comments`, { text });
    setText("");
    refreshTasks();
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
}
