import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';
import { FormControl } from './FormControl';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'green' | 'indigo' | 'red' | 'gray' | 'slate' | 'teal' | 'amber' | 'blue';
    leftIcon?: React.ReactNode;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    size = 'md',
    color = 'green',
    leftIcon,
    error,
    required,
    id,
    className = '',
    ...props
}, ref) => {
    const fallbackId = useId();
    const generatedId = id ?? fallbackId;

    const inputElement = (
        <div className={`
            ${styles.inputWrapper} 
            ${styles[`size_${size}`]}
            ${styles[`color_${color}`]}
        `.trim().replace(/\s+/g, ' ')}>
            {leftIcon && (
                <div className={styles.leftIconWrapper}>
                    {leftIcon}
                </div>
            )}
            <input
                ref={ref}
                id={generatedId}
                required={required}
                {...props}
                className={`
                    ${styles.input}
                    ${leftIcon ? styles.hasLeftIcon : ''}
                    ${error ? styles.hasError : ''}
                    ${props.readOnly ? styles.readOnly : ''}
                    ${className}
                `.trim().replace(/\s+/g, ' ')}
            />
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
                {inputElement}
            </FormControl>
        );
    }

    return inputElement;
});

Input.displayName = 'Input';
