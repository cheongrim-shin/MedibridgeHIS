package ddit.login.security;

import ddit.member.mapper.MemberMapper;
import ddit.member.vo.EmployeeVO;
import ddit.member.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 * Spring Security 로그인 사용자 조회 서비스
 *
 * MEMBER_ID로 회원을 조회하고,
 * 회원 권한 및 직원 정보를 조회한 뒤
 * CustomUserDetails 객체로 반환한다.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String memberId)
            throws UsernameNotFoundException {

        /*
         * 입력받은 아이디로 회원 정보를 조회한다.
         */
        MemberVO member =
                memberMapper.selectMemberByLoginId(memberId);

        /*
         * 회원이 존재하지 않으면 인증 실패로 처리한다.
         *
         * 입력한 아이디나 회원정보는 콘솔에 출력하지 않는다.
         */
        if (member == null) {
            throw new UsernameNotFoundException(
                    "아이디 또는 비밀번호를 확인해 주세요.");
        }

        /*
         * 회원 권한 목록 조회
         *
         * 환자 회원은 별도의 권한 데이터가 없어
         * 빈 목록이 반환될 수도 있다.
         */
        List<String> permissionNames =
                memberMapper.selectAuthoritiesByMemberNumber(
                        member.getMemberNumber());

        /*
         * 직원 정보 조회
         *
         * 환자 회원인 경우 employee는 null일 수 있다.
         */
        EmployeeVO employee =
                memberMapper.selectEmployeeByMemberNumber(
                        member.getMemberNumber());

        /*
         * Spring Security에서 사용할 로그인 사용자 객체 생성
         */
        return new CustomUserDetails(
                member,
                employee,
                permissionNames);
    }
}