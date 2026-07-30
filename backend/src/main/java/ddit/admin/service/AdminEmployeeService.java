// ddit/admin/service/AdminEmployeeService.java
package ddit.admin.service;

import java.util.List;

import ddit.admin.vo.AdminEmployeeDetailVO;
import ddit.admin.vo.AdminEmployeeListVO;
import ddit.member.dto.MemberSignupRequestDTO;

public interface AdminEmployeeService {

    // 직원 목록
    public List<AdminEmployeeListVO> getEmployees(String keyword);

    public AdminEmployeeDetailVO getEmployeeDetail(String memberNumber);

    public void changeAccountStatus(String memberNumber, String accountStatus);

    // 관리자 화면에서 계정 생성(주로 관리자 권한 계정) - MemberService.signup() 재사용
    public void registerEmployee(MemberSignupRequestDTO request);
}