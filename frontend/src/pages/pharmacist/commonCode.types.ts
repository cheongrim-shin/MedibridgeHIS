// COMMONCODE 테이블 한 행
export interface CommonCodeVO {
    commonCodeNumber: string;    // 예: 'M01'
    commonCode: string;          // 그룹문자, 예: 'M'
    jointCodeGroupName: string;  // 그룹명, 예: '약품명'
    codeName1: string;           // 표시용 텍스트
    codeName2: string | null;
    unitPrice: number | null;
    used: string;                // 'Y' | 'N'
}

export type MedicineCodeGroup = 'C' | 'U'; // 약품명 / 약효분류 / 단위