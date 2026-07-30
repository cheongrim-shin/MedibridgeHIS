import React, { forwardRef } from 'react';
import styles from './Panel.module.css';
import { FormContext } from '../types';
import type { ComponentSize } from '../types';

// ==========================================
// Types
// ==========================================
export interface PanelGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    direction?: 'horizontal' | 'vertical';
    flex?: number | string;
    size?: number;
    children: React.ReactNode;
}

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    flex?: number | string;
    size?: ComponentSize;
    children: React.ReactNode;
}

export interface PanelHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    children: React.ReactNode;
}

export interface PanelTitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'style' | 'className'> {
    children: React.ReactNode;
}

export interface PanelContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    children: React.ReactNode;
}

export interface PanelFooterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    children: React.ReactNode;
}

// ==========================================
// Implementations (Internal)
// ==========================================
const PanelGroup = ({
    direction = 'horizontal',
    flex,
    size,
    children,
    ...props
}: PanelGroupProps) => {
    const customStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flex: flex,
        width: direction === 'horizontal' && size !== undefined ? `${size}px` : undefined,
        height: direction === 'vertical' && size !== undefined ? `${size}px` : undefined,
        minHeight: 0,
        minWidth: 0,
    };

    return (
        <div
            className={styles.group}
            style={customStyle}
            {...props}
        >
            {children}
        </div>
    );
};

const PanelHeader = ({ children, ...props }: PanelHeaderProps) => {
    return (
        <div className={styles.header} {...props}>
            {children}
        </div>
    );
};

const PanelTitle = ({ children, ...props }: PanelTitleProps) => {
    return (
        <h3 className={styles.title} {...props}>
            {children}
        </h3>
    );
};

const PanelContent = ({ children, ...props }: PanelContentProps) => {
    return (
        <div className={styles.content} {...props}>
            {children}
        </div>
    );
};

const PanelFooter = ({ children, ...props }: PanelFooterProps) => {
    return (
        <div className={styles.footer} {...props}>
            {children}
        </div>
    );
};

// ==========================================
// Main Panel Component Export
// ==========================================
const PanelRoot = forwardRef<HTMLDivElement, PanelProps>(({
    flex,
    size,
    children,
    ...props
}, ref) => {
    const customStyle: React.CSSProperties = {
        flex: flex,
    };

    const content = (
        <div
            ref={ref}
            className={`${styles.panel} ${size ? styles[`size_${size}`] : ''}`}
            style={customStyle}
            {...props}
        >
            {children}
        </div>
    );

    if (size) {
        return (
            <FormContext.Provider value={{ size }}>
                {content}
            </FormContext.Provider>
        );
    }

    return content;
});

PanelRoot.displayName = 'Panel';

export const Panel = PanelRoot as typeof PanelRoot & {
    Group: typeof PanelGroup;
    Header: typeof PanelHeader;
    Title: typeof PanelTitle;
    Content: typeof PanelContent;
    Footer: typeof PanelFooter;
};

Panel.Group = PanelGroup;
Panel.Header = PanelHeader;
Panel.Title = PanelTitle;
Panel.Content = PanelContent;
Panel.Footer = PanelFooter;

