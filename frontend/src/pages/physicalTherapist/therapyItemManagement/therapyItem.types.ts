// ============================================================
// [타입 정의 모음] therapyItem.types.ts
// 치료 항목 관리 화면에서 공통으로 쓰는 타입·상수를 한 곳에 모음
// ============================================================

// 치료 구분
export type TherapyType = 'GENERAL' | 'TRACTION';

// 급여 여부
export type InsuranceType = '급여' | '비급여';

// 상단 탭: 전체 + 치료구분
export type TabType = '전체' | TherapyType;

// 모달 동작 모드
export type ModalMode = 'register' | 'edit' | 'view';

// 치료 항목 1건
export interface TherapyItem {
    code: string;            
    name: string;            
    type: TherapyType;     
    insuranceType: InsuranceType;
    price: number;           
    durationMinutes: number; 
}

// 드롭다운·탭 렌더용 상수 
export const THERAPY_TYPES: TherapyType[] = ['GENERAL', 'TRACTION'];
export const INSURANCE_TYPES: InsuranceType[] = ['급여', '비급여'];
export const THERAPY_TABS: TabType[] = ['전체', ...THERAPY_TYPES];

// 등록 모달 초기값(빈 폼)
export const EMPTY_THERAPY_ITEM: TherapyItem = {
    code: '',
    name: '',
    type: 'GENERAL',
    insuranceType: '급여',
    price: 0,
    durationMinutes: 30,
};

export const THERAPY_TYPE_LABEL: Record<TherapyType, string> = {
    GENERAL: '일반치료', TRACTION: '견인치료',
};

export const DEFAULT_DURATION: Record<TherapyType, number> ={
    GENERAL: 30,
    TRACTION: 20,
};