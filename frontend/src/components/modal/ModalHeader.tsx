import React from 'react';
import styles from './Modal.module.css';
import { useModalContext } from './Modal.context';
import { ModalHeaderTabButton } from './ModalHeaderTabButton';

export interface ModalHeaderProps {
    children?: React.ReactNode;
}

const ModalHeaderRoot = ({ children }: ModalHeaderProps) => {
    const context = useModalContext();
    const isTabbed = context?.variant === 'tabbed';

    return (
        <div className={styles.header}>
            {isTabbed ? (
                <div className={styles.tabsContainer}>
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

ModalHeaderRoot.displayName = 'ModalHeader';

export const ModalHeader = ModalHeaderRoot as typeof ModalHeaderRoot & {
    TabButton: typeof ModalHeaderTabButton;
};

ModalHeader.TabButton = ModalHeaderTabButton;
