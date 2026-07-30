import React, {useState, useEffect} from 'react';
import {Button} from '../../../components/ui/Button';
import {Input} from '../../../components/ui/Input';
import {Table} from '../../../components/ui/Table';
import styles from './PatientManagement.module.css';
import {getPatientDetail, getPatients, updatePatientStatus} from '../admin.api';
import type {PatientDetailVO, PatientVO} from '../types/patient.types';

// ── 컴포넌트 ───────────────────────────────────────────────────────────────────

export const PatientManagement = () => {

    // ── 상태 ──────────────────────────────────────────────────────────────────
    const [patients, setPatients] = useState<PatientVO[]>([]);  //목록
    const [searchQuery, setSearchQuery] = useState('');  //검색어
    const [selectedNumber, setSelectedNumber] = useState<string | null>(null); // 선택행
    const [detail, setDetail] = useState<PatientDetailVO | null>(null);

    // ── 목록 불러오기 ──────────────────────────────────────────────────────────
    const loadPatients = async (keyword?: string) => {
        const data = await getPatients(keyword);
        setPatients(data);
    };

    // 최초 마운트 시 전체 목록 조회
    useEffect(() => {
        let isMounted = true;

        const fetchPatients = async () => {
            try {
                const data = await getPatients();
                if (isMounted) {
                    setPatients(data);
                }
            } catch (err) {
                console.error('목록 조회 실패:', err);
            }
        };

        fetchPatients();

        return () => {
            isMounted = false; // 메모리 누수 및 연쇄 렌더링 방지
        };
    }, []);

    // ── 검색 핸들러 ────────────────────────────────────────────────────────────
    const handleSearch = () => loadPatients(searchQuery.trim() || undefined);
    const handleKeyDown = (e: React.KeyboardEvent)=> {
        if(e.key === 'Enter') handleSearch();
    }

    // ── 행 클릭 → 수정 모달 열기 ──────────────────────────────────────────────
    const handleRowClick = async (memberName: string) =>{
        setSelectedNumber(memberName);
        try{
            const data = await getPatientDetail(memberName);
            setDetail(data);
        }catch(err){
            console.error("상세조회 실패", err);
            setDetail(null);
        }
    };

    // ── 사용여부 토글 ────────────────────────────────────────────────────────────
    const handleToggleStatus = async (e: React.MouseEvent, p: PatientVO)=>{
        e.stopPropagation(); 
        const next = p.accountStatus === 'Y' ? 'N' : 'Y';
        if(!window.confirm(`${p.memberName} 님을 ${next === 'Y' ? '활성' : '비활성'} 처리할까요?`))
        return;
        try{
            await updatePatientStatus(p.memberNumber, {accountStatus: next});
            await loadPatients(searchQuery.trim() || undefined); //목록 새로고침
        }catch(err){
            window.alert("사용여부 변경에 실패했습니다.");
            console.error(err);
        }
    }

    // ── 렌더 ──────────────────────────────────────────────────────────────────

    return (
        <div className={styles.container}>

            {/* 검색창 */}
            <div className={styles.headerRow}>
                <div className={styles.searchWrapper}>
                    <Input
                        color="indigo"
                        size="sm"
                        placeholder="환자명 또는 전화번호 검색..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button color="indigo" size="sm" width="auto" onClick={handleSearch}>
                    검색
                </Button>
            </div>

            {/* 좌(목록) / 우(상세)*/}
            <div className={styles.bodyRow}>
                {/* 회원 목록 */}
                <div className={styles.tableWrapper}>
                    <Table color="indigo" widths={[10, 20, 20, 16, 22, 12]}>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell>No</Table.Cell>
                                <Table.Cell>환자명</Table.Cell>
                                <Table.Cell>생년월일</Table.Cell>
                                <Table.Cell>성별</Table.Cell>
                                <Table.Cell>전화번호</Table.Cell>
                                <Table.Cell align="center">사용여부</Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body emptyMessage="조회된 환자가 없습니다.">
                            {patients.map((p, idx) => (
                                <Table.Row
                                    key={p.memberNumber}
                                    onClick={() => handleRowClick(p.memberNumber)}
                                    active={selectedNumber===p.memberNumber}
                                >
                                    <Table.Cell>{idx + 1}</Table.Cell>
                                    <Table.Cell>{p.memberName}</Table.Cell>
                                    <Table.Cell>{p.birthDate}</Table.Cell>
                                    <Table.Cell>{p.gender}</Table.Cell>
                                    <Table.Cell>{p.memberPhoneNumber}</Table.Cell>
                                    <Table.Cell align="center">
                                        <button
                                            type="button"
                                            className={p.accountStatus ==='Y' ? styles.badgeY : styles.badgeN}
                                            style={{border: 'none', cursor: 'pointer'}}
                                            onClick={(e)=> handleToggleStatus(e,p)}
                                        >
                                            {p.accountStatus === 'Y' ? '활성' : '비활성'}
                                        </button>
                                        </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
                {/* 상세 패널 */}
                <aside className={styles.detailPane}>
                    {!detail ? (
                        <div className={styles.detailEmpty}>
                            <p>목록에서 환자를 선택하면 상세 정보가 표시됩니다.</p>
                        </div>
                    ):(
                        <>
                            {/* t상단 프로필 헤더 */}
                            <div className={styles.detailHeader}>
                                <h3 className={styles.detailHeaderTitle}>{detail.memberName} 환자 상세 정보</h3>
                                <span className={detail.accountStatus === 'Y' ? styles.statusBadgeY : styles.statusBadgeN }>
                                    {detail.accountStatus === 'Y' ? '계정 활성' : '계정 비활성' }
                                </span>
                            </div>
                            {/* 기본 정보 섹션 */}
                            <div className={styles.detailSection}>
                                <span className={styles.sectionTitle}>기본 정보</span>
                                <div className={styles.gridTwo}>
                                    <DetailField label='환자 번호' value={detail.memberNumber}/>
                                    <DetailField label='아이디' value={detail.memberId}/>
                                    <DetailField label='주민등록번호' value={detail.rrn?.split('-')[0] ||'-'}/>
                                    <DetailField label={'\u00a0'} value={detail.rrn?.split('-')[1] ||'-'}/>
                                </div>
                            </div>
                            {/* 연락 및 주소 정보 섹션 */}
                            <div className={styles.detailSection}>
                                <span className={styles.sectionTitle}>연락 및 주소 정보</span>
                                <div className={styles.gridTwo}>
                                    <DetailField label="연락처" value={detail.memberPhoneNumber} fullWidth/>
                                    <DetailField label="우편번호" value={detail.postalCode}/>
                                    <DetailField
                                        label="주소"
                                        value={`${detail.primaryAddress ?? ''} ${detail.detailedAddress ?? ''}`.trim()}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </aside>
            </div>
        </div>
    );
};
// ── 읽기전용 필드 표시용 소형 컴포넌트 ─────────────────────────
const DetailField = ({
    label,
    value,
    fullWidth = false
}:{
    label: string;
    value: string | null;
    fullWidth?: boolean
}) =>(
    <div className={styles.detailField} style={fullWidth ? {gridColumn: '1 /-1'}: undefined}>
        <span className={styles.detailLabel}>{label}</span>
        <div className={styles.detailValueBox}>
            {value && value.trim() !== ''? value : '-'}
        </div>
    </div>
);