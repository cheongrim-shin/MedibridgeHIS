import { Outlet, useLocation } from "react-router-dom";
import { OUTPATIENT_MENU_ITEMS } from "../outpatient-nurse.schema";
import styles from "./outpatientLayout.module.css";
import { useEffect, useState } from "react";
import { OutpatientSidebar } from "./OutpatientSidebar";

export const OutpatientLayout = () => {

    // 현재 브라우저 URL 경로 읽어오기
    const {pathname} = useLocation();

/*     // url을 '/' 기준으로 잘라서 마지막 조각 꺼내기
    const lastPath = pathname.split('/').pop();

    // 마지막 조각이 메뉴 목록에 등록된 id와 일치하면 그걸 활성 메뉴로 사용
    // 일치하는게 없으면 기본값 queue 로 설정
    const activeMenu = (lastPath && OUTPATIENT_MENU_ITEMS.some((item) => item.id === lastPath))
    ? lastPath : 'queue';

    // 활성 메뉴 id 에 해당하는 메뉴 객체 전체를 찾음(헤더에 제목 표시용)
    // 못찾으면 배열의 첫 번째 메뉴를 기본값으로 사용
    const currentMenu = OUTPATIENT_MENU_ITEMS.find((item) => item.id === activeMenu) || OUTPATIENT_MENU_ITEMS[0];
 */


    /* pathname 전체가 item.path로 시작하는지 비교. 
    item.path는 스키마에 이미 전체 경로(/outpatient-nurse/injection-history)로 
    정의돼 있으니까, id 값이 뭐든 상관없이 바로 매칭됨 */
    const activeItem = OUTPATIENT_MENU_ITEMS.find((item) => pathname.startsWith(item.path));

    const activeMenu = activeItem?.id ?? 'queue';
    const currentMenu = activeItem ?? OUTPATIENT_MENU_ITEMS[0];

    // 우측 상담에 표시할 시계
    const [now, setNow] = useState(new Date());

    useEffect(()=> {
        // setInterval : 1초마다 콜백함수 반복실행
         const timer = setInterval(()=>{
            setNow(new Date());
         }, 1000);

         // 컴포넌트 사라질때 타이머 정리
         return () => clearInterval(timer);
    }, []);

    // Date 객체를 "2026.06.23 10:33:50" 형태의 문자열로 반환
    const formattedDateTime = 
    `${now.getFullYear()}.${String(now.getMonth() +1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}
     ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2, '0')}`;


    return (
    <div className={styles.dashboardContainer}>
        {/* 좌측 사이드바 - 현재 활성 메뉴 정보를 넘겨줘서 강조 표시 */}
        <OutpatientSidebar activeMenu={activeMenu} />

        {/* 우측 메인 영역 (헤더 + 실제 페이지 내용) */}
        <div className={styles.mainWrapper}>

            {/* 상단 헤더 - 현재 메뉴의 한글 이름을 제목으로 표시 */}
            <header className={styles.mainHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.mainTitle}>
                        {currentMenu.label}
                    </h1>
                </div>
                <div className={styles.headerRight}>
                    <span className={styles.clockText}>
                        <svg
                            className={styles.clockIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {formattedDateTime}
                    </span>
                </div>
            </header>

            {/* 여기 자리에 WaitQueue 컴포넌트가 통째로 들어와서 그려짐 */}
            <div className={styles.contentViewport}>
                <Outlet />
            </div>
        </div>
        {/* ↑ mainWrapper 닫힘 */}
    </div>
    /* ↑ dashboardContainer 닫힘 - 이제 정확히 1개씩만 */
)
}