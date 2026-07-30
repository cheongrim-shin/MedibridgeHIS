package ddit.receptionist.vo;


import lombok.Data;

@Data
public class ReceiptDetailVO {

	// ── 환자 ──
    private String memberNumber;
    private String memberName;
    private String memberPhoneNumber;
    private String address;          // 기본+상세 합친 값
    private String postalCode;
    private String birthDate;        // 'YYMMDD' (파생)
    private String gender;           // '남'/'여' (파생)
    // ── 접수 ──
    private String medicalNumber;
    private String receiptDate;      // ISO 문자열
    private String treatmentDate;    // 아직 진료 전이면 null
    private String receiptStatus;    // '접수완료'/'진료중'/'완료' 등 DB 한글값
    private String symptoms;         // register_s
    private String treatmentItem;
    private String spaceNumber;
    // ── 담당의/진료과 (미배정이면 null) ──
    private String doctorName;
    private String departmentName;
    private String visitType; // 예약 구분
    // ── 금액 ──
    private Integer totalFee;
}
