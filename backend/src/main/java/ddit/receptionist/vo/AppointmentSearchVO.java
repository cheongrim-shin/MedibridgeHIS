package ddit.receptionist.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;


@Data
public class AppointmentSearchVO {

	/**
	 * 조회 시작일 'YYYY-MM-DD' (필수)
	 * FullCalendar가 뷰를 바꿀 때마다 현재 보이는 구간의 시작일을 보내준다.
	 */
	@NotBlank(message = "조회 시작일은 필수입니다.")
	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$",
	         message = "조회 시작일 형식이 올바르지 않습니다(YYYY-MM-DD).")
	private String fromDate;

	/**
	 * 조회 종료일 'YYYY-MM-DD' (필수)
	 * 쿼리에서 +1일 하여 '<' 비교하므로, 이 날짜 당일까지 포함된다.
	 */
	@NotBlank(message = "조회 종료일은 필수입니다.")
	@Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$",
	         message = "조회 종료일 형식이 올바르지 않습니다(YYYY-MM-DD).")
	private String toDate;

	/**
	 * 담당의 번호 (선택)
	 * null 또는 빈 문자열이면 XML의 <if> 조건이 false가 되어 전체 의사를 조회한다.
	 * 캘린더 상단 드롭다운에서 특정 의사를 고르면 이 값이 채워진다.
	 */
	private String doctorNumber;
}
