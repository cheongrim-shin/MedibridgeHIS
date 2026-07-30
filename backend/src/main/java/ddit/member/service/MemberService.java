package ddit.member.service;

import ddit.member.dto.MemberSignupRequestDTO;

public interface MemberService
{
    // 직원 회원가입
    // - memberId, password, memberName, departmentCode, positionCode
    void signup(MemberSignupRequestDTO request);
}
