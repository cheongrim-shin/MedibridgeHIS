package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgeGroupPatientCountVO {
    private String ageGroup;       // "10대", "20대", "30대" ...
    private int patientCount;
}
