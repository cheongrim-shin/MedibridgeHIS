import React from 'react';
import styles from './Form.module.css';
import { FormContext } from './Form.context';
import { FormRow } from './FormRow';
import { FormField } from './FormField';
import type { ComponentSize } from '../types';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    size?: 'none' | ComponentSize;
    children: React.ReactNode;
}

const FormRoot = ({
    size = 'sm',
    children,
    className = '',
    style,
    ...props
}: FormProps) => {
    const combinedClassName = `${styles.form} ${styles[`gap_${size}`] || styles.gap_sm} ${className}`;

    return (
        <FormContext.Provider value={{ size }}>
            <form
                className={combinedClassName}
                style={style}
                {...props}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
};

FormRoot.displayName = 'Form';

export const Form = FormRoot as typeof FormRoot & {
    Row: typeof FormRow;
    Field: typeof FormField;
};

Form.Row = FormRow;
Form.Field = FormField;
