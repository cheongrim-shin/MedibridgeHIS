package ddit.outpatientNurse.vo;

import lombok.Data;

@Data
public class WaitListVO {

    private String medicalNumber;       // 대기코드
    private String spaceNumber;         // 호실코드 (SPACE_NUMBER)
    private Integer waitingTurnNumber;  // 대기순번 (WAITING_TURN_NUMBER)
    private String expectedWaitingTime; // 예상대기시간 (EXPECTED_WAITING_TIME)
    private String standbyState;        // 대기상태 (STANDBY_STATE)

    private String memberName;          // 환자명
    private String birthDate;           // 생년월일 (BIRTH_DATE, SQL에서 가공됨)
    private Integer age;                // 나이 (AGE, SQL에서 계산됨)
    private String gender;              // 성별 (GENDER, SQL에서 계산됨)
    private String receiptType;         // 접수구분 (RECEIPT_TYPE - 예약/당일)
    private String receiptDate;         // 접수시간 (RECEIPT_DATE)
}
