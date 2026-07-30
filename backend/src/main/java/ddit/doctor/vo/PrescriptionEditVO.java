package ddit.doctor.vo;

import lombok.Data;

@Data
public class PrescriptionEditVO {
    private String qty;         // 의약품: 총 수량 / 주사: 용량
    private String frequency;   // 1일 횟수
    private String days;        // 의약품 전용 (주사는 안 씀, null로 와도 됨)
}