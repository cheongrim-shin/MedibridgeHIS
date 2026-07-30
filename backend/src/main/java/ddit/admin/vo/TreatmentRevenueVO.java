package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TreatmentRevenueVO {
    private String category;   // "약물처방", "주사", "물리치료"
    private double amount;     // 그 카테고리의 매출 추정치
}
