package ddit.member.mapper;

import ddit.member.vo.EmployeeVO;
import ddit.member.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/*
수업 - UsersMapper.findByEmail() 한 번 호출로 회원+권한을 통째로 조회 (JOIN 결과를 UsersVO에 매핑)
현재 - MEMBER / AUTHORITY / EMPLOYEE가 성격이 달라서(직원만 있는 정보 등) 쿼리 3개로 분리
 */
@Mapper
public interface MemberMapper
{
    /** 로그인 */
    MemberVO selectMemberByLoginId(String memberId); // 회원 조회(인증 시작점)
    List<String> selectAuthoritiesByMemberNumber(String memberNumber); // 권한 목록 조회(다수권한가능)
    EmployeeVO selectEmployeeByMemberNumber(String memberNumber); // 회원번호로 직원 정보 조회(환자 null)

    /** 회원가입 */
    int selectNextEmployeeMemberNumberSuffix(); // 시퀀스로 다음 회원번호 계산(M01)
    String selectDefaultPermissionByPositionCode(String positionCode); // 직책 - 기본권한 조회

    void insertMember(MemberVO member); // MEMBER 저장
    void insertEmployee(EmployeeVO employee); // EMPLOYEE 저장
    void insertAuthority(
            @Param("memberNumber") String memberNumber,
            @Param("permissionName") String permissionName); // AUTHORITY 저장

}