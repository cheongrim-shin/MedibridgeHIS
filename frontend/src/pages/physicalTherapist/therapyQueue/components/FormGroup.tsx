import type { HTMLAttributes, ReactNode } from 'react';
import styles from './FormGroup.module.css';

export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: 'none' | 'sm' | 'md' | 'lg';
}

export function FormGroup({
    children,
    size = 'md',
    className = '',
    ...props
}: FormGroupProps) {
    return (
        <div
            className={`${styles.group} ${styles[`size_${size}`]} ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    );
}

