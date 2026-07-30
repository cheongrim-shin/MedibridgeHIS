// therapyQueue.api.ts
import axios, { AxiosError } from 'axios';
import {type BedState, type PatientDetail, type PatientQueueItem} from './therapyQueue.types';

const BASE = '/api/physical';

// 생년월일 정규화: FE 유틸 getAgeAndGender 가 6자리('890716')를 기대함
//  '1989-07-16' → 숫자만 '19890716' → 뒤 6자리 추출 'YYMMDD'
const toYYMMDD = (raw: string | null): string => {
    if (!raw) return '';
    const digits = raw.replace(/\D/g, '');
    return digits.length >= 8 ? digits.slice(2, 8) : digits;
};
// 성별 정규화: DB가 '남'/'여'든 'M'/'F'든 '1'/'2'든 안전하게 흡수
const toGender = (g: string | null): '남' | '여' =>
    g === '여' || g === 'F' || g === '2' ? '여' : '남';

//백엔드 JSON 생김새를 그대로 미러링(rows.map(...) 안에서만 쓰임)
interface RecordRow { 
    treatmentNumber: number;
    medicalNumber: string;
    therapyCategory: string;
    patientNumber: number | null;   
    receiptTime: string | null;     
    receiptType: string;            
    status: string;          
    name: string | null;
    birthDate: string | null;       
    gender: string | null;
    therapyItems: string | null;
    durationMin: number | null;
    sequence: number | null;
    estimatedWaitTime: number | null;
    doctorName: string |null;
    specialization: string |null;
}
interface TherapyActionReq {
    bedCode: string; 
    treatmentNumber: number;  
    durationMin?: number;    
}

interface BedRow {bedCode: string; bedStatus: string; therapyType: string; 
    treatmentNumber: number; endTime: string; patientName:string |null; treatmentItemName:string |null;
}

interface HistoryRow {
    treatmentDate: string;
    treatmentItemName: string | null; // ← FE의 itemName에 해당
    therapyType: string;              // 'GENERAL' | 'TRACTION' (BE enum 변환 완료값)
    treatmentStatus: string;          // 'DONE' 등             (BE enum 변환 완료값)
}

interface PatientDetailRow {
    receivedCount: number;
    courseSeq: number;
    lastTreatmentDate: string | null;
    doctorName: string | null;
    specialization: string | null;
    memberPhoneNumber: string | null;
    history: HistoryRow[] | null;
}

// GlobalExceptionHandler가 내려주는 {"message": "..."}를 err.response.data에서 꺼냄
const toErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
        const e = err as AxiosError<{ message?: string }>;
        return e.response?.data?.message ?? `서버 오류 (${e.response?.status ?? '네트워크'})`;
    }
    return '알 수 없는 오류가 발생했습니다.';
};

//대기열 목록 
export const fetchTherapyQueue = async (): Promise<PatientQueueItem[]> =>{
    const res = await axios.get<RecordRow[]>(`${BASE}/queueList`)
        .catch((err)=> { throw new Error(toErrorMessage(err));});
    return res.data.map((r): PatientQueueItem =>({
        id: String(r.treatmentNumber),
        medicalNumber: r.medicalNumber,
        name: r.name ??'',
        birthDate: toYYMMDD(r.birthDate),
        gender: toGender(r.gender),
        therapyItems: r.therapyItems ??'',
        therapyType: r.therapyCategory as 'GENERAL' | 'TRACTION',
        durationMinutes: r.durationMin ?? 30,
        time: r.receiptTime ? r.receiptTime.slice(11, 16) : '',
        receiptTimeIso: r.receiptTime ?? undefined,
        status: (r.status as PatientQueueItem['status']) ?? 'WAIT',
        type: (r.receiptType as PatientQueueItem['type']) ?? 'WALK_IN',
        sequence: r.sequence ?? 0,
        estimatedWaitTime: r.estimatedWaitTime ?? undefined,
        doctorName: r.doctorName?? undefined,
        specialization: r.specialization?? undefined,
    }))
}


export const startTherapyApi = async (req: TherapyActionReq): Promise<void> => {
    await axios.post(`${BASE}/therapy/start`, req)// 두 번째 인자 req가 JSON 본문이 된다
        .catch((err) => { throw new Error(toErrorMessage(err)); });
};

//베드 목록
export const fetchBeds = async (): Promise<BedState[]>=>{
    const res = await axios.get<BedRow[]>(`${BASE}/beds`)
        .catch((err)=> {throw new Error(toErrorMessage(err));});
    return res.data.map((b)=>{
        const isOccupied = b.bedStatus === 'OCCUPIED';

        const remainingSeconds = (()=>{
            if(!isOccupied || !b.endTime) return 0;   // 빈 베드는 계산 불필요
            const ms = new Date(b.endTime).getTime();  // 문자열 → epoch 밀리초
            if(Number.isNaN(ms)) return 0;
            return Math.max(0, Math.floor((ms - Date.now()) / 1000));
        })();

        return {
            bedCode: b.bedCode,
            type: b.therapyType as 'GENERAL' | 'TRACTION',
            status: isOccupied ? 'occupied' : 'available',
            patientId: isOccupied ? String(b.treatmentNumber) : null,
            patientName: isOccupied ? (b.patientName ?? '') : null,
            treatmentItemName: isOccupied ? (b.treatmentItemName ?? '') : null,
            remainingSeconds,
        };
    });
};

// 치료 완료: 베드 해제 + 기록 '치료완료'
export const completeTherapyApi = async (req: TherapyActionReq): Promise<void> => {
    await axios.post(`${BASE}/therapy/complete`,  req)
        .catch((err) => { throw new Error(toErrorMessage(err)); });
};

//상세 조회 함수
export const fetchPatientDetail = async (
    medicalNumber: string, treatmentNumber: number,
): Promise<PatientDetail> => {
    const res = await axios.get<PatientDetailRow>(
        `${BASE}/therapy/patient/${medicalNumber}`,
        { params: { treatmentNumber } },
    ).catch((err) => { throw new Error(toErrorMessage(err)); });

    return {
        receivedCount: res.data.receivedCount ?? 0,
        courseSeq: res.data.courseSeq ?? 0,
        lastTreatmentDate: res.data.lastTreatmentDate ?? null,
        doctorName: res.data.doctorName ?? null,
        specialization: res.data.specialization ?? null,
        memberPhoneNumber: res.data.memberPhoneNumber ?? null,
        history: (res.data.history ?? []).map((h) => ({
            treatmentDate: h.treatmentDate,
            itemName: h.treatmentItemName ?? '-',            
            therapyType: h.therapyType as 'GENERAL' | 'TRACTION',
            status: h.treatmentStatus,                      
        })),
    };
};