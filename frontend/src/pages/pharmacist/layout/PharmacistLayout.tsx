import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import styles from './PharmacistLayout.module.css';
import { PharmacistSidebar } from './PharmacistSidebar';
import { PHARMACIST_MENU_ITEMS } from '../pharmacist.schema';

export const PharmacistLayout = () => {
    const { pathname } = useLocation();
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${year}.${month}.${day} ${hours}:${minutes}:${seconds}`);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    // Active menu detection
    const lastPath = pathname.split('/').pop();
    const activeMenu = (lastPath && PHARMACIST_MENU_ITEMS.some((item) => item.id === lastPath))
        ? lastPath
        : 'prescriptions';

    const currentMenu = PHARMACIST_MENU_ITEMS.find((item) => item.id === activeMenu) || PHARMACIST_MENU_ITEMS[0];

    return (
        <div className={styles.dashboardContainer}>
            {/* Pharmacist Sidebar */}
            <PharmacistSidebar activeMenu={activeMenu} />

            {/* Main Content Area */}
            <div className={styles.mainWrapper}>
                <header className={styles.mainHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.mainTitle}>
                            {currentMenu.label}
                        </h1>
                    </div>

                    <div className={styles.headerRight}>
                        <div className={styles.timeWidget}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.widgetIcon}>
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </header>

                <div className={styles.contentViewport}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
