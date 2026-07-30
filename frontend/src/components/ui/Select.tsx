import React, { forwardRef } from 'react';
import styles from './Select.module.css';
import type { BaseUIProps } from '../types';
import { useComponentColor } from '../hooks/useComponentColor';
import { useImperativeDataRef } from '../hooks/useImperativeDataRef';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'color' | 'className' | 'style'>, BaseUIProps {}

export interface SelectRef {
    data: string;
    readonly value: string;
    focus: () => void;
}

export const Select = forwardRef<SelectRef, SelectProps>(({
    size = 'sm', // Default size set to sm
    color: propColor,
    children,
    ...props
}, ref) => {
    const color = useComponentColor(propColor);
    const innerRef = React.useRef<HTMLSelectElement>(null);
    useImperativeDataRef(ref, innerRef);

    return (
        <select
            ref={innerRef}
            {...props}
            className={`${styles.select} ${styles[`size_${size}`]} ${styles[`color_${color}`]}`}
        >
            {children}
        </select>
    );
});

Select.displayName = 'Select';
