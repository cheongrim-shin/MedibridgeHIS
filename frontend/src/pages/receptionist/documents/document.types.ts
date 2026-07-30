export interface DocumentType {   // 서류종류(드롭다운)
    code: string;        // R01
    name: string;        // 진단서
    unitPrice: number;   // 3000
}

export interface DocumentRow {    // 목록 한 줄
    receiveNumber: number;
    medicalNumber: string;
    memberName: string;
    documentContents: string;
    documentType: string;
    receiveUse: string | null;
    receiveDate: string;
    receiveState: string;         // '접수'/'발급완료'
    unitPrice: number | null;
    diagnosis: string | null; 
    doctorName: string | null;
    birthDate: string | null;
    phone: string | null;
    address: string | null;
    treatmentDate: string | null;
    treatmentPlan: string | null;
}
