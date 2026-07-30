import React from 'react';
import styles from './InfoField.module.css';

export interface InfoFieldProps {
    label: React.ReactNode;
    value: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export function InfoField({
    label,
    value,
    className = '',
    style
}: InfoFieldProps) {
    return (
        <div className={`${styles.infoCol} ${className}`} style={style}>
            <span className={styles.infoLabel}>{label}</span>
            <div className={styles.infoValue}>{value}</div>
        </div>
    );
}
