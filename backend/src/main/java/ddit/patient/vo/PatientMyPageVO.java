package ddit.patient.vo;

import java.util.Date;

/*
 * 마이페이지 진료이력 VO
 *
 * 현재 DB 기준:
 * RECEPTIONIST_REGISTER 테이블의 MEMBER_NUMBER 기준으로 진료이력을 조회한다.
 *
 * 의사진료 결과:
 * REGISTER_S / REGISTER_O / REGISTER_A / REGISTER_P 값을 사용한다.
 */
public class PatientMyPageVO {

	private String medicalNumber;

	// 새 DB 기준 회원번호
	private String memberNumber;

	// 기존 JSP/코드 호환용
	private String patientNumber;

	private String patientName;

	// 새 DB 기준 담당의 번호
	private String doctorNumber;

	// 기존 코드 호환용
	private String employeeCode;
	private String employeeName;

	private String deptCode;
	private String deptName;

	private Date receiptDate;
	private Date treatmentDate;

	// DB에 저장된 원본 상태값(RS103 등)
	private String receiptStatusCode;

	// 환자 화면에 표시할 상태명
	private String receiptStatus;

	private String reservationNo;

	private String episodeId;
	private String episodeName;
	private String diseaseCode;

	private Integer medicationAmount;

	private String orderCode;

	// 의사진료 결과 SOAP
	private String registerS;
	private String registerO;
	private String registerA;
	private String registerP;

	private String spaceNumber;
	private String holdReason;

	private String visitType;

	public String getMedicalNumber() {
		return medicalNumber;
	}

	public void setMedicalNumber(String medicalNumber) {
		this.medicalNumber = medicalNumber;
	}

	public String getMemberNumber() {
		return memberNumber;
	}

	public void setMemberNumber(String memberNumber) {
		this.memberNumber = memberNumber;
		this.patientNumber = memberNumber;
	}

	public String getPatientNumber() {
		return patientNumber;
	}

	public void setPatientNumber(String patientNumber) {
		this.patientNumber = patientNumber;
		this.memberNumber = patientNumber;
	}

	/*
	 * 기존 patientNo 사용 코드 호환용
	 */
	public String getPatientNo() {
		return patientNumber;
	}

	public void setPatientNo(String patientNo) {
		this.patientNumber = patientNo;
		this.memberNumber = patientNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorNumber() {
		return doctorNumber;
	}

	public void setDoctorNumber(String doctorNumber) {
		this.doctorNumber = doctorNumber;
		this.employeeCode = doctorNumber;
	}

	public String getEmployeeCode() {
		if (employeeCode != null) {
			return employeeCode;
		}
		return doctorNumber;
	}

	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
		this.doctorNumber = employeeCode;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Date getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(Date receiptDate) {
		this.receiptDate = receiptDate;
	}

	public Date getTreatmentDate() {
		return treatmentDate;
	}

	public void setTreatmentDate(Date treatmentDate) {
		this.treatmentDate = treatmentDate;
	}

	public String getReceiptStatusCode() {
		return receiptStatusCode;
	}

	public void setReceiptStatusCode(String receiptStatusCode) {
		this.receiptStatusCode = receiptStatusCode;
	}

	public String getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	public String getReservationNo() {
		return reservationNo;
	}

	public void setReservationNo(String reservationNo) {
		this.reservationNo = reservationNo;
	}

	public String getEpisodeId() {
		return episodeId;
	}

	public void setEpisodeId(String episodeId) {
		this.episodeId = episodeId;
	}

	public String getEpisodeName() {
		return episodeName;
	}

	public void setEpisodeName(String episodeName) {
		this.episodeName = episodeName;
	}

	public String getDiseaseCode() {
		return diseaseCode;
	}

	public void setDiseaseCode(String diseaseCode) {
		this.diseaseCode = diseaseCode;
	}

	public Integer getMedicationAmount() {
		return medicationAmount;
	}

	public void setMedicationAmount(Integer medicationAmount) {
		this.medicationAmount = medicationAmount;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public String getRegisterS() {
		return registerS;
	}

	public void setRegisterS(String registerS) {
		this.registerS = registerS;
	}

	public String getRegisterO() {
		return registerO;
	}

	public void setRegisterO(String registerO) {
		this.registerO = registerO;
	}

	public String getRegisterA() {
		return registerA;
	}

	public void setRegisterA(String registerA) {
		this.registerA = registerA;
	}

	public String getRegisterP() {
		return registerP;
	}

	public void setRegisterP(String registerP) {
		this.registerP = registerP;
	}

	public String getSpaceNumber() {
		return spaceNumber;
	}

	public void setSpaceNumber(String spaceNumber) {
		this.spaceNumber = spaceNumber;
	}

	public String getHoldReason() {
		return holdReason;
	}

	public void setHoldReason(String holdReason) {
		this.holdReason = holdReason;
	}

	public String getVisitType() {
		return visitType;
	}

	public void setVisitType(String visitType) {
		this.visitType = visitType;
	}
}