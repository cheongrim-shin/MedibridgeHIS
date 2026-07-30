import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PharmacistSidebar.module.css';
import type { PharmacistMenuIconType } from '../pharmacist.schema';
import { PHARMACIST_MENU_ITEMS } from '../pharmacist.schema';
import { useLogoutHandler } from '../../../features/auth/hooks/useLogoutHandler.ts';

const PharmacistMenuIcon = ({ type }: { type: PharmacistMenuIconType }) => {
    switch (type) {
        case 'prescriptions':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                    <line x1="9" y1="18" x2="13" y2="18" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                </svg>
            );
        case 'settings':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
            );
        case 'medicine':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                    <path d="m8.5 8.5 7 7" />
                </svg>
            );
        case 'history':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <polyline points="3 3 3 8 8 8" />
                    <line x1="12" y1="7" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="16" y2="14" />
                </svg>
            );
        default:
            return null;
    }
};

interface PharmacistSidebarProps {
    activeMenu: string;
}

export const PharmacistSidebar = ({ activeMenu }: PharmacistSidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const handleLogout = useLogoutHandler();

    return (
        <aside className={styles.sidebar} style={{ width: isCollapsed ? '72px' : '240px' }}>
            <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>
                <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                    <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {/* Pill Icon */}
                        <rect x="5" y="5" width="14" height="14" rx="7" transform="rotate(-45 12 12)" />
                        <line x1="7.05" y1="16.95" x2="16.95" y2="7.05" />
                    </svg>
                    <h1 className={styles.logoText}>
                        Medi<span>Pharmacy</span>
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
                {PHARMACIST_MENU_ITEMS.map((item) => {
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
                                    <PharmacistMenuIcon type={item.icon} />
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
                        onClick={handleLogout}
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
