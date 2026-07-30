package ddit.admin.vo;

import lombok.Data;

// ddit/admin/vo/AdminEmployeeDetailVO.java
@Data
public class AdminEmployeeDetailVO {
    private String memberNumber;
    private String memberId;
    private String memberName;
    private String memberPhoneNumber;
    private String departmentCode;
    private String departmentName;
    private String positionCode;
    private String positionName;
    private String accountStatus;
}