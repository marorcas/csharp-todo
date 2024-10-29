import { useContext, useEffect } from "react";
import { TasksContext } from "../../contexts/TasksContextProvider/TasksContextProvider";
import { TabSelection, TabSelectionContext } from "../../contexts/TabSelectionContextProvider/TabSelectionContextProvider";
import { getAllTasks } from "../../services/task-services";
import TasksPage from "../../pages/TasksPage/TasksPage";

const TasksPageContainer = () => {
  const tasksContext = useContext(TasksContext);
  if (tasksContext === undefined) {
    throw new Error('Something went wrong');
  }
  const { tasks, setTasks } = tasksContext;
  
  const tabContext = useContext(TabSelectionContext);
  if (tabContext === undefined) {
    throw new Error('Something went wrong');
  }
  const { selectedTab } = tabContext;

  useEffect(() => {
    if (selectedTab === TabSelection.COMPLETED) {
      getAllTasks()
        .then((data) => {
          const updatedData = data.filter((task) => task.completed);
          setTasks(updatedData);
        })
        .catch((e) => console.warn(e));
    } else if (selectedTab === TabSelection.PRIORITY) {
      getAllTasks()
        .then((data) => {
          const updatedData = data.filter((task) => !task.completed && task.priority);
          setTasks(updatedData);
        })
        .catch((e) => console.warn(e));
    } else {
      getAllTasks()
        .then((data) => {
          const updatedData = data.filter((task) => !task.completed);
          setTasks(updatedData);
        })
        .catch((e) => console.warn(e));
    }
  }, [selectedTab]);

  return (
      <TasksPage tasks={tasks} />
  )
}

export default TasksPageContainer;