import { Link } from "react-router-dom";
import styles from "./TaskCard.module.scss";
import { useContext, useState } from "react";
import { deleteTaskById, getAllTasks, TaskResponse, updateTaskById, UpdateTaskRequest } from "../../services/task-services";
import { TasksContext } from "../../contexts/TasksContextProvider/TasksContextProvider";
import HighlighterIcon from "./HighlighterIcon";
import DeleteIcon from "./DeleteIcon";

interface TaskCardProps {
    task: TaskResponse;
}

const TaskCard = ({ task }: TaskCardProps) => {
    const tasksContext = useContext(TasksContext);
    if (tasksContext === undefined) {
        throw new Error('Something went wrong');
    }
    const { tasks, setTasks } = tasksContext;
    
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [priority, setPriority] = useState<boolean>(task.priority);
    
    const toggleCompleted = async () => {
        const taskCompleted = !completed;
        setCompleted(taskCompleted);

        const updateCompleted: UpdateTaskRequest = {
            completed: taskCompleted,
            priority: undefined,
        }

        await updateTaskById(task.id, updateCompleted);

        task.completed = taskCompleted;

        console.log(task);

        if (taskCompleted) {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => !task.completed);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        } else {
            getAllTasks()
                .then((data) => {
                    const updatedData = data.filter((task) => task.completed);
                    setTasks(updatedData);
                })
                .catch((e) => console.warn(e));
        }
    }

    const togglePriority = async () => {
        const taskPriority = !priority;
        setPriority(taskPriority);

        const updatePriority: UpdateTaskRequest = {
            completed: undefined,
            priority: taskPriority,
        }

        await updateTaskById(task.id, updatePriority);

        task.priority = taskPriority;

        console.log(task);
    }

    const onDelete = async (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this task?");
        if (!confirmed) {
            return;
        }
    
        const isDeleted = await deleteTaskById(id)
            .catch((e) => {
                console.log(e)
                return false;
            });
    
        if (isDeleted) {
            const updatedTasks = tasks.filter(task => task.id !== id);
            setTasks(updatedTasks);
        }
    }

    const taskClassNames = [
        styles.Task,
        completed && styles.Completed,
        priority && styles.Priority
      ]
        .filter(Boolean)
        .join(' ');

    return(
        <article className={styles.TaskCard}>
            <div className={styles.CheckboxContainer}>
                <input
                    className={styles.Checkbox}
                    type="checkbox"
                    checked={completed}
                    onChange={toggleCompleted}
                />
            </div>

            <Link 
                className={styles.TaskInfo}
                key={task.id}
                to={`/${task.id}/edit`}
            >
                <h2 className={taskClassNames}>{task.name}</h2>
            </Link>

            <button 
                className={styles.HighlighterContainer} 
                onClick={togglePriority}
            >
                <HighlighterIcon />
            </button>

            <button 
                className={styles.DeleteContainer} 
                onClick={() => onDelete(task.id)}
            >
                <DeleteIcon />
            </button>
        </article>
    )
}

export default TaskCard;