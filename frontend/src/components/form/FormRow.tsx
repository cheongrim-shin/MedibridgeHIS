import { useContext } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Form.module.css';
import { FormContext } from './Form.context';
import type { ComponentSize } from '../types';

export interface FormRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    children: ReactNode;
    size?: 'none' | ComponentSize;
    isAction?: boolean;
}

export function FormRow({
    children,
    size,
    isAction = false,
    className = '',
    style,
    ...props
}: FormRowProps) {
    const { size: parentSize } = useContext(FormContext);
    const currentSize = size ?? parentSize ?? 'sm';

    const combinedClassName = `${styles.row} ${isAction ? styles.actionGroup : ''} ${styles[`row_size_${currentSize}`]} ${className}`;

    return (
        <div
            className={combinedClassName}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}
