export type QnaStatus = 'WAIT' | 'COMPLETE';

export const QNA_STATUS_LABEL: Record<QnaStatus, string> = {
    WAIT: '답변대기',
    COMPLETE: '답변완료',
};

export interface QnaItem {
    qandaNumber: string;
    subject: string;
    categoryCode: string;       // COMMONCODE 'Q' 그룹 코드 (예: 'Q07')
    inquiryDetails: string;
    inquirer: string;           // 회원번호 원본값 (BE에서 이름 조인 안 함)
    respondent: string | null;
    responseDetails: string | null;
    dateWritten: string;
    dateOfResponse: string | null;
    status: QnaStatus;
}

export interface QnaAnswerRequest {
    responseDetails: string;
}