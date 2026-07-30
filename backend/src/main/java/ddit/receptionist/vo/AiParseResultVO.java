package ddit.receptionist.vo;

import lombok.Data;

@Data
public class AiParseResultVO {

	private String doctorNumber;   // 의사 목록에서 고른 번호 (못 고르면 null)
    private String patientName;    // 환자'명' — 번호는 FE가 검색으로 확정
    private String reserveAt;      // 'yyyy-MM-dd HH:mm'
    private Integer durationMinutes;
    private String symptoms;
}
