import React from 'react';
import styles from './Modal.module.css';
import { useModalContext } from './Modal.context';

export interface ModalHeaderTabButtonProps {
    target: string;
    children: React.ReactNode;
}

export const ModalHeaderTabButton = ({ target, children }: ModalHeaderTabButtonProps) => {
    const { activeTab, onTabChange, color } = useModalContext();
    const isActive = activeTab === target;

    const activeColorClass = color ? styles[`color_${color}`] : '';
    const hoverColorClass = color ? styles[`hover_color_${color}`] : '';

    return (
        <button
            type="button"
            className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''} ${isActive ? activeColorClass : ''} ${hoverColorClass}`}
            onClick={() => onTabChange?.(target)}
        >
            {children}
        </button>
    );
};

ModalHeaderTabButton.displayName = 'ModalHeaderTabButton';
