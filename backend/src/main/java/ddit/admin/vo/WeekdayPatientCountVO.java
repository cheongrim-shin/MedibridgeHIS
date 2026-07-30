package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeekdayPatientCountVO {
    private String dayOfWeek;      // "월", "화", "수", "목", "금", "토", "일"
    private int patientCount;
}
