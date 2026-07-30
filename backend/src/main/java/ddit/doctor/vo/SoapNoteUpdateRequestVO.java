package ddit.doctor.vo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*SOAP 저장 요청*/

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SoapNoteUpdateRequestVO {
    private String medicalNumber;
    private String medicalRecordNumber;  // 신규 진료기록으로 저장할 경우도 있어서 같이 받음
    private String registerS;
    private String registerO;
    private String registerA;
    private String registerP;
    private boolean treatmentEnd;
}
