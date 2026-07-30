import React, { useEffect } from 'react';
import styles from './SegmentedControl.module.css';
import { useSegmentedControlContext } from './SegmentedControl.context';

export interface SegmentedControlOptionProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'type'> {
    target: string;
    children: React.ReactNode;
    default?: boolean;
}

export const SegmentedControlOption = ({
    target,
    children,
    default: isDefault,
    ...props
}: SegmentedControlOptionProps) => {
    const { activeValue, setActiveValue } = useSegmentedControlContext();
    const isActive = activeValue === target;

    useEffect(() => {
        if (isDefault) {
            setActiveValue(target);
        }
    }, [isDefault, target, setActiveValue]);

    return (
        <button
            type="button"
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => {
                if (!isActive) {
                    setActiveValue(target);
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
};

SegmentedControlOption.displayName = 'SegmentedControlOption';
