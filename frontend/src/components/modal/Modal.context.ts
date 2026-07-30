import { createContext, useContext } from 'react';
import type { ComponentColor } from '../types';

export interface ModalContextValue {
    variant: 'default' | 'tabbed';
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    color?: ComponentColor;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('Modal subcomponents must be rendered within a Modal provider');
    }
    return context;
};
