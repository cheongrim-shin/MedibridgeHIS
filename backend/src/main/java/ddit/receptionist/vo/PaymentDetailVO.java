package ddit.receptionist.vo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PaymentDetailVO {

	private Long   paymentNumber;   // 마스터에서 채워 넣음
    private String medicalNumber;   // 서비스가 채움
    @NotBlank(message = "항목명은 필수입니다.")
    private String paymentDetailName;   // '진찰료' 등
    @NotBlank(message = "금액은 필수입니다.")
    private String amount;              // 문자열...
    private Integer lineNo;     // 몇 번째 항목인지
}
