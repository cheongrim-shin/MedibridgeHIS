package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeOfDayRevenueVO {
    private String timeSlot;   // "오전" / "오후"
    private double revenue;    // 그 시간대의 매출 합계
}