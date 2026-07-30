/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import styles from './Panel.module.css';
import { PanelsPanel as PanelsPanelRoot } from './PanelsPanel';
import type { PanelsPanelProps } from './PanelsPanel';
import { PanelsPanelHeader } from './PanelsPanelHeader';
import type { PanelsPanelHeaderProps } from './PanelsPanelHeader';
import { PanelsPanelFooter } from './PanelsPanelFooter';
import type { PanelsPanelFooterProps } from './PanelsPanelFooter';

export interface PanelsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> {
    direction?: 'horizontal' | 'vertical';
    flex?: number;
    size?: number;
    children: React.ReactNode;
}

const PanelsRoot = ({
    direction = 'horizontal',
    flex,
    size,
    children,
    ...props
}: PanelsProps) => {
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

PanelsRoot.displayName = 'Panels';

// 명시적인 컴포넌트 인터페이스 정의
export interface PanelsPanelComponent {
    (props: PanelsPanelProps & React.RefAttributes<HTMLDivElement>): React.ReactNode;
    Header: React.ComponentType<PanelsPanelHeaderProps>;
    Footer: React.ComponentType<PanelsPanelFooterProps>;
    displayName?: string;
}

export interface PanelsComponent {
    (props: PanelsProps): React.ReactNode;
    Panel: PanelsPanelComponent;
    displayName?: string;
}

// Panels.tsx에서 서브 컴포넌트를 정적으로 일괄 결합 및 타입 단언
export const PanelsPanel = Object.assign(PanelsPanelRoot, {
    Header: PanelsPanelHeader,
    Footer: PanelsPanelFooter
}) as unknown as PanelsPanelComponent;

export const Panels = Object.assign(PanelsRoot, {
    Panel: PanelsPanel
}) as unknown as PanelsComponent;
