package ddit.physicalTherapist.vo;

import java.util.Date;

import lombok.Data;

@Data
public class BedVO {

	private String bedCode; /* 배드 코드(PK) */
	private String therapyType; /* 치료 분류 */
	private String bedStatus; /* 배드 사용 상태(공석/사용중 등) */
	private Integer treatmentNumber; /* 치료 기록 번호(PK) */
	private String endTime; /* 치료 종료 시각 */
	private String patientName; //환자 이름
	private String treatmentItemName; /* 치료 항목명 */
}

