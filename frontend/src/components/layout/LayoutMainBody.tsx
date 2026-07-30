import type { ReactNode } from 'react';
import styles from './Layout.module.css';

export interface LayoutMainBodyProps {
    children: ReactNode;
    hasPadding?: boolean;
}

export const LayoutMainBody = ({ children, hasPadding = true }: LayoutMainBodyProps) => {
    return (
        <div className={`${styles.contentViewport} ${!hasPadding ? styles.noPadding : ''}`}>
            {children}
        </div>
    );
};
