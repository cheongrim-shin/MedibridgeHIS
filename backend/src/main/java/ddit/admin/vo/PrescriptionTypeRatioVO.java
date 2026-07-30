package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionTypeRatioVO {
    private String category;   // "의약품" / "주사" / "물리치료"
    private long orderCount;      // 건수
}