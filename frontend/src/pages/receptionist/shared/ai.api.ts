import axios from "axios";

const BASE = '/api/receptionist/ai';

/** 자연어 파싱 결과 — BE AiParseResultVO 미러링 */
export interface AiParseResult {
    doctorNumber: string;
    patientName: string;
    reserveAt: string;          // 'yyyy-MM-dd HH:mm'
    durationMinutes: number | null;
    symptoms: string;
}

const toMsg = (err: unknown): string =>
    axios.isAxiosError<{ message?: string }>(err)
        ? (err.response?.data?.message ?? 'AI 처리에 실패했습니다.')
        : '알 수 없는 오류가 발생했습니다.';

/** 자연어 → 예약 항목 (등록 아님, 미리채움용) */
export const parseAppointment = async (text: string): Promise<AiParseResult> => {
    try {
        const res = await axios.post<AiParseResult>(`${BASE}/parse-appointment`, { text });
        return res.data;
    } catch (err) {
        throw new Error(toMsg(err), { cause: err });
    }
};

/** 증상 메모 정리 */
export const refineSymptoms = async (text: string): Promise<string> => {
    try {
        const res = await axios.post<{ result: string }>(`${BASE}/refine-symptoms`, { text });
        return res.data.result;
    } catch (err) {
        throw new Error(toMsg(err), { cause: err });
    }
};