package ddit.doctor.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequestVO {
    private String medicalNumber;
    private String receiveUse;
    private String documentContents;
    private String documentType;
}
