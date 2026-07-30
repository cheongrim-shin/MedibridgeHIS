import React from 'react';

export interface SegmentedControlPanelsProps {
    children: React.ReactNode;
}

export const SegmentedControlPanels = ({ children }: SegmentedControlPanelsProps) => {
    return (
        <div style={{ marginTop: '16px', width: '100%' }}>
            {children}
        </div>
    );
};

SegmentedControlPanels.displayName = 'SegmentedControlPanels';
