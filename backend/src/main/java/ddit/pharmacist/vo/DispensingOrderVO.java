package ddit.pharmacist.vo;

import lombok.Data;

// 조제 목록 조회 VO
// MEDICAL_NUMBER 기준으로 그룹핑된 처방 1건을 나타냄
// DOCTOR_PRESCRIPTION + RECEPTIONIST_REGISTER + MEMBER(환자/의사) + EMPLOYEE + DEPARTMENT JOIN 결과
@Data
public class DispensingOrderVO
{
    private String medicalNumber;           // MEDICAL_NUMBER                          - 진료번호 (그룹핑 기준)
    private String patientName;             // MEMBER.MEMBER_NAME (환자)                - 환자명
    private String residentNumber;          // MEMBER.RESIDENT_REGISTRATION_NUMBER     - 주민번호
    private String employeeName;            // MEMBER.MEMBER_NAME (의사)                - 처방의명
    private String deptName;                // DEPARTMENT.DEPARTMENT_NAME              - 진료과명
    private String prescriptionDate;        // TO_CHAR(MIN(PRESCRIPTION_DATE))         - 처방일시
    private String orderName;               //                                         - 대표약품명 + 외 N건 (쿼리에서 가공)
    private String medicineRoute;           // COMMONCODE(C).CODENAME_2 (대표약품 기준)   - 투여경로 (경구/외용/흡입, null=미분류)
    private String dispenseCompletedDate;   // TO_CHAR(MAX(DISPENSE_COMPLETED_DATE))   - 조제완료일시 (대기중이면 null)
    private String prescriptionStatus;      // DOCTOR_PRESCRIPTION.PRESCRIPTION_STATUS - 처방상태 (N/Y)
}