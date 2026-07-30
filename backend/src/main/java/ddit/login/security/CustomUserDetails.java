package ddit.login.security;

import ddit.member.vo.EmployeeVO;
import ddit.member.vo.MemberVO;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/*
 * Spring Security에서 로그인 사용자 정보를 관리하는 클래스
 *
 * - 회원 정보
 * - 직원 정보
 * - 권한 목록
 * - 계정 활성 상태
 */
@Getter
public class CustomUserDetails implements UserDetails {

    private final MemberVO member;

    // 환자 회원이면 null일 수 있음
    private final EmployeeVO employee;

    // AUTHORITY.PERMISSION_NAME 목록
    private final List<String> permissionNames;

    public CustomUserDetails(
            MemberVO member,
            EmployeeVO employee,
            List<String> permissionNames) {

        this.member = member;
        this.employee = employee;

        /*
         * 환자 계정에 별도 권한 데이터가 없어서 null이 반환되더라도
         * get member;
        this.employee = employee;

        /*
         * 환자 계정에Authorities()에서 오류가 발생하지 않도록 빈 목록으로 처리
         */
        this.permissionNames =
                permissionNames != null
                        ? permissionNames
                        : Collections.emptyList();
    }

    /**
     * 사용자가 가진 권한 목록을 Spring Security 형식으로 변환한다.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return permissionNames.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    /**
     * DB에 저장된 BCrypt 비밀번호 반환
     */
    @Override
    public String getPassword() {
        return member.getMemberPassword();
    }

    /**
     * 로그인 아이디 반환
     */
    @Override
    public String getUsername() {
        return member.getMemberId();
    }

    /**
     * 계정 만료 여부
     * true: 만료되지 않음
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * DB의 계정 활성 상태를 확인한다.
     *
     * 현재 DB: 1 = 활성
     * 기존 데이터 호환: Y = 활성
     */
    private boolean isActiveAccount() {

        String accountStatus = member.getAccountStatus();

        if (accountStatus == null) {
            return false;
        }

        accountStatus = accountStatus.trim();

        return "1".equals(accountStatus)
                || "Y".equalsIgnoreCase(accountStatus);
    }

    /**
     * 계정 잠금 여부
     * true: 잠기지 않은 계정
     */
    @Override
    public boolean isAccountNonLocked() {
        return isActiveAccount();
    }

    /**
     * 비밀번호 만료 여부
     * true: 만료되지 않음
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 계정 활성 여부
     */
    @Override
    public boolean isEnabled() {
        return isActiveAccount();
    }
}