import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline';
    color?: 'indigo' | 'green' | 'red' | 'gray' | 'slate' | 'teal' | 'amber' | 'blue';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant = 'solid',
    color = 'indigo',
    size = 'md',
    fullWidth = false,
    leftIcon,
    rightIcon,
    className = '',
    type = 'button',
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={`
                ${styles.btn}
                common-btn
                ${styles[`variant_${variant}`]}
                ${styles[`color_${color}`]}
                ${styles[`size_${size}`]}
                ${fullWidth ? styles.fullWidth : ''}
                ${className}
            `.trim().replace(/\s+/g, ' ')}

            {...props}
        >
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </button>
    );
});

Button.displayName = 'Button';
