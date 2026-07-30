import axios, { AxiosError } from "axios";
import type { OrderStatus, ReceiptCreateReq, ReceiptDetail, ReceiptHistory, ReceiptItem, ReceiptSearchParams, ReceiptStatus } from "./types";

/** 백엔드 ReceiptListVO JSON을 그대로 미러링 */
interface ReceiptRow {
    medicalNumber: string;
    dailySequence: number;
    receiptDate: string | null;        // ISO 'YYYY-MM-DDTHH:MI:SS'
    memberName: string | null;         // INNER JOIN이지만 null 방어 습관 유지
    birthDate: string | null;          // 'YYMMDD'
    gender: string | null;             // '남'/'여'
    memberPhoneNumber: string | null;
    receiptStatus: string | null;      // 한글값 그대로 옴
    employeeName: string | null;       // 담당의 
    departmentName: string | null;     // 진료과 
    totalFee: number | null;           // 수납 전 null
    memberNumber: string | null;  
    spaceNumber: string | null;
}

const RECEIPT_STATUS_LABEL = {
    RECEIPT_DONE: '접수완료', IN_TREATMENT: '진료중',
    PAY_WAIT: '수납대기', PAY_DONE: '수납완료',
} as const;

const BASE = '/api/receptionist';

// 생년월일 정규화: '1989-07-16' → 'YYMMDD' 
const toYYMMDD = (raw: string | null): string => {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    return digits.length >= 8 ? digits.slice(2, 8) : digits;
};
const toGender = (g: string | null): '남' | '여' =>
    g === '여' || g === 'F' || g === '2' ? '여' : '남';

// 에러 메시지 추출: GlobalExceptionHandler가 내려주는 {"message": "..."} 활용
const toErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ message?: string }>;
        return e.response?.data?.message ?? `서버 오류 (${e.response?.status ?? '네트워크'})`;
    }
    return '알 수 없는 오류가 발생했습니다.';
};

// ── 상태 양방향 변환 ──
// 보낼 때: 코드 → DB 한글  (BE가 RECEIPT_STATUS = #{status} 로 한글과 비교하므로)
const statusToDb = (code: ReceiptStatus): string => RECEIPT_STATUS_LABEL[code];

const DB_TO_STATUS = Object.fromEntries(
    Object.entries(RECEIPT_STATUS_LABEL).map(([code, dbcode]) => [dbcode, code]),
) as Record<string, ReceiptStatus>;

/** [수납/접수 목록] GET /api/receptionist/receipts */
export const fetchReceiptList = async (search: ReceiptSearchParams): Promise<ReceiptItem[]> => {
    const res = await axios.get<ReceiptRow[]>(`${BASE}/receipts`, {
        params: {
            status: statusToDb(search.status),     
            keyword: search.keyword,                
            doctorNumber: search.doctorNumber,
            fromDate: search.fromDate,        
            toDate: search.toDate,
        },
    }).catch((err) => { throw new Error(toErrorMessage(err)); });

    return res.data.map((r): ReceiptItem => ({
        medicalNumber: r.medicalNumber,
        dailySequence: r.dailySequence,
        time: r.receiptDate ? r.receiptDate.slice(11, 16) : '',   // 표시용 HH:MM
        receiptTimeIso: r.receiptDate ?? undefined,               // 계산용 원본
        name: r.memberName ?? '(환자정보없음)',                    //  memberName → name
        birthDate: toYYMMDD(r.birthDate),
        gender: toGender(r.gender),
        phone: r.memberPhoneNumber ?? '',
        type: 'WALK_IN',                                          // 예약연동 후 파생값으로 교체
        deptName: r.departmentName ?? '-',                        // departmentName → deptName
        employeeName: r.employeeName ?? '-',
        status: DB_TO_STATUS[r.receiptStatus ?? ''] ?? search.status,  // 미지값은 요청 상태로
        totalFee: r.totalFee ?? 0,                                // "수납 전 null" → 0원 표시
        memberNumber: r.memberNumber ?? '',
        spaceNumber: r.spaceNumber ?? '-',
    }));
};

// 접수 등록 — 성공 시 생성된 접수번호를 돌려받음(BE selectKey)
export const createReceipt = async (req: ReceiptCreateReq): Promise<string> =>{
    const res = await axios.post<{medicalNumber: string}>(`${BASE}/receipts`, req)
        .catch((err)=> { throw new Error(toErrorMessage(err)); });
    return res.data.medicalNumber;
}

/** [접수 상세조회] GET /api/receptionist/receipts/{medicalNumber}
 *  요청: 경로변수 medicalNumber 하나 (쿼리스트링 아님)
 *  응답: ReceiptDetail 1건 */
export const getReceiptDetail = async (medicalNumber: string): Promise<ReceiptDetail> =>{
    const res = await axios.get<ReceiptDetail>(`${BASE}/receipts/${medicalNumber}`)
        .catch((err)=> {throw new Error(toErrorMessage(err))});
    return res.data;
}

/** [지난 진료이력] GET /patients/{memberNumber}/receipts */
export const getReceiptHistory = async (memberNumber: string): Promise<ReceiptHistory[]> => {
    const res = await axios.get<ReceiptHistory[]>(`${BASE}/patients/${memberNumber}/receipts`)
        .catch((err) => { throw new Error(toErrorMessage(err)); });
    return res.data;
};

export const getPatientOrders = async (medicalNumber: string): Promise<OrderStatus[]> => {
    const res = await axios.get<OrderStatus[]>(`${BASE}/receipts/${medicalNumber}/orders`);
    return res.data;
};