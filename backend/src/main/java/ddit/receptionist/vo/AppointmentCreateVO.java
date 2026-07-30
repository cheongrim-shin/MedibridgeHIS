package ddit.receptionist.vo;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AppointmentCreateVO {

	private String appointmentNumber;   // 등록: selectKey가 채움
	
	@NotBlank(message="환자를 선택해 주세요")
	private String memberNumber;
	
	@NotBlank(message="담당의를 선택해 주세요")
	private String doctorNumber;
	
	@NotBlank(message="예약 일시를 선택해 주세요")
	@Pattern(regexp ="^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$", 
			 message="예약 일시 형식이 올바르지 않습니다(YYYY-MM-DD HH:MM).")
	private String reserveAt;           // '2026-07-20 09:30' — 날짜+슬롯 합친 값
	
	@Min(value = 10,  message = "진료 시간은 최소 10분입니다.")
	@Max(value = 240, message = "진료 시간은 최대 240분입니다.")
	private int durationMinutes = 30;
	
	private String symptoms;            // 선택
	private String color;
}
