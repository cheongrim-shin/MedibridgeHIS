import React from 'react';
import styles from './Panel.module.css';

export interface PanelsPanelFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const PanelsPanelFooter = ({
    children,
    className = '',
    ...props
}: PanelsPanelFooterProps) => {
    return (
        <div
            className={`${styles.footer} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

PanelsPanelFooter.displayName = 'PanelsPanelFooter';
