package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InjectionHistoryListVO {
        private String medicalNumber;
        private String memberName;
        private String birthDate;
        private int age;
        private String gender;
        private String injectionDate;   // 실제 주사 완료 일시
        private String medicineName;    // 대표 약품명
        private int medCnt;
}
