package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WaitingListVO {
    private String medicalNumber;
    private String memberName;
    private String birthDate;
    private int age;
    private String gender;
    private String receiptDate;     // 접수(호출) 시각
    private String receiptStatus;
    private String diagnosisName;   // 이 환자의 가장 최근 진료기록 진단명 (없으면 null)
}
