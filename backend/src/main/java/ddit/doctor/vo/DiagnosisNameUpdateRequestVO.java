package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosisNameUpdateRequestVO {
    private String medicalRecordNumber;
    private String diagnosisName;
}
