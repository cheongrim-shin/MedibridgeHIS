// 계절 하나의 환자 수 데이터 (백엔드 SeasonalPatientCountVO와 필드명 일치)
export interface SeasonalPatientCountVO {
  season: string; // "봄", "여름", "가을", "겨울"
  patientCount: number; // 그 계절의 접수 건수
}

// 월 하나의 매출 데이터 (백엔드 MonthlyRevenueVO와 필드명 일치)
export interface MonthlyRevenueVO {
    month: string;      // "01" ~ "12"
    revenue: number;    // 그 달의 매출 합계
}

// 월 하나의 환자 수 + 재방문 환자 수 데이터
export interface MonthlyRevisitVO {
    month: string;             // "01" ~ "12"
    totalPatients: number;     // 그 달 전체 방문 환자 수
    revisitPatients: number;   // 그중 재방문 환자 수
}

// 치료 종류 하나(약물처방/주사/물리치료)의 매출 데이터
export interface TreatmentRevenueVO {
    category: string;   // "약물처방", "주사", "물리치료"
    amount: number;     // 그 종류의 매출 추정치
}

// 요일 하나의 방문 수
export interface WeekdayPatientCountVO {
    dayOfWeek: string;      // "월", "화", "수", "목", "금", "토", "일"
    patientCount: number;
}

// 오전/오후 하나의 방문 수
export interface TimeOfDayPatientCountVO {
    timeSlot: string;       // "오전", "오후"
    patientCount: number;
}

// 연령대 하나의 방문 건수
export interface AgeGroupPatientCountVO {
    ageGroup: string;      // "10대", "20대", "30대" ...
    patientCount: number;
}

// 약품/치료 항목 하나의 처방 건수 (TOP 5 순위용)
export interface TopPrescriptionItemVO {
    itemName: string;   // 실제 약품명/치료항목명
    category: string;   // "의약품" / "주사" / "물리치료"
    itemCount: number;  // 처방된 횟수
}

// 처방 유형 하나(의약품/주사/물리치료)의 건수
export interface PrescriptionTypeRatioVO {
    category: string;
    orderCount: number;
}

// 상병(진단명) 하나의 건수 (TOP 5 순위용)
export interface TopDiagnosisVO {
    diagnosisName: string;
    diagnosisCount: number;
}

export interface TimeOfDayRevenueVO {
    timeSlot: string;   // "오전" / "오후"
    revenue: number;
}