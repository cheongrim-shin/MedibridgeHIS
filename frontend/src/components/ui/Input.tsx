import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import type { BaseUIProps } from '../types';
import { useImperativeDataRef } from '../hooks/useImperativeDataRef';
import { useComponentColor } from '../hooks/useComponentColor';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color' | 'className' | 'style'>, BaseUIProps {
    leftIcon?: React.ReactNode;
    align?: 'left' | 'center' | 'right';
}

export interface InputRef {
    data: string;
    readonly value: string;
    focus: () => void;
    select: () => void;
}

export const Input = forwardRef<InputRef, InputProps>(({
    size = 'sm', // Default size set to sm
    color: propColor,
    leftIcon,
    align = 'left',
    ...props
}, ref) => {
    const color = useComponentColor(propColor);
    const innerRef = React.useRef<HTMLInputElement>(null);
    useImperativeDataRef(ref, innerRef);

    const inputElement = (
        <input
            ref={innerRef}
            {...props}
            className={`${styles.input} ${styles[`size_${size}`]} ${styles[`color_${color}`]} ${styles[`align_${align}`]} ${leftIcon ? styles.hasLeftIcon : ''} ${props.readOnly ? styles.readOnly : ''}`}
        />
    );

    if (leftIcon) {
        return (
            <div className={`${styles.inputWrapper}`}>
                <div className={`${styles.leftIconWrapper} ${styles[`icon_${size}`]}`}>
                    {leftIcon}
                </div>
                {inputElement}
            </div>
        );
    }

    return inputElement;
});

Input.displayName = 'Input';

