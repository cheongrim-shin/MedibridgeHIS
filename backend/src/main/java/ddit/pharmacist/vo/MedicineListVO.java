package ddit.pharmacist.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

/** [약품 목록 조회 VO]
 *
 * MedicineVO(코드값)를 상속받아 PK, 외래키 코드값, 단가/재고 등 기본 필드는 그대로 사용
 * 목록 화면(GET /api/medicines)에서 COMMONCODE 테이블과 JOIN해서 얻은 "코드명(텍스트)"만 추가로 담음
 * 오직 selectMedicineList() 결과에서만 값이 채워짐
 */
@Data
@EqualsAndHashCode(callSuper = true)  // 부모 필드까지 equals/hashCode에 포함
public class MedicineListVO extends MedicineVO
{
    private String medicineCategoryName;   // COMMONCODE(C).CODENAME_1 - 약효분류명
    private String unitName;               // COMMONCODE(U).CODENAME_1 - 단위명
}
