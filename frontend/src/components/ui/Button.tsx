import React, { forwardRef } from 'react';
import styles from './Button.module.css';
import type { BaseUIProps } from '../types';
import { useComponentColor } from '../hooks/useComponentColor';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'className' | 'style'>, BaseUIProps {
    variant?: 'solid' | 'outline';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    width?: 'auto' | 'full' | string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant = 'solid',
    color: propColor,
    size = 'md', // Default size set to md
    leftIcon,
    rightIcon,
    type = 'button',
    width = 'full',
    ...props
}, ref) => {
    const color = useComponentColor(propColor);
    const buttonWidth = width === 'full' ? '100%' : width;

    return (
        <button
            ref={ref}
            type={type}
            draggable={false}
            className={`${styles.btn} ${styles[`variant_${variant}`]} ${styles[`${variant}_${color}`]} ${styles[`size_${size}`]}`}
            style={buttonWidth ? { width: buttonWidth } : undefined}
            {...props}
        >
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </button>
    );
});

Button.displayName = 'Button';
