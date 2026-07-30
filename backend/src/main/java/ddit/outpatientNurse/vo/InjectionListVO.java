package ddit.outpatientNurse.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InjectionListVO {
    private String medicalNumber;           // 진료코드
    private String memberName;             // 환자명
    private String birthDate;               // 생일
    private String prescriptionDate;        // 처방일
    private String medicineName;           // 약품명
    private int medCnt;             // 같은 처방코드 갯수
    private int rn;                   // 같은 처방코드 갯수의 순서번호 중 1번째(대표)
    private int age;
    private String gender;
}
