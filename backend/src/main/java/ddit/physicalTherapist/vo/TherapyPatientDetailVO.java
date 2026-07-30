package ddit.physicalTherapist.vo;

import java.util.List;

import lombok.Data;

@Data
public class TherapyPatientDetailVO {

	
	private Integer receivedCount;      // 받은 횟수(완료 세션 수)
    private Integer courseSeq;          // 이번 코스 회차(몇 번째)
    private String  lastTreatmentDate;  // 최근 치료일(YYYY-MM-DD, 없으면 null)
    private String  doctorName;         // 담당의
    private String  specialization;     // 진료과
    
    private String memberPhoneNumber;                     // [②추가] 환자 연락처 (MEMBER 테이블, 없으면 null)
    private List<TherapyHistoryVO> history; 
}
