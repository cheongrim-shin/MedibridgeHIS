import React, { useState, useCallback } from 'react';
import type { ComponentSize } from '../types';
import { SegmentedControlContext } from './SegmentedControl.context';
import { SegmentedControlOptions } from './SegmentedControlOptions';
import { SegmentedControlOption } from './SegmentedControlOption';
import { SegmentedControlPanels } from './SegmentedControlPanels';
import { SegmentedControlPanel } from './SegmentedControlPanel';

export interface SegmentedControlProps {
    onValueChange?: (value: string) => void;
    size?: ComponentSize;
    width?: 'auto' | 'full' | string;
    children: React.ReactNode;
}

const SegmentedControlRoot = ({
    children,
    onValueChange,
    size = 'md',
    width = 'full',
}: SegmentedControlProps) => {
    const [activeValue, setActiveValue] = useState<string>('');

    const handleValueChange = useCallback((value: string) => {
        setActiveValue(value);
        if (onValueChange) {
            onValueChange(value);
        }
    }, [onValueChange]);

    return (
        <SegmentedControlContext.Provider value={{
            activeValue,
            setActiveValue: handleValueChange,
            size,
            width,
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: width === 'full' ? '100%' : 'auto' }}>
                {children}
            </div>
        </SegmentedControlContext.Provider>
    );
};

SegmentedControlRoot.displayName = 'SegmentedControl';

// Options와 Panels의 서브 컴포넌트 결합을 위한 임시 타입 정의
type OptionsComponentType = typeof SegmentedControlOptions & {
    Option: typeof SegmentedControlOption;
};

type PanelsComponentType = typeof SegmentedControlPanels & {
    Panel: typeof SegmentedControlPanel;
};

export const SegmentedControl = SegmentedControlRoot as typeof SegmentedControlRoot & {
    Options: OptionsComponentType;
    Panels: PanelsComponentType;
};

const OptionsComponent = SegmentedControlOptions as OptionsComponentType;
OptionsComponent.Option = SegmentedControlOption;

const PanelsComponent = SegmentedControlPanels as PanelsComponentType;
PanelsComponent.Panel = SegmentedControlPanel;

SegmentedControl.Options = OptionsComponent;
SegmentedControl.Panels = PanelsComponent;
