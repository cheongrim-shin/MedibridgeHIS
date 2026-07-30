import React, { forwardRef, useId } from 'react';
import styles from './Textarea.module.css';
import { FormControl } from './FormControl';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'green' | 'indigo' | 'red' | 'gray' | 'slate' | 'teal' | 'amber' | 'blue';
    error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
                                                                            label, size = 'md', color = 'green', error, required, id, className = '', ...props
                                                                        }, ref) => {
    const fallbackId = useId();
    const generatedId = id ?? fallbackId;

    const textareaElement = (
        <textarea
            ref={ref}
            id={generatedId}
            required={required}
            {...props}
            className={`${styles.textarea} ${styles[`size_${size}`]} ${styles[`color_${color}`]} ${error ? styles.hasError : ''} ${className}`.trim()}
        />
    );

    if (label || error) {
        return (
            <FormControl label={label} required={required} error={error} className={styles[`size_${size}`]}>
                {textareaElement}
            </FormControl>
        );
    }
    return textareaElement;
});

Textarea.displayName = 'Textarea';