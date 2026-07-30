import { useState } from "react";
import { OUTPATIENT_MENU_ITEMS } from "../outpatient-nurse.schema";
import type { OutpatientMenuIconType } from "../outpatient-nurse.schema";
import { Link } from "react-router-dom";
import styles from "./outpatientSidebar.module.css";
import { useLogoutHandler } from "../../../features/auth/hooks/useLogoutHandler";

// ============================================
// 사이드바 메뉴 아이콘 컴포넌트
// item.icon 값(예: 'list')에 따라 해당하는 SVG를 그려줌
// RadiologyIcon과 동일한 구조, 아이콘 종류만 다름
// ============================================
const OutpatientIcon = ({ type }: { type: OutpatientMenuIconType }) => {
    switch (type) {
        // 시계 아이콘 - 진료 대기열 메뉴용
        case 'list':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
            );
        // 주사기 아이콘 - 주사 오더 메뉴용
        case 'clipboard':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <line x1="9" y1="11" x2="15" y2="11" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
            );
        // 시계+되돌리기 아이콘 - 주사 이력 메뉴용
        case 'history':
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v5h5" />
                    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
                    <path d="M12 7v5l4 2" />
                </svg>
            );
        // 일치하는 타입이 없으면 아무것도 렌더링하지 않음 (방어 코드)
        default:
            return null;
    }
};

// 부모(OutpatientLayout)로부터 현재 활성화된 메뉴 id를 받기 위한 props 타입
interface OutpatientSidebarProps {
    activeMenu : string;
}

// ============================================
// 사이드바 본체
// - 접기/펼치기 토글 기능
// - 접힌 상태에서 마우스 호버 시 툴팁으로 메뉴명 표시
// - 현재 페이지에 해당하는 메뉴를 강조(active) 표시
// ============================================
export const OutpatientSidebar = ({ activeMenu } : OutpatientSidebarProps) => {

    const handleLogout = useLogoutHandler();
     
    // 사이드바 펼침/접힘 상태 (기본값: 펼쳐진 상태)
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 접힌 상태에서 호버 중인 메뉴 id를 저장 (툴팁 표시용)
    // 호버 중인 메뉴가 없으면 null
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    return (
        // 사이드바 전체 영역 - 접힘 여부에 따라 너비 변경 (240px ↔ 72px)
        <aside className={styles.sidebar} style={{width : isCollapsed ? '72px' : '240px'}}>

            {/* ---------- 사이드바 상단: 로고 + 접기 버튼 ---------- */}
            <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>

                {/* 로고 영역 (아이콘 + "MediOutpatient" 텍스트) */}
                <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                                           {/* 심박 파형 모양 아이콘 */}
                        <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                    <h1 className={styles.logoText}>
                        Medi<span>Outpatient</span>
                    </h1>
                </div>

                {/* 사이드바 접기/펼치기 버튼 */}
                <button
                    type="button"
                    className={`${styles.toggleBtn} ${isCollapsed ? styles.toggleBtnCollapsed : ''}`}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
                >
                    {/* 접힘 상태에 따라 화살표 방향이 반대로 바뀜 */}
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

            {/* ---------- 메뉴 목록 영역 ---------- */}
            <nav className={`${styles.menuContainer} ${isCollapsed ? styles.menuContainerCollapsed : ''}`}>
                {/* 메뉴 배열을 순회하면서 메뉴 하나씩 렌더링 */}
                {OUTPATIENT_MENU_ITEMS.map((item) => {

                    // 지금 보고 있는 페이지와 이 메뉴의 id가 같으면 활성화 표시
                    const isActive = activeMenu === item.id;

                    return (
                        <div
                            key={item.id}
                            className={styles.menuWrapper}
                            // 접힌 상태에서만 호버 시 툴팁 띄움 (펼쳐진 상태는 글자가 이미 보이므로 불필요)
                            onMouseEnter={() => isCollapsed && setActiveTooltip(item.id)}
                            onMouseLeave={() => setActiveTooltip(null)}
                        >
                            {/* 클릭하면 해당 path로 페이지 이동 (react-router-dom의 Link) */}
                            <Link
                                to={item.path}
                                className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`}
                            >
                                {/* 아이콘 부분 */}
                                <span className={`${styles.iconWrapper} ${isActive ? styles.iconWrapperActive : ''}`}>
                                    <OutpatientIcon type={item.icon} />
                                </span>

                                {/* 펼쳐진 상태일 때만 메뉴 이름 텍스트 표시 (접히면 숨김) */}
                                {!isCollapsed && (
                                    <span className={styles.linkLabel}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>

                            {/* 접힌 상태 + 지금 이 메뉴에 마우스가 올라가 있을 때만 툴팁 표시 */}
                            {isCollapsed && activeTooltip === item.id && (
                                <div className={styles.tooltip}>
                                    {item.label}
                                    <div className={styles.tooltipArrow}></div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* ---------- 사이드바 하단: 로그아웃 버튼 ---------- */}
            <div className={styles.sidebarFooter}>
                <div
                    className={styles.menuWrapper}
                    onMouseEnter={() => isCollapsed && setActiveTooltip('logout')}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    {/* 로그아웃 클릭 시 로그인 페이지("/")로 이동 */}
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

                    {isCollapsed && activeTooltip === 'logout' && (
                        <div className={styles.tooltip}>
                            로그아웃
                            <div className={styles.tooltipArrow} />
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}