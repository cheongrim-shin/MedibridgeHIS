import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PhysicalTherapistSidebar.module.css';
import type { PhysicalTherapistMenuIconType } from '../physical-therapist.schema';
import { PHYSICAL_THERAPIST_MENU_ITEMS } from '../physical-therapist.schema';
import { useLogoutHandler } from '../../../features/auth/hooks/useLogoutHandler';

const PhysicalTherapistMenuIcon = ({ type }: { type: PhysicalTherapistMenuIconType }) => {
    switch (type) {
        case 'therapy-queue':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
            );
        case 'therapy-item-management':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <path d="M3 6h.01M3 12h.01M3 18h.01" strokeWidth="3" />
                </svg>
            );
       
        default:
            return null;
    }
};

interface PhysicalTherapistSidebarProps {
    activeMenu: string;
}

export const PhysicalTherapistSidebar = ({ activeMenu }: PhysicalTherapistSidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleLogout = useLogoutHandler();
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    return (
        <aside className={styles.sidebar} style={{ width: isCollapsed ? '72px' : '240px' }}>
            <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>
                <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                    <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="3" />
                        <path d="M5 13h14M12 10v6M9 21l3-6 3 6" />
                    </svg>
                    <h1 className={styles.logoText}>
                        Medi<span>Therapist</span>
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
                {PHYSICAL_THERAPIST_MENU_ITEMS.map((item) => {
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
                                    <PhysicalTherapistMenuIcon type={item.icon} />
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
                        onClick={handleLogout}
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
