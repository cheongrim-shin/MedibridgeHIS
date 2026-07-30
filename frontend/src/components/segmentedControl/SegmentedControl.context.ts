import { createContext, useContext } from 'react';
import type { ComponentSize } from '../types';

export interface SegmentedControlContextValue {
    activeValue: string;
    setActiveValue: (value: string) => void;
    size?: ComponentSize;
    width?: 'auto' | 'full' | string;
}

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export const useSegmentedControlContext = () => {
    const context = useContext(SegmentedControlContext);
    if (!context) {
        throw new Error('SegmentedControl subcomponents must be rendered within a SegmentedControl provider');
    }
    return context;
};
