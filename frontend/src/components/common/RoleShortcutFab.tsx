// components/common/RoleShortcutFab.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/useAuth.ts';
import { ROLE_SHORTCUTS } from '../../pages/admin/role-shortcuts/roleShortcuts.data';
import styles from './RoleShortcutFab.module.css';

export const RoleShortcutFab = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const isAdmin = !!user?.roles.includes('ADMIN');
    const isOnFullPage = location.pathname === '/admin/role-shortcuts';

    // 바깥 클릭 시 패널 닫기
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    if (!isAdmin || isOnFullPage) {
        return null;
    }

    const handleNavigate = (item: typeof ROLE_SHORTCUTS[number]) => {
        if (!item.path) return;
        setIsOpen(false);
        if (item.external) {
            window.open(item.path, '_blank', 'noopener,noreferrer');
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            {isOpen && (
                <div className={styles.panel}>
                    <p className={styles.panelTitle}>부서별 화면 이동</p>
                    <ul className={styles.list}>
                        {ROLE_SHORTCUTS.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    className={styles.listItem}
                                    disabled={item.path === null}
                                    onClick={() => handleNavigate(item)}
                                    title={item.path === null ? '아직 연결되지 않았습니다' : undefined}
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className={styles.adminHomeLink}
                        onClick={() => handleNavigate({ id: 'role-shortcuts', label: '', icon: null, path: '/admin/role-shortcuts' })}
                    >
                        관리자 화면에서 크게 보기
                    </button>
                </div>
            )}

            <button
                type="button"
                className={styles.fab}
                onClick={() => setIsOpen((prev) => !prev)}
                title="역할 화면 바로가기"
            >
                {isOpen ? '✕' : '⇄'}
            </button>
        </div>
    );
};