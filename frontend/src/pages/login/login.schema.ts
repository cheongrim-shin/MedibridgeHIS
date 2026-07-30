// 1. Define staff roles strictly using domain-specific TypeScript union type (with clear Korean comments)
export type StaffRole = 
    | 'receptionist'           // 원무 행정 (원무과 접수/수납)
    | 'outpatient-nurse'       // 외래 간호사
    | 'doctor'                 // 의사 (진료의)
    | 'radiology-technologist' // 방사선사
    | 'clinical-pathologist'   // 임상병리사
    | 'surgery-admin'          // 수술 행정
    | 'inpatient-nurse'        // 병동 간호사 (입원 간호사)
    | 'physical-therapist'     // 물리치료사
    | 'pharmacist'             // 약사
    | 'admin';                 // 관리자

// 2. Define interface for the Demo Staff metadata
export interface DemoStaff {
    role: string;
    type: StaffRole;
    chipStyle: string;
    targetUrl: string;
}
