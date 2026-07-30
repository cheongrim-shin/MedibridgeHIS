import React from 'react';
import styles from './Panel.module.css';

export interface PanelsPanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const PanelsPanelHeader = ({
    children,
    className = '',
    ...props
}: PanelsPanelHeaderProps) => {
    return (
        <div
            className={`${styles.header} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

PanelsPanelHeader.displayName = 'PanelsPanelHeader';
