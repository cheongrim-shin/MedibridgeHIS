import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import { PHYSICAL_THERAPIST_MENU_ITEMS } from "../physical-therapist.schema";
import styles from './PhysicalTherapistLayout.module.css';
import { PhysicalTherapistSidebar } from "./PhysicalTherapistSidebar";

export const PhysicalTherapistLayout = () =>{
    // 현재 URL 경로를 가져옴 (예: "/pt/emr" → pathname = "/pt/emr")
    const {pathname} = useLocation();

    // 헤더에 표시할 실시간 시계 문자열을 담는 상태
    const [currentTime, setCurrentTime] = useState('');

    useEffect(()=>{
        // 현재 시각을 "YYYY.MM.DD HH:MM:SS" 형식 문자열로 만들어 상태에 저장
        const updateTime = () =>{
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth()+1).padStart(2, '0'); //월은 0부터라 +1, 2자리 0채움 
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${year}.${month}.${day} ${hours}:${minutes}:${seconds}`);
        };

        updateTime();                                  // 첫 렌더 시 즉시 한 번 실행 (1초 지연 방지)
        const timer = setInterval(updateTime, 1000);   // 이후 1초마다 시각 갱신
        
        // 컴포넌트가 사라질 때 타이머 정리 → 메모리 누수/중복 실행 방지
        return() =>{
            clearInterval(timer);
        };
    }, []); // 빈 배열: 마운트 시 1회만 등록

    // ── 현재 활성화된 메뉴 판별 ──
    // URL의 마지막 경로 조각을 추출 (예: "/pt/emr" → "emr")
    const lastPath = pathname.split('/').pop();

    // 그 경로가 메뉴 목록에 실제로 존재하면 활성 메뉴로, 없으면 기본값 'emr'
    const activeMenu = (lastPath && PHYSICAL_THERAPIST_MENU_ITEMS.some((item) => item.id === lastPath))
        ? lastPath
        : 'emr';

    // 활성 메뉴 id에 해당하는 메뉴 객체를 찾음 (없으면 첫 번째 메뉴로 폴백)
    const currentMenu = PHYSICAL_THERAPIST_MENU_ITEMS.find((item) => item.id === activeMenu) || PHYSICAL_THERAPIST_MENU_ITEMS[0];

    return(
        // 전체 레이아웃 컨테이너 (사이드바 + 메인을 가로로 배치)
        <div className={styles.dashboardContainer}>
            {/* 좌측 사이드바: 현재 활성 메뉴를 넘겨 강조 표시 */}
            <PhysicalTherapistSidebar activeMenu={activeMenu} />

            {/* 우측 메인 영역 (헤더 + 본문) */}
            <div className={styles.mainWrapper}>
                <header className={styles.mainHeader}>
                    <div className={styles.headerLeft}>
                        {/* 현재 메뉴 이름을 페이지 제목으로 표시 */}
                        <h1 className={styles.mainTitle}>
                            {currentMenu.label}
                        </h1>
                    </div>

                    <div className={styles.headerRight}>
                        {/* 실시간 시계 위젯 */}
                        <div className={styles.timeWidget}>
                            {/* 시계 아이콘 (SVG) */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.widgetIcon}>
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {/* 위 useEffect에서 1초마다 갱신되는 시각 */}
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </header>

                {/* 본문 영역: 라우터의 자식 페이지가 여기에 렌더링됨 */}
                <div className={styles.contentViewport}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}