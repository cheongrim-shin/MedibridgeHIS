import { useCallback, useEffect, useState } from 'react';
import { COLOR_PALETTE, type AppointmentRow } from '../appointment.types';
import { formatBirth, maskPhone } from '../appointment.utils';
import styles from '../AppointmentPage.module.css';

/**
 * 예약 상세 / 수정 / 취소 모달 
 */

interface Props {
    row: AppointmentRow;
    onClose: () => void;
    onUpdate: (no: string, symptoms: string, color: string) => Promise<void>;
    onCancel: (no: string) => Promise<void>;
    onReceive: (no: string) => Promise<void>;
}

export const AppointmentDetailModal = ({ row, onClose, onUpdate, onCancel, onReceive }: Props) => {

    const [symptoms, setSymptoms] = useState(row.symptoms ?? '');
    const [color, setColor] = useState(row.color ?? COLOR_PALETTE[0]);
    const [busy, setBusy] = useState(false);

    /** ESC로 닫기 */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    /** 변경된 내용이 있는지 — 없으면 저장 버튼을 비활성화한다 */
    const dirty = symptoms !== (row.symptoms ?? '') || color !== (row.color ?? COLOR_PALETTE[0]);

    const handleUpdate = useCallback(async () => {
        if (busy) return;
        setBusy(true);
        try {
            await onUpdate(row.appointmentNumber, symptoms, color);
        } finally {
            setBusy(false);
        }
    }, [busy, row.appointmentNumber, symptoms, color, onUpdate]);

    const handleCancel = useCallback(async () => {
        if (busy) return;
        setBusy(true);
        try {
            await onCancel(row.appointmentNumber);
        } finally {
            setBusy(false);
        }
    }, [busy, row.appointmentNumber, onCancel]);

    const handleReceive = useCallback(async () => {
        if (busy) return;
        setBusy(true);
        try {
            await onReceive(row.appointmentNumber);
        } finally {
            setBusy(false);
        }
    }, [busy, row.appointmentNumber, onReceive]);

    const today = new Date().toISOString().slice(0, 10);   // 'YYYY-MM-DD'
    const isBeforeReserveDate = row.reserveDate > today;    // 예약일이 아직 안 옴

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="detailModalTitle"
            >
                <header className={styles.modalHeader}>
                    <h3 id="detailModalTitle">
                        예약 상세
                        <span className={styles.badgeConfirmed}>{row.status}</span>
                    </h3>
                    <button className={styles.iconBtn} onClick={onClose} aria-label="닫기">×</button>
                </header>

                <div className={styles.modalBody}>

                    {/* ── 읽기 전용 정보 ──────────────────────── */}
                    <dl className={styles.infoList}>
                        <div className={styles.infoRow}>
                            <dt>예약번호</dt>
                            <dd>{row.appointmentNumber}</dd>
                        </div>
                        <div className={styles.infoRow}>
                            <dt>환자</dt>
                            <dd>
                                <b>{row.patientName}</b>
                                <span className={styles.sub}>
                                    {formatBirth(row.birthDate)} · {maskPhone(row.phone)}
                                </span>
                            </dd>
                        </div>
                        <div className={styles.infoRow}>
                            <dt>담당의</dt>
                            <dd>{row.doctorName ?? row.doctorNumber}</dd>
                        </div>
                        <div className={styles.infoRow}>
                            <dt>예약 일시</dt>
                            <dd>{row.reserveDate} {row.reserveTime}</dd>
                        </div>
                    </dl>

                    <p className={styles.hintSmall}>
                        시간을 바꾸려면 모달을 닫고 캘린더에서 예약을 끌어 옮기세요.
                    </p>

                    {/* ── 수정 가능 항목 ──────────────────────── */}
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="detailSymptoms">증상 / 방문 사유</label>
                        <textarea
                            id="detailSymptoms"
                            className={styles.textarea}
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            maxLength={200}
                            rows={3}
                        />
                        <span className={styles.counter}>{symptoms.length}/200</span>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>캘린더 색상</label>
                        <div className={styles.colorRow}>
                            {COLOR_PALETTE.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    className={`${styles.colorDot} ${color === c ? styles.colorOn : ''}`}
                                    style={{ background: c }}
                                    onClick={() => setColor(c)}
                                    aria-label={`색상 ${c}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <footer className={styles.modalFooter}>
                    {row.status === '예약확정' && isBeforeReserveDate && (
                        <p className={styles.receiveHint}>
                            예약일({row.reserveDate})부터 접수할 수 있습니다.
                        </p>
                    )}

                    <div className={styles.footerButtons}>
                        <button type="button" className={styles.btnDanger} onClick={handleCancel} disabled={busy}>
                            예약 취소
                        </button>

                        {row.status === '예약확정' && (
                            <button type="button" className={styles.btnPrimary}
                                    onClick={handleReceive}
                                    disabled={busy || isBeforeReserveDate}>
                                접수하기
                            </button>
                        )}

                        <div className={styles.footerRight}>
                            <button type="button" className={styles.btnGhost} onClick={onClose}>닫기</button>
                            <button type="button" className={styles.btnPrimary}
                                    onClick={handleUpdate} disabled={!dirty || busy}>
                                {busy ? '저장 중…' : '변경 저장'}
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
