import { useCallback, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type {
    DateSelectArg,
    EventClickArg,
    EventDropArg,
    EventInput,
    DatesSetArg,
} from '@fullcalendar/core';
import koLocale from '@fullcalendar/core/locales/ko';

import {
    FC_BUSINESS_HOURS,
    BUSINESS_HOURS,
    DEFAULT_DURATION_MINUTES,
    type AppointmentRow,
} from './appointment.types';
import {
    cancelAppointment,
    changeAppointment,
    createAppointment,
    fetchAppointments,
    ApiError,
    receiveAppointment,
} from './appointment.api';
import { toDateStr, toReserveAt, diffMinutes } from './appointment.utils';
import { AppointmentCreateModal } from './components/AppointmentCreateModal';
import { AppointmentDetailModal } from './components/AppointmentDetailModal';
import styles from './AppointmentPage.module.css';
import { fetchDoctors, type DoctorRow } from '../shared/doctor.api';
import { parseAppointment } from '../shared/ai.api';
import { searchPatients, type PatientHit } from '../shared/patient.api';

/**
 * 예약 관리 — FullCalendar 메인
 */
export const AppointmentPage = () => {

    // ── 캘린더 인스턴스 접근용 ref ──────────────────────────
    // FullCalendar의 명령형 API(오늘로 이동, 강제 새로고침 등)를 쓰려면 필요하다.
    const calendarRef = useRef<FullCalendar | null>(null);

    // ── 서버 데이터 ─────────────────────────────────────────
    const [doctors, setDoctors] = useState<DoctorRow[]>([]);
    const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
    const [loading, setLoading] = useState(false);

    // ── 필터: 선택된 담당의 (''이면 전체) ────────────────────
    const [doctorNumber, setDoctorNumber] = useState<string>('');

    // ── 현재 캘린더가 보여주는 기간 ──────────────────────────
    // datesSet 콜백이 채워준다. 저장 후 재조회할 때 이 값을 쓴다.
    const rangeRef = useRef<{ fromDate: string; toDate: string } | null>(null);

    // ── 모달 상태 ───────────────────────────────────────────
    /** 등록 모달: 클릭한 빈 슬롯 정보. null이면 닫힘 */
    const [createTarget, setCreateTarget] =
        useState<{ start: Date; end: Date; patientName?: string; symptoms?: string; } | null>(null);
    /** 상세 모달: 클릭한 예약. null이면 닫힘 */
    const [detailTarget, setDetailTarget] = useState<AppointmentRow | null>(null);

    const notify = useCallback((message: string, _type?: 'success' | 'error' | 'info') => {
        void _type;
        window.alert(message);
    }, []);

    // ── 진행 중인 조회 요청 취소용 ───────────────────────────
    const abortRef = useRef<AbortController | null>(null);

    const [aiText, setAiText] = useState('');       // 자연어 입력
    const [aiBusy, setAiBusy] = useState(false);    // 처리 중 표시


    // ════════════════════════════════════════════════════════
    // 1. 담당의 목록 로드 (최초 1회)
    // ════════════════════════════════════════════════════════
    useEffect(() => {
        let ignore = false;   // 언마운트 후 setState 방지 플래그
        fetchDoctors()
            .then((list) => { if (!ignore) setDoctors(list); })
            .catch((e: ApiError) => { if (!ignore) notify(e.message, 'error'); });
        return () => { ignore = true; };
    }, [notify]);


    // ════════════════════════════════════════════════════════
    // 2. 예약 조회
    // ════════════════════════════════════════════════════════
    /**
     * 현재 보이는 기간 + 선택된 의사 기준으로 예약을 다시 불러온다.
     * useCallback으로 감싸는 이유: 이 함수를 useEffect 의존성에 넣기 때문.
     * 감싸지 않으면 렌더마다 새 함수가 만들어져 무한 재조회 루프가 생긴다.
     */
    const reload = useCallback(async () => {
        const range = rangeRef.current;
        if (!range) return;   // 캘린더가 아직 datesSet을 안 불렀다

        // 이전 요청 취소 — 주 이동 연타 시 응답 순서 뒤바뀜 방지
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        try {
            const rows = await fetchAppointments(
                { ...range, doctorNumber: doctorNumber || undefined },
                controller.signal,
            );
            setAppointments(rows);
        } catch (e) {
            const err = e as ApiError;
            notify(err.message, 'error');
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    }, [doctorNumber, notify]);

    /** 의사 필터가 바뀌면 즉시 재조회 */
    useEffect(() => { void reload(); }, [reload]);

    /**
     * 캘린더의 표시 기간이 바뀔 때 호출된다 (이전/다음/오늘/뷰 전환)
     * arg.start ~ arg.end 는 캘린더가 실제로 그리는 범위다.
     * BE 쿼리는 toDate 를 포함하도록 되어 있으므로 하루를 빼서 맞춘다.
     */
    const handleDatesSet = useCallback((arg: DatesSetArg) => {
        const endInclusive = new Date(arg.end);
        endInclusive.setDate(endInclusive.getDate() - 1);

        const next = {
            fromDate: toDateStr(arg.start),
            toDate: toDateStr(endInclusive),
        };

        // 같은 범위면 재조회하지 않는다 
        const prev = rangeRef.current;
        if (prev && prev.fromDate === next.fromDate && prev.toDate === next.toDate) return;

        rangeRef.current = next;
        void reload();
    }, [reload]);


    // ════════════════════════════════════════════════════════
    // 3. 서버 데이터 → FullCalendar 이벤트 변환
    // ════════════════════════════════════════════════════════
    /**
     * AppointmentRow[] 를 FullCalendar가 이해하는 EventInput[] 로 바꾼다.
     * extendedProps 에 원본 row를 통째로 넣는 이유:
     * 이벤트를 클릭했을 때 서버를 다시 부르지 않고 상세 모달을 즉시 띄우기 위해서다.
     * (FullCalendar는 표준 필드 외의 데이터를 여기에 보관한다)
     */
    const events: EventInput[] = appointments.map((a) => ({
        id: a.appointmentNumber,
        title: `${a.patientName}${a.doctorName ? ` · ${a.doctorName}` : ''}`,
        start: a.startAt,
        end: a.endAt,
        backgroundColor: a.color ?? '#3788d8',
        borderColor: a.color ?? '#3788d8',
        extendedProps: { row: a },
    }));


    // ════════════════════════════════════════════════════════
    // 4. 빈 슬롯 선택 → 등록 모달
    // ════════════════════════════════════════════════════════
    /**
     * selectable={true} 상태에서 빈 영역을 클릭하거나 드래그하면 호출된다.
     * selectAllow 로 이미 막고 있지만, 여기서도 한 번 더 확인한다.
     */
    const handleSelect = useCallback((arg: DateSelectArg) => {
        if (!doctorNumber) {
            notify('먼저 담당의를 선택해 주세요.', 'error');
            arg.view.calendar.unselect();
            return;
        }
        if (arg.start < new Date()) {
            notify('지난 시각에는 예약할 수 없습니다.', 'error');
            arg.view.calendar.unselect();
            return;
        }
        setCreateTarget({ start: arg.start, end: arg.end });
        arg.view.calendar.unselect();   // 선택 하이라이트 해제
    }, [doctorNumber, notify]);

    /**
     * 드래그로 선택 가능한 범위 제한.
     * true를 반환하면 허용, false면 차단(드래그 자체가 안 됨).
     */
    const handleSelectAllow = useCallback((span: { start: Date; end: Date }) => {
        // 일요일 차단
        if (span.start.getDay() === 0) return false;
        // 점심시간(12:00~14:00) 차단
        const h = span.start.getHours();
        if (h >= 12 && h < 14) return false;
        return true;
    }, []);

    /** 등록 모달 [저장] */
    const handleCreate = useCallback(async (
        memberNumber: string,
        symptoms: string,
        color: string,
    ) => {
        if (!createTarget) return;
        try {
            const no = await createAppointment({
                memberNumber,
                doctorNumber,
                reserveAt: toReserveAt(createTarget.start),
                durationMinutes: diffMinutes(createTarget.start, createTarget.end)
                                 || DEFAULT_DURATION_MINUTES,
                symptoms: symptoms || undefined,
                color,
            });
            setCreateTarget(null);
            notify(`예약이 확정되었습니다. (${no})`, 'success');
            await reload();
        } catch (e) {
            const err = e as ApiError;
            notify(err.message, 'error');
            if (err.isConflict) { setCreateTarget(null); await reload(); }
        }
    }, [createTarget, doctorNumber, notify, reload]);


    // ════════════════════════════════════════════════════════
    // 5. 이벤트 클릭 → 상세 모달
    // ════════════════════════════════════════════════════════
    const handleEventClick = useCallback((arg: EventClickArg) => {
        const row = arg.event.extendedProps.row as AppointmentRow | undefined;
        if (row) setDetailTarget(row);
    }, []);


    // ════════════════════════════════════════════════════════
    // 6. 드래그&드롭 이동 / 길이 조절 → 예약 변경
    // ════════════════════════════════════════════════════════
    /**
     * 이벤트를 다른 시간으로 끌어다 놓았을 때.
     * FullCalendar는 사용자가 놓는 순간 화면을 먼저 바꾼다(낙관적 업데이트).
     * 서버 저장이 실패하면 화면과 DB가 어긋나므로 revert()로 원위치시킨다.
     * 이걸 빼먹으면 "화면엔 옮겨졌는데 새로고침하면 원래대로" 가 되어
     * 사용자가 예약이 저장된 줄 착각한다.
     */
    const handleEventDrop = useCallback(async (arg: EventDropArg) => {
        const row = arg.event.extendedProps.row as AppointmentRow;
        const start = arg.event.start;
        const end = arg.event.end;
        if (!start) { arg.revert(); return; }

        try {
            await changeAppointment(row.appointmentNumber, {
                memberNumber: row.memberNumber,
                doctorNumber: row.doctorNumber,
                reserveAt: toReserveAt(start),
                durationMinutes: end ? diffMinutes(start, end) : DEFAULT_DURATION_MINUTES,
                symptoms: row.symptoms ?? undefined,
                color: row.color ?? undefined,
            });
            await reload();
        } catch (e) {
            arg.revert();                      
            notify((e as ApiError).message, 'error');
        }
    }, [notify, reload]);

    /** 이벤트 아래쪽을 끌어 진료 시간을 늘리거나 줄였을 때 — 처리 로직은 이동과 동일 */
    const handleEventResize = useCallback(async (arg: {
        event: EventClickArg['event']; revert: () => void;
    }) => {
        const row = arg.event.extendedProps.row as AppointmentRow;
        const start = arg.event.start;
        const end = arg.event.end;
        if (!start || !end) { arg.revert(); return; }

        try {
            await changeAppointment(row.appointmentNumber, {
                memberNumber: row.memberNumber,
                doctorNumber: row.doctorNumber,
                reserveAt: toReserveAt(start),
                durationMinutes: diffMinutes(start, end),
                symptoms: row.symptoms ?? undefined,
                color: row.color ?? undefined,
            });
            await reload();
        } catch (e) {
            arg.revert();
            notify((e as ApiError).message, 'error');
        }
    }, [notify, reload]);


    // ════════════════════════════════════════════════════════
    // 7. 상세 모달 — 수정 / 취소
    // ════════════════════════════════════════════════════════
    const handleUpdate = useCallback(async (
        no: string, symptoms: string, color: string,
    ) => {
        if (!detailTarget) return;
        try {
            await changeAppointment(no, {
                memberNumber: detailTarget.memberNumber,
                doctorNumber: detailTarget.doctorNumber,
                reserveAt: `${detailTarget.reserveDate} ${detailTarget.reserveTime}`,
                symptoms: symptoms || undefined,
                color,
            });
            setDetailTarget(null);
            notify('예약이 수정되었습니다.', 'success');
            await reload();
        } catch (e) {
            notify((e as ApiError).message, 'error');
        }
    }, [detailTarget, notify, reload]);

    const handleCancel = useCallback(async (no: string) => {
        if (!window.confirm('이 예약을 취소하시겠습니까?\n취소된 예약은 되돌릴 수 없습니다.')) return;
        try {
            await cancelAppointment(no);
            setDetailTarget(null);
            notify('예약이 취소되었습니다.', 'success');
            await reload();
        } catch (e) {
            notify((e as ApiError).message, 'error');
        }
    }, [notify, reload]);

    const handleReceive = useCallback(async (no: string) => {
        if(!window.confirm("해당 예약을 접수하시겠습니까?")){
            return;
        }
        try {
            const medicalNumber = await receiveAppointment(no);
            setDetailTarget(null);                       // 모달 닫기
            notify(`접수 완료 — 접수번호 ${medicalNumber}`, 'success');
            await reload();                              // 캘린더 재조회(예약이 접수완료로 바뀜)
        } catch (e) {
            notify((e as ApiError).message, 'error');    // 409 "이미 접수됨" 등
        }
    }, [notify, reload]);

    /**
     * 자연어 → 파싱 → 예약 등록 모달 미리채움
     * 여기서 바로 등록하지 않는다 — 사람이 확인하는 단계를 반드시 거친다
     */
    const handleAiParse = useCallback(async () => {
        if (!aiText.trim()) return;
        setAiBusy(true);
        try {
            // 응답: { doctorNumber, patientName, reserveAt, durationMinutes, symptoms }
            const p = await parseAppointment(aiText.trim());

            // (1) 의사 — 파싱된 번호가 목록에 있으면 필터를 그 의사로 전환
            if (p.doctorNumber && doctors.some((d) => d.doctorNumber === p.doctorNumber)) {
                setDoctorNumber(p.doctorNumber);
            } else {
                notify('담당의를 알아내지 못했습니다. 직접 선택해 주세요.', 'info');
            }

            // (2) 시각 — 'yyyy-MM-dd HH:mm' → Date 로 (Safari 호환 위해 'T' 치환)
            if (!p.reserveAt) { notify('예약 시각을 알아내지 못했습니다.', 'error'); return; }
            const start = new Date(p.reserveAt.replace(' ', 'T'));
            if (isNaN(start.getTime())) { notify('예약 시각 형식을 이해하지 못했습니다.', 'error'); return; }
            const end = new Date(start.getTime() + (p.durationMinutes ?? 30) * 60000);

            // (3) 환자 — 이름으로 검색해 후보 확인 (동명이인 대비, 확정은 사람이)
            if (p.patientName) {
                const hits: PatientHit[] = await searchPatients(p.patientName);
                if (hits.length === 0)      notify(`'${p.patientName}' 환자를 찾지 못했습니다.`, 'error');
                else if (hits.length > 1)   notify(`동명이인 ${hits.length}명 — 모달에서 확인해 주세요.`, 'info');
            }

            // (4) 등록 모달 열기 — 사용자가 최종 확인·수정 후 저장
            setCreateTarget({ start, end, patientName: p.patientName, symptoms: p.symptoms});
            setAiText('');
        } catch (e) {
            notify(e instanceof Error ? e.message : 'AI 처리 실패', 'error');
        } finally {
            setAiBusy(false);
        }
    }, [aiText, doctors, notify]);


    // ════════════════════════════════════════════════════════
    // 렌더링
    // ════════════════════════════════════════════════════════
    const selectedDoctor = doctors.find((d) => d.doctorNumber === doctorNumber);

    return (
        <div className={styles.page}>
            <p className={styles.pageDesc}>
                <b>[시연용]</b> FullCalendar 기반 예약 관리입니다. 담당의 선택 후 빈 슬롯을 클릭해 예약 등록,
                자연어(예: "다음주 화요일 3시 홍길동 김원장 예약")로
                입력하면 <b>원내에서 구동되는 로컬 AI(LM Studio 기반 LLM)</b>가 문장을 해석해
                담당의·일시·환자를 자동으로 채워줍니다. (외부 전송 없이 로컬에서 처리, 1분걸림.)
            </p>

            {/* ── 상단 필터 바 ────────────────────────────── */}
            <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                    <label className={styles.filterLabel} htmlFor="doctorSelect">담당의</label>
                    <select
                        id="doctorSelect"
                        className={styles.doctorSelect}
                        value={doctorNumber}
                        onChange={(e) => setDoctorNumber(e.target.value)}
                    >
                        <option value="">전체 의료진</option>
                        {doctors.map((d) => (
                            <option key={d.doctorNumber} value={d.doctorNumber}>
                                {d.doctorName}{/*  ({d.deptName}) */}
                            </option>
                        ))}
                    </select>
                    <div className={styles.aiBar}>
                        <input
                            className={styles.aiInput}
                            placeholder="예: 다음주 화요일 오후 3시 김암호 환자 김원장 예약"
                            value={aiText}
                            onChange={(e) => setAiText(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAiParse(); }}
                            disabled={aiBusy}
                        />
                        <button className={styles.aiBtn} onClick={handleAiParse} disabled={aiBusy || !aiText.trim()}>
                            {aiBusy ? 'AI 분석 중...' : 'AI로 채우기'}
                        </button>
                    </div>
                    {loading && <span className={styles.loading}>불러오는 중…</span>}
                </div>

                <div className={styles.toolbarRight}>
                    <span className={styles.countBadge}>
                        예약 {appointments.length}건
                    </span>
                </div>
            </div>

            {/* ── 안내 문구 ───────────────────────────────── */}
            <p className={styles.hint}>
                {doctorNumber
                    ? <>빈 시간대를 클릭하면 <b>바로 예약이 확정</b>됩니다. 예약을 끌어서 시간을 옮길 수 있습니다.</>
                    : <><b>담당의를 선택하면 예약을 등록할 수 있습니다</b>. (전체 보기에서는 조회만 가능)</>}
            </p>

            {/* ── 캘린더 ──────────────────────────────────── */}
            <div className={styles.calendarWrap}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    locale={koLocale}

                    /* 상단 툴바 구성: 좌 / 중앙 / 우 */
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridDay,timeGridWeek,dayGridMonth',
                    }}
                    buttonText={{ today: '오늘', month: '월', week: '주', day: '일' }}

                    /* ── 시간축 설정 ── */
                    slotMinTime={BUSINESS_HOURS.slotMinTime}   // 09:00 부터 표시
                    slotMaxTime={BUSINESS_HOURS.slotMaxTime}   // 18:00 까지 표시
                    slotDuration={BUSINESS_HOURS.slotDuration} // 한 칸 = 30분
                    slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                    allDaySlot={false}                          // 종일 영역 숨김 (예약은 항상 시간 지정)

                    /* ── 휴진 / 영업시간 ── */
                    hiddenDays={[0]}                            // 일요일 열 자체를 숨김
                    businessHours={FC_BUSINESS_HOURS}           // 점심시간이 자동으로 흐려진다
                    weekends={true}

                    /* ── 데이터 ── */
                    events={events}
                    datesSet={handleDatesSet}                   // 기간 변경 시 재조회

                    /* ── 상호작용 ── */
                    selectable={!!doctorNumber}                 // 의사 미선택 시 선택 불가
                    selectMirror={true}                         // 드래그 중 미리보기 표시
                    selectAllow={handleSelectAllow}
                    select={handleSelect}
                    eventClick={handleEventClick}

                    editable={!!doctorNumber}                   // 드래그 이동 허용
                    eventStartEditable={true}
                    eventDurationEditable={true}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}

                    /* ── 표시 옵션 ── */
                    nowIndicator={true}                         // 현재 시각 빨간 선
                    height="auto"
                    expandRows={true}
                    eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                    dayHeaderFormat={{ month: 'numeric', day: 'numeric', weekday: 'short' }}
                />
            </div>

            {/* ── 모달 ────────────────────────────────────── */}
            {createTarget && selectedDoctor && (
                <AppointmentCreateModal
                    doctor={selectedDoctor}
                    start={createTarget.start}
                    end={createTarget.end}
                    initialPatientName={createTarget.patientName}
                    initialSymptoms={createTarget.symptoms}
                    onClose={() => setCreateTarget(null)}
                    onSubmit={handleCreate}
                />
            )}

            {detailTarget && (
                <AppointmentDetailModal
                    key={detailTarget.appointmentNumber}
                    row={detailTarget}
                    onClose={() => setDetailTarget(null)}
                    onUpdate={handleUpdate}
                    onCancel={handleCancel}
                    onReceive={handleReceive} 
                />
            )}
        </div>
    );
};
