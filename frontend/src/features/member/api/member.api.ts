import axios from 'axios';
import type {Department, Position, SignupRequest} from './member.types';

// BASE URL - API 요청용 URL
const BASE = '/api/members';

// 부서 목록 조회 (드롭다운용)
export const getDepartments = async (): Promise<Department[]> => {
    const res = await axios.get<Department[]>('/api/departments');
    return res.data;
};

// 직책 목록 조회 (드롭다운용)
export const getPositions = async (): Promise<Position[]> => {
    const res = await axios.get<Position[]>('/api/positions');
    return res.data;
};

// 회원가입
export const signup = async (body: SignupRequest): Promise<void> => {
    await axios.post(BASE, body);
};