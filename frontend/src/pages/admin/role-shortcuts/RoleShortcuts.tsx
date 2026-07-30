import {useNavigate} from 'react-router-dom';
import styles from './RoleShortcuts.module.css';
import {ROLE_SHORTCUTS} from './roleShortcuts.data';

// 이미 관리자로 로그인된 상태에서 쓰는 화면이라, 재로그인 없이 그냥 주소만 이동하면 됨.
// (ProtectedRoute의 canAccessStaffRole이 ADMIN에게는 어떤 역할 화면이든 항상 통과시켜주기 때문)

export const RoleShortcuts = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <p className={styles.description}>
                버튼을 누르면 로그인 과정 없이 바로 해당 부서 화면으로 이동합니다. (관리자 권한으로 접근)
            </p>
            <div className={styles.grid}>
                {ROLE_SHORTCUTS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={styles.card}
                        disabled={item.path === null}
                        onClick={() => {
                            if (!item.path) return;
                            // React(내부라우팅)/Jsp(새창) 구분
                            if (item.external) {
                                window.open(item.path, '_blank', 'noopener,noreferrer');
                            } else {
                                navigate(item.path);
                            }
                        }}
                        title={item.path === null ? '아직 연결되지 않았습니다' : undefined}
                    >
                        <span className={styles.iconChip}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};