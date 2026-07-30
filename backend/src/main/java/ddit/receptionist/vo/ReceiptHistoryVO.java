package ddit.receptionist.vo;

import lombok.Data;

@Data
public class ReceiptHistoryVO {

	private String medicalNumber;
    private String receiptDate;      // 'YYYY-MM-DD'
    private String doctorName;       // 담당의 (미배정 null)
    private String receiptStatus;    // 코드값(RS1xx)
    private String treatmentItem;    // register_p
}
