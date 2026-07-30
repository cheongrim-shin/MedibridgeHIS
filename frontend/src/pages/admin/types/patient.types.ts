//환자 관리 타입
export interface PatientVO {
    memberNumber: string;
    memberName: string;
    memberPhoneNumber: string;
    birthDate: string;
    gender: '여' | '남';
    accountStatus: string |null
}

// 상세 타입
export interface PatientDetailVO{
    memberNumber: string;
    memberId: string;
    memberName: string;
    memberPhoneNumber: string;
    rrn: string;                   // 마스킹된 주민번호 '900412-1******'
    primaryAddress: string | null; // 기본주소
    detailedAddress: string | null;// 상세주소
    postalCode: string | null;     // 우편번호
    accountStatus: string | null;  // 사용여부
}

// 사용여부(계정 활성/비활성) 수정 body
export interface PatientStatusUpdate {
    accountStatus: string;         // 'Y' | 'N'
}