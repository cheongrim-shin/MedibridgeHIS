import React, { Children, Fragment, useContext } from 'react';
import styles from './Form.module.css';
import { FormContext } from './Form.context';
import type { ComponentSize } from '../types';

export interface FormFieldProps {
    label?: string;
    htmlFor?: string;
    required?: boolean;
    error?: string;
    size?: ComponentSize;
    variant?: 'standard' | 'split' | 'field-button';
    separator?: string;
    children: React.ReactNode;
    className?: string;
}

export const FormField = ({
    label,
    htmlFor,
    required,
    error,
    size,
    variant = 'standard',
    separator = '', // Default separator set to empty string
    children,
    className = '',
}: FormFieldProps) => {
    const { size: parentSize } = useContext(FormContext);
    const currentSize = size ?? (parentSize && parentSize !== 'none' ? parentSize : 'sm');

    const handleSplitGroupChange = (e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (!target || target.tagName !== 'INPUT') return;

        const maxLength = target.maxLength;
        const value = target.value;

        if (maxLength > 0 && value.length >= maxLength) {
            const inputs = Array.from(e.currentTarget.querySelectorAll('input'));
            const index = inputs.indexOf(target);
            if (index !== -1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }
        }
    };

    const handleSplitGroupKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        if (!target || target.tagName !== 'INPUT') return;

        const inputs = Array.from(e.currentTarget.querySelectorAll('input'));
        const index = inputs.indexOf(target);
        if (index === -1) return;

        const selectionStart = target.selectionStart ?? 0;
        const valueLength = target.value.length;

        if (e.key === 'Backspace' && target.value.length === 0) {
            if (index > 0) {
                inputs[index - 1].focus();
                e.preventDefault();
            }
        } else if (e.key === 'ArrowLeft' && selectionStart === 0) {
            if (index > 0) {
                const prevInput = inputs[index - 1];
                prevInput.focus();
                prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length);
                e.preventDefault();
            }
        } else if (e.key === 'ArrowRight' && selectionStart === valueLength) {
            if (index < inputs.length - 1) {
                const nextInput = inputs[index + 1];
                nextInput.focus();
                nextInput.setSelectionRange(0, 0);
                e.preventDefault();
            }
        }
    };

    const renderContent = () => {
        const segments = Children.toArray(children);

        const injectSize = (child: React.ReactNode) => {
            if (React.isValidElement(child)) {
                const element = child as React.ReactElement<{ size?: ComponentSize }>;
                return React.cloneElement(element, {
                    ...element.props,
                    size: element.props.size ?? currentSize
                });
            }
            return child;
        };

        if (variant === 'split') {
            return (
                <div 
                    className={styles.splitGroup}
                    onChange={handleSplitGroupChange}
                    onKeyDown={handleSplitGroupKeyDown}
                >
                    {segments.map((segment, index) => (
                        <Fragment key={index}>
                            <div className={styles.segment}>{injectSize(segment)}</div>
                            {index < segments.length - 1 && separator && (
                                <span className={styles.separator} aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                        </Fragment>
                    ))}
                </div>
            );
        }

        if (variant === 'field-button') {
            return (
                <div className={styles.fieldButtonGroup}>
                    {injectSize(segments[0])}
                    {injectSize(segments[1])}
                </div>
            );
        }

        return Children.map(children, injectSize);
    };

    return (
        <div className={`${styles.fieldContainer} ${styles[`field_size_${currentSize}`]} ${className}`}>
            {label && (
                <label className={styles.label} htmlFor={htmlFor}>
                    {label}
                    {required && <span className={styles.required}> *</span>}
                </label>
            )}
            <div className={styles.content}>
                {renderContent()}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

FormField.displayName = 'FormField';
