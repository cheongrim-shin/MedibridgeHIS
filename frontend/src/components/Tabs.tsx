import React, { createContext, useContext } from 'react';
import styles from './Tabs.module.css';

interface TabsContextType<T extends string = string> {
    activeTab: T;
    onChange: (tab: T) => void;
    variant: 'default' | 'modal';
    color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabsContext = createContext<TabsContextType<any> | null>(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs compound components must be rendered within a Tabs provider');
    }
    return context;
}

export interface TabsProps<T extends string> {
    children: React.ReactNode;
    activeTab: T;
    onChange: (tab: T) => void;
    variant?: 'default' | 'modal';
    width?: string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}

export function Tabs<T extends string>({
    children,
    activeTab,
    onChange,
    variant = 'default',
    width,
    color = 'green',
    className = '',
    style = {},
}: TabsProps<T>) {
    const containerStyle: React.CSSProperties = {
        ...(width ? { width } : {}),
        ...style,
    };

    return (
        <TabsContext.Provider value={{ activeTab, onChange, variant, color }}>
            <div 
                className={`${styles.container} ${styles[`variant_${variant}`]} ${className}`}
                style={containerStyle}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
}

// 1. Tabs.List (탭 버튼들을 감싸는 헤더 영역)
export interface TabsListProps {
    children: React.ReactNode;
}
Tabs.List = function TabsList({ children }: TabsListProps) {
    const { variant } = useTabsContext();
    return (
        <div className={`${styles.list} ${styles[`list_${variant}`]}`}>
            {children}
        </div>
    );
};

// 2. Tabs.Tab (각 개별 탭 버튼)
export interface TabsTabProps<T extends string = string> {
    value: T;
    children: React.ReactNode;
}
Tabs.Tab = function TabsTab<T extends string = string>({ value, children }: TabsTabProps<T>) {
    const { activeTab, onChange, variant, color } = useTabsContext();
    const isActive = activeTab === value;

    const activeColorClass = color ? styles[`color_${color}`] : '';
    const hoverColorClass = color ? styles[`hover_color_${color}`] : '';

    return (
        <button
            type="button"
            className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''} ${styles[`tabBtn_${variant}`]} ${isActive ? activeColorClass : ''} ${hoverColorClass}`}
            onClick={() => onChange(value)}
        >
            {children}
        </button>
    );
};

// 3. Tabs.Panel (활성화 상태에 매핑되어 열리는 콘텐츠 판넬)
export interface TabsPanelProps<T extends string = string> {
    value: T;
    children: React.ReactNode;
}
Tabs.Panel = function TabsPanel<T extends string = string>({ value, children }: TabsPanelProps<T>) {
    const { activeTab } = useTabsContext();
    if (activeTab !== value) return null;
    return <div className={styles.panel}>{children}</div>;
};

Tabs.displayName = 'Tabs';
