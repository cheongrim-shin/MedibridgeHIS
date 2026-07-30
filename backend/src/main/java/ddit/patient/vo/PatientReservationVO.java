package ddit.patient.vo;

import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * 환자포털 예약 정보 VO
 *
 * DB 날짜 계산과 등록에는 Date 필드를 사용하고,
 * 화면·JSON 출력에는 yyyy-MM-dd HH:mm 문자열 필드를 사용한다.
 */
public class PatientReservationVO {

	private static final String DATE_TIME_PATTERN =
			"yyyy-MM-dd HH:mm";

	// 예약번호
	private String appointmentNumber;
	private String reservationsNumber;

	// 회원번호
	private String memberNumber;
	private String patientNumber;

	private String patientName;
	private String phone;

	// 담당 의료진
	private String attendingPhysician;
	private String employeeCode;
	private String employeeName;

	private String deptCode;
	private String deptName;

	// DB 처리용 날짜
	private Date reservationStartDate;
	private Date reservationEndDate;
	private Date reservedAt;

	// 화면·JSON 출력용 날짜
	private String reservationStartDateText;
	private String reservationEndDateText;
	private String reservedAtText;

	private String reservationStatus;
	private String reservationsStatus;

	private Date reservationsCreatedAt;
	private String reservationsCreatedAtText;

	private String reservationSource;
	private String symptoms;
	private String color;

	private String formatDate(Date date) {

		if (date == null) {
			return null;
		}

		return new SimpleDateFormat(
				DATE_TIME_PATTERN
		).format(date);
	}

	public String getAppointmentNumber() {
		return appointmentNumber;
	}

	public void setAppointmentNumber(
			String appointmentNumber) {

		this.appointmentNumber = appointmentNumber;
		this.reservationsNumber = appointmentNumber;
	}

	public String getReservationsNumber() {
		return reservationsNumber;
	}

	public void setReservationsNumber(
			String reservationsNumber) {

		this.reservationsNumber = reservationsNumber;
		this.appointmentNumber = reservationsNumber;
	}

	public void setReservationsNumber(
			Integer reservationsNumber) {

		if (reservationsNumber != null) {

			String value =
					String.valueOf(reservationsNumber);

			this.reservationsNumber = value;
			this.appointmentNumber = value;
		}
	}

	/*
	 * 기존 reservationNo 호환
	 */
	public String getReservationNo() {
		return reservationsNumber;
	}

	public void setReservationNo(
			String reservationNo) {

		this.reservationsNumber = reservationNo;
		this.appointmentNumber = reservationNo;
	}

	public void setReservationNo(
			Integer reservationNo) {

		if (reservationNo != null) {

			String value =
					String.valueOf(reservationNo);

			this.reservationsNumber = value;
			this.appointmentNumber = value;
		}
	}

	public String getMemberNumber() {
		return memberNumber;
	}

	public void setMemberNumber(
			String memberNumber) {

		this.memberNumber = memberNumber;
		this.patientNumber = memberNumber;
	}

	public String getPatientNumber() {
		return patientNumber;
	}

	public void setPatientNumber(
			String patientNumber) {

		this.patientNumber = patientNumber;
		this.memberNumber = patientNumber;
	}

	public void setPatientNumber(
			Integer patientNumber) {

		if (patientNumber != null) {

			String value =
					String.valueOf(patientNumber);

			this.patientNumber = value;
			this.memberNumber = value;
		}
	}

	/*
	 * 기존 patientNo 호환
	 */
	public String getPatientNo() {
		return patientNumber;
	}

	public void setPatientNo(
			String patientNo) {

		this.patientNumber = patientNo;
		this.memberNumber = patientNo;
	}

	public void setPatientNo(
			Integer patientNo) {

		if (patientNo != null) {

			String value =
					String.valueOf(patientNo);

			this.patientNumber = value;
			this.memberNumber = value;
		}
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(
			String patientName) {

		this.patientName = patientName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(
			String phone) {

		this.phone = phone;
	}

	public String getAttendingPhysician() {
		return attendingPhysician;
	}

	public void setAttendingPhysician(
			String attendingPhysician) {

		this.attendingPhysician =
				attendingPhysician;

		this.employeeCode =
				attendingPhysician;
	}

	public String getEmployeeCode() {
		return employeeCode;
	}

	public void setEmployeeCode(
			String employeeCode) {

		this.employeeCode = employeeCode;
		this.attendingPhysician = employeeCode;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(
			String employeeName) {

		this.employeeName = employeeName;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(
			String deptCode) {

		this.deptCode = deptCode;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(
			String deptName) {

		this.deptName = deptName;
	}

	public Date getReservationStartDate() {
		return reservationStartDate;
	}

	public void setReservationStartDate(
			Date reservationStartDate) {

		this.reservationStartDate =
				reservationStartDate;

		this.reservedAt =
				reservationStartDate;
	}

	public Date getReservationEndDate() {
		return reservationEndDate;
	}

	public void setReservationEndDate(
			Date reservationEndDate) {

		this.reservationEndDate =
				reservationEndDate;
	}

	public Date getReservedAt() {
		return reservedAt;
	}

	public void setReservedAt(
			Date reservedAt) {

		this.reservedAt = reservedAt;
		this.reservationStartDate = reservedAt;
	}

	/*
	 * yyyy-MM-dd HH:mm 형식
	 */
	public String getReservationStartDateText() {

		if (reservationStartDateText != null
				&& !reservationStartDateText.isBlank()) {

			return reservationStartDateText;
		}

		return formatDate(reservationStartDate);
	}

	public void setReservationStartDateText(
			String reservationStartDateText) {

		this.reservationStartDateText =
				reservationStartDateText;
	}

	public String getReservationEndDateText() {

		if (reservationEndDateText != null
				&& !reservationEndDateText.isBlank()) {

			return reservationEndDateText;
		}

		return formatDate(reservationEndDate);
	}

	public void setReservationEndDateText(
			String reservationEndDateText) {

		this.reservationEndDateText =
				reservationEndDateText;
	}

	public String getReservedAtText() {

		if (reservedAtText != null
				&& !reservedAtText.isBlank()) {

			return reservedAtText;
		}

		return formatDate(reservedAt);
	}

	public void setReservedAtText(
			String reservedAtText) {

		this.reservedAtText = reservedAtText;
	}

	public String getReservationStatus() {

		if (reservationStatus != null) {
			return reservationStatus;
		}

		return reservationsStatus;
	}

	public void setReservationStatus(
			String reservationStatus) {

		this.reservationStatus =
				reservationStatus;

		this.reservationsStatus =
				reservationStatus;
	}

	public String getReservationsStatus() {

		if (reservationsStatus != null) {
			return reservationsStatus;
		}

		return reservationStatus;
	}

	public void setReservationsStatus(
			String reservationsStatus) {

		this.reservationsStatus =
				reservationsStatus;

		this.reservationStatus =
				reservationsStatus;
	}

	public Date getReservationsCreatedAt() {
		return reservationsCreatedAt;
	}

	public void setReservationsCreatedAt(
			Date reservationsCreatedAt) {

		this.reservationsCreatedAt =
				reservationsCreatedAt;
	}

	public Date getReservationCreatedAt() {
		return reservationsCreatedAt;
	}

	public void setReservationCreatedAt(
			Date reservationCreatedAt) {

		this.reservationsCreatedAt =
				reservationCreatedAt;
	}

	public String getReservationsCreatedAtText() {

		if (reservationsCreatedAtText != null
				&& !reservationsCreatedAtText.isBlank()) {

			return reservationsCreatedAtText;
		}

		return formatDate(reservationsCreatedAt);
	}

	public void setReservationsCreatedAtText(
			String reservationsCreatedAtText) {

		this.reservationsCreatedAtText =
				reservationsCreatedAtText;
	}

	public String getReservationSource() {
		return reservationSource;
	}

	public void setReservationSource(
			String reservationSource) {

		this.reservationSource =
				reservationSource;
	}

	public String getSymptoms() {
		return symptoms;
	}

	public void setSymptoms(
			String symptoms) {

		this.symptoms = symptoms;
	}

	public String getColor() {
		return color;
	}

	public void setColor(
			String color) {

		this.color = color;
	}
}