package ddit.admin.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopPrescriptionItemVO {
    private String itemName;   // 약품명/치료항목명 (실제 이름)
    private String category;   // "의약품" / "주사" / "물리치료"
    private long itemCount;        // 처방된 횟수
}