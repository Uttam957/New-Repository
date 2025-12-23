import CommentItem from "./CommentItem";

export default function CommentList({ comments = [], taskId, refreshTasks }) {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          taskId={taskId}
          refreshTasks={refreshTasks}
        />
      ))}
    </ul>
  );
}

