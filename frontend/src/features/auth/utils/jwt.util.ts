/**
 * JWT 디코딩 유틸
 */

// JwtProvider.createAccessToken() 기준 payload 구조
export interface JwtPayload {
    sub: string;     // memberId
    roles: string[]; // 권한 목록
    iat: number;
    exp: number;
}

/**
 * JWT는 Header.Payload.Signature 구조의 문자열.
 * 서명 검증은 비밀키를 가진 서버만 할 수 있으므로,
 * 프론트에서는 Payload 부분만 디코딩해서 화면 표시/권한 분기용으로 사용한다.
 * (여기서 디코딩한 값은 "신뢰 검증된" 값이 아니라 "참고용" 값 — 실제 인가는 항상 백엔드가 최종 판단)
 */
export const decodeAccessToken = (token: string): JwtPayload | null => {
    try {
        // JWT 구조: "헤더.페이로드.서명" -> '.'으로 split해서 가운데(payload) 부분만 꺼냄
        const payloadBase64Url = token.split('.')[1];

        // JWT의 payload는 base64가 아니라 'base64url' 인코딩 (URL에 안전하게 쓰려고 -, _ 사용)
        // 표준 base64로 되돌리기 위해 -> +, _ -> / 로 치환
        const base64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');

        // atob()로 base64 디코딩하면 한글 같은 멀티바이트 문자가 깨질 수 있어서
        // 한 글자씩 %XX 형태(퍼센트 인코딩)로 바꾼 뒤 decodeURIComponent로 다시 조립(디코딩 - 한글 안전 처리)
        const jsonString = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                .join('')
        );

        // 최종적으로 완성된 JSON 문자열을 객체로 파싱 ({ sub, roles, iat, exp })
        return JSON.parse(jsonString) as JwtPayload;
    } catch {
        // 토큰 형식이 이상하거나 파싱 실패하면 null 반환 (호출부에서 비로그인 취급)
        return null;
    }
};

// 토큰 만료 여부 (exp는 초 단위, Date.now()는 ms 단위라 1000 곱해서 비교)
export const isTokenExpired = (payload: JwtPayload): boolean => {
    return payload.exp * 1000 < Date.now();
};