import { useEffect, useMemo, useState } from 'react';
import { Table } from '../../../components/Table';
import type { Column } from '../../../components/Table';
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { Button } from '../../../components/ui/Button';
import { DateRangePicker } from '../../../components/ui/DateRangePicker';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import { InfoField } from '../../../components/InfoField';
import { Tabs } from '../../../components/Tabs';
import type { DispensingOrderVO, DispensingDetailVO } from '../dispensing.types';
import { getDispensingHistoryList, getDispensingHistoryDetail } from '../dispensing.api';
import styles from '../dispensing-order/DispensingOrder.module.css';

type RouteTab = '전체' | '경구' | '외용' | '흡입';
const ROUTE_TABS: RouteTab[] = ['전체', '경구', '외용', '흡입'];

// 주민번호 앞 6자리 -> 'YY.MM.DD' (생년월일만)
const getBirthDateOnly = (residentNumber: string): string => {
    if (!residentNumber || residentNumber.length < 6) return residentNumber;
    return residentNumber.slice(0, 6);
};

// 목록용: 'YYYY-MM-DD HH24:MI' -> 'MM.DD HH:MI' (연도 생략, 점 구분)
const formatDateShort = (dateStr: string | null): string => {
    if (!dateStr) return '-';
    return dateStr.slice(5).replace('-', '.');
};

// 상세용: 'YYYY-MM-DD HH24:MI' -> 'YYYY.MM.DD HH:MI' (연도 포함, 점 구분)
const formatDateFull = (dateStr: string | null): string => {
    if (!dateStr) return '-';
    return dateStr.replace(/-/g, '.');
};

const getAgeAndGender = (residentNumber: string): string => {
    if (!residentNumber || residentNumber.length < 7) return '';
    const yy = residentNumber.slice(0, 2);
    const genderDigit = residentNumber.charAt(6);
    const centuryPrefix = ['1', '2'].includes(genderDigit) ? '19' : ['3', '4'].includes(genderDigit) ? '20' : '19';
    const birthYear = parseInt(centuryPrefix + yy, 10);
    const age = 2026 - birthYear;
    const gender = ['1', '3'].includes(genderDigit) ? '남' : '여';
    return `${age}세/${gender}`;
};

export const DispensingHistory = () => {
    const [history, setHistory] = useState<DispensingOrderVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedTab, setSelectedTab] = useState<RouteTab>('전체');

    // 필터 상태 (목업 조제이력 필터와 동일 구성)
    const [startDate, setStartDate] = useState('');   // YYYY.MM.DD
    const [endDate, setEndDate] = useState('');       // YYYY.MM.DD
    const [timeRange, setTimeRange] = useState('전체'); // 전체 | 오전 | 오후
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedOrder, setSelectedOrder] = useState<DispensingOrderVO | null>(null);
    const [details, setDetails] = useState<DispensingDetailVO[]>([]);
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    useEffect(() => {
        async function load() {
            setIsLoading(true);
            try {
                const data = await getDispensingHistoryList();
                setHistory(data);
            } catch {
                alert('조제 이력을 불러오지 못했습니다.');
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        if (!selectedOrder) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDetails([]);
            return;
        }
        let isCancelled = false;
        async function loadDetail() {
            setIsDetailLoading(true);
            try {
                const data = await getDispensingHistoryDetail(selectedOrder!.medicalNumber);
                if (!isCancelled) setDetails(data);
            } catch {
                if (!isCancelled) alert('상세 정보를 불러오지 못했습니다.');
            } finally {
                if (!isCancelled) setIsDetailLoading(false);
            }
        }
        loadDetail();
        return () => { isCancelled = true; };
    }, [selectedOrder]);

    const handleResetFilters = () => {
        setStartDate('');
        setEndDate('');
        setTimeRange('전체');
        setSearchQuery('');
    };

    const filteredHistory = useMemo(() => {
        return history.filter(o => {
            // 0. 투여경로 탭
            if (selectedTab !== '전체' && o.medicineRoute !== selectedTab) return false;

            // prescriptionDate 포맷: 'YYYY-MM-DD HH24:MI'
            const datePart = o.prescriptionDate?.slice(0, 10) ?? '';
            const timePart = o.prescriptionDate?.slice(11) ?? '';

            // 1. 기간 필터 (YYYY.MM.DD -> YYYY-MM-DD 변환 후 비교)
            if (startDate && datePart < startDate.replace(/\./g, '-')) return false;
            if (endDate && datePart > endDate.replace(/\./g, '-')) return false;

            // 2. 시간대 필터 (오전: ~13:00 / 오후: 13:00~)
            if (timeRange === '오전' && timePart > '13:00') return false;
            if (timeRange === '오후' && timePart < '13:00') return false;

            // 3. 검색어 (환자명 또는 생년월일 6자리)
            if (searchQuery.trim()) {
                const q = searchQuery.trim().toLowerCase();
                if (!o.patientName.toLowerCase().includes(q) && !o.residentNumber.slice(0, 6).includes(q)) return false;
            }

            return true;
        });
    }, [history, selectedTab, startDate, endDate, timeRange, searchQuery]);

    const listColumns: Column<DispensingOrderVO>[] = [
        { header: '진료번호', key: 'medicalNumber', width: '11%' },
        { header: '환자명', key: 'patientName', width: '10%', render: (row) => <span className={styles.patientName}>{row.patientName}</span> },
        { header: '처방의', key: 'employeeName', width: '10%' },
        { header: '처방일시', key: 'prescriptionDate', width: '16%', render: (row) => <span className={styles.dateText}>{formatDateShort(row.prescriptionDate)}</span> },
        { header: '처방완료일시', key: 'dispenseCompletedDate', width: '16%', render: (row) => <span className={styles.dateText}>{formatDateShort(row.dispenseCompletedDate)}</span> },
        { header: '처방 약품', key: 'orderName', width: '37%', render: (row) => <span className={styles.orderName}>{row.orderName}</span> },
    ];

    const detailColumns: Column<DispensingDetailVO>[] = [
        { header: '조제 의약품명', key: 'medicineName', width: '55%', render: (row) => <span className={styles.medicationName}>{row.medicineName}</span> },
        { header: '1회 투약량', key: 'totalQty', width: '15%', align: 'center' },
        { header: '1일 횟수', key: 'frequency', width: '15%', align: 'center' },
        { header: '일수', key: 'numberOfDaysAdministered', width: '15%', align: 'center' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.splitLayout}>
                <div className={styles.leftPanel}>
                    <div className={styles.mainCard}>
                        <div className={styles.filterSection}>
                            <div className={styles.compactFilterRow}>
                                <div className={styles.filterItem}>
                                    <DateRangePicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        onRangeChange={(start, end) => { setStartDate(start); setEndDate(end); }}
                                        placeholder="조회 기간"
                                        color="teal"
                                    />
                                </div>
                                <div className={styles.filterItem}>
                                    <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} size="sm" color="teal">
                                        <option value="전체">전체 시간</option>
                                        <option value="오전">오전 (~13:00)</option>
                                        <option value="오후">오후 (13:00~)</option>
                                    </Select>
                                </div>
                                <div className={styles.filterItem}>
                                    <Input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="환자명 또는 생년월일(6자리)..."
                                        size="sm"
                                        color="teal"
                                    />
                                </div>
                                <div className={styles.filterItem}>
                                    <Button type="button" variant="outline" color="gray" size="sm" onClick={handleResetFilters}>
                                        필터 초기화
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.tabContainer}>
                            <Tabs
                                activeTab={selectedTab}
                                onChange={(val) => { setSelectedTab(val as RouteTab); setSelectedOrder(null); }}
                                color="teal"
                            >
                                <Tabs.List>
                                    {ROUTE_TABS.map(tab => <Tabs.Tab key={tab} value={tab}>{tab}</Tabs.Tab>)}
                                </Tabs.List>
                            </Tabs>
                        </div>

                        <div className={styles.tableSection}>
                            {isLoading ? (
                                <p>불러오는 중...</p>
                            ) : (
                                <Table
                                    columns={listColumns}
                                    data={filteredHistory}
                                    size="md"
                                    color="teal"
                                    onRowClick={(row) => setSelectedOrder(row)}
                                    rowClassName={(row) => row.medicalNumber === selectedOrder?.medicalNumber ? styles.activeRow : ''}
                                    emptyMessage="조회 조건에 맞는 조제 이력이 없습니다."
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    {selectedOrder ? (
                        <div className={styles.detailCard}>
                            <div className={styles.detailHeader}>
                                <h3 className={styles.detailTitle}>조제 상세 정보</h3>
                            </div>

                            <div className={styles.patientInfoSection}>
                                <FormGroup size="md">
                                    <FormRow columns={2}>
                                        <InfoField label="환자명" value={`${selectedOrder.patientName} (${getBirthDateOnly(selectedOrder.residentNumber)})`} />
                                        <InfoField label="나이/성별" value={getAgeAndGender(selectedOrder.residentNumber)} />
                                    </FormRow>
                                    <FormRow columns={2}>
                                        <InfoField label="진료과 / 처방의" value={`${selectedOrder.deptName} / ${selectedOrder.employeeName}`} />
                                        <InfoField label="처방일시" value={formatDateFull(selectedOrder.prescriptionDate)} />
                                    </FormRow>
                                    <FormRow columns={2}>
                                        <InfoField label="처방완료일시" value={formatDateFull(selectedOrder.dispenseCompletedDate)} />
                                    </FormRow>
                                </FormGroup>
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.medicationListSection}>
                                {isDetailLoading ? (
                                    <p>불러오는 중...</p>
                                ) : (
                                    <Table columns={detailColumns} data={details} size="sm" color="teal" emptyMessage="조제된 의약품이 없습니다." />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyDetailCard}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyIconDetail}>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <p className={styles.emptyDetailText}>
                                좌측 조제 이력 목록에서 환자를 선택하시면 조제 및 처방 약품 상세 내역이 출력됩니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};