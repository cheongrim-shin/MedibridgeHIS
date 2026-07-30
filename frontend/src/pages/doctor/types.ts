export interface WaitingListVO {
  medicalNumber: string;
  memberName: string;
  birthDate: string;
  age: number;
  gender: string;
  receiptDate: string;
  receiptStatus: string; // 추가
  diagnosisName: string | null;
}

export interface MedicalRecordOptionVO {
  medicalRecordNumber: string;
  diagnosisName: string;
  startDate: string;
  recordStatus: string;
}

export interface MedicalRecordDetailVO {
  medicalNumber: string;
  treatmentDate: string;
  registerS: string;
  registerO: string;
  registerA: string;
  registerP: string;
}

export interface MedicineSearchVO {
  medicineCode: string;
  medicineName: string;
  specification: string;
  unit: string; // 저장용 코드값
  unitLabel: string; // 화면 표시용 (신규 추가)
  unitCost: number;
}

export interface PhysicalTherapyItemVO {
  commonCodeNumber: string;
  codeName1: string;
  codeName2: string;
  unitPrice: number;
}

export interface AddedMedicineOrder {
  medicineCode: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  days: string;
}

export interface AddedInjectionOrder {
  medicineCode: string;
  medicineName: string;
  dosage: string;
  unit: string; // 저장용 코드값 (그대로 유지)
  unitLabel: string; // 화면 표시용 (신규 추가)
  frequency: string;
}

export interface AddedTherapyOrder {
  commonCodeNumber: string;
  codeName1: string;
  codeName2: string;
}

export interface PatientInfoVO {
  medicalNumber: string;
  memberNumber: string;
  memberName: string;
  age: number;
  gender: string;
}

export interface MedicalHistoryListVO {
  medicalNumber: string;
  medicalRecordNumber: string;
  memberName: string;
  birthDate: string;
  age: number;
  gender: string;
  treatmentDate: string;
  diagnosisName: string;
  recordStartDate: string;
}

export interface PrescriptionHistoryVO {
  prescriptionType: string; // "의약품" | "주사" | "물리치료"
  itemName: string;
  detail: string;
  prescriptionDate: string;
  status: string;
}

export interface DiagnosisCodeVO {
  sickCd: string;
  sickNm: string;
  sickEngNm: string;
}

export interface PrescriptionHistoryVO {
    prescriptionType: string;
    itemName: string;
    detail: string;
    prescriptionDate: string;
    status: string;

    medicalNumber: string;
    medicineCode: string | null;
    treatmentNumber: number | null;

    qty: string | null;
    unit: string | null;
    frequency: string | null;
    days: string | null;

    editable: boolean;
}