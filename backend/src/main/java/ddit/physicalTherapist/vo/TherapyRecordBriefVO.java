package ddit.physicalTherapist.vo;

import lombok.Data;

@Data
public class TherapyRecordBriefVO {

	private String therapyType;
	private String treatmentStatus;
	private String medicalNumber;   // 수납대기 전환 체크용
}
