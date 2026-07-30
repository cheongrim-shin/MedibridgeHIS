package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopDiagnosisVO {
    private String diagnosisName;  // 상병명(진단명)
    private long diagnosisCount;        // 건수
}