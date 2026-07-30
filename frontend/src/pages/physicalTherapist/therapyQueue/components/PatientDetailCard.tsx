// components/PatientDetailCard.tsx
// ─────────────────────────────────────────────────────────────
// [연결점]
//   props ← TherapyQueue.tsx 105~109행에서 그대로 내려옴 (변경 없음)
//   detail ← useTherapyQueue 훅이 fetchPatientDetail()로 채움 (변경 없음)
//   스타일 ← TherapyQueue.module.css (이 가이드 2번 CSS를 추가해야 함)
// ─────────────────────────────────────────────────────────────
import type { PatientQueueItem, PatientDetail } from '../therapyQueue.types';
import { getAgeAndGender, getSiblingBadge } from '../therapyQueue.utils';
import styles from '../TherapyQueue.module.css';

interface Props {
    patient: PatientQueueItem | null;
    detail: PatientDetail | null;
    loading: boolean;
    queue: PatientQueueItem[];
}

/** 접수시각 → 현재까지 경과 분. 미래/파싱실패는 null (표시 생략) */
const elapsedMin = (iso: string): number | null => {
    const ms = Date.now() - new Date(iso).getTime();
    return Number.isNaN(ms) || ms < 0 ? null : Math.floor(ms / 60000);
};

/** 접수유형 코드 → 한글 라벨 (BE receiptType 기본값 'WALK_IN'과 짝) */
const RECEIPT_TYPE_LABEL: Record<PatientQueueItem['type'], string> = {
    WALK_IN: '현장접수',
    RESERVE: '예약',
};

/** 치료구분 코드 → 한글 라벨 (BE TherapyType enum과 짝) */
const THERAPY_TYPE_LABEL: Record<PatientQueueItem['therapyType'], string> = {
    GENERAL: '일반치료',
    TRACTION: '견인치료',
};

export const PatientDetailCard = ({ patient, detail, loading, queue }: Props) => {
    // ── 미선택 상태: 기존과 동일한 빈 카드 ──
    if (!patient) {
        return (
            <div className={`${styles.rightCard} ${styles.rightCardFlex}`}>
                <div className={styles.cardTitleRow}><h3 className={styles.cardTitle}>물리치료 대상자 상세</h3></div>
                <div className={styles.detailEmpty}>대기열에서 치료 대상자를 선택하세요.</div>
            </div>
        );
    }

    const sibling = getSiblingBadge(patient, queue);       // 기존 유틸 재사용
    const isWaiting = patient.status === 'WAIT';
    const elapsed = patient.receiptTimeIso ? elapsedMin(patient.receiptTimeIso) : null;

    return (
        <div className={`${styles.rightCard} ${styles.rightCardFlex}`}>
            <div className={styles.cardTitleRow}><h3 className={styles.cardTitle}>치료 대기자 상세</h3></div>

            {/* 헤더: 아바타 + 이름/나이 + (오른쪽: 연락처 ↑ / 상태 배지 ↓) */}
            <div className={styles.detailHeader}>
                <div className={styles.detailAvatar}>{patient.name.charAt(0) || '?'}</div>

                <div className={styles.detailHeaderInfo}>
                    <div className={styles.detailName}>
                        <b>{patient.name}</b>
                        <span className={styles.detailAge}>
                            {getAgeAndGender(patient.birthDate, patient.gender)}
                        </span>
                        {/* 연락처: 나이 옆, 로딩 전엔 아예 렌더 안 함 */}
                        {detail?.memberPhoneNumber && (
                            <span className={styles.detailPhone}>
                                (연락처: {detail.memberPhoneNumber})
                            </span>
                        )}
                    </div>
                    <div className={styles.detailSub}>
                        진료번호 {patient.medicalNumber}
                    </div>
                </div>

                <span className={isWaiting ? styles.statusChipWait : styles.statusChipActive}>
                    {isWaiting ? `치료대기 ${patient.sequence}번` : '치료중'}
                </span>
            </div>

            {/* 속성 칩, 이력 요약 칩,  접수유형/치료구분/형제배지, 오른쪽: 받은횟수/이번회차 */}
            <div className={styles.chipRow}>
                <span className={styles.chip}>{RECEIPT_TYPE_LABEL[patient.type]}</span>
                <span className={styles.chip}>{THERAPY_TYPE_LABEL[patient.therapyType]}</span>
                {sibling && (
                    <span className={sibling.tone === 'active' ? styles.chipActive : styles.chipWarn}>
                        {sibling.label}
                    </span>
                )}
                <span className={`${styles.chipStat} ${styles.chipStatFirst}`}>
                    받은 횟수 <b>{loading ? '…' : `${detail?.receivedCount ?? 0}회`}</b>
                </span>
                <span className={styles.chipStat}>
                    이번 회차 <b>{loading ? '…' : detail ? `${detail.courseSeq}번째` : '-'}</b>
                </span>
            </div>

            {/*  치료 정보: 라벨|값 (기존 detailGrid 재사용, 항목만 재구성) ── */}
            <div className={styles.detailSection}>
                <div className={styles.detailGrid}>
                    <span className={styles.detailLabel}>처방 치료</span>
                    <span className={styles.detailValue}>
                        {patient.therapyItems || '-'}
                        {patient.durationMinutes > 0 && (
                            <span className={styles.detailHint}> · {patient.durationMinutes}분</span>
                        )}
                    </span>

                    <span className={styles.detailLabel}>담당의</span>
                    <span className={styles.detailValue}>
                        {detail?.doctorName ?? patient.doctorName ?? '-'}
                        {detail?.specialization && (
                            <span className={styles.detailHint}> ({detail.specialization})</span>
                        )}
                    </span>

                    <span className={styles.detailLabel}>접수 시간</span>
                    <span className={styles.detailValue}>
                        {patient.time || '-'}
                        {isWaiting && elapsed !== null && elapsed < 1440 && (
                            <span className={styles.detailHint}> (대기 {elapsed}분째)</span>
                        )}
                    </span>
                </div>
            </div>
            {/*최근 치료 이력 */}
            <div className={styles.historySection}>
                <p className={styles.historyTitle}>최근 치료 이력</p>
                {loading ? (
                    <div className={styles.historyEmpty}>불러오는 중…</div>
                ) : !detail || detail.history.length === 0 ? (
                    <div className={styles.historyEmpty}>이전 치료 기록이 없습니다.</div>
                ) : (
                    <ul className={styles.historyList}>

                    {detail.history.slice(0, 3).map((h, i) => (
                        <li key={i} className={styles.historyRow}>
                            <span className={styles.historyDate}>{h.treatmentDate}</span>
                            <span className={styles.historyItem}>{h.itemName}</span>
                            <span className={styles.historyStatus}>
                                {h.status === 'DONE' ? '완료' : h.status}
                            </span>
                        </li>
                    ))}
                </ul>
                )}
            </div>
        </div>
    );
};