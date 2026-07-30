package ddit.receptionist.vo;

import lombok.Data;

@Data
public class DocumentRowVO {

	private Long   receiveNumber;
    private String medicalNumber;
    private String memberName;        // 환자명(조인)
    private String documentContents;  
    private String documentType; // 서류종류
    private String receiveUse;
    private String receiveDate;       // YYYY-MM-DD
    private String receiveState;      // 접수/발급완료
    private Integer unitPrice;        // 단가(공통코드)
    private String diagnosis; 
    private String doctorName;
    private String birthDate;       // 'YYMMDD'
    private String phone;
    private String address;
    private String treatmentDate;   // 진단일
    private String treatmentPlan;   // 치료내용 및 향후 소견
}
