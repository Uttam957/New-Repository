import { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from '../Task/TaskForm';
import TaskList from '../Task/TaskList';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
     <TaskForm refreshTasks={fetchTasks} /> 
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
    </>
  );
}
