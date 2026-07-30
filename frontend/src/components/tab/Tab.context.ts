import { createContext, useContext } from 'react';
import type { ComponentColor } from '../types';

export interface TabContextValue {
    activeTab?: string;
    setActiveTab: (tab: string) => void;
    color?: ComponentColor;
}

export const TabContext = createContext<TabContextValue | null>(null);

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('Tab subcomponents must be rendered within a Tab provider');
    }
    return context;
};
