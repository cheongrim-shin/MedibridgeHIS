package ddit.login.controller;

import ddit.login.security.CustomUserDetails;
import ddit.login.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController
{
    private final AuthService authService;
    private static final int REFRESH_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 7; // 리프레시 토큰: 7시간(provider와 동일)

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response)
    {
        AuthService.LoginResult result = authService.login(request.getMemberId(), request.getPassword());

        // 리프레시 토큰은 httpOnly 쿠키로 전달(헤더)
        setRefreshTokenCookie(response, result.refreshToken());

        // 액세스 토큰만 바디로 응답
        return ResponseEntity.ok(new LoginResponse(result.accessToken()));
    }

    // 토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity<ReissueResponse> reissue(
            // @CookieValue로 쿠키에서 직접 꺼냄
            @CookieValue(name = "refreshToken", required = false) String refreshToken
    )
    {
        if (refreshToken == null)
            return ResponseEntity.status(401).build();

        String newAccessToken = authService.reissue(refreshToken);
        return ResponseEntity.ok(new ReissueResponse(newAccessToken));
    }

    // 쿠키 생성 공통 로직
    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken)
    {
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);       // JS(document.cookie)로 접근 불가 - XSS 방어
        cookie.setPath("/api/auth");    // 이 경로로 오는 요청에만 쿠키 자동 첨부
        cookie.setMaxAge(REFRESH_TOKEN_COOKIE_MAX_AGE);
        // cookie.setSecure(true);      // 배포(HTTPS) 환경에서 활성화 예정
        response.addCookie(cookie);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            HttpServletResponse response
    )
    {
        authService.logout(userDetails.getUsername());

        // 쿠키 삭제 - 같은 이름/path로 만들고 maxAge를 0으로 주면 브라우저가 즉시 삭제함
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/api/auth");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok().build();
    }

    @Data
    static class LoginRequest
    {
        private String memberId;
        private String password;
    }

    @Data
    static class LoginResponse
    {
        private final String accessToken; // refreshToken은 더 이상 바디에 안 담음
    }

    @Data
    static class ReissueResponse
    {
        private final String accessToken;
    }
}