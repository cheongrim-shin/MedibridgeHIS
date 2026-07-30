import React from 'react';
import styles from './Modal.module.css';
import { useModalContext } from './Modal.context';

export interface ModalBodyTabPanelProps {
    value: string;
    children: React.ReactNode;
}

export const ModalBodyTabPanel = ({ value, children }: ModalBodyTabPanelProps) => {
    const { activeTab } = useModalContext();
    const isActive = activeTab === value;

    return (
        <div className={`${styles.panel} ${isActive ? styles.activePanel : styles.inactivePanel}`}>
            {children}
        </div>
    );
};

ModalBodyTabPanel.displayName = 'ModalBodyTabPanel';
