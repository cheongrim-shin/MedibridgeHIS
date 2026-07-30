package ddit.patient.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * 환자포털 접수/수납 이력 VO
 * 
 * 현재 DB 기준:
 * RECEPTIONIST_REGISTER 테이블에서 MEMBER_NUMBER 기준으로 접수/진료 이력을 조회한다.
 */
@Getter
@Setter
@ToString
public class PatientRegisterVO {

	// 진료번호
	private String medicalNumber;
	
	// 새 DB 기준 회원번호
	private String memberNumber;
	
	// 기존 JSP/코드 호환용
	private String patientNumber;
	private String patientNo;
	
	// 담당 의사 번호
	private String doctorNumber;
	
	// 기존 직원코드 호환용
	private String employeeCode;
	
	// 접수일자
	private Date receiptDate;
	
	// 진료일자
	private Date treatmentDate;
	
	// 접수/수납 상태
	private String receiptStatus;
	
	// 오더 코드
	private String orderCode;
	
	// DB 컬럼 오타명 호환용
	private String orederCode;
	
	// 의사진료 결과 S/O/A/P
	private String registerS;
	private String registerO;
	private String registerA;
	private String registerP;
	
	// 진료 공간 번호
	private String spaceNumber;
	
	// 보류 사유
	private String holdReason;
	
	/*
	 * 기존 코드 호환용 필드
	 * 현재 새 DB에서는 직접 조회하지 않지만,
	 * 기존 JSP에서 참조할 수 있어 남겨둔다.
	 */
	private String reservationsNumber;
	private String episodeId;
	private String receiptNumber;
	private Integer medicationAmount;
	private String deptCode;
	
	/*
	 * memberNumber 세팅 시 기존 patientNumber/patientNo도 같이 세팅
	 */
	public void setMemberNumber(String memberNumber) {
		this.memberNumber = memberNumber;
		this.patientNumber = memberNumber;
		this.patientNo = memberNumber;
	}
	
	public void setPatientNumber(String patientNumber) {
		this.patientNumber = patientNumber;
		this.memberNumber = patientNumber;
		this.patientNo = patientNumber;
	}
	
	public void setPatientNo(String patientNo) {
		this.patientNo = patientNo;
		this.patientNumber = patientNo;
		this.memberNumber = patientNo;
	}
	
	/*
	 * doctorNumber 세팅 시 기존 employeeCode도 같이 세팅
	 */
	public void setDoctorNumber(String doctorNumber) {
		this.doctorNumber = doctorNumber;
		this.employeeCode = doctorNumber;
	}
	
	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
		this.doctorNumber = employeeCode;
	}
	
	/*
	 * orderCode / orederCode 호환
	 */
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
		this.orederCode = orderCode;
	}
	
	public void setOrederCode(String orederCode) {
		this.orederCode = orederCode;
		this.orderCode = orederCode;
	}
}