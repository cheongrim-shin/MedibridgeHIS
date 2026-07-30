package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*검색 조건(기간, 환자명/생년월일 키워드)*/

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalHistorySearchVO {
    private String startDate;
    private String endDate;
    private String keyword;
}
