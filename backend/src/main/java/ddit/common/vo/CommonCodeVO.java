package ddit.common.vo;

import lombok.Data;

@Data
public class CommonCodeVO
{
    private String commonCodeNumber;    // COMMONCODE_NUMBER    - 코드번호 (PK, 예: 'M01')
    private String commonCode;          // COMMONCODE           - 그룹문자 (예: 'M')
    private String jointCodeGroupName;  // JOINT_CODE_GROUP_NAME - 그룹명
    private String codeName1;           // CODENAME_1            - 코드명1 (드롭다운 표시 텍스트)
    private String codeName2;           // CODENAME_2            - 코드명2
    private double unitPrice;           // UNIT_PRICE            - 단가
    private String used;                // USED                  - 사용여부 (Y/N)
    private double contribution;        // CONTRIBUTION          - 본인부담금
}