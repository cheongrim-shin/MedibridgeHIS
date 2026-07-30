import React from 'react';
import styles from './SegmentedControl.module.css';
import { useSegmentedControlContext } from './SegmentedControl.context';

export interface SegmentedControlPanelProps {
    value: string;
    children: React.ReactNode;
}

export const SegmentedControlPanel = ({ value, children }: SegmentedControlPanelProps) => {
    const { activeValue } = useSegmentedControlContext();
    const isActive = activeValue === value;

    return (
        <div
            className={styles.panel}
            hidden={!isActive}
            aria-hidden={!isActive}
            tabIndex={isActive ? undefined : -1}
            style={isActive ? undefined : { display: 'none' }}
        >
            {children}
        </div>
    );
};

SegmentedControlPanel.displayName = 'SegmentedControlPanel';
