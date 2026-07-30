import React from 'react';
import styles from './FormControl.module.css';

export interface FormControlProps {
    label?: string;
    required?: boolean;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    className?: string;
}

export const FormControl = ({
    label,
    required,
    error,
    size = 'md',
    children,
    className = '',
}: FormControlProps) => {
    return (
        <div className={`${styles.container} ${styles[`size_${size}`]} ${className}`.trim()}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}> *</span>}
                </label>
            )}
            <div className={styles.content}>
                {children}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

FormControl.displayName = 'FormControl';
