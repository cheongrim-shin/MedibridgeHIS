import React, { forwardRef, useId } from 'react';
import styles from './Select.module.css';
import { FormControl } from './FormControl';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'green' | 'indigo' | 'red' | 'gray' | 'slate' | 'teal' | 'amber' | 'blue';
    error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    size = 'md',
    color = 'green',
    error,
    required,
    id,
    children,
    className = '',
    ...props
}, ref) => {
    const fallbackId = useId();
    const generatedId = id ?? fallbackId;

    const selectElement = (
        <div className={`
            ${styles.selectWrapper} 
            ${styles[`size_${size}`]}
            ${styles[`color_${color}`]}
        `.trim().replace(/\s+/g, ' ')}>
            <select
                ref={ref}
                id={generatedId}
                required={required}
                {...props}
                className={`
                    ${styles.select}
                    ${error ? styles.hasError : ''}
                    ${className}
                `.trim().replace(/\s+/g, ' ')}
            >
                {children}
            </select>
        </div>
    );

    if (label || error) {
        return (
            <FormControl
                label={label}
                required={required}
                error={error}
                className={styles[`size_${size}`]}
            >
                {selectElement}
            </FormControl>
        );
    }

    return selectElement;
});

Select.displayName = 'Select';
