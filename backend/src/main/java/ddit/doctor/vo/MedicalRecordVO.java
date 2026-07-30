package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordVO {
    private String medicalRecordNumber;   // 진료기록번호 (예: MR0001)
    private String memberNumber;          // 환자 회원번호 (FK -> MEMBER)
    private String diagnosisName;         // 진단명
    private String startDate;             // 시작일
    private String recordStatus;          // 진행중 / 종료
}
