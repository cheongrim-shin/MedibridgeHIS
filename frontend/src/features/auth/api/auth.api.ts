/**
 * login(), reissue(), logout() API 함수
 */

import axios from 'axios';
import type {LoginRequest, LoginResponse, ReissueResponse} from './auth.types.ts';

// BASE URL - API 요청용 URL
const BASE = '/api/auth';

// 로그인
export const login = async (body: LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>(`${BASE}/login`, body, {
        // refreshToken은 Set-Cookie(httpOnly)로 자동 저장되므로 withCredentials 필수
        withCredentials: true,
    });
    return res.data;
};

// 액세스 토큰 재발급
export const reissue = async (): Promise<ReissueResponse> => {
    const res = await axios.post<ReissueResponse>(`${BASE}/reissue`, null, {
        // 바디 없이 호출, 쿠키(refreshToken)가 자동 첨부되어야 하므로 withCredentials 필수
        withCredentials: true,
    });
    return res.data;
};

// 로그아웃
// - Authorization 헤더는 axios 요청 인터셉터가 자동으로 붙여줌 (accessToken 필요)
export const logout = async (): Promise<void> => {
    await axios.post(`${BASE}/logout`, null, {
        // 서버가 refreshToken 쿠키를 만료시켜서 내려주므로 withCredentials 필수
        withCredentials: true,
    });
};