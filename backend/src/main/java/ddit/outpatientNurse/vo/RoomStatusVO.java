package ddit.outpatientNurse.vo;

import lombok.Data;

@Data
public class RoomStatusVO {
    private String spaceNumber;     // 진료실 번호
    private String standbyState;    // '입장' 또는 '완료' (원본 DB값)
    private String memberName;      // 환자명
    private Integer age;            // 나이
    private String gender;          // 성별

    // 추가
    private String medicalNumber;     /* 대기코드 */
    private int waitingTurnNumber;    /* 대기순번 */
    private String holdReason;        /* 보류사유 */

}
