// 목록 조회 응답 아이템
export interface EmployeeListItem {
    memberNumber: string;
    memberName: string;
    departmentName: string;
    positionName: string;
    memberPhoneNumber: string;
    accountStatus: 'Y' | 'N'; // Y: 재직, N: 퇴직
}

// 상세 조회 응답
export interface EmployeeDetail {
    memberNumber: string;
    memberId: string;
    memberName: string;
    memberPhoneNumber: string;
    departmentCode: string;
    departmentName: string;
    positionCode: string;
    positionName: string;
    accountStatus: 'Y' | 'N';
}

// 계정 생성 요청 바디
export interface CreateEmployeeRequest {
    memberId: string;
    password: string;
    memberName: string;
    memberPhoneNumber: string;
    departmentCode: string;
    positionCode: string; // 모달에서는 "관리자" 코드로 고정
}

// 재직/퇴직 처리 요청 바디
export interface UpdateEmployeeStatusRequest {
    accountStatus: 'Y' | 'N';
}

// 목록 조회 쿼리 파라미터
export interface EmployeeListParams {
    keyword?: string;
}

// 상태 라벨 변환용 (UI 표시)
export const ACCOUNT_STATUS_LABEL: Record<'Y' | 'N', string> = {
    Y: '재직',
    N: '퇴직',
};

// 에러 응답 공통 형태 (400 등)
export interface ApiErrorResponse {
    message: string;
}