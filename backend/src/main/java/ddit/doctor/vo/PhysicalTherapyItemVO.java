package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PhysicalTherapyItemVO {
    private String commonCodeNumber;
    private String codeName1;
    private String codeName2;
    private double unitPrice;
}
