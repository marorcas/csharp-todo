import { createContext, FC, ReactNode, useState } from "react";
import { TaskResponse } from "../../services/task-services";

interface TasksContextType {
    tasks: TaskResponse[];
    setTasks: React.Dispatch<React.SetStateAction<TaskResponse[]>>;
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksContextProviderProps {
    children: ReactNode;
}

const TasksContextProvider: FC<TasksContextProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    return (
        <TasksContext.Provider value={{tasks, setTasks}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksContextProvider;