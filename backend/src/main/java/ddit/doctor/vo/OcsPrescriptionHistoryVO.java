package ddit.doctor.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*OCS 처방 이력 탭*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OcsPrescriptionHistoryVO {
    private String medicineName;
    private int totalQty;
    private int frequency;
    private String prescriptionDate;
    private int numberOfDaysAdministered;
    private String prescriptionStatus;
}
