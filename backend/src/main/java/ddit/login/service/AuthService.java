package ddit.login.service;

public interface AuthService
{
    // 아이디/비번 검증 후 토큰 발급 처리
    LoginResult login(String memberId, String password);

    // 리프레시 토큰으로 액세스 토큰 재발급
    String reissue(String refreshToken);

    // 로그아웃
    void logout(String memberId);

    // 로그인 결과
    record LoginResult(String accessToken, String refreshToken)
    {
    }
}
