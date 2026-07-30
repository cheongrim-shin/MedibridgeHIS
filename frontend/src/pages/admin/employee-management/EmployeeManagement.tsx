import React, {useEffect, useState} from 'react';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';
import {Table} from '../../../components/ui/Table';
import {InfoField} from '../../../components/InfoField';
import styles from './EmployeeManagement.module.css';
import {getEmployees, getEmployeeDetail, updateEmployeeStatus} from '../admin.api';
import type {EmployeeListItem, EmployeeDetail} from '../types/employee.types';
import {ACCOUNT_STATUS_LABEL} from '../types/employee.types';
import {EmployeeCreateModal} from './EmployeeCreateModal';

// ── 컴포넌트 ───────────────────────────────────────────────────────────────
export const EmployeeManagement = () => {

    // ── 상태 ──────────────────────────────────────────────────────────────
    const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
    const [detail, setDetail] = useState<EmployeeDetail | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isStatusUpdating, setIsStatusUpdating] = useState(false);

    // ── 목록 불러오기 ─────────────────────────────────────────────────────
    const loadEmployees = async (keyword?: string) => {
        const data = await getEmployees(keyword);
        setEmployees(data);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadEmployees().catch((err) => console.error('목록 조회 실패:', err));
    }, []);

    // ── 검색 핸들러 ───────────────────────────────────────────────────────
    const handleSearch = () => loadEmployees(searchQuery.trim() || undefined);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    // ── 행 클릭 → 상세 조회 ───────────────────────────────────────────────
    const handleRowClick = async (memberNumber: string) => {
        setSelectedNumber(memberNumber);
        try {
            const data = await getEmployeeDetail(memberNumber);
            setDetail(data);
        } catch (err) {
            console.error('상세조회 실패', err);
            setDetail(null);
        }
    };

    // ── 재직/퇴직 처리 (상세 패널에서만 변경 가능) ───────────────────────
    const handleToggleStatus = async () => {
        if (!detail) return;
        const next = detail.accountStatus === 'Y' ? 'N' : 'Y';
        if (!window.confirm(`${detail.memberName} 님을 ${ACCOUNT_STATUS_LABEL[next]} 처리할까요?`)) return;

        setIsStatusUpdating(true);
        try {
            await updateEmployeeStatus(detail.memberNumber, {accountStatus: next});
            setDetail((prev) => (prev ? {...prev, accountStatus: next} : prev));
            await loadEmployees(searchQuery.trim() || undefined);
        } catch (err) {
            window.alert('상태 변경에 실패했습니다.');
            console.error(err);
        } finally {
            setIsStatusUpdating(false);
        }
    };

    // ── 계정 생성 완료 ────────────────────────────────────────────────────
    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        loadEmployees(searchQuery.trim() || undefined).catch((err) => console.error(err));
    };

    // ── 렌더 ──────────────────────────────────────────────────────────────
    return (
        <div className={styles.container}>
            {/* 검색창 + 계정 생성 버튼 */}
            <div className={styles.headerRow}>
                <div className={styles.searchWrapper}>
                    <Input
                        color="indigo"
                        size="sm"
                        placeholder="이름 또는 사번 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button color="indigo" size="sm" width="auto" onClick={handleSearch}>
                    검색
                </Button>
                <Button color="indigo" size="sm" width="auto" onClick={() => setIsCreateModalOpen(true)}>
                    + 관리자 계정 생성
                </Button>
            </div>

            {/* 좌(목록) / 우(상세) */}
            <div className={styles.bodyRow}>
                <div className={styles.listPane}>
                    <Table color="indigo" widths={[16, 18, 16, 16, 22, 12]}>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell>사번</Table.Cell>
                                <Table.Cell>이름</Table.Cell>
                                <Table.Cell>부서</Table.Cell>
                                <Table.Cell>직책</Table.Cell>
                                <Table.Cell>연락처</Table.Cell>
                                <Table.Cell align="center">상태</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body emptyMessage="조회된 직원이 없습니다.">
                            {employees.map((emp) => (
                                <Table.Row
                                    key={emp.memberNumber}
                                    onClick={() => handleRowClick(emp.memberNumber)}
                                    active={selectedNumber === emp.memberNumber}
                                >
                                    <Table.Cell><span className={styles.employeeSabun}>{emp.memberNumber}</span></Table.Cell>
                                    <Table.Cell><span className={styles.employeeName}>{emp.memberName}</span></Table.Cell>
                                    <Table.Cell>{emp.departmentName}</Table.Cell>
                                    <Table.Cell>{emp.positionName}</Table.Cell>
                                    <Table.Cell>{emp.memberPhoneNumber}</Table.Cell>
                                    <Table.Cell align="center">
                                        {/* 목록에서는 상태를 표시만 함 — 변경은 상세 패널에서 (오클릭 방지) */}
                                        <span
                                            className={emp.accountStatus === 'Y' ? styles.badgeActive : styles.badgeInactive}>
                                            {ACCOUNT_STATUS_LABEL[emp.accountStatus]}
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                {/* 상세 패널 */}
                <aside className={styles.detailPane}>
                    <div className={styles.detailHeader}>
                        <h3 className={styles.detailTitle}>직원 상세 정보</h3>
                        {detail && (
                            <span className={detail.accountStatus === 'Y' ? styles.badgeActiveLg  : styles.badgeInactiveLg }>
                                {ACCOUNT_STATUS_LABEL[detail.accountStatus]}
                            </span>
                        )}
                    </div>

                    {!detail ? (
                        <p className={styles.detailEmpty}>목록에서 직원을 선택하세요.</p>
                    ) : (
                        <>
                            <div className={styles.detailBody}>
                                <div className={styles.detailSection}>
                                    <h4 className={styles.sectionTitle}>기본 정보</h4>
                                    <InfoField label="사번" value={<div className={styles.valueBox}>{detail.memberNumber}</div>} />
                                    <InfoField label="이름" value={<div className={styles.valueBox}>{detail.memberName}</div>} />
                                </div>

                                <div className={styles.detailSection}>
                                    <h4 className={styles.sectionTitle}>소속 정보</h4>
                                    <div className={styles.detailRow2}>
                                        <InfoField label="부서" value={<div className={styles.valueBox}>{detail.departmentName}</div>} />
                                        <InfoField label="직책" value={<div className={styles.valueBox}>{detail.positionName}</div>} />
                                    </div>
                                </div>

                                <div className={styles.detailSection}>
                                    <h4 className={styles.sectionTitle}>세부 정보</h4>
                                    <InfoField label="아이디" value={<div className={styles.valueBox}>{detail.memberId}</div>} />
                                    <InfoField label="연락처" value={<div className={styles.valueBox}>{detail.memberPhoneNumber}</div>} />
                                </div>
                            </div>

                            <div className={styles.buttonRow}>
                                <Button
                                    type="button"
                                    variant="outline"
                                    color={detail.accountStatus === 'Y' ? 'red' : 'green'}
                                    size="md"
                                    width="auto"
                                    disabled={isStatusUpdating}
                                    onClick={handleToggleStatus}
                                >
                                    {isStatusUpdating
                                        ? '처리 중...'
                                        : detail.accountStatus === 'Y' ? '퇴직 처리' : '재직 전환'}
                                </Button>
                            </div>
                        </>
                    )}
                </aside>
            </div>

            {isCreateModalOpen && (
                <EmployeeCreateModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={handleCreateSuccess}
                />
            )}
        </div>
    );
};