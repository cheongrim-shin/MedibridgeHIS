package ddit.receptionist.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "rrn")
public class PatientVO {
	
   private String memberNumber;
   
   @NotBlank(message= "이름은 필수입니다.")
   private String memberName;
   
   @NotBlank(message = "연락처는 필수입니다.")
   private String memberPhoneNumber;
   
   @NotBlank(message = "주민등록번호는 필수입니다.")
   @Pattern(regexp = "^[0-9]{6}-?[0-9]{7}$", message = "주민등록번호 형식이 올바르지 않습니다.")
   private String rrn;
   
   private String address;
   private String detailAddress;
   private String postalCode;
   private String birthDate;           // 검색 결과 표시용 (파생)
   private String gender;    
}       
        