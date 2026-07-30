package ddit.receptionist.vo;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReceiptCreateVO {

	private String medicalNumber;      // selectKey가 채움 → 응답으로 반환
    private String memberNumber;       // 선택한 기존환자 번호

    @Valid                             // 중첩 객체 내부의 @NotBlank까지 검증하려면 필수
    private PatientVO newPatient;      // 신규환자 인적사항

    @NotBlank(message = "담당의는 필수입니다.")
    private String doctorNumber;

    private String symptoms;           // 증상 메모 → REGISTER_S(SOAP-S)
    private String spaceNumber;
}
