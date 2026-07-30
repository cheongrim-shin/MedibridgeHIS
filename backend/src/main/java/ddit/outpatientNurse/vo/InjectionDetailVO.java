package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InjectionDetailVO {
    private String medicalNumber;
    private String memberName;            // 환자명
    private String birthDate;             // 생일
    private String prescriptionDate;      // 처방일시 (오더일시)
    private String medicineName;          // 약품명 (주사명)
    private String dosage;                // 복용량
    private String unit;                  // 단위
    private String frequency;             // 빈도
    private int age;
    private String gender;

    private String doctorName;            // ★새로 추가: 오더내린 의사 이름
    private String diagnosisName;         // ★새로 추가: 상병명(진단명)
}
