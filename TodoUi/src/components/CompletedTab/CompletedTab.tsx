import { useContext } from "react";
import styles from "./CompletedTab.module.scss";
import { TabSelection, TabSelectionContext } from "../../contexts/TabSelectionContextProvider/TabSelectionContextProvider";

const CompletedTab = () => {
    const tabContext = useContext(TabSelectionContext);
    if (tabContext === undefined) {
        throw new Error('Something went wrong');
    }
    const { 
        setSelectedTab, 
        completedTab, 
        setCompletedTab,
        priorityTab,
        setPriorityTab 
    } = tabContext;

    const toggleCompleted = () => {
        const completedTabValue = !completedTab;
        setCompletedTab(completedTabValue);

        if (completedTabValue) {
            setSelectedTab(TabSelection.COMPLETED);
            setPriorityTab(false);
        } else {
            if (!priorityTab) {
                setSelectedTab(TabSelection.NONE);
            }
        }
    }

    const completedClassNames = [
        styles.CompletedTab,
        completedTab ? styles.CompletedSelected : styles.CompletedUnselected
      ]
        .filter(Boolean)
        .join(' ');

    return (
        <button 
            className={completedClassNames} 
            onClick={toggleCompleted}
        >
            Completed
        </button>
    );
}

export default CompletedTab;