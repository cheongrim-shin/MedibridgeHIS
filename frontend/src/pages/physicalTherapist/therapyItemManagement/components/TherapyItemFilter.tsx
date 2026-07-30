// ============================================================
// [컴포넌트] TherapyItemFilter.tsx
// 상단 "검색창 + 치료 등록 버튼" 한 줄을 담당합니다.
// 상태는 안 가지고, 부모(훅)에서 받은 값/콜백만 사용하는 순수 표현 컴포넌트입니다.
// ============================================================
import { Button } from '../../therapyQueue/components/Button';
import { Input } from '../../therapyQueue/components/Input';
import styles from '../TherapyItemManagement.module.css';


interface TherapyItemFilterProps {
    searchQuery: string;                 // 현재 검색어
    onSearchChange: (value: string) => void; // 검색어 변경 콜백
    onRegister: () => void;              // 등록 모달 열기 콜백
}

export const TherapyItemFilter = ({ searchQuery, onSearchChange, onRegister }: TherapyItemFilterProps) => {
    return (
        <div className={styles.filterSection}>
            <div className={styles.filterRow}>
                <div className={styles.inputWrapper}>
                    <Input
                        type="text"
                        size="sm"
                        placeholder="치료명 또는 코드 검색..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        leftIcon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}>
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        }
                        color="green"
                    />
                </div>
                <Button type="button" color="green" size="sm" onClick={onRegister}>
                    + 치료 항목 등록
                </Button>
            </div>
        </div>
    );
};
