package ddit.physicalTherapist.vo;

import lombok.Data;

@Data
public class TherapyHistoryVO {

	private String treatmentDate;  // 치료일 'YYYY-MM-DD' (완료 전 기록이면 시작시각 날짜로 대체)
    private String treatmentItemName;       // 치료 항목명 (예: 온습포(Hot Pack))
    private String therapyType;    // 치료 구분 — 서비스에서 한글→코드 변환됨 (GENERAL/TRACTION)
    private String treatmentStatus;         // 치료 상태 — 서비스에서 한글→코드 변환됨 (DONE 등)
}
