package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateMedicalRecordRequestVO {
    private String medicalNumber;
    private String diagnosisName;
}
