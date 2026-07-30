package ddit.admin.vo;

import lombok.Data;

// ddit/admin/vo/AdminEmployeeListVO.java
@Data
public class AdminEmployeeListVO
{
    private String memberNumber;      // 사번(회원번호)
    private String memberName;
    private String departmentName;
    private String positionName;
    private String memberPhoneNumber;
    private String accountStatus;     // Y:재직 / N:퇴직
}