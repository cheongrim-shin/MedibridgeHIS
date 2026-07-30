import React from 'react';
import styles from './Tab.module.css';
import { useTabContext } from './Tab.context';

export interface TabPanelsTabPanelProps {
    value: string;
    children: React.ReactNode;
}

export const TabPanelsTabPanel = ({ value, children }: TabPanelsTabPanelProps) => {
    const { activeTab } = useTabContext();
    const isActive = activeTab === value;

    return (
        <div
            className={`${styles.panel} ${isActive ? styles.activePanel : styles.inactivePanel}`}
            hidden={!isActive}
            aria-hidden={!isActive}
            tabIndex={isActive ? undefined : -1}
        >
            {children}
        </div>
    );
};

TabPanelsTabPanel.displayName = 'TabPanelsTabPanel';
