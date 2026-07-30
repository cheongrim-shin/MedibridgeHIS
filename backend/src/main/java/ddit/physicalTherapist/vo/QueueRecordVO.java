package ddit.physicalTherapist.vo;


import lombok.Data;

@Data
public class QueueRecordVO {

	private Long    treatmentNumber; // 치료기록번호(PK)
    private String  medicalNumber;   // 접수번호(FK)
    private String  therapyCategory; // DB '일반치료' → (서비스) → 'GENERAL'/'TRACTION'
    private String  status;          // DB '치료대기' → (서비스) → 'WAIT'/'IN_PROGRESS'/'DONE'
    private String  therapyItems;    // 치료명
    private String  receiptTime;     // ISO 문자열(접수일시)
    private String  receiptType;     // 서비스 기본 'WALK_IN'
    private String  name;            // 환자명
    private String  birthDate;       // 주민번호 앞6(YYMMDD)
    private String  gender;          // '남'/'여'
    private Integer durationMin;     // 소요시간(현재 null)
    private Integer sequence;        // 대기 순번(대기만)
    private String  doctorName;      // 담당의명
    private String  specialization;  // 진료과명
    private Integer estimatedWaitTime; // FE 재계산
    private Integer receivedCount;      // 이번 코스 완료 세션 수
    private Integer courseSeq;          // 이번 코스 내 회차(몇 번째)
    private String  lastTreatmentDate;  // 최근 치료일(YYYY-MM-DD, 없으면 null)
}
