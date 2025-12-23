import api from '../api/api';
export default function CommentItem({ comment, taskId, refreshTasks }) {
  const deleteComment = async () => {
    await api.delete(`/tasks/${taskId}/comments/${comment.id}`);
    refreshTasks();
  };

  return (
    <li>
      {comment.text}
      <button onClick={deleteComment} style={{ marginLeft: "8px" }}>
        X
      </button>
    </li>
  );
}
