package ddit.physicalTherapist.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TherapyStartVO {

	@NotBlank(message = "베드 코드는 필수입니다.")
	private String  bedCode;         // 배정 베드
	@NotNull(message ="치료기록번호는 필수입니다.")
    private Long    treatmentNumber; // 대기 환자 기록번호
    private Integer durationMin;     // 소요시간(분)
}
