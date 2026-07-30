/**
 * 로그인/재발급 요청·응답 타입
 */

// 로그인 요청 Body
export interface LoginRequest {
    memberId: string;
    password: string;
}

// 로그인 응답 Body (성공 시)
// refreshToken은 Set-Cookie(httpOnly)로 내려오기 때문에 JS에서 다루지 않음
export interface LoginResponse {
    accessToken: string;
}

// 재발급 응답 Body
export interface ReissueResponse {
    accessToken: string;
}