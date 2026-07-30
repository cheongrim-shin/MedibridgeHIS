package ddit.pharmacist.vo;

import lombok.Data;

// 조제 처방 상세 VO
// MEDICAL_NUMBER 의 약품 목록
// DOCTOR_PRESCRIPTION + MEDICINE + COMMONCODE JOIN
@Data
public class DispensingDetailVO
{
    private String medicalNumber;            // MEDICAL_NUMBER                - 진료번호 (복합키 일부)
    private String medicineCode;             // MEDICINE_CODE                 - 약품코드 (복합키 일부)
    private String medicineName;             // COMMONCODE(M).CODENAME_1      - 약품명 텍스트
    private String medicineCategoryName;     // COMMONCODE(C).CODENAME_1      - 약효분류명
    private String medicineRoute;            // COMMONCODE(C).CODENAME_2      - 투여경로 (경구/외용/흡입, null=미분류)
    private String dispenseCompletedDate;    // DISPENSE_COMPLETED_DATE       - 조제완료일시 (대기중이면 null)
    private int currentQuantity;             // MEDICINE.CURRENT_QUANTITY     - 현재 재고 수량
    private int minQuantity;                 // MEDICINE.MIN_QUANTITY         - 최소 재고 기준 수량
    private int totalQty;                    // TOTAL_QTY                     - 1회 투약량
    private int frequency;                   // FREQUENCY                     - 1일 횟수
    private int numberOfDaysAdministered;    // NUMBER_OF_DAYS_ADMINISTERED   - 투약일수
    private String prescriptionStatus;       // PRESCRIPTION_STATUS           - 처방상태 (N/Y)

}