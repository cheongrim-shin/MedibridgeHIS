package ddit.login.security.jwt;

import ddit.login.security.AllRolesCache;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

// 매 요청마다 한 번씩 실행되는 필터 - 헤더의 JWT를 꺼내서 검증하고, 유효하면 "로그인된 상태"로 등록
// OncePerRequestFilter를 상속하면 "요청 하나당 딱 한 번만 실행됨"이 보장됨 (내부 포워드 등으로 중복 실행 방지)
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter
{
    private final JwtProvider jwtProvider;
    private final AllRolesCache allRolesCache; // 캐시에서 권한목록 가져옴

    // 이 메서드가 실제 필터 로직 - Security 필터 체인을 지나갈 때 자동으로 호출됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException
    {
        String token = resolveToken(request); // 요청 헤더에서 토큰 추출

        // 토큰이 있고 + 서명/만료 검증 통과하면
        if (token != null && jwtProvider.validateToken(token))
        {
            String memberId = jwtProvider.getMemberId(token); // 토큰에서 아이디 추출
            List<String> roles = jwtProvider.getRoles(token); // 토큰에서 권한 추출

            // 문자열 권한 목록 → Spring Security용 GrantedAuthority 객체 목록으로 변환
            List<GrantedAuthority> authorities = roles.contains("ROLE_ADMIN")
                    ? allRolesCache.getAllRoles().stream().map(SimpleGrantedAuthority::new)
                      .collect(Collectors.toList())
                    : roles.stream().map(SimpleGrantedAuthority::new) // 접두어 있는 경우
                    //.map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // 접두어 없는 경우
                      .collect(Collectors.toList());


            // "인증 완료"를 나타내는 객체 생성
            // 2번째 파라미터(credentials)는 비밀번호 자리인데, 여기선 이미 토큰 검증이 끝났으니 필요 없어서 null
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(memberId, null, authorities);

            // SecurityContext에 등록 - 이 시점부터 이 요청은 "로그인된 사용자의 요청"으로 취급됨
            // 이후 컨트롤러의 @AuthenticationPrincipal, hasRole() 등이 전부 이 정보를 참조함
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        // 토큰이 없거나 유효하지 않으면 그냥 아무것도 안 하고 넘어감 (인증 안 된 상태로 처리됨)
        // → 이후 SecurityConfig의 anyRequest().authenticated()에서 401로 걸러짐

        filterChain.doFilter(request, response); // 다음 필터로 요청을 넘김 (이 줄 빠지면 요청이 여기서 멈춰버림)
    }

    // "Authorization: Bearer {토큰}" 형태의 헤더값에서 "Bearer " 접두어를 떼고 순수 토큰 문자열만 반환
    private String resolveToken(HttpServletRequest request)
    {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer "))
        {
            return bearerToken.substring(7); // "Bearer " 7글자 이후부터가 실제 토큰값
        }
        return null; // 헤더 자체가 없거나 형식이 안 맞으면 토큰 없음으로 처리
    }
}