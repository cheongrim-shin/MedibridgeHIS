import { useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';
import { useLayoutContext, LayoutSidebarContext, useLayoutSidebarContext } from './Layout.context';
import { useLogoutHandler } from '../../features/auth/hooks/useLogoutHandler';

export interface LayoutSidebarProps {
    children: ReactNode;
}

// 2. LayoutSidebar Root Component (로컬 State 및 Provider 탑재)
export const LayoutSidebar = ({ children }: LayoutSidebarProps) => {
    const { color } = useLayoutContext(); // 글로벌 테마 컬러만 구독
    const [isCollapsed, setIsCollapsed] = useState(false); // 접힘 상태를 로컬화
    const themeClass = styles[`color_${color}`] || styles.color_green;

    return (
        <LayoutSidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <aside className={`${styles.sidebar} ${themeClass}`} style={{ width: isCollapsed ? '72px' : '240px' }}>
                {children}
                <LayoutSidebarFooter />
            </aside>
        </LayoutSidebarContext.Provider>
    );
};

export interface LayoutSidebarHeaderProps {
    logoTextPrefix?: string;
    logoTextSuffix: string;
    logoIcon?: ReactNode;
}

const LayoutSidebarHeader = ({
    logoTextPrefix = 'Medi',
    logoTextSuffix,
    logoIcon,
}: LayoutSidebarHeaderProps) => {
    const { isCollapsed, setIsCollapsed } = useLayoutSidebarContext(); // 로컬 context 구독

    return (
        <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>
            <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                {logoIcon ? (
                    <div className={styles.logoIcon}>{logoIcon}</div>
                ) : (
                    <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-2h4l2 2h3a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="3.5" />
                    </svg>
                )}
                <h1 className={styles.logoText}>
                    {logoTextPrefix}<span>{logoTextSuffix}</span>
                </h1>
            </div>
            <button 
                type="button" 
                className={`${styles.toggleBtn} ${isCollapsed ? styles.toggleBtnCollapsed : ''}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
            >
                {isCollapsed ? (
                    <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                ) : (
                    <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                )}
            </button>
        </div>
    );
};

const LayoutSidebarMenu = ({ children }: { children: ReactNode }) => {
    const { isCollapsed } = useLayoutSidebarContext(); // 로컬 context 구독
    return (
        <nav className={`${styles.menuContainer} ${isCollapsed ? styles.menuContainerCollapsed : ''}`}>
            {children}
        </nav>
    );
};

export interface LayoutSidebarItemProps {
    id: string;
    label: string;
    path: string;
    icon: ReactNode;
    active?: boolean;
    isLogout?: boolean;
    onClick?: (e: MouseEvent) => void;
}

const LayoutSidebarItem = ({
    label,
    path,
    icon,
    active = false,
    isLogout = false,
    onClick, 
}: LayoutSidebarItemProps) => {
    const { isCollapsed } = useLayoutSidebarContext(); // 로컬 context 구독
    const [isHovered, setIsHovered] = useState(false);

    const itemClass = isLogout 
        ? `${styles.menuLink} ${styles.logoutBtn}` 
        : `${styles.menuLink} ${active ? styles.menuLinkActive : ''}`;

    const iconWrapperClass = isLogout
        ? `${styles.iconWrapper} ${isCollapsed ? styles.iconWrapperCollapsed : ''} ${styles.logoutIcon}`
        : `${styles.iconWrapper} ${active ? styles.iconWrapperActive : ''}`;

    return (
        <div 
            className={styles.menuWrapper}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={path} onClick={onClick} className={`${itemClass} ${isCollapsed ? styles.menuLinkCollapsed : ''}`}>
                <span className={iconWrapperClass}>
                    {icon}
                </span>
                <span className={`${styles.linkLabel} ${isCollapsed ? styles.linkLabelCollapsed : ''}`}>
                    {label}
                </span>
            </Link>
            
            {isCollapsed && isHovered && (
                <div className={styles.tooltip}>
                    {label}
                    <div className={styles.tooltipArrow} />
                </div>
            )}
        </div>
    );
};

const LayoutSidebarFooter = ({ children }: { children?: ReactNode }) => {
    const handleLogout = useLogoutHandler();

    return (
        <div className={styles.sidebarFooter}>
            {children !== undefined ? children : (
                <LayoutSidebarItem
                    id="logout"
                    label="로그아웃"
                    path="/"
                    onClick={handleLogout}
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    }
                    isLogout
                />
            )}
        </div>
    );
};

LayoutSidebar.Header = LayoutSidebarHeader;
LayoutSidebar.Menu = LayoutSidebarMenu;
LayoutSidebar.Item = LayoutSidebarItem;

LayoutSidebar.displayName = 'LayoutSidebar';