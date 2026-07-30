//진료 시간 정책 
export const BUSINESS_HOURS = {
    /** 캘린더에 표시할 시간 범위 (점심시간 포함해서 그린 뒤 회색 처리) */
    slotMinTime: '09:00:00',
    slotMaxTime: '18:00:00',
    // 한 칸 = 30분 
    slotDuration: '00:30:00',
    // 오전 진료 
    amStart: '09:00',
    amEnd: '12:00',
    // 오후 진료 
    pmStart: '14:00',
    pmEnd: '18:00',
} as const;
//기본 진료 소요시간
export const DEFAULT_DURATION_MINUTES = 30;

export const FC_BUSINESS_HOURS = [
    { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: BUSINESS_HOURS.amStart, endTime: BUSINESS_HOURS.amEnd },
    { daysOfWeek: [1, 2, 3, 4, 5, 6], startTime: BUSINESS_HOURS.pmStart, endTime: BUSINESS_HOURS.pmEnd },
];

export const COLOR_PALETTE = [
    '#3788d8', // 기본 파랑
    '#FF6B6B', // 빨강
    '#4ECDC4', // 청록
    '#FFD93D', // 노랑
    '#6BCB77', // 초록
    '#A78BFA', // 보라
] as const;

// BE AppointmentVO 미러
export interface AppointmentRow{
    appointmentNumber: string;
    memberNumber: string;
    patientName: string;
    phone: string | null;
    birthDate: string | null;
    doctorNumber: string;
    doctorName: string | null;
    reserveDate: string;
    reserveTime: string;
    startAt: string;
    endAt: string;
    status: '예약확정' | '예약취소';
    symptoms: string | null;
    color: string | null; 
}

//BE AppointmentCreateVO 미러 — 등록
export interface AppointmentCreateReq{
    memberNumber: string;
    doctorNumber: string;
    reserveAt: string;
    durationMinutes?: number;
    symptoms?: string;
    color?: string;
}

// BE AppointmentSearchVO 미러 — 조회 조건
export interface AppointmentSearchParams {
    fromDate: string;                  // 'YYYY-MM-DD'
    toDate: string;                    // 'YYYY-MM-DD'
    doctorNumber?: string;             // 없으면 전체 의사
}