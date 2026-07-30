import axios from "axios";
import type { PatientVO, PatientDetailVO, PatientStatusUpdate } from './types/patient.types';
import type { EmployeeListItem, EmployeeDetail, CreateEmployeeRequest, UpdateEmployeeStatusRequest } from './types/employee.types';
import type { PagedResponse } from './types/board.common.types';
import type { NoticeItem, NoticeRequest } from './types/notice.types';
import type { FaqItem, FaqRequest } from './types/faq.types';
import type { QnaItem, QnaAnswerRequest } from './types/qna.types';
import type { CommonCodeVO } from '../pharmacist/commonCode.types'; // 그룹별 공통코드 조회용 (기존 타입 재사용)


const BASE = '/api/admin';

// ── 환자 관리 ──────────────────────────────────────────────────────────────
// 목록조회 
export const getPatients = async (keyword?: string): Promise<PatientVO[]> =>{
    const params: Record<string, string> ={};
    if (keyword) params.keyword =keyword;
    const res= await axios.get<PatientVO[]>(`${BASE}/patients`, { params});
    return res.data;
};

//수정 
export const getPatientDetail = async (memberNumber: string): Promise<PatientDetailVO> =>{
    const res = await axios.get<PatientDetailVO>(`${BASE}/patients/${memberNumber}`);
    return res.data;
}

//사용여부 Y -N
export const updatePatientStatus = async (memberNumber: string, body: PatientStatusUpdate): Promise<void> =>{
    await axios.patch(`${BASE}/patients/${memberNumber}`, body);
};


// ── 직원 관리 ──────────────────────────────────────────────────────────────
// 목록조회 (이름/사번 부분일치 검색)
export const getEmployees = async (keyword?: string): Promise<EmployeeListItem[]> => {
    const params: Record<string, string> = {};
    if (keyword) params.keyword = keyword;
    const res = await axios.get<EmployeeListItem[]>(`${BASE}/employees`, { params });
    return res.data;
};

// 상세조회
export const getEmployeeDetail = async (memberNumber: string): Promise<EmployeeDetail> => {
    const res = await axios.get<EmployeeDetail>(`${BASE}/employees/${memberNumber}`);
    return res.data;
};

// 관리자 권한 계정 생성
export const createEmployee = async (body: CreateEmployeeRequest): Promise<void> => {
    await axios.post(`${BASE}/employees`, body);
};

// 재직(Y)/퇴직(N) 처리
export const updateEmployeeStatus = async (memberNumber: string, body: UpdateEmployeeStatusRequest): Promise<void> => {
    await axios.patch(`${BASE}/employees/${memberNumber}`, body);
};

// ── 공지사항 관리 ──────────────────────────────────────────────────────────
export const getNotices = async (params: {
    keyword?: string; category?: string; currentPage: number; size: number;
}): Promise<PagedResponse<NoticeItem>> => {
    const res = await axios.get<PagedResponse<NoticeItem>>(`${BASE}/notices`, { params });
    return res.data;
};

export const createNotice = async (body: NoticeRequest): Promise<void> => {
    await axios.post(`${BASE}/notices`, body);
};

export const updateNotice = async (noticeNumber: number, body: NoticeRequest): Promise<void> => {
    await axios.put(`${BASE}/notices/${noticeNumber}`, body);
};

export const deleteNotice = async (noticeNumber: number): Promise<void> => {
    await axios.delete(`${BASE}/notices/${noticeNumber}`);
};

// ── FAQ 관리 ───────────────────────────────────────────────────────────────
export const getFaqs = async (params: {
    keyword?: string; currentPage: number; size: number;
}): Promise<PagedResponse<FaqItem>> => {
    const res = await axios.get<PagedResponse<FaqItem>>(`${BASE}/faqs`, { params });
    return res.data;
};

export const createFaq = async (body: FaqRequest): Promise<void> => {
    await axios.post(`${BASE}/faqs`, body);
};

export const updateFaq = async (faqNumber: number, body: FaqRequest): Promise<void> => {
    await axios.put(`${BASE}/faqs/${faqNumber}`, body);
};

export const deleteFaq = async (faqNumber: number): Promise<void> => {
    await axios.delete(`${BASE}/faqs/${faqNumber}`);
};

// ── QNA 관리 ───────────────────────────────────────────────────────────────
export const getQnas = async (params: {
    keyword?: string; status?: string; currentPage: number; size: number;
}): Promise<PagedResponse<QnaItem>> => {
    const res = await axios.get<PagedResponse<QnaItem>>(`${BASE}/qnas`, { params });
    return res.data;
};

export const answerQna = async (qandaNumber: string, body: QnaAnswerRequest): Promise<void> => {
    await axios.put(`${BASE}/qnas/${qandaNumber}/answer`, body);
};

export const deleteQna = async (qandaNumber: string): Promise<void> => {
    await axios.delete(`${BASE}/qnas/${qandaNumber}`);
};

// ── 공통코드 (QNA 분류 표시용, group='Q') ────────────────────────────────
export const getCommonCodesByGroup = async (group: string): Promise<CommonCodeVO[]> => {
    const res = await axios.get<CommonCodeVO[]>('/api/commoncode', { params: { group } });
    return res.data;
};