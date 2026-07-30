package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiSummaryRequestVO {
    private List<MedicalRecordDetailVO> records; // 요약할 SOAP 기록 목록
}
