package ddit.admin.vo;

import lombok.Data;

@Data
public class AdminPatientListVO {
	
	private String memberNumber; /* 회원 번호(PK) */
	private String memberName; /* 이름 */
	private String memberPhoneNumber; /* 연락처 */
	private String birthDate; /* 주민등록번호 */
	private String gender;
	private String accountStatus; /* 계정 상태(정상/휴면/탈퇴 등) */
}
