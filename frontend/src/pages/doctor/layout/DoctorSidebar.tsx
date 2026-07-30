import { useState } from "react";
import { DOCTOR_MENU_ITEMS } from "../doctor.schema";
import type { DoctorMenuIconType } from "../doctor.schema";
import { Link, useLocation } from "react-router-dom";
import styles from "./DoctorSidebar.module.css";
import { useLogoutHandler } from "../../../features/auth/hooks/useLogoutHandler";

const DoctorMenuIcon = ({ type }: { type: DoctorMenuIconType }) => {
    switch (type) {
        case 'emr':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            );
        case 'history':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                </svg>
            );
        default:
            return null;
    }
};

interface DoctorSidebarProps {
    activeMenu: string;
}

export const DoctorSidebar = ({ activeMenu }: DoctorSidebarProps) => {
    const location = useLocation();
    const isDiagnosePage = location.pathname.startsWith("/doctor/diagnose");
    const handleLogout = useLogoutHandler();

    const [isCollapsed, setIsCollapsed] = useState(isDiagnosePage);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    // "진료 대기 -> 진료 작성 화면" 진입 시점에만 자동으로 접힘
    // (useEffect 안에서 동기적으로 setState 하지 않기 위해 렌더링 중 비교하는 패턴 사용)
    const [wasDiagnosePage, setWasDiagnosePage] = useState(isDiagnosePage);
    if (isDiagnosePage !== wasDiagnosePage) {
        setWasDiagnosePage(isDiagnosePage);
        if (isDiagnosePage) {
            setIsCollapsed(true);
        }
    }

    return (
        <aside className={styles.sidebar} style={{ width: isCollapsed ? '72px' : '240px' }}>
            <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>
                <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                    <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                        <circle cx="20" cy="10" r="2" />
                    </svg>
                    <h1 className={styles.logoText}>
                        Medi<span>Doctor</span>
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
                {DOCTOR_MENU_ITEMS.map((item) => {
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
                                className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`}
                            >
                                <span className={`${styles.iconWrapper} ${isActive ? styles.iconWrapperActive : ''}`}>
                                    <DoctorMenuIcon type={item.icon} />
                                </span>
                                {!isCollapsed && (
                                    <span className={styles.linkLabel}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>

                            {isCollapsed && activeTooltip === item.id && (
                                <div className={styles.tooltip}>
                                    {item.label}
                                    <div className={styles.tooltipArrow}></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className={styles.sidebarFooter}>
                <div
                    className={styles.menuWrapper}
                    onMouseEnter={() => isCollapsed && setActiveTooltip('logout')}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    <Link to="/" className={`${styles.menuLink} ${styles.logoutBtn}`} onClick={handleLogout}>
                        <div className={`${styles.iconWrapper} ${isCollapsed ? styles.iconWrapperCollapsed : ''} ${styles.logoutIcon}`}>
                            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </div>
                        {!isCollapsed && (
                            <span className={styles.linkLabel}>로그아웃</span>
                        )}
                    </Link>

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