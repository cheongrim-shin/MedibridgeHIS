package ddit.receptionist.vo;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class PaymentCreateVO {

	private Long   paymentNumber;   // selectKey가 채움 → 응답으로 반환

    @NotBlank(message = "접수번호는 필수입니다.")
    private String medicalNumber;

    @NotBlank(message = "결제수단은 필수입니다.")
    private String paymentType;     // '현금'/'카드'

    private Long   totalAmount;     // 서비스가 details 합계로 계산

    @Valid          // 리스트 내부 각 항목의 @NotBlank까지 검증
    @NotEmpty(message = "수납 항목이 최소 1개 필요합니다.")
    private List<PaymentDetailVO> details;
    
    private String paymentId;
}
