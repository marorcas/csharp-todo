import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateTaskPage.module.scss";
import TaskForm from "../../components/TaskForm/TaskForm";
import { TaskFormData } from "../../components/TaskForm/schema";
import { createTask } from "../../services/task-services";

const CreateTaskPage = () => {
    const navigate = useNavigate();
    
    const onSubmit = async (data: TaskFormData) => {
        createTask(data)
            .then((task) => {
                console.log(task)
                navigate('/');
            })
            .catch((e) => console.log(e));
    }

    return(
        <div className={styles.CreateTaskPage}>
            <h1>Create New Task</h1>
            <TaskForm onSubmit={onSubmit} />

            <Link className={styles.Cancel} to="/">Cancel</Link>
        </div>
    )
}

export default CreateTaskPage;