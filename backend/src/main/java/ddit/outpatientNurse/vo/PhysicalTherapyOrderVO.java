package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalTherapyOrderVO {
    private String treatmentItemName;   // 치료항목명
    private String therapyType;   // 치료구분
    private String treatmentStatus;     // 치료상태
    private String dateOfTreatment;     // 치료일자
    private String treatmentStartTime;  // 시작시간
    private String treatmentEndTime;    // 종료시간
}
