package ddit.member.service.impl;

import ddit.member.dto.MemberSignupRequestDTO;
import ddit.member.mapper.MemberMapper;
import ddit.member.service.MemberService;
import ddit.member.vo.EmployeeVO;
import ddit.member.vo.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService
{
    private final MemberMapper memberMapper;       // 가입 데이터 저장용
    private final PasswordEncoder passwordEncoder; // 비밀번호 변환용

    private static final int MIN_PASSWORD_LENGTH = 4; // 비밀번호 최소길이

    @Override
    public void signup(MemberSignupRequestDTO request)
    {
        // 1) 아이디 중복 체크 - 이미 존재하면 가입 거부
        if (memberMapper.selectMemberByLoginId(request.getMemberId()) != null)
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다: " + request.getMemberId());

        // 2) 비밀번호 길이 검증
        if (request.getPassword() == null || request.getPassword().length() < MIN_PASSWORD_LENGTH)
            throw new IllegalArgumentException("비밀번호는 " + MIN_PASSWORD_LENGTH + "자 이상이어야 합니다.");

        // 직책 기준 기본 권한 조회 (+ 안정성검사)
        String permissionName = memberMapper.selectDefaultPermissionByPositionCode(request.getPositionCode());
        if (permissionName == null)
            throw new IllegalArgumentException("유효하지 않은 직책 코드입니다: " + request.getPositionCode());

        // 회원번호 생성
        int nextSuffix = memberMapper.selectNextEmployeeMemberNumberSuffix();
        String memberNumber = String.format("M01-%02d", nextSuffix);

        // MEMBER VO변환 및 저장
        MemberVO member = new MemberVO();

        member.setMemberNumber(memberNumber); // 회원 번호
        member.setMemberId(request.getMemberId()); // id
        member.setMemberPassword(passwordEncoder.encode(request.getPassword())); // pw: BCrypt 암호화 후 저장
        member.setMemberName(request.getMemberName()); // 이름
        member.setMemberPhoneNumber(request.getMemberPhoneNumber()); // 전화번호
        member.setAccountStatus("Y"); // 계정 활성 상태
        member.setMemberStatus("직원"); // 직원-환자 여부(회원번호에 M01 로써 구분중 - 수정고려)
        memberMapper.insertMember(member); // 저장

        // EMPLOYEE VO변환 및 저장
        EmployeeVO employee = new EmployeeVO();

        employee.setMemberNumber(memberNumber); // 회원 번호
        employee.setDepartmentCode(request.getDepartmentCode()); // 부서
        employee.setPositionCode(request.getPositionCode()); // 직책
        memberMapper.insertEmployee(employee); // 저장

        // AUTHORITY 저장 - 직책 기반으로 자동 부여된 권한 기록
        memberMapper.insertAuthority(memberNumber, permissionName);
    }
}