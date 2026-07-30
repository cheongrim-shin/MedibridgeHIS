import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './DateRangePicker.module.css';
import type { BaseUIProps } from '../types';
import { useComponentColor } from '../hooks/useComponentColor';

export interface DateRangePickerProps extends BaseUIProps {
    startDate: string; // YYYY.MM.DD 포맷
    endDate: string;   // YYYY.MM.DD 포맷
    onRangeChange: (start: string, end: string) => void;
    placeholder?: string;
}

export interface DateRangePickerRef {
    readonly data: {
        startDate: string;
        endDate: string;
    };
}

const toDotFormat = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.replace(/-/g, '.');
};

const toDashFormat = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.replace(/\./g, '-');
};

export const DateRangePicker = forwardRef<DateRangePickerRef, DateRangePickerProps>(({
    startDate,
    endDate,
    onRangeChange,
    size = 'sm',
    color: propColor,
    placeholder = '기간 선택'
}, ref) => {
    const color = useComponentColor(propColor);
    useImperativeHandle(ref, () => ({
        get data() {
            return {
                startDate,
                endDate
            };
        }
    }), [startDate, endDate]);

    const [isOpen, setIsOpen] = useState(false);
    const [tempStart, setTempStart] = useState(toDashFormat(startDate));
    const [tempEnd, setTempEnd] = useState(toDashFormat(endDate));
    const [selectedShortcut, setSelectedShortcut] = useState<'today' | '7days' | '30days' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    // 부모 날짜가 바뀔 때 상태 동기화 및 숏컷 자동 추정
    useEffect(() => {
        setTempStart(toDashFormat(startDate));
        setTempEnd(toDashFormat(endDate));

        const today = new Date();
        const formatDateToDot = (d: Date) => {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}.${mm}.${dd}`;
        };

        const todayDot = formatDateToDot(today);

        const d7 = new Date(today);
        d7.setDate(today.getDate() - 7);
        const d7Dot = formatDateToDot(d7);

        const d30 = new Date(today);
        d30.setDate(today.getDate() - 30);
        const d30Dot = formatDateToDot(d30);

        if (startDate === todayDot && endDate === todayDot) {
            setSelectedShortcut('today');
        } else if (startDate === d7Dot && endDate === todayDot) {
            setSelectedShortcut('7days');
        } else if (startDate === d30Dot && endDate === todayDot) {
            setSelectedShortcut('30days');
        } else {
            setSelectedShortcut(null);
        }
    }, [startDate, endDate]);

    // 외부 클릭 시 팝업 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // 하단 초기화 버튼 핸들러
    const handleClear = () => {
        setTempStart('');
        setTempEnd('');
        setSelectedShortcut(null);
        onRangeChange('', '');
        setIsOpen(false);
    };

    // 빠른 기간 설정 클릭 시 즉시 반영 및 팝업 닫기
    const handleQuickSelect = (daysOffset: number, shortcut: 'today' | '7days' | '30days') => {
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - daysOffset);

        const formatDateToDash = (d: Date) => {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };

        const startDash = formatDateToDash(start);
        const todayDash = formatDateToDash(today);

        setTempStart(startDash);
        setTempEnd(todayDash);
        setSelectedShortcut(shortcut);
        onRangeChange(toDotFormat(startDash), toDotFormat(todayDash));
        setIsOpen(false);
    };

    // 캘린더 날짜 변경 시 임시 상태만 업데이트 (적용 버튼 클릭 시 전송)
    const handleStartDateChange = (val: string) => {
        setTempStart(val);
        setSelectedShortcut(null);
    };

    const handleEndDateChange = (val: string) => {
        setTempEnd(val);
        setSelectedShortcut(null);
    };

    // 적용 버튼 클릭 시 부모에게 상태 전송 및 팝업 닫음
    const handleApply = () => {
        onRangeChange(toDotFormat(tempStart), toDotFormat(tempEnd));
        setIsOpen(false);
    };

    // 인풋창에 표시할 텍스트 결정
    const getDisplayText = () => {
        if (!startDate && !endDate) return '';

        const startDot = toDotFormat(toDashFormat(startDate));
        const endDot = toDotFormat(toDashFormat(endDate));

        if (selectedShortcut === 'today') return `오늘 (${startDot} - ${endDot})`;
        if (selectedShortcut === '7days') return `최근 7일 (${startDot} - ${endDot})`;
        if (selectedShortcut === '30days') return `최근 30일 (${startDot} - ${endDot})`;

        if (startDot && !endDot) return `${startDot} -`;
        if (!startDot && endDot) return `- ${endDot}`;
        return `${startDot} - ${endDot}`;
    };

    return (
        <div className={`${styles.rangeContainer} ${styles[`color_${color}`]}`} ref={containerRef}>
            <div 
                className={styles.inputWrapper} 
                onClick={() => setIsOpen(!isOpen)}
            >
                <input
                    type="text"
                    readOnly
                    placeholder={placeholder}
                    value={getDisplayText()}
                    className={`${styles.textInput} ${styles[`size_${size}`]} ${isOpen ? styles.active : ''}`}
                />
                
                <span className={`${styles.calendarIcon} ${styles[`icon_${size}`]}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.svgIcon}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </span>
            </div>

            {isOpen && (
                <div className={styles.popover}>
                    <div className={styles.quickSelectRow}>
                        <button type="button" onClick={() => handleQuickSelect(0, 'today')} className={styles.quickBtn}>오늘</button>
                        <button type="button" onClick={() => handleQuickSelect(7, '7days')} className={styles.quickBtn}>최근 7일</button>
                        <button type="button" onClick={() => handleQuickSelect(30, '30days')} className={styles.quickBtn}>최근 30일</button>
                    </div>

                    <div className={styles.pickerBody}>
                        <div className={styles.pickerItem}>
                            <div 
                                className={styles.pickerInputWrapper}
                                onClick={() => startInputRef.current?.showPicker()}
                            >
                                <input
                                    type="text"
                                    readOnly
                                    value={toDotFormat(tempStart)}
                                    placeholder="YYYY.MM.DD"
                                    className={styles.pickerDisplayInput}
                                />
                                <input
                                    type="date"
                                    ref={startInputRef}
                                    value={tempStart}
                                    onChange={(e) => handleStartDateChange(e.target.value)}
                                    className={styles.pickerHiddenInput}
                                />
                            </div>
                        </div>
                        <span className={styles.rangeDivider}>-</span>
                        <div className={styles.pickerItem}>
                            <div 
                                className={styles.pickerInputWrapper}
                                onClick={() => endInputRef.current?.showPicker()}
                            >
                                <input
                                    type="text"
                                    readOnly
                                    value={toDotFormat(tempEnd)}
                                    placeholder="YYYY.MM.DD"
                                    className={styles.pickerDisplayInput}
                                />
                                <input
                                    type="date"
                                    ref={endInputRef}
                                    value={tempEnd}
                                    onChange={(e) => handleEndDateChange(e.target.value)}
                                    className={styles.pickerHiddenInput}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 하단 초기화 및 적용 버튼 가로 배치 */}
                    <div className={styles.popoverActions}>
                        <button type="button" onClick={handleClear} className={styles.clearBtn}>
                            초기화
                        </button>
                        <button type="button" onClick={handleApply} className={styles.applyBtn}>
                            적용
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

DateRangePicker.displayName = 'DateRangePicker';
