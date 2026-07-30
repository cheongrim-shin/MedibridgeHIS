package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MedicineSearchVO {
    private String medicineCode;
    private String medicineName;
    private String specification;
    private String unit;       // 저장용 코드값 (U01, U02...) - 처방 추가할 때 이걸 그대로 씀
    private String unitLabel;  // 화면 표시 전용 (정, amp, ml...) - 검색결과 목록에 보여줄 때만 씀
    private double unitCost;
}
