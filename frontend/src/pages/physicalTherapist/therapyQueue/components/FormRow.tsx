import type { ReactNode } from 'react';
import styles from './FormRow.module.css';

export interface FormRowProps {
    children: ReactNode;
    layout?: 'grid' | 'inline';
    columns?: 1 | 2 | 3;
    gap?: 'sm' | 'md' | 'lg';
    align?: 'start' | 'center' | 'end';
    className?: string;
}

export function FormRow({
    children,
    layout = 'grid',
    columns = 1,
    gap = 'md',
    align = 'start',
    className = '',
}: FormRowProps) {
    return (
        <div
            className={`
                ${styles.row}
                ${styles[`layout_${layout}`]}
                ${layout === 'grid' ? styles[`columns_${columns}`] : ''}
                ${styles[`gap_${gap}`]}
                ${styles[`align_${align}`]}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
        >
            {children}
        </div>
    );
}

export interface FormRowItemProps {
    children: ReactNode;
    fixed?: boolean;
    className?: string;
}

export function FormRowItem({
    children,
    fixed = false,
    className = '',
}: FormRowItemProps) {
    return (
        <div
            className={`
                ${styles.item}
                ${fixed ? styles.item_fixed : styles.item_grow}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
        >
            {children}
        </div>
    );
}
