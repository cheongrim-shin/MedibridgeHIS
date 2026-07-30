export interface MedicineVO {
    medicineCode: string;
    itemSeq: string;
    medicineCategory: string;    // 공통코드 C그룹 코드값
    medicineName: string;        // COMMONCODE_NUMBER 값 (=medicineCode), 서버가 채움 - 프론트는 신경쓸 필요 없음
    medicineNameText: string;    // 약품명 표시/입력 텍스트
    manufacturer: string;
    specification: string;
    ingredient: string;
    unit: string;                // 공통코드 U그룹 코드값
    coverageYn: string;          // 'Y' | 'N'
    unitCost: number;
    insuranceFee: number;
    contribution: number;
    currentQuantity: number;
    minQuantity: number;
}

export interface MedicineListVO extends MedicineVO {
    medicineCategoryName: string;   // COMMONCODE(C).CODENAME_1
    unitName: string;               // COMMONCODE(U).CODENAME_1
}

// 등록 요청 바디 - medicineCode/medicineName은 서버가 채워주니 클라이언트가 보낼 필요 없음
export type MedicineCreateRequest = Omit<MedicineVO, 'medicineCode' | 'medicineName'>;