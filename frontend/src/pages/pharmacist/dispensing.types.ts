// 조제 목록 (진료번호 단위로 그룹핑된 처방 1건)
export interface DispensingOrderVO {
    medicalNumber: string;
    patientName: string;
    residentNumber: string;
    employeeName: string;      // 처방의명
    deptName: string;          // 진료과명
    prescriptionDate: string;
    orderName: string;         // 대표약품명 + 외 N건
    medicineRoute: string | null; // 투여경로 ('경구' | '외용' | '흡입' | null=미분류)
    dispenseCompletedDate: string | null; // 조제완료일시 (대기중이면 null)
    prescriptionStatus: string; // 'N' | 'Y'
}

// 조제 상세 - 진료번호에 딸린 약품 목록
export interface DispensingDetailVO {
    medicalNumber: string;
    medicineCode: string;
    medicineName: string;
    medicineCategoryName: string;
    medicineRoute: string | null;       // 투여경로 ('경구' | '외용' | '흡입' | null=미분류)
    dispenseCompletedDate: string | null; // 조제완료일시 (대기중이면 null)
    currentQuantity: number;           // 현재 재고 수량
    minQuantity: number;               // 최소 재고 기준 수량
    totalQty: number;                  // 1회 투약량
    frequency: number;                 // 1일 횟수
    numberOfDaysAdministered: number;  // 투약일수
    prescriptionStatus: string;
}