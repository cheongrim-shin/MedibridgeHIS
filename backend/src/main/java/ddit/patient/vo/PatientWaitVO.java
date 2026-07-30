package ddit.patient.vo;

import java.util.Date;

/*
 * PatientWaitVO
 * 
 * 역할:
 * 환자포털 대기현황 화면에 출력할 대기 정보를 담는 VO
 * 
 * DB 기준:
 * WAIT
 * RECEPTIONIST_REGISTER
 * PATIENT
 */
public class PatientWaitVO {

	private String waitNumber;
	private String spaceNumber;
	private String medicalNumber;
	private String standbyState;
	private int waitingTurnNumber;
	private String holdReason;
	private Date expectedWaitingTime;
	private Date estimatedTimeRequired;

	private int patientNo;
	private String patientName;

	private String employeeCode;
	private String employeeName;
	private String deptCode;
	private String receiptStatus;
	private Date receiptDate;

	public String getWaitNumber() {
		return waitNumber;
	}

	public void setWaitNumber(String waitNumber) {
		this.waitNumber = waitNumber;
	}

	public String getSpaceNumber() {
		return spaceNumber;
	}

	public void setSpaceNumber(String spaceNumber) {
		this.spaceNumber = spaceNumber;
	}

	public String getMedicalNumber() {
		return medicalNumber;
	}

	public void setMedicalNumber(String medicalNumber) {
		this.medicalNumber = medicalNumber;
	}

	public String getStandbyState() {
		return standbyState;
	}

	public void setStandbyState(String standbyState) {
		this.standbyState = standbyState;
	}

	public int getWaitingTurnNumber() {
		return waitingTurnNumber;
	}

	public void setWaitingTurnNumber(int waitingTurnNumber) {
		this.waitingTurnNumber = waitingTurnNumber;
	}

	public String getHoldReason() {
		return holdReason;
	}

	public void setHoldReason(String holdReason) {
		this.holdReason = holdReason;
	}

	public Date getExpectedWaitingTime() {
		return expectedWaitingTime;
	}

	public void setExpectedWaitingTime(Date expectedWaitingTime) {
		this.expectedWaitingTime = expectedWaitingTime;
	}

	public Date getEstimatedTimeRequired() {
		return estimatedTimeRequired;
	}

	public void setEstimatedTimeRequired(Date estimatedTimeRequired) {
		this.estimatedTimeRequired = estimatedTimeRequired;
	}

	public int getPatientNo() {
		return patientNo;
	}

	public void setPatientNo(int patientNo) {
		this.patientNo = patientNo;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getEmployeeCode() {
		return employeeCode;
	}

	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
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

	public String getReceiptStatus() {
		return receiptStatus;
	}

	public void setReceiptStatus(String receiptStatus) {
		this.receiptStatus = receiptStatus;
	}

	public Date getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(Date receiptDate) {
		this.receiptDate = receiptDate;
	}
}