import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import styles from './admin.module.css';
import { AdminSidebar } from './AdminSidebar';
import { ADMIN_MENU_ITEMS } from '../admin.schema';

export const AdminLayout = () => {
    //현재 시각 상태 
    const [currentTime, setCurrentTime] = useState('');

    //현재 url 경로 
    const {pathname} = useLocation();

    //시계 
    useEffect(() =>{
        const updateTime = () =>{
            const now = new Date();
            const year    = now.getFullYear();
            const month   = String(now.getMonth() + 1).padStart(2, '0');
            const day     = String(now.getDate()).padStart(2, '0');
            const hours   = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${year}.${month}.${day} ${hours}:${minutes}:${seconds}`);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    //URL 마지막 세그먼트로 활성메뉴 감지 
    const lastPath = pathname.split('/').pop();
    const activeMenu =
    lastPath && ADMIN_MENU_ITEMS.some(item => item.id ===lastPath)
        ? lastPath
        : 'patient-management'; //기본진입메뉴 
    
    //헤더타이틀용 현제 메뉴 객체 
    const currentMenu = 
    ADMIN_MENU_ITEMS.find(item => item.id === activeMenu) || 
    ADMIN_MENU_ITEMS[0];

    return ( 
        <div className={styles.dashboardContainer}>
            {/* 사이드바 */}
            <AdminSidebar activeMenu={activeMenu} />

            {/* 메인영역 */}
            <div className={styles.mainWrapper}>
 {/* 헤더 */}
                <header className={styles.mainHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.mainTitle}>{currentMenu.label}</h1>
                    </div>
                    <div className={styles.headerRight}>
                        {/* 시계 위젯 */}
                        <div className={styles.timeWidget}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2.5" className={styles.widgetIcon}>
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </header>

                {/* 자식 라우트 렌더링 */}
                <div className={styles.contentViewport}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};