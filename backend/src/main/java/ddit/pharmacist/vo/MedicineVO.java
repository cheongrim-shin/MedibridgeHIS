package ddit.pharmacist.vo;

import lombok.Data;

@Data
public class MedicineVO
{
    private String medicineCode;        // MEDICINE_CODE       - 약품코드 (PK, 서버가 시퀀스로 생성)
    private String itemSeq;             // ITEM_SEQ            - 식약처코드
    private String medicineCategory;    // MEDICINE_CATEGORY   - 공통코드(C그룹) 약효분류 코드값
    private String medicineName;        // MEDICINE_NAME       - COMMONCODE_NUMBER 값 (= medicineCode와 동일, 서버가 채움)
    private String manufacturer;        // MANUFACTURER        - 제조사
    private String specification;       // SPECIFICATION       - 규격
    private String ingredient;          // INGREDIENT          - 성분함량
    private String unit;                // UNIT                - 공통코드(U그룹) 단위 코드값
    private String coverageYn;          // COVERAGE_YN         - 급여구분 (Y/N, 텍스트)
    private int unitCost;               // UNIT_COST           - 단가
    private int insuranceFee;           // INSURANCE_FEE       - 수가
    private int contribution;           // CONTRIBUTION        - 공단부담금
    private int currentQuantity;        // CURRENT_QUANTITY    - 현재고
    private int minQuantity;            // MIN_QUANTITY        - 최소재고

    // 약품명 표시 텍스트 - MEDICINE 테이블 컬럼 아님 (COMMONCODE.CODENAME_1에 저장/조회)
    // 등록/수정 요청 시: 사용자가 입력한 텍스트를 받는 용도
    // 목록 조회 응답 시: JOIN된 텍스트가 채워짐 (MedicineListVO가 상속)
    private String medicineNameText;
}