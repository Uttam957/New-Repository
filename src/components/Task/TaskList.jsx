import TaskItem from "./TaskItem";

export default function TaskList({ tasks, refreshTasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          refreshTasks={refreshTasks}
        />
      ))}
    </ul>
  );
}
