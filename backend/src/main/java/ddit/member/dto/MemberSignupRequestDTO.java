package ddit.member.dto;

import lombok.Data;

@Data
public class MemberSignupRequestDTO {
    private String memberId;
    private String password;
    private String memberName;
    private String memberPhoneNumber;
    private String departmentCode;
    private String positionCode;
}