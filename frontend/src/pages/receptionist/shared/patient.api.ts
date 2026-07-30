import axios from 'axios';

/** 환자 검색 결과 — BE PatientVO 미러링 (접수·예약 공용) */
export interface PatientHit {
    memberNumber: string;
    memberName: string;
    memberPhoneNumber: string;
    birthDate: string;
    gender: '남' | '여';
    address: string | null;
}

/**
 * 환자 검색 — GET /api/receptionist/patients?keyword=
 * @param signal 예약 캘린더처럼 연타가 잦은 곳에서 이전 요청 취소용
 */
export const searchPatients = async (
    keyword: string,
    signal?: AbortSignal,
): Promise<PatientHit[]> => {
    // 2글자 미만은 서버 부하만 주므로 호출 자체를 안 한다
    if (keyword.trim().length < 2) return [];
    try {
        const res = await axios.get<PatientHit[]>('/api/receptionist/patients', {
            params: { keyword: keyword.trim() },
            signal,
        });
        return res.data;
    } catch (err) {
        if (axios.isCancel(err)) return [];       // 취소는 오류가 아니다 → 빈 배열
        const msg = axios.isAxiosError<{ message?: string }>(err)
            ? (err.response?.data?.message ?? '환자 검색에 실패했습니다.')
            : '알 수 없는 오류가 발생했습니다.';
        throw new Error(msg, { cause: err });
    }
};