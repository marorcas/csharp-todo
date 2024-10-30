import { useContext } from "react";
import styles from "./PriorityTab.module.scss";
import { TabSelection, TabSelectionContext } from "../../contexts/TabSelectionContextProvider/TabSelectionContextProvider";

const PriorityTab = () => {
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

    const togglePriority = () => {
        const priorityTabValue = !priorityTab;
        setPriorityTab(priorityTabValue);

        if (priorityTabValue) {
            setSelectedTab(TabSelection.PRIORITY);
            setCompletedTab(false);
        } else {
            if (!completedTab) {
                setSelectedTab(TabSelection.NONE);
            }
        }
    }

    const priorityClassNames = [
        styles.PriorityTab,
        priorityTab ? styles.PrioritySelected : styles.PriorityUnselected
      ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={priorityClassNames} onClick={togglePriority}>
            Priority
        </button>
    );
}

export default PriorityTab;