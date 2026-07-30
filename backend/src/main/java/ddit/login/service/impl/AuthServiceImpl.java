package ddit.login.service.impl;

import ddit.login.security.CustomUserDetails;
import ddit.login.security.CustomUserDetailsService;
import ddit.login.security.jwt.JwtProvider;
import ddit.login.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService
{
    private final AuthenticationManager authenticationManager; // id/pw 검증용
    private final JwtProvider jwtProvider; // 토큰 생성용
    private final CustomUserDetailsService customUserDetailsService; // 재발급 시 최신 권한 재조회용
    // 서버 메모리에 리프레시 토큰 저장 (memberId -> 최신 리프레시 토큰)
    private final Map<String, String> refreshTokenStore = new ConcurrentHashMap<>();

    // 아이디/비번 검증 후 토큰 발급 처리
    @Override
    public LoginResult login(String memberId, String password)
    {
        // 1) id/pw 검증 - CustomUserDetailsService DB 조회, PasswordEncoder 비밀번호 비교
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(memberId, password)
        );

        // 2) 인증 성공 시 반환되는 사용자 정보
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // 3) 토큰 발급
        String accessToken = jwtProvider.createAccessToken(userDetails.getUsername(), userDetails.getPermissionNames());
        String refreshToken = jwtProvider.createRefreshToken(userDetails.getUsername());

        // 4) 리프레시 토큰 저장(재로그인 시 유효시간 갱신)
        refreshTokenStore.put(userDetails.getUsername(), refreshToken);

        return new LoginResult(accessToken, refreshToken);
    }

    // 리프레시 토큰으로 액세스 토큰 재발급
    @Override
    public String reissue(String refreshToken)
    {
        // 1) 토큰 자체 유효성(서명/만료) 검증
        if (!jwtProvider.validateToken(refreshToken))
        {
            throw new BadCredentialsException("유효하지 않은 리프레시 토큰입니다.");
        }

        String memberId = jwtProvider.getMemberId(refreshToken);

        // 2) 저장된 최신 리프레시 토큰과 일치하는지 확인 (재로그인 등으로 무효화됐는지 체크)
        String savedToken = refreshTokenStore.get(memberId);
        if (savedToken == null || !savedToken.equals(refreshToken))
        {
            throw new BadCredentialsException("리프레시 토큰이 일치하지 않습니다.");
        }

        // 3) 최신 권한 재조회 (로그인 이후 권한이 바뀌었을 가능성 반영)
        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(memberId);

        // 4) 새 액세스 토큰만 발급 (리프레시 토큰은 그대로 유지 - 회전 안 함)
        return jwtProvider.createAccessToken(memberId, userDetails.getPermissionNames());
    }

    // 로그아웃
    @Override
    public void logout(String memberId)
    {
        refreshTokenStore.remove(memberId); // 저장된 리프레시 토큰 제거 - 이후 재발급 불가능해짐
    }
}