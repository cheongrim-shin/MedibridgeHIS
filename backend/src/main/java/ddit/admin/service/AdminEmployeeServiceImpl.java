// ddit/admin/service/AdminEmployeeServiceImpl.java
package ddit.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ddit.admin.mapper.AdminEmployeeMapper;
import ddit.admin.vo.AdminEmployeeDetailVO;
import ddit.admin.vo.AdminEmployeeListVO;
import ddit.member.dto.MemberSignupRequestDTO;
import ddit.member.service.MemberService;

@Service
public class AdminEmployeeServiceImpl implements AdminEmployeeService {

    @Autowired
    AdminEmployeeMapper adminEmployeeMapper;

    @Autowired
    MemberService memberService; // 계정 생성 로직은 회원가입과 동일해서 재사용(중복 구현 X)

    @Override
    public List<AdminEmployeeListVO> getEmployees(String keyword) {
        String normalized = (keyword == null || keyword.isBlank()) ? null : keyword.trim();
        List<AdminEmployeeListVO> list = this.adminEmployeeMapper.selectEmployeeList(normalized);
        return list;
    }

    @Override
    public AdminEmployeeDetailVO getEmployeeDetail(String memberNumber) {
        AdminEmployeeDetailVO detail = this.adminEmployeeMapper.selectEmployeeDetail(memberNumber);
        if (detail == null) {
            throw new IllegalArgumentException("존재하지 않는 직원입니다.");
        }
        return detail;
    }

    @Override
    public void changeAccountStatus(String memberNumber, String accountStatus) {
        if (!"Y".equals(accountStatus) && !"N".equals(accountStatus)) {
            throw new IllegalArgumentException("재직 상태 값이 올바르지 않습니다.");
        }
        int updated = this.adminEmployeeMapper.updateAccountStatus(memberNumber, accountStatus);
        if (updated == 0) {
            throw new IllegalArgumentException("존재하지 않는 직원입니다.");
        }
    }

    @Override
    public void registerEmployee(MemberSignupRequestDTO request) {
        // 아이디 중복체크/비밀번호 검증/권한(AUTHORITY) 부여까지 MemberService.signup()에서 동일하게 처리됨
        // (관리자 직책 코드도 signup 로직 자체는 막지 않음 - 프론트 셀프가입 화면에서만 관리자 선택지를 뺀 것)
        this.memberService.signup(request);
    }
}