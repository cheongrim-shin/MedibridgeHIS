package ddit.doctor.vo;
/*날짜별 SOAP 히스토리*/

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordDetailVO {
    private String medicalNumber;    // 이 SOAP이 기록된 방문 건
    private String treatmentDate;
    private String registerS;        // 주관적 증상
    private String registerO;        // 객관적 소견
    private String registerA;        // 평가/진단
    private String registerP;        // 계획/처치
}
