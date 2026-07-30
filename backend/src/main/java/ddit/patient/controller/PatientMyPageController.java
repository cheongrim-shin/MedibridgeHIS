package ddit.patient.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ddit.login.security.CustomUserDetails;
import ddit.patient.service.PatientMyPageService;
import ddit.patient.vo.PatientMyPageVO;

/*
 * 환자포털 마이페이지 Controller
 *
 * 현재 DB 기준:
 * - PATIENT_NUMBER가 아니라 MEMBER_NUMBER 기준으로 조회한다.
 *
 * 보안 기준:
 * - URL에서 memberNumber, patientNumber, patientNo를 받지 않는다.
 * - Spring Security 로그인 사용자의 MEMBER_NUMBER를 사용한다.
 * - 진료이력 상세는 진료번호와 로그인 회원번호를 함께 조회한다.
 */
@Controller
@RequestMapping("/patient")
public class PatientMyPageController {

	private final PatientMyPageService patientMyPageService;

	public PatientMyPageController(
			PatientMyPageService patientMyPageService) {

		this.patientMyPageService = patientMyPageService;
	}

	/*
	 * 로그인 사용자의 MEMBER_NUMBER 추출
	 */
	private String getLoginMemberNumber(
			CustomUserDetails loginUser) {

		if (loginUser == null
				|| loginUser.getMember() == null
				|| loginUser.getMember().getMemberNumber() == null
				|| loginUser.getMember()
						.getMemberNumber()
						.isBlank()) {

			throw new IllegalStateException(
					"로그인 사용자 정보가 없습니다.");
		}

		return loginUser.getMember().getMemberNumber();
	}

	/*
	 * 마이페이지
	 *
	 * GET /patient/mypage
	 * GET /patient/mypage?tab=history
	 * GET /patient/mypage?tab=profile
	 */
	@GetMapping("/mypage")
	public String mypage(
			@RequestParam(
					required = false,
					defaultValue = "home")
			String tab,
			Model model,
			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		/*
		 * URL 파라미터가 아니라
		 * 로그인 사용자 정보에서 회원번호를 가져온다.
		 */
		String memberNumber =
				getLoginMemberNumber(loginUser);

		/*
		 * 허용된 탭만 사용한다.
		 *
		 * 사용자가 임의의 tab 값을 입력하면
		 * home 탭으로 보정한다.
		 */
		if (!"home".equals(tab)
				&& !"history".equals(tab)
				&& !"profile".equals(tab)) {

			tab = "home";
		}

		model.addAttribute("tab", tab);

		/*
		 * 기존 JSP 호환용 model 속성이다.
		 *
		 * URL이나 hidden 값에서 받은 회원번호가 아니라
		 * 로그인 사용자에게서 얻은 안전한 값이다.
		 */
		model.addAttribute(
				"memberNumber",
				memberNumber);

		model.addAttribute(
				"patientNumber",
				memberNumber);

		model.addAttribute(
				"patientNo",
				memberNumber);

		/*
		 * 마이페이지 홈 탭
		 */
		if ("home".equals(tab)) {

			model.addAttribute(
					"patientProfile",
					patientMyPageService
							.selectPatientProfile(
									memberNumber));

			model.addAttribute(
					"upcomingReservation",
					patientMyPageService
							.selectUpcomingReservation(
									memberNumber));
		}

		/*
		 * 진료이력 탭
		 */
		if ("history".equals(tab)) {

			// 로그인 환자의 진료이력 목록
			model.addAttribute(
					"historyList",
					patientMyPageService
							.selectHistoryList(
									memberNumber));

			// 로그인 환자의 접수·수납 이력
			model.addAttribute(
					"registerList",
					patientMyPageService
							.selectRegisterList(
									memberNumber));
		}

		/*
		 * 회원정보 탭
		 */
		if ("profile".equals(tab)) {

			model.addAttribute(
					"patientProfile",
					patientMyPageService
							.selectPatientProfile(
									memberNumber));
		}

		return "patient/mypage/index";
	}

	/*
	 * 진료이력 상세
	 *
	 * GET /patient/mypage/history/detail
	 *     ?medicalNumber=진료번호
	 *
	 * medicalNumber는 조회 대상 진료번호이므로 유지한다.
	 * 회원번호는 로그인 사용자 정보에서 가져온다.
	 */
	@GetMapping("/mypage/history/detail")
	public String historyDetail(
			@RequestParam String medicalNumber,
			Model model,
			@AuthenticationPrincipal
			CustomUserDetails loginUser) {

		String memberNumber =
				getLoginMemberNumber(loginUser);

		/*
		 * 진료번호와 로그인 회원번호를 함께 조건으로 조회한다.
		 *
		 * 다른 환자의 medicalNumber를 입력하더라도
		 * 본인 회원번호와 일치하지 않으면 조회되지 않는다.
		 */
		PatientMyPageVO history =
				patientMyPageService
						.selectHistoryDetail(
								medicalNumber,
								memberNumber);

		/*
		 * 존재하지 않거나 본인 소유가 아닌 진료이력은
		 * 마이페이지 진료이력 탭으로 이동한다.
		 */
		if (history == null) {

			return "redirect:/patient/mypage"
					+ "?tab=history";
		}

		model.addAttribute("history", history);

		/*
		 * 기존 JSP 호환용 model 속성
		 */
		model.addAttribute(
				"memberNumber",
				memberNumber);

		model.addAttribute(
				"patientNumber",
				memberNumber);

		model.addAttribute(
				"patientNo",
				memberNumber);

		return "patient/mypage/history-detail";
	}
}