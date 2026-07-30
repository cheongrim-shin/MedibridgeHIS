package ddit.login.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

/*
JWT는 세 부분(Header.Payload.Signature)으로 구성된 문자열 토큰입니다.
로그인 성공 시 서버가 이 토큰을 만들어서 클라이언트에 주고, 이후 클라이언트는 매 요청마다 이 토큰을 헤더에 담아 보냅니다.
서버는 토큰의 서명(Signature)을 비밀키로 검증해서, 변조되지 않았는지/누구인지/만료됐는지를 확인합니다.
 */

// JWT 발급/검증 클래스
// 토큰 = 헤더.내용.서명 형태 문자열. 내용은 누구나 볼 수 있지만, 서명 덕분에 변조하면 바로 걸림
@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKeyString;

    private SecretKey secretKey;

    private static final long ACCESS_TOKEN_EXPIRE_MS  = 1000L * 60 * 60;      // 액세스 토큰: 1시간
    private static final long REFRESH_TOKEN_EXPIRE_MS = 1000L * 60 * 60  * 7; // 리프레시 토큰: 7시간

    private SecretKey getSecretKey() {
        if (secretKey == null) {
            secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
        }
        return secretKey;
    }

    // 액세스 토큰(매 요청마다 들고 다니는 토큰) 생성 - memberId와 권한 목록을 담음
    public String createAccessToken(String memberId, List<String> roles) {
        Date now = new Date();
        return Jwts.builder()
                .subject(memberId) // 토큰 주인
                .claim("roles", roles) // 권한 목록도 같이 담음
                .issuedAt(now)
                .expiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_MS))
                .signWith(getSecretKey()) // 서명
                .compact();
    }

    // 리프레시 토큰 생성 - 액세스 토큰 재발급용, 권한은 안 담음(memberId만 담음)
    public String createRefreshToken(String memberId) {
        Date now = new Date();
        return Jwts.builder()
                .subject(memberId)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_MS))
                .signWith(getSecretKey())
                .compact();
    }

    public String getMemberId(String token) {
        return parseClaims(token).getSubject();
    }

    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        return (List<String>) parseClaims(token).get("roles");
    }

    // 토큰 서명/만료 검증. 문제 없으면 true
    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
