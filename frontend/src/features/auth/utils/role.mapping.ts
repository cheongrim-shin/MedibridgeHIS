/**
 * 역할 매핑, 활성/비활성, 권한체크
 */

import type {StaffRole} from '../../../pages/login/login.schema.ts';

// 백엔드에서 내려주는 Role 코드 (DB에는 'ROLE_' 접두어 포함해서 저장되어 있음, 여기선 접두어 제외한 값만 사용)
export type BackendRole = 'DOCTOR' | 'NURSE' | 'THERAPIST' | 'CHEMIST' | 'SERVICE' | 'ADMIN';

// 미구현 기능 (버튼 비활성화)
export const DISABLED_STAFF_ROLES: StaffRole[] = [
    'radiology-technologist', // 방사선
    'surgery-admin', // 수술행정
    'clinical-pathologist', // 임상병리
    'inpatient-nurse', // 병동
];

// 권한 매핑 -> 백엔드 Role, 1:1 매핑(없는값 undefined)
export const STAFF_ROLE_TO_BACKEND_ROLE: Partial<Record<StaffRole, BackendRole>> = {
    'receptionist': 'SERVICE',           // 원무 행정
    'outpatient-nurse': 'NURSE',         // 외래 간호사
    'doctor': 'DOCTOR',                  // 의사
    'physical-therapist': 'THERAPIST',   // 물리치료사
    'pharmacist': 'CHEMIST',             // 약사 (PHARMACIST 아님, CHEMIST)
    'admin': 'ADMIN',                    // 관리자
};

// JWT/로그인 응답 시 'ROLE_'이 붙어서 오는 경우 대비, 접두어 제거 정규화 함수
export const normalizeRole = (rawRole: string): string => {
    return rawRole.startsWith('ROLE_') ? rawRole.slice('ROLE_'.length) : rawRole;
};

// 매핑값 전달용
export const normalizeRoles = (rawRoles: string[]): BackendRole[] => {
    return rawRoles.map((r) => normalizeRole(r)) as BackendRole[];
};

// 미구현 기능 버튼 비활성화
export const isStaffRoleEnabled = (targetRole: StaffRole): boolean => {
    return !DISABLED_STAFF_ROLES.includes(targetRole);
};

// 권한 체크 후 접근 가능 여부 확인
export const canAccessStaffRole = (userRoles: BackendRole[], targetRole: StaffRole): boolean => {
    // 미구현 기능(항상 불가)
    if (!isStaffRoleEnabled(targetRole)) {
        return false;
    }
    // 관리자(미구현 기능 제외, 항상 가능)
    if (userRoles.includes('ADMIN')) {
        return true;
    }
    const requiredRole = STAFF_ROLE_TO_BACKEND_ROLE[targetRole];
    return requiredRole !== undefined && userRoles.includes(requiredRole);
};

// 로그인 성공 후 자동 이동시킬 경로 (역할별 첫 화면)
export const BACKEND_ROLE_TO_ROUTE: Record<BackendRole, string> = {
    DOCTOR: '/doctor/today-call-list',
    NURSE: '/outpatient-nurse/queue',
    THERAPIST: '/physical-therapist/therapy-queue',
    CHEMIST: '/pharmacist/dispensing-order',
    SERVICE: '/receptionist/counter',
    ADMIN: '/admin/patients',
};

/**
 * 로그인 성공 후 이동할 경로를 결정.
 * - 현재는 한 계정이 여러 Role을 갖는 상황을 고려하지 않으므로 roles[0] 기준으로 판단
 * - 매핑에 없는 값이 오면(예상 밖의 Role) 안전하게 로그인 페이지('/')로 되돌림
 */
export const getRedirectPathAfterLogin = (roles: BackendRole[]): string => {
    const primaryRole = roles[0];
    return BACKEND_ROLE_TO_ROUTE[primaryRole] ?? '/';
};