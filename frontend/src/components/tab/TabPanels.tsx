import React from 'react';
import styles from './Tab.module.css';
import { TabPanelsTabPanel } from './TabPanelsTabPanel';

const TabPanelsRoot = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.bodyContainer}>
            {children}
        </div>
    );
};

TabPanelsRoot.displayName = 'TabPanels';

export const TabPanels = TabPanelsRoot as typeof TabPanelsRoot & {
    TabPanel: typeof TabPanelsTabPanel;
};

TabPanels.TabPanel = TabPanelsTabPanel;
