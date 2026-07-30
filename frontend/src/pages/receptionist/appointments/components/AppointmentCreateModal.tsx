import { useCallback, useEffect, useRef, useState } from 'react';
import { COLOR_PALETTE } from '../appointment.types';
import { ApiError } from '../appointment.api';
import { searchPatients, type PatientHit } from '../../shared/patient.api';
import { toDateStr, toTimeStr, formatBirth, maskPhone } from '../appointment.utils';
import styles from '../AppointmentPage.module.css';
import type { DoctorRow } from '../../shared/doctor.api';
import { refineSymptoms } from '../../shared/ai.api';

/**
 * 예약 등록 모달 (완성본) 
 *  [저장]을 누르면 POST → BE가 즉시 '예약확정' 상태로 INSERT.
 *  승인 단계는 없다.
 */

interface Props {
    doctor: DoctorRow;
    start: Date;
    end: Date;
    initialPatientName?: string;  // AI가 뽑은 환자명  — 검색창 초기값
    initialSymptoms?: string;    // AI가 뽑은 증상
    onClose: () => void;
    onSubmit: (memberNumber: string, symptoms: string, color: string) => Promise<void>;
}

export const AppointmentCreateModal = ({
    doctor, start, end, initialPatientName, initialSymptoms, onClose, onSubmit,
}: Props) => {

    // ── 환자 검색 ───────────────────────────────────────────
    const [keyword, setKeyword] = useState(initialPatientName ?? '');
    const [hits, setHits] = useState<PatientHit[]>([]);
    const [searching, setSearching] = useState(false);
    const [patient, setPatient] = useState<PatientHit | null>(null);

    // ── 입력값 ─────────────────────────────────────────────
    const [symptoms, setSymptoms] = useState(initialSymptoms ?? '');
    const [color, setColor] = useState<string>(COLOR_PALETTE[0]);

    // ── 제출 상태 ───────────────────────────────────────────
    // 중복 제출 방지저장 버튼 연타로 예약이 2건 생기는 것을 막는다.
    const [submitting, setSubmitting] = useState(false);

    const abortRef = useRef<AbortController | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [refining, setRefining] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);


    /** 모달이 열리면 검색창에 자동 포커스 — 바로 타이핑할 수 있게 */
    useEffect(() => { inputRef.current?.focus(); }, []);

    /** ESC 키로 닫기 — 접근성 기본 */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    /**
     * 환자 검색 — 디바운스(debounce) 적용
     * 디바운스란: 타이핑이 "멈춘 뒤" 일정 시간이 지나야 실행하는 기법.
     * '홍길동'을 치면 키 입력마다 요청하면 3번 날아간다.
     * 300ms 기다렸다가 마지막 한 번만 보내면 요청이 1/3로 준다.
     */
    useEffect(() => {
        const kw = keyword.trim();
        // eslint-disable-next-line
        if (kw.length < 2) { setHits([]); return; }

        const timer = setTimeout(() => {
            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            setSearching(true);
            searchPatients(kw, controller.signal)
                .then(setHits)
                .catch((e: ApiError) => { if (e.status !== 0) setHits([]); })
                .finally(() => setSearching(false));
        }, 300);

        return () => {
            clearTimeout(timer);
            abortRef.current?.abort();
        };
    }, [keyword]);

    /** [저장] */
    const handleSubmit = useCallback(async () => {
        if (!patient) return;
        if (submitting) return;              // 연타 방어
        setSubmitting(true);
        try {
            await onSubmit(patient.memberNumber, symptoms, color);
        } finally {
            setSubmitting(false);
        }
    }, [patient, symptoms, color, submitting, onSubmit]);

    /** 입력한 증상을 AI가 의료진용으로 다듬어 그 자리에 반영 */
    const handleRefine = async () => {
        if (!symptoms.trim()) return;
        setRefining(true);
        try {
            const refined = await refineSymptoms(symptoms.trim());
            setSymptoms(refined);          // 결과로 교체 — 사용자가 다시 수정 가능
        } catch (e) {
            setAiError(e instanceof Error ? e.message : 'AI 정리 실패');
        } finally {
            setRefining(false);
        }
    };

    const durationMin = Math.round((end.getTime() - start.getTime()) / 60000);

    return (
        // 배경 클릭 시 닫기. 내부 클릭은 stopPropagation으로 전파를 끊는다.
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="createModalTitle"
            >
                <header className={styles.modalHeader}>
                    <h3 id="createModalTitle">예약 등록</h3>
                    <button className={styles.iconBtn} onClick={onClose} aria-label="닫기">×</button>
                </header>

                <div className={styles.modalBody}>

                    {/* ── 확정된 예약 정보 (읽기 전용) ────────── */}
                    <div className={styles.slotSummary}>
                        <div className={styles.slotSummaryRow}>
                            <span className={styles.slotKey}>담당의</span>
                            <span className={styles.slotVal}>
                                {doctor.doctorName} <em>({doctor.deptName})</em>
                            </span>
                        </div>
                        <div className={styles.slotSummaryRow}>
                            <span className={styles.slotKey}>일시</span>
                            <span className={styles.slotVal}>
                                {toDateStr(start)} {toTimeStr(start)} ~ {toTimeStr(end)}
                                <em> ({durationMin}분)</em>
                            </span>
                        </div>
                    </div>

                    {/* ── 환자 검색 ───────────────────────────── */}
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="patientSearch">
                            환자 <span className={styles.req}>*</span>
                        </label>

                        {patient ? (
                            /* 선택 완료 상태 */
                            <div className={styles.pickedPatient}>
                                <div>
                                    <b>{patient.memberName}</b>
                                    <span className={styles.sub}>
                                        {formatBirth(patient.birthDate)} · {patient.gender} · {maskPhone(patient.memberPhoneNumber)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className={styles.linkBtn}
                                    onClick={() => { setPatient(null); setKeyword(''); }}
                                >
                                    변경
                                </button>
                            </div>
                        ) : (
                            /* 검색 중 상태 */
                            <>
                                <input
                                    id="patientSearch"
                                    ref={inputRef}
                                    className={styles.input}
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="환자명 또는 연락처 2자 이상 입력"
                                    autoComplete="off"
                                />
                                {searching && <p className={styles.searchHint}>검색 중…</p>}
                                {!searching && keyword.trim().length >= 2 && hits.length === 0 && (
                                    <p className={styles.searchHint}>검색 결과가 없습니다.</p>
                                )}
                                {hits.length > 0 && (
                                    <ul className={styles.hitList}>
                                        {hits.map((h) => (
                                            <li key={h.memberNumber}>
                                                <button
                                                    type="button"
                                                    className={styles.hitItem}
                                                    onClick={() => { setPatient(h); setHits([]); }}
                                                >
                                                    <b>{h.memberName}</b>
                                                    <span className={styles.sub}>
                                                        {formatBirth(h.birthDate)} · {h.gender} · {maskPhone(h.memberPhoneNumber)}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                    </div>

                    {/* ── 증상 ────────────────────────────────── */}
                    <div className={styles.field}>
                        {/* 라벨과 AI 버튼을 한 줄에 (라벨 왼쪽 / 버튼 오른쪽) */}
                        <div className={styles.labelRow}>
                            <label className={styles.label} htmlFor="symptoms">증상 / 방문 사유</label>
                            <button
                                type="button"                       /* ★ 폼 안이라 필수 — 없으면 submit 됨 */
                                className={styles.aiRefineBtn}
                                onClick={handleRefine}
                                disabled={refining || !symptoms.trim()}
                                title="입력한 증상을 의료진이 보기 쉽게 다듬습니다"
                            >
                                {refining ? '정리 중…' : ' AI 문장 정리'}
                            </button>
                        </div>
                        <textarea
                            id="symptoms"
                            className={styles.textarea}
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            maxLength={200}
                            rows={3}
                            placeholder="선택 입력 (200자 이내)"
                        />
                        <div className={styles.symptomFoot}>
                            {aiError && <span className={styles.aiError}>{aiError}</span>}
                            <span className={styles.counter}>{symptoms.length}/200</span>
                        </div>
                    </div>

                    {/* ── 색상 ────────────────────────────────── */}
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
                    <button type="button" className={styles.btnGhost} onClick={onClose}>
                        취소
                    </button>
                    <button
                        type="button"
                        className={styles.btnPrimary}
                        onClick={handleSubmit}
                        disabled={!patient || submitting}
                    >
                        {submitting ? '저장 중…' : '예약 확정'}
                    </button>
                </footer>
            </div>
        </div>
    );
};
