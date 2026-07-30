package ddit.member.vo;

import lombok.Data;

/*
MEMBER를 "직원/환자"로 나누기 위해 우리 스키마에서 새로 추가한 확장 테이블
EMPLOYEE row가 있으면 직원, 없으면(null) 환자로 판단
 */
@Data
public class EmployeeVO {
    private String memberNumber;    // MEMBER_NUMBER - PK/FK, 회원번호
    private String departmentCode;  // DEPARTMENT_CODE - FK, 부서코드
    private String positionCode;    // POSITION_CODE - FK, 직책코드

    private String departmentName;  // DEPARTMENT.DEPARTMENT_NAME - 부서명
    private String positionName;    // POSITION.POSITION_NAME - 직책명
}
