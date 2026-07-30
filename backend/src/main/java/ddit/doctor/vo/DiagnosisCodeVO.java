package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosisCodeVO {
    private String sickCd;    // 상병코드
    private String sickNm;    // 상병명(한글)
    private String sickEngNm; // 상병명(영문)
}
