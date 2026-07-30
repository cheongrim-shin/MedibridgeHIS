package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderSaveRequestVO {
    private String medicalNumber;
    private List<MedicineOrderItem> medicines;
    private List<InjectionOrderItem> injections;
    private List<TherapyOrderItem> therapies;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MedicineOrderItem {
        private String medicineCode;
        private String dosage;
        private String frequency;
        private String days;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InjectionOrderItem {
        private String medicineCode;
        private String dosage;
        private String unit;
        private String frequency;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TherapyOrderItem {
        private String commonCodeNumber;
        private String codeName1;
        private String codeName2;
    }
}
