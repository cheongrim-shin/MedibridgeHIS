package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRevenueVO {
    private String month;      // "01", "02", ... "12"
    private double revenue;    // 그 달의 매출 합계
}
