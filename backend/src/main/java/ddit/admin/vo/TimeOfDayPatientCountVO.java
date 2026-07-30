package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeOfDayPatientCountVO {
    private String timeSlot;       // "오전", "오후"
    private int patientCount;
}
