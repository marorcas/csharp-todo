import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services";
import styles from "./TasksPage.module.scss";
import TaskCard from "../../components/TaskCard/TaskCard";
import CompletedTab from "../../components/CompletedTab/CompletedTab";
import PriorityTab from "../../components/PriorityTab/PriorityTab";

interface TasksPageProps {
  tasks: TaskResponse[];
}

const TasksPage = ({ tasks }: TasksPageProps) => {
  return (
    <div className={styles.TasksPage}>
      <h1>My To-Do List</h1>

      <div className={styles.Links}>
        <Link to="/new">Create task</Link>
      </div>

      <div className={styles.FilterTabs}>
        <CompletedTab/>
        
        <PriorityTab/>
      </div>

      <div className={styles.TasksContainer}>
        {tasks.length === 0 ? (
          <p>No current pending tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  )
}

export default TasksPage