package ddit.patient.controller;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import ddit.login.security.CustomUserDetails;
import ddit.patient.service.PatientReservationService;
import ddit.patient.vo.PatientReservationVO;

/*
 * 환자포털 예약 Controller
 *
 * 역할:
 * - 예약 목록 조회
 * - 예약 상세 조회
 * - 예약 신청
 * - 예약 변경
 * - 예약 취소
 *
 * 보안 기준:
 * - URL이나 hidden 값으로 MEMBER_NUMBER를 받지 않는다.
 * - Spring Security 로그인 사용자의 MEMBER_NUMBER를 사용한다.
 *
 * 화면 기준:
 * - 예약 변경은 별도 페이지로 이동하지 않는다.
 * - 예약 상세 화면 안에서 날짜·시간을 다시 선택한다.
 */
@Controller
@RequestMapping("/patient")
public class PatientReservationController {

	private static final String DUPLICATE_RESERVATION_MESSAGE =
			"이미 예약된 시간입니다.";

	private final PatientReservationService patientReservationService;

	public PatientReservationController(
			PatientReservationService patientReservationService) {

		this.patientReservationService =
				patientReservationService;
	}

	/*
	 * 로그인 사용자의 MEMBER_NUMBER 추출
	 */
	private String getLoginMemberNumber(
			CustomUserDetails loginUser) {

		if (loginUser == null
				|| loginUser.getMember() == null
				|| loginUser.getMember().getMemberNumber() == null
				|| loginUser.getMember().getMemberNumber().isBlank()) {

			throw new IllegalStateException(
					"로그인 사용자 정보가 없습니다."
			);
		}

		return loginUser
				.getMember()
				.getMemberNumber();
	}

	/*
	 * 예약번호 파라미터 이름 호환 처리
	 *
	 * 현재 기준:
	 * - appointmentNumber
	 *
	 * 기존 코드 호환:
	 * - reservationsNumber
	 * - reservationNo
	 */
	private String resolveAppointmentNumber(
			String appointmentNumber,
			String reservationsNumber,
			String reservationNo) {

		if (appointmentNumber == null
				|| appointmentNumber.isBlank()) {

			appointmentNumber =
					reservationsNumber;
		}

		if (appointmentNumber == null
				|| appointmentNumber.isBlank()) {

			appointmentNumber =
					reservationNo;
		}

		if (appointmentNumber != null) {

			appointmentNumber =
					appointmentNumber.trim();
		}

		return appointmentNumber;
	}

	/*
	 * 예약 목록
	 *
	 * GET /patient/reservation/list
	 */
	@GetMapping("/reservation/list")
	public String reservationList(
			Model model,

			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		/*
		 * 기존 JSP 호환용 모델 속성이다.
		 * URL이나 hidden으로 회원번호를 전달하는 것은 아니다.
		 */
		model.addAttribute(
				"memberNumber",
				memberNumber
		);

		model.addAttribute(
				"patientNumber",
				memberNumber
		);

		model.addAttribute(
				"patientNo",
				memberNumber
		);

		model.addAttribute(
				"reservationList",
				patientReservationService
						.selectReservationList(
								memberNumber
						)
		);

		return "patient/reservation/list";
	}

	/*
	 * 예약 상세
	 *
	 * GET /patient/reservation/detail?appointmentNumber=A0005
	 */
	@GetMapping("/reservation/detail")
	public String reservationDetail(
			@RequestParam(required = false)
			String appointmentNumber,

			@RequestParam(required = false)
			String reservationsNumber,

			@RequestParam(required = false)
			String reservationNo,

			Model model,
			RedirectAttributes redirectAttributes,

			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		appointmentNumber =
				resolveAppointmentNumber(
						appointmentNumber,
						reservationsNumber,
						reservationNo
				);

		if (appointmentNumber == null
				|| appointmentNumber.isBlank()) {

			redirectAttributes.addFlashAttribute(
					"message",
					"예약번호가 올바르지 않습니다."
			);

			return "redirect:/patient/reservation/list";
		}

		/*
		 * 예약번호와 로그인 회원번호를 함께 조건으로 조회한다.
		 * 다른 환자의 예약번호를 입력해도 조회되지 않는다.
		 */
		PatientReservationVO reservation =
				patientReservationService
						.selectReservationDetail(
								appointmentNumber,
								memberNumber
						);

		if (reservation == null) {

			redirectAttributes.addFlashAttribute(
					"message",
					"예약 정보를 찾을 수 없습니다."
			);

			return "redirect:/patient/reservation/list";
		}

		model.addAttribute(
				"memberNumber",
				memberNumber
		);

		model.addAttribute(
				"patientNumber",
				memberNumber
		);

		model.addAttribute(
				"patientNo",
				memberNumber
		);

		model.addAttribute(
				"appointmentNumber",
				appointmentNumber
		);

		model.addAttribute(
				"reservationsNumber",
				appointmentNumber
		);

		model.addAttribute(
				"reservationNo",
				appointmentNumber
		);

		model.addAttribute(
				"reservation",
				reservation
		);

		return "patient/reservation/detail";
	}

	/*
	 * 예약 신청 화면
	 *
	 * GET /patient/reservation/form
	 */
	@GetMapping("/reservation/form")
	public String reservationForm(
			Model model,

			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		model.addAttribute(
				"memberNumber",
				memberNumber
		);

		model.addAttribute(
				"patientNumber",
				memberNumber
		);

		model.addAttribute(
				"patientNo",
				memberNumber
		);

		model.addAttribute(
				"departmentList",
				patientReservationService
						.selectDepartmentList()
		);

		/*
		 * 의료진 목록은 진료과 선택 후
		 * REST API를 통해 비동기로 조회한다.
		 *
		 * 기존 doctorList 전체 조회는 제거한다.
		 */
		return "patient/reservation/form";
	}

	/*
	 * 예약 신청 처리
	 *
	 * POST /patient/reservation/insert
	 */
	@PostMapping("/reservation/insert")
	public String insertReservation(
			@RequestParam(required = false)
			String deptCode,

			@RequestParam(required = false)
			String employeeCode,

			@RequestParam(required = false)
			String attendingPhysician,

			@RequestParam(required = false)
			String symptoms,

			@RequestParam(required = false)
			@DateTimeFormat(
					pattern = "yyyy-MM-dd'T'HH:mm"
			)
			Date reservedAt,

			RedirectAttributes redirectAttributes,

			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		/*
		 * 기존 화면의 employeeCode와
		 * APPOINTMENT.ATTENDING_PHYSICIAN을 호환한다.
		 */
		if (attendingPhysician == null
				|| attendingPhysician.isBlank()) {

			attendingPhysician =
					employeeCode;
		}

		if (attendingPhysician == null
				|| attendingPhysician.isBlank()
				|| reservedAt == null) {

			redirectAttributes.addFlashAttribute(
					"message",
					"의료진과 예약 희망 일시를 선택해 주세요."
			);

			return "redirect:/patient/reservation/form";
		}

		PatientReservationVO reservation =
				new PatientReservationVO();

		reservation.setMemberNumber(
				memberNumber
		);

		reservation.setEmployeeCode(
				attendingPhysician
		);

		reservation.setDeptCode(
				deptCode
		);

		reservation.setReservedAt(
				reservedAt
		);

		reservation.setSymptoms(
				symptoms
		);

		try {

			patientReservationService
					.insertReservation(
							reservation
					);

			redirectAttributes.addFlashAttribute(
					"message",
					"예약 신청이 완료되었습니다."
			);

			return "redirect:/patient/reservation/list";

		} catch (
				IllegalArgumentException
					| IllegalStateException e
		) {

			String errorMessage =
					e.getMessage();

			/*
			 * 이미 예약된 시간인 경우에는
			 * 예약 화면에서 alert 팝업으로 표시한다.
			 */
			if (DUPLICATE_RESERVATION_MESSAGE
					.equals(errorMessage)) {

				redirectAttributes.addFlashAttribute(
						"alertMessage",
						errorMessage
				);

			} else {

				/*
				 * 그 외 일반 검증 오류는
				 * 기존처럼 화면 내부 메시지로 표시한다.
				 */
				redirectAttributes.addFlashAttribute(
						"message",
						errorMessage
				);
			}

			return "redirect:/patient/reservation/form";
		}
	}

	/*
	 * 예약 일시 변경
	 *
	 * POST /patient/reservation/change
	 *
	 * 별도의 변경 화면을 사용하지 않는다.
	 * detail.jsp 안의 예약 변경 form에서 요청한다.
	 */
	@PostMapping("/reservation/change")
	public String updateReservationTime(
			@RequestParam(required = false)
			String appointmentNumber,

			@RequestParam(required = false)
			String reservationsNumber,

			@RequestParam(required = false)
			String reservationNo,

			@RequestParam(required = false)
			@DateTimeFormat(
					pattern = "yyyy-MM-dd'T'HH:mm"
			)
			Date reservedAt,

			RedirectAttributes redirectAttributes,

			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		appointmentNumber =
				resolveAppointmentNumber(
						appointmentNumber,
						reservationsNumber,
						reservationNo
				);

		if (appointmentNumber == null
				|| appointmentNumber.isBlank()) {

			redirectAttributes.addFlashAttribute(
					"message",
					"변경할 예약번호가 없습니다."
			);

			return "redirect:/patient/reservation/list";
		}

		if (reservedAt == null) {

			redirectAttributes.addFlashAttribute(
					"message",
					"변경할 예약 날짜와 시간을 선택해 주세요."
			);

			return "redirect:/patient/reservation/detail"
					+ "?appointmentNumber="
					+ appointmentNumber
					+ "&changeOpen=true";
		}

		try {

			patientReservationService
					.updateReservationTime(
							appointmentNumber,
							memberNumber,
							reservedAt
					);

			redirectAttributes.addFlashAttribute(
					"message",
					"예약 일시가 변경되었습니다."
			);

			return "redirect:/patient/reservation/detail"
					+ "?appointmentNumber="
					+ appointmentNumber;

		} catch (
				IllegalArgumentException
					| IllegalStateException e
		) {

			redirectAttributes.addFlashAttribute(
					"message",
					e.getMessage()
			);

			/*
			 * 오류가 발생하면 상세 화면으로 돌아가면서
			 * 예약 변경 영역을 다시 열어 준다.
			 */
			return "redirect:/patient/reservation/detail"
					+ "?appointmentNumber="
					+ appointmentNumber
					+ "&changeOpen=true";
		}
	}

	/*
	 * 예약 취소
	 *
	 * POST /patient/reservation/cancel
	 */
	@PostMapping("/reservation/cancel")
	public String cancelReservation(
			@RequestParam(required = false)
			String appointmentNumber,

			@RequestParam(required = false)
			String reservationsNumber,

			@RequestParam(required = false)
			String reservationNo,

			RedirectAttributes redirectAttributes,

			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		appointmentNumber =
				resolveAppointmentNumber(
						appointmentNumber,
						reservationsNumber,
						reservationNo
				);

		if (appointmentNumber == null
				|| appointmentNumber.isBlank()) {

			redirectAttributes.addFlashAttribute(
					"message",
					"취소할 예약 정보가 없습니다."
			);

			return "redirect:/patient/reservation/list";
		}

		try {

			int result =
					patientReservationService
							.cancelReservation(
									appointmentNumber,
									memberNumber
							);

			if (result == 1) {

				redirectAttributes.addFlashAttribute(
						"message",
						"예약이 취소되었습니다."
				);

			} else {

				redirectAttributes.addFlashAttribute(
						"message",
						"이미 취소되었거나 존재하지 않는 예약입니다."
				);
			}

		} catch (
				IllegalArgumentException
					| IllegalStateException e
		) {

			redirectAttributes.addFlashAttribute(
					"message",
					e.getMessage()
			);
		}

		return "redirect:/patient/reservation/list";
	}
}