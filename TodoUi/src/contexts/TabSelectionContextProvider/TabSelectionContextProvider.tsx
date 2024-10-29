import React, { createContext, FC, ReactNode, useState } from "react";

export const TabSelection = {
    COMPLETED: 'completed',
    PRIORITY: 'priority',
    NONE: 'none'
} as const;

type TabSelectionType = typeof TabSelection[keyof typeof TabSelection];

interface TabSelectionContextType {
    selectedTab: TabSelectionType;
    setSelectedTab: React.Dispatch<React.SetStateAction<TabSelectionType>>;
    completedTab: boolean;
    setCompletedTab: React.Dispatch<React.SetStateAction<boolean>>;
    priorityTab: boolean;
    setPriorityTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TabSelectionContext = createContext<TabSelectionContextType | undefined>(undefined);

interface TabSelectionContextProviderProps {
    children: ReactNode;
}

const TabSelectionContextProvider: FC<TabSelectionContextProviderProps> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState<TabSelectionType>(TabSelection.NONE);
    const [completedTab, setCompletedTab] = useState<boolean>(false);
    const [priorityTab, setPriorityTab] = useState<boolean>(false);

    return (
        <TabSelectionContext.Provider value={{
            selectedTab, 
            setSelectedTab,
            completedTab,
            setCompletedTab,
            priorityTab,
            setPriorityTab
        }}>
            {children}
        </TabSelectionContext.Provider>
    )
}

export default TabSelectionContextProvider;