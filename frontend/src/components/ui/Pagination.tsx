import { Button } from './Button';
import styles from './Pagination.module.css';
import type { ComponentColor } from '../types';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    color?: ComponentColor;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, color = 'indigo' }: PaginationProps) => {
    if (totalPages <= 1) return null;

    // 현재 페이지 주변 5개 번호만 노출 (1 ... 4 5 [6] 7 8 ... 10)
    const pageWindow = 2;
    const start = Math.max(1, currentPage - pageWindow);
    const end = Math.min(totalPages, currentPage + pageWindow);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
        <div className={styles.wrapper}>
            <Button size="sm" width="auto" variant="outline" color={color}
                    disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
                이전
            </Button>

            {start > 1 && <span className={styles.ellipsis}>…</span>}

            {pages.map((p) => (
                <Button key={p} size="sm" width="auto"
                        variant={p === currentPage ? 'solid' : 'outline'}
                        color={color} onClick={() => onPageChange(p)}>
                    {p}
                </Button>
            ))}

            {end < totalPages && <span className={styles.ellipsis}>…</span>}

            <Button size="sm" width="auto" variant="outline" color={color}
                    disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
                다음
            </Button>
        </div>
    );
};