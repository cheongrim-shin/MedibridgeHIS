package ddit.login.security;

import ddit.member.mapper.PositionMapper;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

// 관리자에게 부여할 "전체 권한 목록"을 서버 시작 시 한 번만 DB에서 읽어와 메모리에 캐싱
// 매 요청마다 DB 조회하지 않기 위함 (JwtAuthenticationFilter가 요청마다 실행되므로)
@Component
@RequiredArgsConstructor
public class AllRolesCache
{
    private final PositionMapper positionMapper;

    @Getter
    private List<String> allRoles = List.of();

    @PostConstruct // 스프링 빈 생성 직후 자동 실행
    public void init()
    {
        allRoles = positionMapper.selectAllDefaultPermissionNames();
    }
}