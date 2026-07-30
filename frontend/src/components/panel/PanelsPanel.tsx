import React, { forwardRef } from 'react';
import styles from './Panel.module.css';

export interface PanelsPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    flex?: number;
    scrollable?: boolean;
    children: React.ReactNode;
}

const PanelsPanelRoot = forwardRef<HTMLDivElement, PanelsPanelProps>(({
    flex = 1,
    scrollable = false,
    children,
    ...props
}, ref) => {
    const customStyle: React.CSSProperties = {
        flex: flex,
    };

    return (
        <div
            ref={ref}
            className={`${styles.panel} ${scrollable ? styles.scrollable : ''}`}
            style={customStyle}
            {...props}
        >
            {children}
        </div>
    );
});

PanelsPanelRoot.displayName = 'PanelsPanel';

export const PanelsPanel = PanelsPanelRoot;
