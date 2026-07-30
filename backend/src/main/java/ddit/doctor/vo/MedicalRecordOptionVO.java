package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*진료기록*/

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordOptionVO {
    private String medicalRecordNumber;
    private String diagnosisName;
    private String startDate;
    private String recordStatus;
}
