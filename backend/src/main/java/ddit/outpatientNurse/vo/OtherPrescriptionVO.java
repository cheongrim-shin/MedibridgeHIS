package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OtherPrescriptionVO {
    private String medicineName;              // 약품명
    private int totalQty;                     // 총 처방량
    private int frequency;                    // 투약 횟수/빈도
    private String prescriptionDate;           // 처방일시
    private int numberOfDaysAdministered;      // 투약일수
    private String prescriptionStatus;          // 처방상태
}
