import axios from 'axios';
import type {
    AppointmentCreateReq,
    AppointmentRow,
    AppointmentSearchParams,
} from './appointment.types';


const BASE = '/api/receptionist';

/**
 * 서버 에러 + 상태코드
 */
export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    /** 슬롯 중복 등 상태 충돌 — 캘린더를 새로고침하면 해소될 수 있다 */
    get isConflict(): boolean {
        return this.status === 409;
    }
}

/**
 * axios 에러 → ApiError 변환
 * BE가 항상 message 를 주므로 그대로 쓴다.
 */
const toApiError = (err: unknown): ApiError => {
    if (axios.isAxiosError<{ message?: string }>(err)) {
        const status = err.response?.status;
        // 응답 자체가 없으면 네트워크 문제 (status 0)
        if (status === undefined) {
            return new ApiError('서버에 연결할 수 없습니다. 네트워크를 확인해 주세요.', 0);
        }
        return new ApiError(
            err.response?.data?.message ?? `요청 처리에 실패했습니다. (${status})`,
            status,
        );
    }
    return new ApiError('알 수 없는 오류가 발생했습니다.', -1);
};

/**
 * 기간 예약 목록 — 캘린더 이벤트 소스
 * → GET /api/receptionist/appointments?fromDate=&toDate=&doctorNumber=
 * → BE: AppointmentController.getList() → XML [2] selectAppointments
 *
 * signal(AbortSignal)을 받는 이유:
 *  사용자가 캘린더에서 이전/다음 주를 빠르게 연타하면 요청이 여러 개 날아간다.
 *  응답 순서가 뒤바뀌면 "이전 주 데이터가 현재 주 화면에 그려지는" 현상이 생긴다.
 *  이전 요청을 취소해 이 경쟁 상태(race condition)를 막는다.
 */
export const fetchAppointments = async (
    params: AppointmentSearchParams,
    signal?: AbortSignal,
): Promise<AppointmentRow[]> => {
    try {
        const res = await axios.get<AppointmentRow[]>(`${BASE}/appointments`, {
            params,
            signal,
        });
        return res.data;
    } catch (e) {
        if (axios.isCancel(e)) return [];
        throw toApiError(e);
    }
};


//예약 1건 상세

export const fetchAppointment = async (no: string): Promise<AppointmentRow> => {
    try {
        const res = await axios.get<AppointmentRow>(`${BASE}/appointments/${no}`);
        return res.data;
    } catch (e) {
        throw toApiError(e);
    }
};


/**
 * 예약 등록 — 빈 슬롯 클릭 = 즉시 확정
 * → POST /api/receptionist/appointments
 * → BE: AppointmentController.create() → XML [5] insertAppointment
 * @returns 채번된 예약번호 (예: 'A0010')
 */
export const createAppointment = async (
    req: AppointmentCreateReq,
): Promise<string> => {
    try {
        const res = await axios.post<{ appointmentNumber: string }>(
            `${BASE}/appointments`,
            req,
        );
        return res.data.appointmentNumber;
    } catch (e) {
        throw toApiError(e);
    }
};


// 예약 변경 — 드래그&드롭 이동 또는 모달 수정
export const changeAppointment = async (
    no: string,
    req: AppointmentCreateReq,
): Promise<void> => {
    try {
        await axios.put(`${BASE}/appointments/${no}`, req);
    } catch (e) {
        throw toApiError(e);
    }
};

// 예약 취소 (Soft Delete)
export const cancelAppointment = async (no: string): Promise<void> => {
    try {
        await axios.patch(`${BASE}/appointments/${no}/cancel`);
    } catch (e) {
        throw toApiError(e);
    }
};

// 예약 → 접수 전환  PATCH /appointments/{no}/receive
export const receiveAppointment = async (no: string): Promise<string> => {
    try {
        const res = await axios.patch<{ medicalNumber: string }>(`${BASE}/appointments/${no}/receive`);
        return res.data.medicalNumber;
    } catch (e) {
        throw toApiError(e);  
    }
};
