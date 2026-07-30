package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PatientInfoVO {
    private String medicalNumber;
    private String memberNumber;
    private String memberName;
    private int age;
    private String gender;
}
