package ddit.receptionist.vo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiTextRequestVO {

	@NotBlank(message = "정리할 내용이 없습니다.")
    private String text;
}
