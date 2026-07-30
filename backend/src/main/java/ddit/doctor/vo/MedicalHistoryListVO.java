package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*진료이력목록*/

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalHistoryListVO {
    private String medicalNumber;        // 접수번호 (RECEPTIONIST_REGISTER PK)
    private String medicalRecordNumber;  // 진료기록번호
    private String memberName;
    private String birthDate;
    private int age;
    private String gender;
    private String treatmentDate;        // 진료일시
    private String diagnosisName;        // 진료기록명 (예: "우측 요골 원위부 골절 (Rt. Wrist...)")
    private String recordStartDate;
}
