import { createContext, useContext } from 'react';
import type { ComponentColor } from '../types';

// 1. 글로벌 레이아웃 컨텍스트
export interface LayoutContextType {
    color: ComponentColor;
}

export const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    return context || { color: 'green' as ComponentColor };
};

// 2. 사이드바 레이아웃 컨텍스트
export interface LayoutSidebarContextType {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

export const LayoutSidebarContext = createContext<LayoutSidebarContextType | null>(null);

export const useLayoutSidebarContext = () => {
    const context = useContext(LayoutSidebarContext);
    if (!context) {
        throw new Error('LayoutSidebar compound components must be rendered within a LayoutSidebar provider');
    }
    return context;
};
