package ddit.receptionist.vo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiParseRequestVO {

	@NotBlank(message = "입력 문장이 비었습니다.")
    private String text;
}
