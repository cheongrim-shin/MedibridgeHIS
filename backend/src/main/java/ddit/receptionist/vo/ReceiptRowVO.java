package ddit.receptionist.vo;

import lombok.Data;


@Data
public class ReceiptRowVO {

	private String medicalNumber;   // 접수번호 (PK, 'R00011' 형태)
	private int dailySequence;
    private String receiptDate;     // 접수일시 ISO 문자열 (TO_CHAR 변환 결과)
    private String memberName;            // 환자명
    private String birthDate;       // 주민번호 앞 6자리 (YYMMDD)
    private String gender;          // '남'/'여' (CASE 파생)
    private String memberPhoneNumber;
    private String receiptStatus;   // 접수 상태 (DB 한글값 → 서비스에서 코드 변환 예정)
    private String memberNumber;   // 환자번호
    private String spaceNumber;    // 진료실
    private String employeeName;    // 담당의 이름 (미배정이면 null — LEFT JOIN)
    private String departmentName;        // 진료과명 (미배정이면 null)
    private Integer totalFee;       // 수납 합계 (수납 전 null — Integer라서 null 허용)
}
