package ddit.outpatientNurse.vo;

import lombok.Data;

@Data
public class HoldListVO {
    private String medicalNumber;
    private String spaceNumber;
    private String holdReason;
    private String memberName;
    private int age;
    private String gender;
}
