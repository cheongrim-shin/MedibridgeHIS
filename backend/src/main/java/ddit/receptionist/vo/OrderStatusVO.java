package ddit.receptionist.vo;

import lombok.Data;

@Data
public class OrderStatusVO {

	private String part;         // 약제 / 주사 / 물리치료
    private String itemName;     // 항목명
    private String statusLabel;  // 조제완료 / 미시행 / 치료중 ...
    private String doneYn;       // Y=완료, N=미완료
}
