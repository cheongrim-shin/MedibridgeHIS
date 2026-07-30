export interface WaitListVO {
  medicalNumber: string;
  spaceNumber: string;
  waitingTurnNumber: number;
  expectedWaitingTime: number | null;
  standbyState: string;
  memberName: string;
  birthDate: string;
  age: number;
  gender: string;
  receiptType: string;
  receiptDate: string;
}

export interface RoomStatusVO {
  medicalNumber: string; // 식별자
  spaceNumber: string;
  standbyState: string;
  memberName: string;
  age: number;
  gender: string;
}

export interface RoomTab {
  id: string;
  label: string;
}

export interface HoldListVO {
  medicalNumber: string;
  spaceNumber: string;
  holdReason: string;
  memberName: string;
  age: number;
  gender: string;
}

export interface InjectionTab {
  id: string;
  label: string;
}

export interface InjectionVO {
  memberName: string;
  birthDate: string;
  age: number;
  gender: string;
  route: string;
  prescriptionDate: string;
  injectionDate?: string;
  medicineName: string;
  dosage: string;
  unit: string;
  frequency: string;
  medCnt: number;
  rn: number;
  medicalNumber: string;
  doctorName?: string; // ★새로 추가: 오더내린 의사 이름
  diagnosisName?: string; // ★새로 추가: 상병명(진단명)
}

export interface InjectionHistoryTab {
  id: string;
  label: string;
}

export interface InjectionHistoryVO {
  medicalNumber: string;
  route: string;
  memberName: string;
  birthDate: string;
  age: number;
  gender: string;
  injectionDate: string;
  medicineName: string;
  dosage: string;
  unit: string;
  frequency: string;
  medCnt: number;
}

export interface OtherPrescriptionVO {
  medicineName: string;
  totalQty: number;
  frequency: number;
  prescriptionDate: string;
  numberOfDaysAdministered: number;
  prescriptionStatus: string;
}

export interface PhysicalTherapyOrderVO {
  treatmentItemName: string;
  therapyType: string;
  treatmentStatus: string;
  dateOfTreatment: string;
  treatmentStartTime: string;
  treatmentEndTime: string;
}
