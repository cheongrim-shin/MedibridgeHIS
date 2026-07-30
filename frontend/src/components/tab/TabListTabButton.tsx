import React, { useEffect } from 'react';
import styles from './Tab.module.css';
import { useTabContext } from './Tab.context';

export interface TabListTabButtonProps {
    target: string;
    children: React.ReactNode;
    default?: boolean;
}

export const TabListTabButton = ({ target, children, default: isDefault }: TabListTabButtonProps) => {
    const { activeTab, setActiveTab, color } = useTabContext();
    const isActive = activeTab === target;

    useEffect(() => {
        if (isDefault && setActiveTab) {
            setActiveTab(target);
        }
    }, [isDefault, target, setActiveTab]);

    const activeColorClass = color ? styles[`color_${color}`] : '';
    const hoverColorClass = color ? styles[`hover_color_${color}`] : '';

    return (
        <button
            type="button"
            className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''} ${isActive ? activeColorClass : ''} ${hoverColorClass}`}
            onClick={() => setActiveTab?.(target)}
        >
            {children}
        </button>
    );
};

TabListTabButton.displayName = 'TabListTabButton';
