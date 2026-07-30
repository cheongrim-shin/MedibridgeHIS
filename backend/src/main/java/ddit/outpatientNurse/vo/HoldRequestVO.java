package ddit.outpatientNurse.vo;

import lombok.Data;

@Data
public class HoldRequestVO {
    private String medicalNumber;
    private String holdReason;
    private String spaceNumber;
}
