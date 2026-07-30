import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './blankSidebar.module.css';
import type { AdminMenuIconType } from '../blank.schema.ts';
import { ADMIN_MENU_ITEMS } from '../blank.schema.ts';

const AdminMenuIcon = ({ type }: { type: AdminMenuIconType }) => {
    switch (type) {
        case 'dashboard':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" />
                    <rect x="14" y="3" width="7" height="5" />
                    <rect x="14" y="12" width="7" height="9" />
                    <rect x="3" y="16" width="7" height="5" />
                </svg>
            );
        case 'staff':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );
        case 'patients':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
            );
        case 'settings':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            );
        case 'notice':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
            );
        case 'list':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
            );
        default:
            return null;
    }
};

interface AdminSidebarProps {
    activeMenu: string;
}

export const BlankSidebar = ({ activeMenu }: AdminSidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    return (
        <aside className={styles.sidebar} style={{ width: isCollapsed ? '72px' : '240px' }}>
            <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>
                <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                    <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M12 9v6M9 12h6" />
                    </svg>
                    <h1 className={styles.logoText}>
                        Medi<span>Admin</span>
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

            <nav className={`${styles.menuContainer} ${isCollapsed ? styles.menuContainerCollapsed : ''}`}>
                {ADMIN_MENU_ITEMS.map((item) => {
                    const isActive = activeMenu === item.id;
                    return (
                        <div 
                            key={item.id}
                            className={styles.menuWrapper}
                            onMouseEnter={() => isCollapsed && setActiveTooltip(item.id)}
                            onMouseLeave={() => setActiveTooltip(null)}
                        >
                            <Link
                                to={item.path}
                                className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ''} ${isCollapsed ? styles.menuLinkCollapsed : ''}`}
                            >
                                <span className={`${styles.iconWrapper} ${isActive ? styles.iconWrapperActive : ''}`}>
                                    <AdminMenuIcon type={item.icon} />
                                </span>
                                {!isCollapsed && (
                                    <span className={styles.linkLabel}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                            
                            {/* Hover Tooltip when collapsed */}
                            {isCollapsed && activeTooltip === item.id && (
                                <div className={styles.tooltip}>
                                    {item.label}
                                    <div className={styles.tooltipArrow} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Sidebar Footer (Logout Area) */}
            <div className={styles.sidebarFooter}>
                <div 
                    className={styles.menuWrapper}
                    onMouseEnter={() => isCollapsed && setActiveTooltip('logout')}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    <Link
                        to="/"
                        className={`${styles.menuLink} ${styles.logoutBtn}`}
                    >
                        <div className={`${styles.iconWrapper} ${isCollapsed ? styles.iconWrapperCollapsed : ''} ${styles.logoutIcon}`}>
                            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </div>
                        {!isCollapsed && (
                            <span className={styles.linkLabel}>
                                 로그아웃
                            </span>
                        )}
                    </Link>
                    
                    {/* React-driven dynamic tooltip */}
                    {isCollapsed && activeTooltip === 'logout' && (
                        <div className={styles.tooltip}>
                            로그아웃
                            <div className={styles.tooltipArrow} />
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};
