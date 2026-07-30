import React from 'react';
import styles from './SegmentedControl.module.css';
import { useSegmentedControlContext } from './SegmentedControl.context';

export interface SegmentedControlOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const SegmentedControlOptions = ({
    children,
    ...props
}: SegmentedControlOptionsProps) => {
    const { size = 'md', width = 'full' } = useSegmentedControlContext();
    const resolvedSize = size === 'xs' ? 'sm' : size;

    return (
        <div
            className={`${styles.container} ${styles[`size_${resolvedSize}`]} ${width === 'full' ? styles.width_full : styles.width_auto}`}
            {...props}
        >
            {children}
        </div>
    );
};

SegmentedControlOptions.displayName = 'SegmentedControlOptions';
