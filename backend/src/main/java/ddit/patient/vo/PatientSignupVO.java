package ddit.patient.vo;

/*
 * 환자포털 회원가입 입력값 VO
 *
 * 주민등록번호는 화면에서 앞 6자리와 뒤 7자리를 나누어 받고,
 * Service에서 숫자 13자리로 합친 뒤 AES 암호화한다.
 */
public class PatientSignupVO {

    private String memberId;
    private String password;
    private String passwordConfirm;
    private String memberName;
    private String memberPhoneNumber;
    private String rrnFront;
    private String rrnBack;
    private String primaryAddress;
    private String detailedAddress;
    private String postalCode;

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberPhoneNumber() {
        return memberPhoneNumber;
    }

    public void setMemberPhoneNumber(String memberPhoneNumber) {
        this.memberPhoneNumber = memberPhoneNumber;
    }

    public String getRrnFront() {
        return rrnFront;
    }

    public void setRrnFront(String rrnFront) {
        this.rrnFront = rrnFront;
    }

    public String getRrnBack() {
        return rrnBack;
    }

    public void setRrnBack(String rrnBack) {
        this.rrnBack = rrnBack;
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

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getPlainRrn() {
        String front = rrnFront == null ? "" : rrnFront.replaceAll("[^0-9]", "");
        String back = rrnBack == null ? "" : rrnBack.replaceAll("[^0-9]", "");
        return front + back;
    }
}
