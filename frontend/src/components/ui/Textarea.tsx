import React, { forwardRef } from 'react';
import styles from './Textarea.module.css';
import type { BaseUIProps } from '../types';
import { useImperativeDataRef } from '../hooks/useImperativeDataRef';
import { useComponentColor } from '../hooks/useComponentColor';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color' | 'className' | 'style'>, BaseUIProps {}

export interface TextareaRef {
    data: string;
    readonly value: string;
    focus: () => void;
    select: () => void;
}

export const Textarea = forwardRef<TextareaRef, TextareaProps>(({
    size = 'sm', // Default size set to sm
    color: propColor,
    ...props
}, ref) => {
    const color = useComponentColor(propColor);
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    useImperativeDataRef(ref, innerRef);

    return (
        <textarea
            ref={innerRef}
            {...props}
            className={`${styles.textarea} ${styles[`size_${size}`]} ${styles[`color_${color}`]} ${props.readOnly ? styles.readOnly : ''}`}
        />
    );
});

Textarea.displayName = 'Textarea';
