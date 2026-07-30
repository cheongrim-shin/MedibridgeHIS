import type { ReactNode, ReactElement } from 'react';
import styles from './Layout.module.css';
import type { ComponentColor } from '../types';
import { LayoutMain } from './LayoutMain';
import { LayoutSidebar } from './LayoutSidebar';
import { LayoutContext } from './Layout.context';

export interface LayoutProps {
    children: ReactNode;
    color?: ComponentColor;
}

export interface LayoutComponentType {
    Header: any;
    Body: any;
    Panel: any;
    (props: LayoutProps): ReactElement | null;
    Main: typeof LayoutMain;
    Sidebar: typeof LayoutSidebar;
    displayName?: string;
}

export const Layout: LayoutComponentType = ({
    children,
    color = 'green',
}: LayoutProps) => {
    const themeClass = styles[`color_${color}`] || styles.color_green;

    return (
        <LayoutContext.Provider value={{ color }}>
            <div className={`${styles.layoutContainer} ${themeClass}`}>
                {children}
            </div>
        </LayoutContext.Provider>
    );
};

Layout.Main = LayoutMain;
Layout.Sidebar = LayoutSidebar;

Layout.displayName = 'Layout';
