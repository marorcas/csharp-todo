import { useEffect, useState } from "react";
import { getTaskById, TaskResponse, updateTaskById } from "../../services/task-services";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../../components/TaskForm/TaskForm";
import { TaskFormData } from "../../components/TaskForm/schema";
import styles from "./EditTaskPage.module.scss";

type FetchStatus = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
 
const EditTaskPage = () => {
    const { id } = useParams() as { id: string };
    const idNumber = parseInt(id);

    const navigate = useNavigate();
    
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>('IDLE');
    const [error, setError] = useState<Error | null>(null);
    const [task, setTask] = useState<TaskResponse | null>(null);

    useEffect(() => {
        setFetchStatus('LOADING');

        getTaskById(idNumber)
            .then(task => {
                setFetchStatus('SUCCESS');
                setTask(task);
            })
            .catch((e: Error) => {
                setFetchStatus('FAILURE');
                setError(e);
            });
    }, []);

    const onSubmit = async (data: TaskFormData) => {
        console.log(data)
        updateTaskById(idNumber, data)
            .then(task => {
                console.log(task)
                navigate('/')
            })
            .catch(() => alert('Failed to update post'));
    }

    return (
        <div className={styles.EditTaskPage}>
            <h1>Edit Task</h1>
            {fetchStatus === 'LOADING' && <p>Loading...</p>}

            {fetchStatus === 'FAILURE' && (
                <p style={{color: 'red'}}>
                    {error?.message}
                </p>
            )}

            {fetchStatus === 'SUCCESS' && task && 
                <TaskForm 
                    formType='EDIT' 
                    defaultValues={{ name: task.name }}
                    onSubmit={onSubmit} 
                />
            }

            <Link className={styles.Cancel} to="/">Cancel</Link>
        </div>
    )
}

export default EditTaskPage;