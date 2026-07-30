import type { AxiosError } from 'axios';
import { DEFAULT_DURATION, THERAPY_TYPE_LABEL, type TherapyItem, type TherapyType } from './therapyItem.types';
import axios from 'axios';

const BASE = '/api/physical';

// 서버 행(row) 형태
interface TherapyItemRow {
    code: string; name: string; type: string;
    price: number; coverageYn: string;
}

// ── 서버 에러를 담는 전용 에러 객체 ───────────────────────────
// status(HTTP 코드)와 errorCode(서버 약속 마커)를 함께 보관해서
// 훅이 분기(예: 복원 제안)에 사용할 수 있게 합니다.
export class ApiError extends Error {
    status: number;
    errorCode?: string;
    constructor(message: string, status: number, errorCode?: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.errorCode = errorCode;
    }
}

const toApiError = (err: unknown, fallback: string): ApiError => {
    if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ message?: string; errorCode?: string }>;
        return new ApiError(
            e.response?.data?.message ?? fallback,
            e.response?.status ?? 0,           
            e.response?.data?.errorCode,      
        );
    }
    return new ApiError(fallback, 0);
};

// { '일반치료':'GENERAL', '견인치료':'TRACTION' } 자동 생성 — 표는 LABEL 한 곳만 관리
const LABEL_TO_TYPE = Object.fromEntries(
    Object.entries(THERAPY_TYPE_LABEL).map(([t, label]) => [label, t as TherapyType])
) as Record<string, TherapyType>;
// 서버 행 → 화면 모델 변환 (목록/삭제내역이 공유)
function mapRow(r: TherapyItemRow): TherapyItem {
    const uiType = LABEL_TO_TYPE[r.type];
    if (!uiType) console.warn(`[치료구분 미정의 값] code=${r.code}, type=${r.type}`);
    return {
        code: r.code,
        name: r.name,
        type: uiType ?? 'GENERAL',
        price: Number(r.price),
        insuranceType: r.coverageYn === 'Y' ? '급여' : '비급여',
        durationMinutes: DEFAULT_DURATION[uiType ?? 'GENERAL'],
    };
}

// ── 치료 항목 목록 조회 ──
export const fetchTherapyItems = async (): Promise<TherapyItem[]> => {
    const res = await axios.get<TherapyItemRow[]>(`${BASE}/therapyItems`)
        .catch((err) => { throw toApiError(err, '서버 오류'); });
    return res.data.map(mapRow);
};

// ── 치료 항목 등록 ──
export const createTherapyItem = async (item: TherapyItem): Promise<void> => {
    await axios.post(`${BASE}/therapyItems`, {
        code: item.code, name: item.name, type: THERAPY_TYPE_LABEL[item.type], price: item.price,
        coverageYn: item.insuranceType === '급여' ? 'Y' : 'N',
        //durationMin: item.durationMinutes,
        contribution: 0, // 서버에서 급여 70% 재계산
    }).catch((err) => { throw toApiError(err, '등록 실패'); });
};

// ── 치료 항목 수정 ──
export const updateTherapyItem = async (item: TherapyItem): Promise<void> => {
    await axios.put(`${BASE}/therapyItem/${item.code}`, {
        code: item.code,
        name: item.name, 
        type: THERAPY_TYPE_LABEL[item.type], 
        price: item.price,
        coverageYn: item.insuranceType === '급여' ? 'Y' : 'N',
        //durationMin: item.durationMinutes,
    }).catch((err) => { throw toApiError(err, '수정 실패'); });
};

// ── 치료 항목 삭제(소프트 삭제) ──
export const deleteTherapyItem = async (code: string): Promise<void> => {
    await axios.delete(`${BASE}/therapyItem/${code}`)
        .catch((err) => { throw toApiError(err, '삭제 실패'); });
};

// 삭제(USED='N') 내역 목록 조회
export const fetchDeletedTherapyItems = async (): Promise<TherapyItem[]> => {
    const res = await axios.get<TherapyItemRow[]>(`${BASE}/therapyItems/deleted`)
        .catch((err) => { throw toApiError(err, '삭제 내역 조회 실패'); });
    return res.data.map(mapRow);
};

// 삭제된 항목 복원
export const restoreTherapyItem = async (code: string): Promise<void> => {
    await axios.put(`${BASE}/therapyItem/${code}/restore`)   
        .catch((err) => { throw toApiError(err, '복원 실패'); });
};
