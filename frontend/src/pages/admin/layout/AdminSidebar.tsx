import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './adminSidebar.module.css';
import type { AdminMenuIconType } from '../admin.schema';
import { ADMIN_MENU_ITEMS } from '../admin.schema';
// 다른 역할(의사/간호사 등) 사이드바들과 동일하게, 진짜 로그아웃 처리(토큰 삭제 + 서버 알림 + 이동)를 해주는 훅을 가져옴
import { useLogoutHandler } from '../../../features/auth/hooks/useLogoutHandler';

// ── 관리자 메뉴 아이콘 ──────────────────────────────────────────────────────────
const AdminMenuIcon = ({ type }: { type: AdminMenuIconType }) => {
    switch (type) {
        case 'patient-management':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            );
        case 'employee-management':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            );
        case 'fee-management':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            );

        case 'statistics-management':
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none" stroke="currentColor">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            );

        // ↓↓↓ 새로 추가하는 case ↓↓↓
        case 'role-shortcuts':
            // 문(door) 밖으로 화살표가 나가는 모양 - "다른 화면으로 이동"을 표현
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none" stroke="currentColor">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            );

        case 'notice-management':
            // 메가폰 (공지/방송)
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     fill="none" stroke="currentColor">
                    <path d="m3 11 18-5v12L3 14v-3z" />
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
            );

        case 'faq-management':
            // 말풍선 + 물음표 (자주 묻는 질문)
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     fill="none" stroke="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2-2.4 3.4" />
                    <line x1="12" y1="16.5" x2="12" y2="16.5" />
                </svg>
            );

        case 'qna-management':
            // 채팅 말풍선 (1:1 문의)
            return (
                <svg viewBox="0 0 24 24" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round"
                     fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <line x1="7" y1="8" x2="15" y2="8" />
                    <line x1="7" y1="12" x2="12" y2="12" />
                </svg>
            );
        default:
            return null;
    }
};

// ── AdminSidebar ───────────────────────────────────────────────────────────────
interface AdminSidebarProps {
    activeMenu: string;
}

export const AdminSidebar = ({ activeMenu }: AdminSidebarProps) => {
    // 사이드바 접힘/펼침
    const [isCollapsed, setIsCollapsed] = useState(false);

    // 접힌 상태에서 어떤 메뉴에 툴팁 보여줄지
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    // 로그아웃 버튼을 눌렀을 때 실행할 함수.
    // 이 함수 안에서: ① 서버에 로그아웃 알림 ② 브라우저에 저장된 토큰(출입증) 삭제 ③ 로그인 페이지로 이동
    // 이 3가지를 순서대로 다 해줌 (useLogoutHandler.ts 내부 구현 참고)
    const handleLogout = useLogoutHandler();

    return (
        <aside
            className={styles.sidebar}
            style={{ width: isCollapsed ? '72px' : '240px' }}
        >
            {/* 헤더 (로고 + 접기버튼) */}
            <div className={`${styles.sidebarHeader} ${isCollapsed ? styles.sidebarHeaderCollapsed : ''}`}>

                {/* 로고 영역 */}
                <div className={`${styles.logoArea} ${isCollapsed ? styles.logoAreaCollapsed : ''}`}>
                    <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <h1 className={styles.logoText}>
                        Medi<span>Admin</span>
                    </h1>
                </div>

                {/* 접기/펼치기 버튼 */}
                <button
                    type="button"
                    className={`${styles.toggleBtn} ${isCollapsed ? styles.toggleBtnCollapsed : ''}`}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? (
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    ) : (
                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    )}
                </button>
            </div>

            {/* 메뉴 목록 */}
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
                                    <span className={styles.linkLabel}>{item.label}</span>
                                )}
                            </Link>

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

            {/* 로그아웃 */}
            <div className={styles.sidebarFooter}>
                <div
                    className={styles.menuWrapper}
                    onMouseEnter={() => isCollapsed && setActiveTooltip('logout')}
                    onMouseLeave={() => setActiveTooltip(null)}
                >
                    {/*
                      to="/" 는 그대로 두되(키보드 접근성 등 fallback용),
                      onClick에서 e.preventDefault()로 <Link>의 기본 이동을 막고
                      handleLogout이 로그아웃 처리를 다 끝낸 뒤 직접 이동시키도록 함.
                      (onClick 없이 to="/" 만 있으면, 토큰이 안 지워진 채로 그냥 화면만 이동했다가
                       "이미 로그인 상태"라고 판단되어 바로 이 화면으로 튕겨 돌아오는 버그가 생김)
                    */}
                    <Link to="/" onClick={handleLogout} className={`${styles.menuLink} ${styles.logoutBtn}`}>
                        <div className={`${styles.iconWrapper} ${styles.logoutIcon}`}>
                            <svg viewBox="0 0 24 24" strokeWidth="2"
                                fill="none" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round">
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