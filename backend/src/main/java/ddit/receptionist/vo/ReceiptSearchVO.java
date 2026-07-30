package ddit.receptionist.vo;

import lombok.Data;

@Data
public class ReceiptSearchVO {

	private String status;        // 접수 상태 필터 (선택)
    private String doctorNumber;  // 담당의 필터 (선택)
    private String keyword;  // 환자명/접수번호 검색어 (선택)
    private String fromDate;
    private String toDate;
}
