package ddit.receptionist.vo;

import lombok.Data;

@Data
public class PortOnePayment {

	private String status;        // 'PAID' 등
    private long   amountTotal;   // 실제 결제금액 (amount.total 에서 뽑음)
}
