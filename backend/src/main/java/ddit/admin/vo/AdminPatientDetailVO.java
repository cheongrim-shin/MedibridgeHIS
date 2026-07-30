package ddit.admin.vo;

import lombok.Data;

@Data
public class AdminPatientDetailVO {

	private String memberNumber;
	private String memberId;
    private String memberName;
    private String memberPhoneNumber;
    private String rrn;              // 마스킹된 주민번호 900412-1******
    private String primaryAddress;
    private String detailedAddress;
    private String postalCode;
    private String accountStatus;    // Y/N
}
