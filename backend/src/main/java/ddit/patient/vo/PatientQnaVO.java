package ddit.patient.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/*
 * 환자포털 QNA VO
 *
 * 역할:
 * 환자가 등록한 문의사항과 답변 정보를 담는다.
 *
 * 실제 QNA 테이블 기준 컬럼:
 * - QANDA_NUMBER
 * - SUBJECT
 * - CATEGORY_CODE
 * - INQUIRY_DETAILS
 * - INQUIRER
 * - RESPONDENT
 * - RESPONSE_DETAILS
 * - DATE_WRITTEN
 * - DATE_OF_RESPONSE
 * - STATUS
 */
public class PatientQnaVO {

	private String qandaNumber;

	// 문의 제목은 필수
	@NotBlank(message = "문의 제목을 입력해주세요.")
	@Size(max = 300, message = "문의 제목은 300자 이하로 입력해주세요.")
	private String subject;

	// 문의 유형은 필수
	@NotBlank(message = "문의 유형을 선택해주세요.")
	@Size(max = 20, message = "문의 유형 값이 너무 깁니다.")
	private String categoryCode;

	// 문의 내용은 필수
	@NotBlank(message = "문의 내용을 입력해주세요.")
	@Size(max = 3000, message = "문의 내용은 3000자 이하로 입력해주세요.")
	private String inquiryDetails;

	/*
	 * 아래 값들은 사용자가 임의로 입력하게 두지 않는다.
	 *
	 * inquirer:
	 * Spring Security 로그인 환자 정보에서 설정
	 *
	 * status:
	 * 등록 시 서버에서 기본 상태 WAIT로 설정
	 */
	private String inquirer;
	private String respondent;
	private String responseDetails;
	private String dateWritten;
	private String dateOfResponse;
	private String status;

	public String getQandaNumber() {
		return qandaNumber;
	}

	public void setQandaNumber(String qandaNumber) {
		this.qandaNumber = qandaNumber;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getCategoryCode() {
		return categoryCode;
	}

	public void setCategoryCode(String categoryCode) {
		this.categoryCode = categoryCode;
	}

	public String getInquiryDetails() {
		return inquiryDetails;
	}

	public void setInquiryDetails(String inquiryDetails) {
		this.inquiryDetails = inquiryDetails;
	}

	public String getInquirer() {
		return inquirer;
	}

	public void setInquirer(String inquirer) {
		this.inquirer = inquirer;
	}

	public String getRespondent() {
		return respondent;
	}

	public void setRespondent(String respondent) {
		this.respondent = respondent;
	}

	public String getResponseDetails() {
		return responseDetails;
	}

	public void setResponseDetails(String responseDetails) {
		this.responseDetails = responseDetails;
	}

	public String getDateWritten() {
		return dateWritten;
	}

	public void setDateWritten(String dateWritten) {
		this.dateWritten = dateWritten;
	}

	public String getDateOfResponse() {
		return dateOfResponse;
	}

	public void setDateOfResponse(String dateOfResponse) {
		this.dateOfResponse = dateOfResponse;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}