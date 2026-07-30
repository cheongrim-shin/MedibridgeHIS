import { Panels } from "../../../components/panel/Panels.tsx";
import { Form } from "../../../components/form/Form.tsx";
import { Input } from "../../../components/ui/Input.tsx";
import { SearchIcon } from "../../../components/icon/SearchIcon.tsx";
import { PlusIcon } from "../../../components/icon/PlusIcon.tsx";
import { Tab } from "../../../components/tab/Tab.tsx";
import { Table } from "../../../components/ui/Table.tsx";
import { Button } from "../../../components/ui/Button.tsx";

import styles from "./Counter.module.css";

import { useReceiptList } from './useReceiptList.ts';
import type { ReceiptStatus } from './types.ts';
import { DateRangePicker } from '../../../components/ui/DateRangePicker.tsx';
import type { ModalRef } from '../../../components/modal/Modal.tsx';
import { RegisterModal } from './components/RegisterModal.tsx';
import { ReceiptDetailPanel } from './components/ReceiptDetailPanel.tsx';
import { Select } from '../../../components/ui/Select.tsx';
import { useDoctors } from './useDoctors.ts';
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchReceiptCounts } from "./payment.api.ts";

const RECEIPT_STATUS_LABEL = {
    RECEIPT_DONE: '접수완료', IN_TREATMENT: '진료중',
    PAY_WAIT: '수납대기', PAY_DONE: '수납완료',
} as const;

export const Counter = () => {
    // 이 화면이 소유하는 상태는 검색어 하나뿐
    const [keyword, setKeyword] = useState('');
    const [fromDate, setFromDate] = useState('');   
    const [toDate, setToDate] = useState('');

    const [doctorNumber, setDoctorNumber] = useState(''); 

    const modalRef = useRef<ModalRef>(null);        // RegisterModal을 여는 열쇠
    const [refreshKey, setRefreshKey] = useState(0); // 접수 성공 시 +1 → 목록 패널 재조회
    const [counts, setCounts] = useState<Record<string, number>>({});
    useEffect(() => {
        fetchReceiptCounts(fromDate || undefined, toDate || undefined)
            .then(setCounts).catch(() => setCounts({}));
    }, [fromDate, toDate, refreshKey]); 

    const [selectedMedical, setSelectedMedical] = useState<string | null>(null);  // 클릭된 접수번호

    const closeDetail = useCallback(() => setSelectedMedical(null), []);

    const { doctors } = useDoctors();

    const cardCount = (key: string) =>
    key === '진료중'
        ? (counts['진료중'] ?? 0) + (counts['진료완료'] ?? 0)
        : (counts[key] ?? 0);

    return (
        <>
            <p className={styles.pageDesc}>
                <b>[시연용]</b> 환자 접수부터 진료비·서류 수납까지 처리하는 원무 창구입니다.
                좌측 목록에서 상태별(접수완료·진료중·수납대기·수납완료) 환자를 관리하고,
                우측 상세에서 확인 후 수납(현금·카드)을 진행 할 수 있습니다.
            </p>
            <Panels direction="horizontal">
                {/* ── 좌측: 검색 + 상태 탭 + 접수 목록 ── */}
                <Panels.Panel flex={65}>
                    <div className={styles.leftPanelContent}>
                        <div className={styles.summaryRow}>
                            {[
                                 
                                { label: '접수완료', key: '접수완료', color: styles.colorTeal },
                                { label: '진료중', key: '진료중', color: styles.colorBlue },
                                { label: '수납대기', key: '수납대기', color: styles.colorAmber },
                                { label: '수납완료', key: '수납완료', color: styles.colorGreen },
                            ].map((c) => (
                                <div key={c.key} className={styles.summaryCard}>
                                    <span className={styles.summaryTitle}>{c.label}</span>
                                    <span className={`${styles.summaryValue} ${c.color}`}>{cardCount(c.key)}</span>
                                </div>
                            ))}
                        </div>
                        <Form size="sm">
                            <Form.Row>
                                <Form.Field>
                                    <DateRangePicker
                                        startDate={fromDate.replace(/-/g, '.')}    
                                        endDate={toDate.replace(/-/g, '.')}
                                        onRangeChange={(s, e) => {                
                                            setFromDate(s.replace(/\./g, '-'));
                                            setToDate(e.replace(/\./g, '-'));
                                        }}
                                        placeholder="조회 기간 (기본: 오늘)"
                                    />
                                </Form.Field>
                                <Form.Field> 
                                    <Select value={doctorNumber} onChange={(e) => setDoctorNumber(e.target.value)}>
                                        <option value="">전체 담당의</option>          {/* ← 필터라 '전체' */}
                                        {doctors.map((d) => (
                                            <option key={d.doctorNumber} value={d.doctorNumber}>{d.doctorName}</option>
                                        ))}
                                    </Select>
                                </Form.Field>
                            </Form.Row>
                            <Form.Field>
                                <Input leftIcon={<SearchIcon />} placeholder="환자명 또는 생년월일 검색"
                                    value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                            </Form.Field>
                        </Form>
                        <Tab onTabChange={closeDetail}>
                            <Tab.List>
                                <Tab.List.TabButton target={"접수완료"} default={true}>접수완료</Tab.List.TabButton>
                                <Tab.List.TabButton target={"진료중"}>진료중</Tab.List.TabButton>
                                <Tab.List.TabButton target={"수납대기"}>수납대기</Tab.List.TabButton>
                                <Tab.List.TabButton target={"수납완료"}>수납완료</Tab.List.TabButton>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panels.TabPanel value={"접수완료"}>
                                    <ReceiptListPanel key={refreshKey} status="RECEIPT_DONE" keyword={keyword} 
                                                    fromDate={fromDate} toDate={toDate} doctorNumber={doctorNumber}
                                                    selected={selectedMedical} onSelect={setSelectedMedical}/>
                                </Tab.Panels.TabPanel>
                                <Tab.Panels.TabPanel value={"진료중"}>
                                    <ReceiptListPanel key={refreshKey} status="IN_TREATMENT" keyword={keyword} 
                                                    fromDate={fromDate} toDate={toDate} doctorNumber={doctorNumber}
                                                    selected={selectedMedical} onSelect={setSelectedMedical}/>
                                </Tab.Panels.TabPanel>
                                <Tab.Panels.TabPanel value={"수납대기"}>
                                    <ReceiptListPanel key={refreshKey} status="PAY_WAIT" keyword={keyword} 
                                                    fromDate={fromDate} toDate={toDate} doctorNumber={doctorNumber}
                                                    selected={selectedMedical} onSelect={setSelectedMedical}/>
                                </Tab.Panels.TabPanel>
                                <Tab.Panels.TabPanel value={"수납완료"}>
                                    <ReceiptListPanel key={refreshKey} status="PAY_DONE" keyword={keyword} 
                                                    fromDate={fromDate} toDate={toDate} doctorNumber={doctorNumber}
                                                    selected={selectedMedical} onSelect={setSelectedMedical}/>
                                </Tab.Panels.TabPanel>
                            </Tab.Panels>
                        </Tab>
                    </div>
                </Panels.Panel>

                {/* ── 우측: 빈 상태 (2단계에서 환자검색→접수 모달이 여기 연결됨) ── */}
                <Panels.Panel flex={40}>
                    {selectedMedical ? (
                        <ReceiptDetailPanel medicalNumber={selectedMedical} 
                                            onClose={() => setSelectedMedical(null)}
                                            onPaid={() => setRefreshKey((k) => k + 1)} 
                        />
                    ) : (
                        <div className={styles.emptyStateContainer}>
                            <div className={styles.emptyContent}>
                                <div className={styles.emptyIconWrapper}>
                                    <SearchIcon width={28} height={28} color="#64748b" strokeWidth={1.8} />
                                </div>
                                <p className={styles.emptyMessage}>선택된 환자가 없습니다.</p>
                                <Button color="green" size="md"
                                        onClick={() => modalRef.current?.open()}
                                        leftIcon={<PlusIcon size={14} />}>
                                    환자 접수
                                </Button>
                            </div>
                        </div>
                    )}
                </Panels.Panel>
            </Panels>
            <RegisterModal ref={modalRef} onSuccess={() => setRefreshKey(k => k + 1)} />
        </>
    );
};

// 탭 패널 하나 = 상태 하나의 목록 (공용 Table 컴포넌트 사용)
function ReceiptListPanel({ status, keyword, fromDate, toDate, selected, doctorNumber, onSelect }: { 
    status: ReceiptStatus; keyword: string; fromDate: string; toDate: string; doctorNumber: string;
    selected: string | null;                 // 현재 선택된 접수번호
    onSelect: (medicalNumber: string) => void; // 행 클릭 시 Counter에 알림
}) {
    const { list, isLoading, error } = useReceiptList({
        status,
        keyword: keyword.trim() || undefined,
        doctorNumber: doctorNumber || undefined, 
        fromDate: fromDate || undefined,   // 빈 문자열 → 파라미터 제외 → BE 기본(오늘)
        toDate: toDate || undefined,
    });

    if (isLoading) return <div>불러오는 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Table widths={[14, 13, 13, 10, 10, 14, 13, 13]}>
            <Table.Header>
                    <Table.Row>
                        <Table.Cell>순번</Table.Cell>
                        <Table.Cell>환자명</Table.Cell>
                        <Table.Cell>생년월일</Table.Cell>
                        <Table.Cell>성별</Table.Cell>
                        <Table.Cell>진료실</Table.Cell>
                        <Table.Cell>담당의</Table.Cell>
                        <Table.Cell>
                            {status === 'PAY_DONE' ? '수납액' : status === 'PAY_WAIT' ? '예상 금액' : '금액'}
                        </Table.Cell>
                        <Table.Cell>시간</Table.Cell>
                    </Table.Row>
            </Table.Header>
            <Table.Body emptyMessage={`${RECEIPT_STATUS_LABEL[status]} 환자가 없습니다.`}>
                {list.map((r) => (
                    <Table.Row key={r.medicalNumber}
                                active={selected === r.medicalNumber}  
                                onClick={() => onSelect(r.medicalNumber)}
                    >
                        <Table.Cell>{r.dailySequence}</Table.Cell>
                        <Table.Cell>{r.name}</Table.Cell>
                        <Table.Cell>{r.birthDate}</Table.Cell>
                        <Table.Cell>{r.gender}</Table.Cell>
                        <Table.Cell>{r.spaceNumber ? `${r.spaceNumber}실` : '-'}</Table.Cell>
                        <Table.Cell>{r.employeeName}</Table.Cell>
                        <Table.Cell>
                            {status === 'RECEIPT_DONE' || status === 'IN_TREATMENT'
                                ? '-'
                                : `${r.totalFee.toLocaleString()}원`}
                        </Table.Cell>
                        <Table.Cell>{r.time}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}