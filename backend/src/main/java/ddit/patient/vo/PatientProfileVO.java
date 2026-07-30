package ddit.patient.vo;

/*
 * 마이페이지 회원정보 VO
 * 
 * 현재 DB 기준:
 * PATIENT 테이블이 아니라 MEMBER 테이블 기준으로 회원정보를 조회한다.
 */
public class PatientProfileVO {

	// 새 DB 기준 회원번호
	private String memberNumber;

	// 기존 JSP/코드 호환용
	private String patientNumber;

	private String memberId;
	private String patientName;
	private String residentNumber;
	private String phone;

	private String primaryAddress;
	private String detailedAddress;
	private String address;
	private String zipcode;

	private String accountStatus;
	private String memberStatus;

	// 기존 JSP/코드 호환용 필드
	private String insurance;
	private String whetherToUse;
	private String guardianName;
	private String emergencyPhone;
	private String birthDate;
	private String gender;

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

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getResidentNumber() {
		return residentNumber;
	}

	public void setResidentNumber(String residentNumber) {
		this.residentNumber = residentNumber;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPrimaryAddress() {
		return primaryAddress;
	}

	public void setPrimaryAddress(String primaryAddress) {
		this.primaryAddress = primaryAddress;
	}

	public String getDetailedAddress() {
		return detailedAddress;
	}

	public void setDetailedAddress(String detailedAddress) {
		this.detailedAddress = detailedAddress;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getZipcode() {
		return zipcode;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public String getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(String accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getMemberStatus() {
		return memberStatus;
	}

	public void setMemberStatus(String memberStatus) {
		this.memberStatus = memberStatus;
	}

	public String getInsurance() {
		return insurance;
	}

	public void setInsurance(String insurance) {
		this.insurance = insurance;
	}

	public String getWhetherToUse() {
		return whetherToUse;
	}

	public void setWhetherToUse(String whetherToUse) {
		this.whetherToUse = whetherToUse;
	}

	public String getGuardianName() {
		return guardianName;
	}

	public void setGuardianName(String guardianName) {
		this.guardianName = guardianName;
	}

	public String getEmergencyPhone() {
		return emergencyPhone;
	}

	public void setEmergencyPhone(String emergencyPhone) {
		this.emergencyPhone = emergencyPhone;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
}