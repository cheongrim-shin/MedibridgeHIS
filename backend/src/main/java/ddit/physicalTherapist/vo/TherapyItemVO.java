package ddit.physicalTherapist.vo;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class TherapyItemVO {
	@NotBlank(message = "항목 코드는 필수입니다.")
    @Pattern(regexp = "P\\d{2}", message = "코드는 P+숫자2자리 형식입니다. (예: P09)")
	private String  code;          // COMMONCODE_NUMBER (항목 코드 / PK)
	
	@NotBlank(message = "항목명은 필수 입니다.")
    private String  name;          // CODENAME_1        (치료 항목명)
	
    private String  type;          // CODENAME_2        (치료 구분: 일반치료/견인치료)
    
    @NotNull(message = "단가는 필수입니다.")
	@Min(value = 0, message = "단가는 0 이상이어야 합니다.")
    private Integer price;         // UNIT_PRICE        (단가)
	
    private String  coverageYn;    // 파생값            (급여 Y / 비급여 N)
    private Integer contribution;  // CONTRIBUTION      (본인 부담금)
    private String  used;          // USED              (Y=활성 / N=삭제됨)
} 
