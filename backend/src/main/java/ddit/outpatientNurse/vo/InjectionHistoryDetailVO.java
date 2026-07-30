package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InjectionHistoryDetailVO {
    private String memberName;
    private String birthDate;
    private int age;
    private String gender;
    private String injectionDate;
    private String medicineName;
    private String dosage;
    private String unit;
    private String frequency;
    private String medicalNumber;

    private String doctorName;            // ★새로 추가: 오더내린 의사 이름
    private String diagnosisName;         // ★새로 추가: 상병명(진단명)
}
