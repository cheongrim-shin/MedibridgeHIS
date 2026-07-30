package ddit.physicalTherapist.vo;

import lombok.Data;

@Data
public class TherapyDurationVO {
	private String  therapyType;  // DB '일반치료'/'견인치료'
    private Integer avgMin;       // 평균 소요(분), 데이터 없으면 null
}
