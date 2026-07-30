import React, { useState, useCallback } from 'react';
import styles from './Tab.module.css';
import type { ComponentColor } from '../types';
import { useComponentColor } from '../hooks/useComponentColor';
import { TabContext } from './Tab.context';
import { TabList } from './TabList';
import { TabPanels } from './TabPanels';

export interface TabProps {
    onTabChange?: (tab: string) => void;
    color?: ComponentColor;
}

const TabRoot = ({
    children,
    onTabChange,
    color: propColor,
}: React.PropsWithChildren<TabProps>) => {
    const color = useComponentColor(propColor);

    const [activeTab, setActiveTab] = useState<string>('');

    const handleTabChange = useCallback((tab: string) => {
        setActiveTab(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    }, [onTabChange]);

    return (
        <TabContext.Provider value={{
            activeTab,
            setActiveTab: handleTabChange,
            color,
        }}>
            <div className={styles.tabsContainer}>
                {children}
            </div>
        </TabContext.Provider>
    );
};

TabRoot.displayName = 'Tab';

export const Tab = TabRoot as typeof TabRoot & {
    List: typeof TabList;
    Panels: typeof TabPanels;
};

Tab.List = TabList;
Tab.Panels = TabPanels;
// Watcher trigger comment to refresh TS Server cache

