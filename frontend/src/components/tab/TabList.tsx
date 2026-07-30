import React from 'react';
import styles from './Tab.module.css';
import { TabListTabButton } from './TabListTabButton';

const TabListRoot = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.list}>
            {children}
        </div>
    );
};

TabListRoot.displayName = 'TabList';

export const TabList = TabListRoot as typeof TabListRoot & {
    TabButton: typeof TabListTabButton;
};

TabList.TabButton = TabListTabButton;
