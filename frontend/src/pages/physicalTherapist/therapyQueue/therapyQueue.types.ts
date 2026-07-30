// ============================================================
// [타입 정의 모음]
// 화면 곳곳에서 공통으로 쓰는 타입을 여기 한 곳에 모아둡니다.
// 다른 파일에서는 import { PatientQueueItem } from './therapyQueue.types'; 처럼 가져다 씁니다.
// ===========================================================

// 대기열의 환자 1명을 나타내는 타입(앱 도메인/화면 모델. 여러 컴포넌트가 공유)
export interface PatientQueueItem {
    id: string;            
    medicalNumber: string;
    name: string;          
    birthDate: string;      
    gender: '남' | '여';     
    therapyItems: string;  
    therapyType: 'GENERAL' | 'TRACTION';
    durationMinutes: number;
    time: string;       
    receiptTimeIso?: string;
    status: 'WAIT' | 'IN_PROGRESS' | 'DONE';
    type: 'WALK_IN' | 'RESERVE';   
    sequence: number;       
    estimatedWaitTime?: number; 
    doctorName?: string;
    specialization?: string;
}

// 베드(침대) 1개를 나타내는 타입
export interface BedState{
    bedCode: string;           
    type: 'GENERAL' |'TRACTION'; // 베드 종류 → DB: THERAPY_TYPE 일반치료/견인치료
    patientId: string | null;     // 배정된 환자 ID (비었으면 null)
    patientName: string | null;   // 배정된 환자 이름
    treatmentItemName: string | null;   // 진행 중 치료명
    remainingSeconds: number;     // 남은 치료시간(초) — 프론트 타이머용
    status: 'available' | 'occupied'; // 베드 상태 사용가능/ 사용중
}

// 상세카드용(대기열 행과 분리): 클릭 시 별도 조회로 채움
export interface PatientDetail{
    receivedCount: number;
    courseSeq: number;
    lastTreatmentDate: string | null;
    doctorName: string | null;
    specialization: string | null;
    memberPhoneNumber: string | null;                     
    history: TherapyHistoryItem[];   
}
export interface TherapyHistoryItem{
    treatmentDate: string;                    // 'YYYY-MM-DD'
    itemName: string;
    therapyType: 'GENERAL' | 'TRACTION';
    status: string;
}



//탭 종류 ('general' | 'traction')
export type BedTabType = 'GENERAL' | 'TRACTION';
