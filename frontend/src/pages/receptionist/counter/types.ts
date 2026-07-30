
/** 화면에서 쓰는 정제된 모양 */
export interface ReceiptItem {
    medicalNumber: string;
    dailySequence: number;
    time: string;                      // 'HH:MM' 표시용
    receiptTimeIso?: string;           
    name: string;
    birthDate: string;
    gender: '남' | '여';
    phone: string;                     
    type: 'WALK_IN' | 'RESERVE';       
    deptName: string;
    employeeName: string;
    status: ReceiptStatus;
    totalFee: number;    
    memberNumber: string;  
    spaceNumber: string;              
}

export type ReceiptStatus = 'RECEIPT_DONE' | 'PAY_WAIT' | 'PAY_DONE' |'IN_TREATMENT';

/** ReceiptSearchVO와 필드명 1:1 — 쿼리스트링 이름이 그대로 VO에 바인딩됨 */
export interface ReceiptSearchParams {
    status: ReceiptStatus;
    keyword?: string;
    doctorNumber?: string;    
    fromDate?: string;  
    toDate?: string;
}

// 신규환자 입력 폼 (BE ReceiptCreateVO.newPatient와 짝)
export interface NewPatientForm {
    memberName: string;
    memberPhoneNumber: string;
    rrn: string;         
    address: string;
    detailAddress: string;
    postalCode: string;
}
// 접수 요청 (BE ReceiptCreateVO와 짝 — 정확히 하나만 채움)
export interface ReceiptCreateReq {
    memberNumber?: string;        
    newPatient?: NewPatientForm;  
    doctorNumber: string;
    spaceNumber: string;
    symptoms: string;
}

export interface ReceiptDetail{
    memberNumber: string;
    memberName: string;
    memberPhoneNumber: string | null;
    address: string | null;
    postalCode: string | null;
    birthDate: string;
    gender: '남' | '여';
    medicalNumber: string;
    receiptDate: string | null;
    tretmentDate: string | null;
    receiptStatus: string | null;
    symptoms: string | null;           // register_s
    treatmentItem: string | null;
    spaceNumber: string | null;
    doctorName: string | null;
    departmentName: string | null;
    visitType: string | null;
    totalFee: number | null;
}

export interface ReceiptHistory {
    medicalNumber: string;
    receiptDate: string;             // 'YYYY-MM-DD'
    doctorName: string | null;
    receiptStatus: string | null;    // RS 코드
    treatmentItem: string | null;    // register_p
}

// 수납 항목 1줄 PaymentDetailVO
export interface PaymentDetailInput{
    paymentDetailName: string;
    amount: string;
    lineNo?: number;
}
// 수납 요청 PaymentCreateVO
export interface PaymentCreateReq{
    medicalNumber: string;
    paymentType: string;
    details: PaymentDetailInput[];
}

export interface OrderStatus {
    part: string; itemName: string; statusLabel: string; doneYn: string;
}

