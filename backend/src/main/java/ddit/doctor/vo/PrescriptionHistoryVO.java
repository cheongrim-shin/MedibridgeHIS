package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionHistoryVO {
    private String prescriptionType;   // "의약품" / "주사" / "물리치료"
    private String itemName;
    private String detail;             // 용법/용량 등을 한 줄로 정리한 텍스트
    private String prescriptionDate;
    private String status;

    // 아래부터는 수정/삭제할 때 "이 처방 하나"를 정확히 찾기 위한 식별자들
    private String medicalNumber;      // 의약품/주사용 식별자 ①
    private String medicineCode;       // 의약품/주사용 식별자 ②
    private Long treatmentNumber;      // 물리치료용 식별자 (PK)

    // 수정 폼에 채워 넣을 원본 숫자값들 (detail 문자열은 화면 표시용이라 그대로 두고, 수정할 땐 이 값들을 씀)
    private String qty;         // 의약품: 총 수량(TOTAL_QTY) / 주사: 용량(DOSAGE)
    private String unit;        // 주사 전용: 단위 (실제 텍스트, 예: "정"/"amp")
    private String frequency;   // 의약품/주사 공통: 1일 횟수
    private String days;        // 의약품 전용: 총 투여일수

    private boolean editable;   // 아직 처리 안 된 상태인지 (true면 수정/삭제 버튼 노출)
}
