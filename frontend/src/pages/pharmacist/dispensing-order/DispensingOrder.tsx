import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table } from '../../../components/Table';
import type { Column } from '../../../components/Table';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/ui/Button';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import { InfoField } from '../../../components/InfoField';
import { Tabs } from '../../../components/Tabs';
import type { DispensingOrderVO, DispensingDetailVO } from '../dispensing.types';
import { getDispensingOrderList, getDispensingOrderDetail, completeDispensing } from '../dispensing.api';
import { getLowStockMedicines } from '../medicine.api';
import { LowStockModal } from '../LowStockModal';
import styles from './DispensingOrder.module.css';

type RouteTab = '전체' | '경구' | '외용' | '흡입';
const ROUTE_TABS: RouteTab[] = ['전체', '경구', '외용', '흡입'];

// 주민번호 앞 7자리로 나이/성별 계산
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

// 주민번호 앞 6자리 (생년월일만, 구분점 없음)
const getBirthDateOnly = (residentNumber: string): string => {
    if (!residentNumber || residentNumber.length < 6) return residentNumber;
    return residentNumber.slice(0, 6);
};

const todayStr = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
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

export const DispensingOrder = () => {
    const [orders, setOrders] = useState<DispensingOrderVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [showLowStockModal, setShowLowStockModal] = useState(false);

    const [selectedTab, setSelectedTab] = useState<RouteTab>('전체');
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedOrder, setSelectedOrder] = useState<DispensingOrderVO | null>(null);
    const [details, setDetails] = useState<DispensingDetailVO[]>([]);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        async function load() {
            setIsLoading(true);
            try {
                const [orderData, lowStock] = await Promise.all([
                    getDispensingOrderList(),
                    getLowStockMedicines(),
                ]);
                setOrders(orderData);
                setLowStockCount(lowStock.length);
            } catch {
                alert('조제 대기 목록을 불러오지 못했습니다.');
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
                const data = await getDispensingOrderDetail(selectedOrder!.medicalNumber);
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

    const todayCount = useMemo(
        () => orders.filter(o => o.prescriptionDate?.startsWith(todayStr())).length,
        [orders]
    );

    const lowStockItems = useMemo(
        () => details.filter(d => d.currentQuantity < d.minQuantity),
        [details]
    );

    const filteredOrders = useMemo(() => {
        return orders.filter(o => {
            if (selectedTab !== '전체' && o.medicineRoute !== selectedTab) return false;
            if (searchQuery.trim()) {
                const q = searchQuery.trim().toLowerCase();
                return o.patientName.toLowerCase().includes(q) || o.residentNumber.slice(0, 6).includes(q);
            }
            return true;
        });
    }, [orders, selectedTab, searchQuery]);

    const handleComplete = async () => {
        if (!selectedOrder) return;
        if (!window.confirm(`${selectedOrder.patientName}님(${selectedOrder.medicalNumber}) 처방을 조제 완료 처리하시겠습니까?`)) return;

        setIsCompleting(true);
        try {
            await completeDispensing(selectedOrder.medicalNumber);
            alert('조제 완료 처리되었습니다.');
            setOrders(prev => prev.filter(o => o.medicalNumber !== selectedOrder.medicalNumber));
            setSelectedOrder(null);
        } catch (err) {
            const message = axios.isAxiosError(err) ? err.response?.data?.message : undefined;
            alert(message ?? '조제 완료 처리 중 오류가 발생했습니다.');
        } finally {
            setIsCompleting(false);
        }
    };

    const listColumns: Column<DispensingOrderVO>[] = [
        { header: '진료번호', key: 'medicalNumber', width: '13%' },
        { header: '환자명', key: 'patientName', width: '12%', render: (row) => <span className={styles.patientName}>{row.patientName}</span> },
        { header: '처방의', key: 'employeeName', width: '12%' },
        { header: '처방일시', key: 'prescriptionDate', width: '18%', render: (row) => <span className={styles.dateText}>{formatDateShort(row.prescriptionDate)}</span> },
        { header: '처방 약품', key: 'orderName', width: '45%', render: (row) => <span className={styles.orderName}>{row.orderName}</span> },
    ];

    const detailColumns: Column<DispensingDetailVO>[] = [
        { header: '처방 의약품명', key: 'medicineName', width: '55%', render: (row) => <span className={styles.medicationName}>{row.medicineName}</span> },
        { header: '1회 투약량', key: 'totalQty', width: '15%', align: 'center' },
        { header: '1일 횟수', key: 'frequency', width: '15%', align: 'center' },
        { header: '일수', key: 'numberOfDaysAdministered', width: '15%', align: 'center' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.summaryRow}>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryTitle}>전체 대기</span>
                    <span className={`${styles.summaryValue} ${styles.colorTeal}`}>{orders.length}</span>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryTitle}>금일 처방건수</span>
                    <span className={`${styles.summaryValue} ${styles.colorGray}`}>{todayCount}</span>
                </div>
                <div className={styles.summaryCard} onClick={() => setShowLowStockModal(true)} style={{ cursor: 'pointer' }}>
                    <span className={styles.summaryTitle}>재고부족 약품</span>
                    <span className={`${styles.summaryValue} ${styles.colorAmber}`}>{lowStockCount}</span>
                </div>
            </div>

            <div className={styles.splitLayout}>
                <div className={styles.leftPanel}>
                    <div className={styles.mainCard}>
                        <div className={styles.filterSection}>
                            <div className={styles.searchBarRow}>
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="환자명 또는 생년월일(6자리) 검색..."
                                    size="sm"
                                    color="teal"
                                />
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
                                    data={filteredOrders}
                                    size="md"
                                    color="teal"
                                    onRowClick={(row) => setSelectedOrder(row)}
                                    rowClassName={(row) => row.medicalNumber === selectedOrder?.medicalNumber ? styles.activeRow : ''}
                                    emptyMessage="대기 중인 조제 오더가 없습니다."
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    {selectedOrder ? (
                        <div className={styles.detailCard}>
                            <div className={styles.detailHeader}>
                                <h3 className={styles.detailTitle}>처방 상세 정보</h3>
                            </div>

                            <div className={styles.patientInfoSection}>
                                <FormGroup size="md">
                                    <FormRow columns={2}>
                                        <InfoField label="환자명" value={`${selectedOrder.patientName} (${getBirthDateOnly(selectedOrder.residentNumber)})`} />
                                        <InfoField label="나이/성별" value={getAgeAndGender(selectedOrder.residentNumber)} />
                                    </FormRow>
                                    <FormRow columns={2}>
                                        <InfoField label="처방의" value={selectedOrder.employeeName} />
                                        <InfoField label="처방일시" value={formatDateFull(selectedOrder.prescriptionDate)} />
                                    </FormRow>
                                </FormGroup>
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.medicationListSection}>
                                {isDetailLoading ? (
                                    <p>불러오는 중...</p>
                                ) : (
                                    <Table columns={detailColumns} data={details} size="sm" color="teal" emptyMessage="처방된 의약품이 없습니다." />
                                )}
                            </div>

                            {!isDetailLoading && lowStockItems.length > 0 && (
                                <div className={styles.stockWarning}>
                                    <div className={styles.stockWarningHeader}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                            <line x1="12" y1="9" x2="12" y2="13" />
                                            <line x1="12" y1="17" x2="12.01" y2="17" />
                                        </svg>
                                        <span>재고 부족 약품 {lowStockItems.length}건</span>
                                    </div>
                                    {lowStockItems.map(item => (
                                        <div key={item.medicineCode} className={styles.stockWarningItem}>
                                            {item.medicineName} — {item.currentQuantity}개 남음 (최소 {item.minQuantity}개)
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className={styles.actionRow}>
                                <Button type="button" color="teal" size="md" onClick={handleComplete} disabled={isCompleting || isDetailLoading}>
                                    {isCompleting ? '처리 중...' : '조제 완료'}
                                </Button>
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
                                좌측 조제 대기 목록에서 환자를 선택하시면 상세 처방 정보가 출력됩니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showLowStockModal && (
                <LowStockModal
                    onClose={() => setShowLowStockModal(false)}
                    onCountChange={setLowStockCount}
                />
            )}
        </div>
    );
};