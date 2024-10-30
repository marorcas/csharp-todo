import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema, TaskFormData } from "./schema";
import styles from "./TaskForm.module.scss";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../../contexts/TasksContextProvider/TasksContextProvider";
import { deleteTaskById } from "../../services/task-services";

type FormType = 'ADD' | 'EDIT';

interface TaskFormProps {
    formType?: FormType;
    defaultValues?: TaskFormData;
    onSubmit: (data: TaskFormData) => unknown;
}

const TaskForm = ({
    formType = 'ADD', 
    defaultValues = { name: '' }, 
    onSubmit 
}: TaskFormProps) => {

    const {
        reset,
        register, 
        formState: { errors, isSubmitSuccessful }, 
        handleSubmit,
    } = useForm<TaskFormData>({ resolver: zodResolver(schema), defaultValues });

    const tasksContext = useContext(TasksContext);
    if (tasksContext === undefined) {
        throw new Error('Something went wrong');
    }
    const { tasks, setTasks } = tasksContext;

    const { id } = useParams() as { id: string };
    const idNumber = parseInt(id);

    const navigate = useNavigate();
   
    const [name, setName] = useState<string>(defaultValues.name);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
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
            navigate("/");
        }
    }

    isSubmitSuccessful && reset();

    return(
        <>
            <form 
            className={styles.Form} 
            onSubmit={handleSubmit(() => onSubmit({ name }))}
            >

                <div className={styles.Field}>
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name" 
                        type="text" {...register('name')} 
                        onChange={handleNameChange}
                        placeholder="Add name..."
                    />
                    {errors?.name && 
                        <small className={styles.ErrorText}>
                            {errors.name.message}
                        </small>
                    }
                </div>

                <div className={styles.Buttons}>
                    {formType === "EDIT" && <button className={styles.Button} onClick={() => onDelete(idNumber)}>Delete</button>}
                    
                    <button className={styles.Button} type="submit">{formType === 'ADD' ? 'Add' : 'Edit'}</button>
                </div>
            </form>
        </>
    )
}

export default TaskForm;