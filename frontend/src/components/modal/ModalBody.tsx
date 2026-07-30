import React from 'react';
import styles from './Modal.module.css';
import { ModalBodyTabPanel } from './ModalBodyTabPanel';

export interface ModalBodyProps {
    children: React.ReactNode;
}

const ModalBodyRoot = ({ children }: ModalBodyProps) => {
    return (
        <div className={styles.content}>
            {children}
        </div>
    );
};

ModalBodyRoot.displayName = 'ModalBody';

export const ModalBody = ModalBodyRoot as typeof ModalBodyRoot & {
    TabPanel: typeof ModalBodyTabPanel;
};

ModalBody.TabPanel = ModalBodyTabPanel;
