package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*진료하기 버튼요청*/

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CallPatientRequestVO {
    private String medicalNumber;
}
