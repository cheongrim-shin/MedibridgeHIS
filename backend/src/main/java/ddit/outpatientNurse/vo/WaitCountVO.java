package ddit.outpatientNurse.vo;

import lombok.Data;

@Data
public class WaitCountVO {
    private long waitingCnt;   /*대기*/
    private long treatingCnt;  /*입장*/
    private long holdCnt;      /*보류*/
}
