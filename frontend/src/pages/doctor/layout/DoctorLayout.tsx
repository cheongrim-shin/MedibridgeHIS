import { Outlet, useLocation } from "react-router-dom";
import styles from "./DoctorLayout.module.css";
import { DoctorSidebar } from "./DoctorSidebar";
import { DOCTOR_MENU_ITEMS } from "../doctor.schema";
import { useEffect, useState } from "react";

export function DoctorLayout() {
    const { pathname } = useLocation();

    const [headerAction, setHeaderAction] = useState<React.ReactNode>(null);

    const activeItem = DOCTOR_MENU_ITEMS.find((item) => pathname.startsWith(item.path));
    const activeMenu = activeItem?.id ?? DOCTOR_MENU_ITEMS[0].id;

    // 페이지가 직접 제목을 지정
    const [pageTitle, setPageTitle] = useState<string | null>(null);

    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDateTime =
        `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // 페이지 전환 시 커스텀 제목 초기화 (렌더링 중 처리)
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setPageTitle(null);
        setHeaderAction(null);
    }

    const displayTitle = pageTitle ?? activeItem?.label ?? DOCTOR_MENU_ITEMS[0].label;

    return (
        <div className={styles.dashboardContainer}>
            <DoctorSidebar activeMenu={activeMenu} />

            <div className={styles.mainWrapper}>
                <header className={styles.mainHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.mainTitle}>{displayTitle}</h1>
                        {headerAction}
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

                <div className={styles.contentViewport}>
                    <Outlet context={{ setPageTitle, setHeaderAction }} />
                </div>
            </div>
        </div>
    )
}