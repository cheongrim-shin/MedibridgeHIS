package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeasonalPatientCountVO {
    private String season;        // "봄", "여름", "가을", "겨울"
    private int patientCount;     // 그 계절의 접수(방문) 건수
}
