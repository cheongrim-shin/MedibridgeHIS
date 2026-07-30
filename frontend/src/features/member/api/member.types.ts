export interface Department {
    departmentCode: string;
    departmentName: string;
}

export interface Position {
    positionCode: string;
    positionName: string;
}

export interface SignupRequest {
    memberId: string;
    password: string;
    memberName: string;
    departmentCode: string;
    positionCode: string;
}